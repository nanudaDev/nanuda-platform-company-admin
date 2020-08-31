// import NProgress from 'nprogress';
// import '../../../node_modules/nprogress/nprogress.css';
import { Route } from 'vue-router';
import router from '@/router';
import jwt from 'jsonwebtoken';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';
// import { PermissionGuard } from './permission.guard';
import * as jwtDecode from 'jwt-decode';
// import toast from '../../../resources/assets/js/services/toast.js';
import { async } from 'rxjs';
import store from '@/store';
import Vue from 'vue';
import { APPROVAL_STATUS } from '@/services/shared';
import AuthService from '@/services/shared/auth/auth.service';
import companyUserService from '@/services/company-user.service';
import { GetTokenByPhoneNoDto } from '@/services/shared/auth/dto';
import jwtStorageService from '@/services/shared/auth/jwt-storage.service';
// const whiteList = ['/login', '/auth-redirect'];
// NProgress.configure({ showSpinner: true });
const getPageTitle = (key: string) => {
  const hasKey = `${key}`;
  if (hasKey) {
    return hasKey;
  }
  return '나누다 공유 플랫폼';
};
router.beforeEach(async (to: Route, from: Route, next: any) => {
  console.log('beforEach');
  console.log('to', to);
  const token = JwtStorageService.getToken();
  if (to.meta.authRequired) {
    console.log('authRequired route');
    if (!token) {
      Vue.toasted.global.custom_error({
        message: '로그인 해주세요',
      });
      next('/login');
    }
    try {
      jwt.verify(
        token,
        'cACsK32JnneaUA6OuYyJ2GRc5D2uP3mZcU8le60CGxSnfhdRQefZaSpgM5rzbeR',
      );
    } catch (err) {
      console.log('token error');
      Vue.toasted.global.custom_error({
        message: err.message,
      });
      AuthService.signout();
      next('/login');
    }

    // console.log('isVerified', isVerified);
    const payload = await jwtDecode(token);
    console.log('payload', payload);
    //스토어에 로그인된 유저정보 저장
    if (!payload) {
      Vue.toasted.global.custom_error({
        message: '유저정보를 제대로 불러오지 못했습니다',
      });
      JwtStorageService.removeToken();
      next('/login');
    }
    //스토어에 유저정보 저장
    store.dispatch('setProfile', payload);

    const authCode = payload.adminRole;
    const hasPermission = () =>
      to.meta.roles.some(role => {
        return role === authCode;
      });
    if (!hasPermission()) {
      next('/dashboard');
      Vue.toasted.global.custom_error({
        message: `${to.path}으로 진입할 권한이 없습니다. 가능한 등급: ${to.meta.roles} | 본인 등급: ${authCode}`,
      });
    }

    const approved =
      payload.companyStatus === APPROVAL_STATUS.APPROVAL &&
      payload.userStatus === APPROVAL_STATUS.APPROVAL;

    //유저,업체 상태 체크
    if (to.meta.approveRequired) {
      if (!approved) {
        const getTokenByPhoneNoDto = new GetTokenByPhoneNoDto();
        getTokenByPhoneNoDto.phone = store.state.myId;
        companyUserService
          .getTokenByPhoneNo(getTokenByPhoneNoDto)
          .subscribe(res => {
            if (res) {
              console.log('getTokenByPhoneNo res', res);
              jwtStorageService.setToken(res.data.token);
              if (
                res.data.user.companyUserStatus === APPROVAL_STATUS.APPROVAL &&
                res.data.user.company.companyStatus === APPROVAL_STATUS.APPROVAL
              ) {
                next();
              } else {
                next('/no-auth');
              }
            } else {
              next('/no-auth');
            }
          });
      } else {
        next();
      }
    } else {
      next();
    }
  }
  // if (!to.meta.authRequired) {
  //   if (token) {
  //     next('/dashboard');
  //     //   NProgress.done();

  //   }
  // }
  else {
    // console.log('not authRequired route');
    if (to.path === '/login' || to.path === '/') {
      console.log('token', token);
      if (token) {
        console.log('from login resdirected to dashboard');
        next('/dashboard');
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
router.afterEach((to: Route) => {
  // Finish progress bar
  //   NProgress.done();
  // set page title
  console.log(to.meta);
  document.title = getPageTitle(`${to.meta.title} - 나누다 공유 플랫폼`);
});

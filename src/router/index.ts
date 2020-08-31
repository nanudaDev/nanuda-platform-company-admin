import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import FounderConsult from '@/modules/founder-consult/FounderConsult.vue';
import Login from '@/modules/login/Login.vue';

import { CONST_COMPANY_USER } from '@/services/shared';
import componentsRouter from './component';

// 뷰에서 뷰라이터를 사용할 것을 파람으로 받아 다른 라우터 기능을 억제한다.
Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Login,
    meta: {
      layout: 'EmptyLayout',
      authRequired: false,
      title: '나누다키친 플랫폼 - 로그인',
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      layout: 'EmptyLayout',
      authRequired: false,
      title: '나누다키친 플랫폼 - 로그인',
    },
  },
  {
    path: '/no-auth',
    component: () => import('@/modules/no-auth/NoAuth.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: false,
      roles: [...CONST_COMPANY_USER],
      title: '나누다키친 플랫폼 - no auth',
      noNav: true,
    },
  },

  // {
  //   path: '/founder-consult',
  //   component: FounderConsult,
  //   meta: {
  //     layout: 'MainLayout',
  //     authRequired: true,
  //     roles: [...CONST_COMPANY_USER],
  //   },
  // },

  ...componentsRouter,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

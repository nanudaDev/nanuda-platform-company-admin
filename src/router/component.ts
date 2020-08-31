import { RouteConfig } from 'vue-router';
import { CONST_COMPANY_USER } from '@/services/shared/common-code.type';
import District from '@/modules/company/components/district/District.vue';
import Dashboard from '@/modules/dashboard/Dashboard.vue';

export const componentsRouter: RouteConfig[] = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: true,
      roles: [...CONST_COMPANY_USER],
      icon: 'mdi-view-dashboard',
      title: '대시보드',
    },
  },
  {
    path: '/notice-board',
    component: () => import('@/modules/notice-board/NoticeBoard.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: true,
      roles: [...CONST_COMPANY_USER],
      icon: 'mdi-volume-high',
      title: '공지사항',
    },
  },
  {
    path: '/notice-board/:id([0-9]+)',
    component: () =>
      import(
        /* webpackChunkName: "lazyLoaded" */
        '@/modules/notice-board/components/NoticeBoardDetail.vue'
      ),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: true,
      roles: [...CONST_COMPANY_USER],
      noNav: true,
      title: '공지사항',
    },
  },
  {
    path: '/founder-consult',
    component: () =>
      import(
        /* webpackChunkName: "lazyLoaded" */
        '@/modules/founder-consult/FounderConsult.vue'
      ),
    name: 'FounderConsult',
    meta: {
      authRequired: true,
      approveRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_COMPANY_USER],
      title: '신청 관리',
      icon: 'mdi-tooltip-text',
    },
  },
  {
    path: '/founder-consult/:id([0-9]+)',
    name: 'FounderConsultDetail',
    component: () =>
      import(
        /* webpackChunkName: "lazyLoaded" */

        '@/modules/founder-consult/components/FounderConsultDetail.vue'
      ),
    meta: {
      authRequired: true,
      approveRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_COMPANY_USER],
      noNav: true,
      title: '신청 관리',
    },
  },
  {
    path: '/company/user/:id([0-9]+)',
    component: () => import('@/modules/company/components/userDetail.vue'),
    meta: {
      authRequired: true,
      approveRequired: true,
      layout: 'MainLayout',
      roles: ['ADMIN_COMPANY_USER'],
      title: '유저 관리',
      noNav: true,
    },
  },
  {
    path: '/company/district/:id([0-9]+)',
    component: () =>
      import('@/modules/company/components/district/DistrictDetail.vue'),
    meta: {
      authRequired: true,
      approveRequired: true,
      layout: 'MainLayout',
      roles: [...CONST_COMPANY_USER],
      title: '유저 관리',
      noNav: true,
    },
  },
  {
    path: '/company',
    component: () => import('@/modules/company/Company.vue'),
    meta: {
      title: '업체 관리',
      icon: 'mdi-domain',
    },
    children: [
      {
        path: '/company',
        component: () =>
          import('@/modules/company/components/CompanyDetail.vue'),
        meta: {
          authRequired: true,
          approveRequired: false,
          layout: 'MainLayout',
          roles: [...CONST_COMPANY_USER],
          title: '업체 관리',
          icon: 'mdi-domain',
        },
      },
      {
        path: '/company/district',
        component: District,
        meta: {
          authRequired: true,
          approveRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_COMPANY_USER],
          title: '지점 관리',
          icon: 'mdi-flag-variant',
        },
      },
      {
        path: '/company/user',
        component: () => import('@/modules/company/components/user.vue'),
        meta: {
          authRequired: true,
          approveRequired: true,
          layout: 'MainLayout',
          roles: ['ADMIN_COMPANY_USER'],
          title: '유저 관리',
          icon: 'mdi-account-circle',
        },
      },
    ],
  },
  {
    path: '/mypage',
    component: () => import('@/modules/my-page/MyPage.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: false,
      roles: [...CONST_COMPANY_USER],
      icon: 'mdi-account',
      title: '마이페이지',
      noNav: true,
    },
  },
  {
    path: '/contract',
    component: () => import('@/modules/contracts/Contracts.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: true,
      roles: [...CONST_COMPANY_USER],
      icon: 'mdi-file-document-edit',
      title: '계약 관리',
    },
  },
  {
    path: '/contract/:id([0-9]+)',
    component: () =>
      import('@/modules/contracts/components/ContractsDetail.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: true,
      roles: [...CONST_COMPANY_USER],
      noNav: true,
      title: '계약 상세',
    },
  },
  {
    path: '/qna',
    component: () => import('@/modules/qna/QNA.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: true,
      roles: [...CONST_COMPANY_USER],
      icon: 'mdi-help-circle',
      title: 'Q&A',
    },
  },
  {
    path: '/qna/:id([0-9]+)',
    component: () => import('@/modules/qna/components/QNADetail.vue'),
    meta: {
      layout: 'MainLayout',
      authRequired: true,
      approveRequired: true,
      roles: [...CONST_COMPANY_USER],
      noNav: true,
      title: 'QNA 상세',
    },
  },
];

export default componentsRouter;

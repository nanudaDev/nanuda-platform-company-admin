import Vue from 'vue';
import {
  YN,
  COMPANY_USER,
  APPROVAL_STATUS,
  NOTICE_BOARD_TYPE,
} from '@/services/shared';

export const EnumPipeTransformer = () => {
  Vue.filter('enumTransformer', (value: string): string => {
    if (!value) return;
    if (value === YN.Y) {
      return (value = 'YES');
    }
    if (value === YN.N) {
      return (value = 'No');
    }

    if (value === COMPANY_USER.NORMAL_COMPANY_USER) {
      return (value = '일반');
    }

    if (value === COMPANY_USER.ADMIN_COMPANY_USER) {
      return (value = '마스터');
    }

    // 승인 상태
    if (value === APPROVAL_STATUS.APPROVAL) {
      return '승인';
    }
    if (value === APPROVAL_STATUS.NEED_APPROVAL) {
      return '등록 승인 필요';
    }
    if (value === APPROVAL_STATUS.REFUSED) {
      return '거절/반려';
    }
    if (value === APPROVAL_STATUS.UPDATE_APPROVAL) {
      return '수정 승인 필요';
    }
    if (value === APPROVAL_STATUS.RE_REQUEST) {
      return '재요청';
    }

    // 공지사항 알림
    if (value === NOTICE_BOARD_TYPE.EVENT_NOTICE) {
      return '이벤트 알림';
    }
    if (value === NOTICE_BOARD_TYPE.NORMAL_NOTICE) {
      return '일반 알림';
    }
    if (value === NOTICE_BOARD_TYPE.TERMS_CHANGE_NOTICE) {
      return '이용약관 변경 안내';
    }
  });
};

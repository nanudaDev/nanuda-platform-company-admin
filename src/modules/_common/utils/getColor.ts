import {
  B2B_FOUNDER_CONSULT,
  YN,
  FOUNDER_CONSULT,
  APPROVAL_STATUS,
  NOTICE_BOARD_TYPE,
  INQUIRY_TYPE,
} from '@/services/shared';

export const getColor = (status: string): string => {
  if (status === YN.Y) {
    return 'success';
  }
  if (status === YN.N) {
    return 'red';
  }
  if (
    status === B2B_FOUNDER_CONSULT.B2B_F_NEW_REG ||
    status === FOUNDER_CONSULT.F_NEW_REG
  ) {
    return 'primary';
  }

  if (
    status === B2B_FOUNDER_CONSULT.B2B_F_CONTRACT_COMPLETE ||
    status === FOUNDER_CONSULT.F_DIST_COMPLETE
  ) {
    return 'grey darken-2';
  }

  if (status === APPROVAL_STATUS.APPROVAL) {
    return 'success';
  }

  if (
    status === APPROVAL_STATUS.REFUSED ||
    status === B2B_FOUNDER_CONSULT.B2B_F_CANCELLED ||
    status === FOUNDER_CONSULT.F_CONTACT_CANCEL
  ) {
    return 'red darken-1';
  }

  if (
    status === NOTICE_BOARD_TYPE.EVENT_NOTICE ||
    status === INQUIRY_TYPE.SYSTEM
  ) {
    return 'indigo darken-1';
  }

  if (status === NOTICE_BOARD_TYPE.TERMS_CHANGE_NOTICE) {
    return 'pink darken-1';
  }

  return 'orange lighten-1';
};

import { BaseDto } from '@/core';
import { COMPANY_USER, APPROVAL_STATUS } from '../../common-code.type';

export class BaseUser extends BaseDto<BaseUser> {
  constructor(user: any) {
    super(user);
  }

  no: number;
  phone: string;
  name: string;
  email: string;
  authCode: COMPANY_USER;
  companyUserStatus: APPROVAL_STATUS;
}

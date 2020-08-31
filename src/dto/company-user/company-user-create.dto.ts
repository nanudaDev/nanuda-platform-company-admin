import { BaseUser } from '@/services/shared/auth';
import { YN } from '@/services/shared';
import {
  COMPANY_USER,
  APPROVAL_STATUS,
} from '@/services/shared/common-code.type';

export class CompanyUserCreateDto extends BaseUser {
  phone: string;
  name: string;
  email: string;
  authCode: COMPANY_USER;
  password: string;
  passwordConfirm: string;
}

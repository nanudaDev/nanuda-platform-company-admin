import { BaseUser } from '@/services/shared/auth';
import { YN } from '@/services/shared';
import {
  COMPANY_USER,
  APPROVAL_STATUS,
} from '@/services/shared/common-code.type';
import { CompanyDto } from '../company/company.dto';

export class CompanyUserDto extends BaseUser {
  no: number;
  phone: string;
  name: string;
  email: string;
  authCode: COMPANY_USER;
  password: string;
  companyNo: number;
  passwordChangedYn?: YN;
  companyUserStatus: APPROVAL_STATUS;
  nanudaUser: object;
  company: CompanyDto;
}

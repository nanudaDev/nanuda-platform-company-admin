import { BaseDto } from '@/core';
import { CompanyUserDto } from '@/dto/company-user';
import { APPROVAL_STATUS } from '../../common-code.type';

export class GetTokenByIdReturnDto extends BaseDto<GetTokenByIdReturnDto> {
  token: string;
  companyUserStatus: APPROVAL_STATUS;
  companyStatus: APPROVAL_STATUS;
}

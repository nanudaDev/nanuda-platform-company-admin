import { BaseDto } from '@/core';
import { CompanyUserDto } from '@/dto/company-user';

export class TokenByPhoneNoReturnDto extends BaseDto<TokenByPhoneNoReturnDto> {
  token: string;
  user: CompanyUserDto;
}

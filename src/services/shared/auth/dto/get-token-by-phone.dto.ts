import { BaseDto } from '@/core';

export class GetTokenByPhoneNoDto extends BaseDto<GetTokenByPhoneNoDto> {
  phone: string;
}

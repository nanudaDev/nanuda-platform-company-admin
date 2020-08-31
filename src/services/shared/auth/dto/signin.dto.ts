import { BaseDto } from '@/core';

export class SigninDto extends BaseDto<SigninDto> {
  phone: string;
  password: string;
}

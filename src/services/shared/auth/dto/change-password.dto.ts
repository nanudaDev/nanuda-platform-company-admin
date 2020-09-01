import { BaseDto } from '@/core';

export class ChangePasswordDto extends BaseDto<ChangePasswordDto> {
  password: string;
  passwordConfirm?: string;
}

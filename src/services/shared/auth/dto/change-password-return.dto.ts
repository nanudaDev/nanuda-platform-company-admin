import { BaseDto } from '@/core';

export class ChangePasswordReturnDto extends BaseDto<ChangePasswordReturnDto> {
  isValidated: boolean;
}

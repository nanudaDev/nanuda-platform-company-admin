import { BaseDto } from '@/core';

export class CheckSMSCodeDto extends BaseDto<CheckSMSCodeDto> {
  phone: string;
  authCode: string;
}

import { BaseDto } from '@/core';

export class RegisterSMSCodeDto extends BaseDto<RegisterSMSCodeDto> {
  phone: string;
}

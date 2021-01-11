import { BaseDto } from '@/core';
import { FOUNDER_CONSULT } from '@/services/shared/common-code.type';
import { AVAILABLE_TIME, ORDER_BY_VALUE, YN } from '@/common/interfaces';

export class FounderConsultReplyDto extends BaseDto<FounderConsultReplyDto> {
  desc: string;
}

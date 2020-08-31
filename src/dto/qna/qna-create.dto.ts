import { BaseDto } from '@/core';
import { INQUIRY_TYPE, YN } from '@/services/shared/common-code.type';

export class QNACreateDto extends BaseDto<QNACreateDto> {
  title: string;
  content: YN;
  inquiryType: INQUIRY_TYPE;
}

import { BaseDto } from '@/core';
import { INQUIRY_TYPE, YN } from '@/services/shared/common-code.type';

export class QNADto extends BaseDto<QNADto> {
  title!: string;
  isClosed: YN;
  inquiryType!: INQUIRY_TYPE;
  companyUserName: string;
}

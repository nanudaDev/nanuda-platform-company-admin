import { BaseDto } from '@/core';
import { INQUIRY_TYPE, YN } from '@/services/shared/common-code.type';

export class QNAReplyDto extends BaseDto<QNAReplyDto> {
  createdAt: Date;
  updatedAt: Date;
  no: number;
  adminNo: number;
  companyNo: number;
  companyUserNo: number;
  inquiryNo: number;
  isInquiryReply: YN;
  inquiryType: INQUIRY_TYPE;
  title: string;
  content: string;
  isEdited: YN;
  isClosed: YN;
  company: object;
}

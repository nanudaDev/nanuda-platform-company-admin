import { BaseDto } from '@/core';
import { NOTICE_BOARD_TYPE } from '@/services/shared';

export class NoticeBoardDto extends BaseDto<NoticeBoardDto> {
  no?: number;
  title: string;
  content: string;
  url?: string;
  noticeBoardType: NOTICE_BOARD_TYPE;
  started?: string;
  ended?: string;
  createdAt: Date;
  updatedAt: Date;
  codeManagement: any;
}

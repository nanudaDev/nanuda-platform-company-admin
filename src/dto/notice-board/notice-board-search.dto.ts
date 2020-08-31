import { BaseDto, OrderByValue } from '@/core';
import { NOTICE_BOARD_TYPE } from '@/services/shared';
import { NoticeBoardDto } from './notice-board.dto';

export class NoticeBoardSearchDto extends BaseDto<NoticeBoardSearchDto>
  implements Partial<NoticeBoardDto> {
  no?: number;
  title?: string;
  content?: string;
  url?: string;
  noticeBoardType: NOTICE_BOARD_TYPE;
  orderByNo?: OrderByValue;
}

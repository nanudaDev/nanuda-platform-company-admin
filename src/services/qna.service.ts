import { BaseService, Pagination } from '@/core';
import { QNADto, QNACreateDto, QNAReplyCreateDto } from '@/dto/qna';
import { QNAReplyDto } from '@/dto/qna/qna-reply.dto';
import { ORDER_BY_VALUE } from '@/services/shared/common-code.type';

class QNAService extends BaseService {
  /**
   * list
   * @param filter
   * @param pagination
   */
  findAll(filter?, pagination?: Pagination) {
    return this.paginate<QNADto>('inquiry', filter, pagination);
  }
  /**
   * detail
   * @param id
   */
  findOne(id: number | string) {
    return this.get<QNADto>(`inquiry/${id}`);
  }
  /**
   * list
   * @param pagination
   */
  findAllReply(id: number | string, pagination?: Pagination) {
    return this.paginate<QNAReplyDto>(
      `inquiry/${id}/reply`,
      { orderByNo: ORDER_BY_VALUE.DESC },
      pagination,
    );
  }
  create(value: QNACreateDto) {
    return this.post<QNACreateDto>('inquiry', value);
  }
  createReply(id: number | string, value: QNAReplyCreateDto) {
    return this.post<QNAReplyCreateDto>(`inquiry/${id}/reply`, value);
  }
  getReply(id: number | string, replyId: number | string) {
    return this.get<QNAReplyDto>(`inquiry/${id}/reply/${replyId}`);
  }
  changeReply(
    id: number | string,
    replyId: number | string,
    value: QNAReplyCreateDto,
  ) {
    return this.patch<QNAReplyCreateDto>(
      `inquiry/${id}/reply/${replyId}`,
      value,
    );
  }
}
export default new QNAService();

import { BaseService, Pagination } from '@/core';
import { NoticeBoardDto, NoticeBoardSearchDto } from '@/dto/notice-board';

class noticeBoardService extends BaseService {
  constructor() {
    super();
  }

  /**
   * list
   * @param filter
   * @param pagination
   */
  findAll(filter: NoticeBoardSearchDto, pagination?: Pagination) {
    return this.paginate<NoticeBoardDto>('notice-board', filter, pagination);
  }
  /**
   * detail
   * @param id
   */
  findOne(id) {
    return this.get<NoticeBoardDto>(`notice-board/${id}`);
  }
}
export default new noticeBoardService();

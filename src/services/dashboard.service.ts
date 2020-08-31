import { BaseService, Pagination } from '@/core';
import { DashboardDto } from '@/dto/dashboard/index';
import { NoticeBoardDto } from '@/dto/notice-board/notice-board.dto';

class DashboardService extends BaseService {
  findOne() {
    return this.get<DashboardDto>('dashboard/founder-consult');
  }
}
export default new DashboardService();

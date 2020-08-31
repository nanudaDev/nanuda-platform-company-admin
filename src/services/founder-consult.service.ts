import { BaseService } from '@/core';
import { FounderConsultSearchDto } from '@/dto/founder-consult/founder-consult-search.dto';
import { FounderConsultDto } from '@/dto/founder-consult/founder-consult.dto';
import { Observable } from 'rxjs';
import { Pagination } from '@/common/interfaces/pagination.type';
import { CompanyFounderConsultFetchDto } from '@/dto/founder-consult';

class FounderConsultService extends BaseService {
  constructor() {
    super();
  }

  /**
   * list
   * @param filter
   * @param pagination
   */
  findAll(filter?: FounderConsultSearchDto, pagination?: Pagination) {
    return this.paginate<FounderConsultDto>(
      'delivery-founder-consult',
      filter,
      pagination,
    );
  }

  /**
   * detail
   * @param id
   */
  findOne(id: number | string) {
    return this.get<FounderConsultDto>(`delivery-founder-consult/${id}`);
  }
  /**
   * detail
   * @param id
   */
  patchOne(
    id: number | string,
    companyFounderConsultFetchDto: CompanyFounderConsultFetchDto,
  ) {
    return this.patch<FounderConsultDto>(
      `delivery-founder-consult/${id}`,
      companyFounderConsultFetchDto,
    );
  }
}
export default new FounderConsultService();
import { BaseService, Pagination } from '@/core';
import { ContractDto } from '@/dto/contract/contract.dto';
import { ContractSearchDto } from '@/dto/contract/contract-search.dto';

class contractService extends BaseService {
  findAll(filter: ContractSearchDto, pagination?: Pagination) {
    return this.paginate<ContractDto>(
      'delivery-founder-consult-contract',
      filter,
      pagination,
    );
  }
  findOne(id: string | number) {
    return this.get<ContractDto>(`delivery-founder-consult-contract/${id}`);
  }
  deleteOne(id: string) {
    return this.delete<ContractDto>(`delivery-founder-consult-contract/${id}`);
  }
}
export default new contractService();

import { BaseService } from '@/core';
import { CompanyDto } from '@/dto/company';

class CompanyService extends BaseService {
  findOne() {
    return this.get<CompanyDto>('company/find-my-company');
  }
  change(dto: CompanyDto) {
    return this.patch<CompanyDto>('company', dto);
  }
}
export default new CompanyService();

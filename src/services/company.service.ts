import { BaseService } from '@/core';
import { CompanyDto } from '@/dto/company';

class CompanyService extends BaseService {
  findOne() {
    return this.get<CompanyDto>('company/find-my-company');
  }
  change(companyDto: CompanyDto) {
    return this.patch<CompanyDto>('company', companyDto);
  }
}
export default new CompanyService();

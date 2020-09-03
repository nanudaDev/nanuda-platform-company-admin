import { BaseService } from '@/core';
import { Pagination } from '@/common/interfaces/pagination.type';
import {
  CompanyUserDto,
  CompanyUserSearchDto,
  CompanyUserCreateDto,
} from '@/dto/company-user';
import { GetTokenByIdReturnDto } from './shared/auth/dto';

class CompanyUserService extends BaseService {
  findAll(filter: CompanyUserSearchDto, paginate: Pagination) {
    return super.paginate<CompanyUserDto>('company-user', filter, paginate);
  }
  findOne(id: number | string) {
    return super.get<CompanyUserDto>(`company-user/${id}`);
  }
  findMe() {
    return super.get<CompanyUserDto>('company-user/find-me');
  }
  create(companyUserCreateDto: CompanyUserCreateDto) {
    return super.post<CompanyUserCreateDto>(
      'company-user',
      companyUserCreateDto,
    );
  }
  change(companyUserDto: CompanyUserDto) {
    return super.patch<CompanyUserDto>('company-user', companyUserDto);
  }
  getTokenById() {
    return super.get<GetTokenByIdReturnDto>('auth/company-user/find-by-id');
  }
}
export default new CompanyUserService();

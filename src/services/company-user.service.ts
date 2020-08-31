import { BaseService } from '@/core';
import { Pagination } from '@/common/interfaces/pagination.type';
import {
  CompanyUserDto,
  CompanyUserSearchDto,
  CompanyUserCreateDto,
} from '@/dto/company-user';
import {
  GetTokenByPhoneNoDto,
  TokenByPhoneNoReturnDto,
} from './shared/auth/dto';

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
  create(dto: CompanyUserCreateDto) {
    return super.post<CompanyUserCreateDto>('company-user', dto);
  }
  change(dto: CompanyUserDto) {
    return super.patch<CompanyUserDto>('company-user', dto);
  }
  getTokenByPhoneNo(dto: GetTokenByPhoneNoDto) {
    console.log('getTokenByPhoneNo');
    return super.get<TokenByPhoneNoReturnDto>(
      'auth/company-user/find-by-phone',
      dto,
    );
  }
}
export default new CompanyUserService();

import { BaseService } from '@/core';
import { CompanyDistrictDto } from '@/dto/company-district/company-district.dto';
import { Pagination } from '@/common/interfaces/pagination.type';
import {
  SpaceTypeDto,
  SpaceTypeSearchDto,
  SpaceTypePatchDto,
  SpaceTypeCreateDto,
  CompanyDistrictSearchDto,
} from '@/dto/company-district';

class companyDistrictService extends BaseService {
  constructor() {
    super();
  }
  findOne(id: number | string) {
    return super.get<CompanyDistrictDto>(`company-district/${id}`);
  }
  /**
   * list
   * @param filter
   * @param pagination
   */
  findAll(filter?: CompanyDistrictSearchDto, pagination?: Pagination) {
    return super.paginate<CompanyDistrictDto>(
      'company-district',
      filter,
      pagination,
    );
  }

  findDistrictSpaceTypeList(
    spaceTypeSearchDto: SpaceTypeSearchDto,
    pagination?: Pagination,
  ) {
    return super.paginate<SpaceTypeDto>(
      'delivery-space',
      spaceTypeSearchDto,
      pagination,
    );
  }
  findDistrictSpaceType(id: number) {
    return super.get<SpaceTypeDto>(`delivery-space/${id}`);
  }

  patchDistrictSpaceType(
    id: number | string,
    spaceTypePatchDto: SpaceTypePatchDto,
  ) {
    return this.patch<SpaceTypePatchDto>(
      `delivery-space/${id}`,
      spaceTypePatchDto,
    );
  }
  createDistrictSpaceType(spaceTypeCreateDto: SpaceTypeCreateDto) {
    return super.post<SpaceTypeDto>('delivery-space', spaceTypeCreateDto);
  }
  findDistrictSelectList() {
    return super.get<CompanyDistrictDto[]>('company-district/select-option');
  }
}
export default new companyDistrictService();

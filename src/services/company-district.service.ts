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
import { CompanyDistrictRevenueRecordDto } from '@/dto/company-district/revenue-record/company-district-revenue-record.dto';
import { CompanyDistrictRevenueRecordCreateDto } from '@/dto/company-district/revenue-record/company-district-revenue-record-create.dto';
import { CompanyDistrictRevenueRecordPatchDto } from '@/dto/company-district/revenue-record';

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

  createDistrictRevenueRecords(
    companyDistrictRevenueRecordCreateDto: CompanyDistrictRevenueRecordCreateDto,
  ) {
    return super.post<CompanyDistrictRevenueRecordCreateDto>(
      'revenue-record',
      companyDistrictRevenueRecordCreateDto,
    );
  }

  //recordId를 가져와서 매출기록을 수정함
  updateDistrictRevenueRecords(
    recordId: number,
    companyDistrictRevenueRecordPatchDto: CompanyDistrictRevenueRecordPatchDto,
  ) {
    return super.patch<CompanyDistrictRevenueRecordPatchDto>(
      `revenue-record/${recordId}`,
      companyDistrictRevenueRecordPatchDto,
    );
  }

  //지점별 매출 기록 리스트 가져오기
  findDistrictRevenueRecords(id: string, year?: string) {
    return super.get<CompanyDistrictRevenueRecordDto[]>(
      `company-district/${id}/revenue-record`,
      { year: year },
    );
  }
}
export default new companyDistrictService();

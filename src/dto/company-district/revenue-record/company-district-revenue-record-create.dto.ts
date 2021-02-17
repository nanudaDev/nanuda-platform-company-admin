import { BaseDto } from '@/core';

export class CompanyDistrictRevenueRecordCreateDto extends BaseDto<
  CompanyDistrictRevenueRecordCreateDto
> {
  year: string;
  month: string;
  maxRevenue: number;
  minRevenue: number;
  companyDistrictNo: string;
}

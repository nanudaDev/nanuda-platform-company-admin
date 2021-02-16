import { BaseDto } from '@/core';

export class CompanyDistrictRevenueRecordDto extends BaseDto<
  CompanyDistrictRevenueRecordDto
> {
  year: string;
  month: string;
  maxRevenue: number;
  minRevenue: number;
  companyDistrictNo: number;
}

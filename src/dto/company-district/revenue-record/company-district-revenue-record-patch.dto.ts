import { BaseDto } from '@/core';

export class CompanyDistrictRevenueRecordPatchDto extends BaseDto<
  CompanyDistrictRevenueRecordPatchDto
> {
  maxRevenue: number;
  minRevenue: number;
}

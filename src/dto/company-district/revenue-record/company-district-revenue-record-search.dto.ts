import { BaseDto } from '@/core';

export class CompanyDistrictRevenueRecordSearchDto extends BaseDto<
  CompanyDistrictRevenueRecordSearchDto
> {
  constructor(companyDistrictNo: string, year: string) {
    super();
    this.companyDistrictNo = companyDistrictNo;
    this.year = year;
  }
  year: string;
  companyDistrictNo: string;
}

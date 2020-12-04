import { BaseDto } from '@/core';
import { CompanyDistrictDto } from '../company-district/company-district.dto';
import { CompanyDto } from '../company/company.dto';

export class CompanyDistrictPromotionDto extends BaseDto<
  CompanyDistrictPromotionDto
> {
  no?: number;
  title?: string;
  desc?: string;
  summmary?: string;
  companyDistricts?: CompanyDistrictDto[];
  company?: CompanyDto;
  promotionType?: string;
}

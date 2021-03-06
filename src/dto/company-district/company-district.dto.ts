import { BaseDto } from '@/core';
import { APPROVAL_STATUS } from '@/services/shared';
import { CompanyDistrictPromotionDto } from '../company-district-promotion';

export class CompanyDistrictDto extends BaseDto<CompanyDistrictDto> {
  createdAt: Date;
  updatedAt: Date;
  no: number;
  companyNo: number;
  nameKr: string;
  nameEng?: string;
  address?: string;
  spaceScore: string;
  analysisScore: string;
  kbScore: string;
  lat: string;
  lon: string;
  companyDistrictStatus: APPROVAL_STATUS;
  promotions?: CompanyDistrictPromotionDto[];
  vicinityInfo: object;
}

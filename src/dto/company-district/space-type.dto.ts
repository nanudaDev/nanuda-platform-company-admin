import { BaseDto } from '@/core';
import { APPROVAL_STATUS, YN } from '@/services/shared';
import { CompanyDistrictDto } from './company-district.dto';
import { CompanyDto } from '../company/company.dto';
import { ContractDto } from '../contract';

export class SpaceTypeDto extends BaseDto<SpaceTypeDto> {
  createdAt: Date;
  updatedAt: Date;
  no: number;
  typeName: string;
  adminNo: number;
  companyUserNo: number | string;
  companyDistrictNo: string;
  buildingName: string;
  size: number;
  images: any[];
  quantity: number;
  deposit: string;
  monthlyUtilityFee: string;
  monthlyRentFee: string;
  showYn: YN;
  delYn: YN;
  companyDistrict: CompanyDistrictDto;
  company: CompanyDto;
  deliverySpaceOptions: any[];
  amenities: any[];
  contracts: ContractDto[];
}

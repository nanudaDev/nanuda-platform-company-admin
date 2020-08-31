import { BaseDto } from '@/core';
import { SpaceTypeDto } from '../company-district';
import { AmenityDto } from '../amenity/amenity.dto';

export class ContractDto extends BaseDto<ContractDto> {
  cratedAt: Date;
  updatedAt: Date;
  no: number;
  companyNo: number;
  nanudaUserNo: number;
  deliverySpaceNo: number;
  companyDistrictNo: number;
  deliveryFounderConsultNo: number;
  deliverySpace: SpaceTypeDto;
  deliveryFounderConsults: any[];
  amenities: AmenityDto[];
  deliverySpaceOptions: any[];
}

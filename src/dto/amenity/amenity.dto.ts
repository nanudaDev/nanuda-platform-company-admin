import { BaseDto } from '@/core';
import { AMENITY } from '@/services/shared';

export class AmenityDto extends BaseDto<AmenityDto> {
  createdAt: Date;
  updatedAt: Date;
  no: number;
  amenityName: string;
  amenityCode: string;
  amenityType: AMENITY;
}

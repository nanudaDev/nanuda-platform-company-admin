import { BaseService } from '@/core';
import { AmenityDto } from '@/dto/amenity/amenity.dto';

class AmenityService extends BaseService {
  constructor() {
    super();
  }

  findkitchenFacility() {
    return super.get<AmenityDto[]>('amenity/kitchen-facility');
  }
}
export default new AmenityService();

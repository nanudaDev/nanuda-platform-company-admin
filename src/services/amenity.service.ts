import { BaseService } from '@/core';
import { AmenityDto } from '@/dto/amenity/amenity.dto';

class AmenityService extends BaseService {
  findkitchenFacility() {
    return this.get<AmenityDto[]>('amenity/kitchen-facility');
  }
}
export default new AmenityService();

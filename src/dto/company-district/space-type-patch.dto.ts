import { YN } from '@/services/shared';
import { SpaceTypeDto } from './space-type.dto';

export class SpaceTypePatchDto extends SpaceTypeDto {
  amenityIds?: string[];
  deliverySpaceOptionIds?: string[];
}

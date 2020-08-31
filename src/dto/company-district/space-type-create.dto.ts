import { SpaceTypeDto } from './space-type.dto';

export class SpaceTypeCreateDto extends SpaceTypeDto {
  amenityIds?: string[];
  deliverySpaceOptionIds?: string[];
}

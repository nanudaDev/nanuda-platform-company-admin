import { BaseDto } from '@/core';
import { YN } from '@/common/interfaces/del-yn.type';

export class SpaceTypeDto extends BaseDto<SpaceTypeDto> {
  no: number;
  code: string;
  name: string;
  displayName?: string;
  desc?: string;
  showYn?: YN;
  delYn?: YN;
}

import { BaseDto } from '@/core';
import { YN } from '@/common/interfaces/del-yn.type';

export class CodeManagementDto extends BaseDto<CodeManagementDto> {
  constructor(partial?: any) {
    super(partial);
  }
  no: number;
  key: string;
  value: string;
  desc: string;
  category_1: string;
  category_2: string;
  createdAt: Date;
  updatedAt: Date;
  delYn: YN;
}

import { BaseDto } from '@/core';
import { FOUNDER_CONSULT } from '@/services/shared/common-code.type';
import { AVAILABLE_TIME, ORDER_BY_VALUE, YN } from '@/common/interfaces';

export class FounderConsultSearchDto extends BaseDto<FounderConsultSearchDto> {
  spaceNo?: number;
  status?: string;
  hopeTime?: string;
  companyNo?: number;
  companyDistrictNameKr?: string;
  companyDistrictNameEng?: string;
  spaceTypeNo?: number;
  nanudaUserName?: string;
  adminUserName?: string;
  address?: string;
  phone?: string;
  startDate?: Date;
  endDate?: Date;
  orderByNo?: typeof ORDER_BY_VALUE;
}

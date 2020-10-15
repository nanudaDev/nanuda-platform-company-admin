import { BaseDto } from '@/core';
import {
  FOUNDER_CONSULT,
  B2B_FOUNDER_CONSULT,
} from '@/services/shared/common-code.type';
import { AVAILABLE_TIME, ORDER_BY_VALUE, YN } from '@/common/interfaces';
import { CodeManagementDto } from '@/services/init/dto';
import { SpaceTypeDto } from '../company-district';

export class FounderConsultDto extends BaseDto<FounderConsultDto> {
  deliverySpaceNo: number;
  deliverySpace: SpaceTypeDto;
  status: FOUNDER_CONSULT;
  hopeTime?: AVAILABLE_TIME;
  purposeYn: YN;
  companyUser: any;
  changUpExpYn: YN;
  spaceOwnYn: YN;
  companyNo: number;
  companyDistrictNameKr: string;
  companyDistrictNameEng: string;
  nanudaUserName?: string;
  adminUserName?: string;
  address?: string;
  companyDecisionStatus: B2B_FOUNDER_CONSULT;
  companyDecisionStatusCode?: CodeManagementDto;
  orderByNo: typeof ORDER_BY_VALUE;
}

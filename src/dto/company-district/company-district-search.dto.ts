import { BaseDto, OrderByValue } from '@/core';
import { CompanyDistrictDto } from '.';
import { APPROVAL_STATUS } from '@/services/shared';

export class CompanyDistrictSearchDto extends BaseDto<CompanyDistrictSearchDto>
  implements Partial<CompanyDistrictDto> {
  no?: number;
  companyNo?: number;
  nameKr?: string;
  address?: string;
  companyDistrictStatus?: APPROVAL_STATUS;
  orderByNo: OrderByValue;
}

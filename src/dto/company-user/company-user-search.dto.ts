import { BaseUser } from '@/services/shared/auth';
import { BaseDto } from '@/core';
import { OrderByValue } from '@/common/interfaces/order-by-value.type';
import { APPROVAL_STATUS } from '@/services/shared';

export class CompanyUserSearchDto extends BaseDto<CompanyUserSearchDto> {
  constructor(partial?: any) {
    super(partial);
  }
  name?: string;
  email?: string;
  phone?: string;
  companyUserStatus?: APPROVAL_STATUS;
  orderByNo?: OrderByValue;
}

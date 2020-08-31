import { BaseDto } from '@/core';
import { B2B_FOUNDER_CONSULT } from '@/services/shared';

export class CompanyFounderConsultFetchDto extends BaseDto<
  CompanyFounderConsultFetchDto
> {
  companyDecisionStatus: B2B_FOUNDER_CONSULT;
}

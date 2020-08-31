import { BaseDto } from '@/core';

export class DashboardDto extends BaseDto<DashboardDto> {
  labels: any[];
  datasets: any[];
}

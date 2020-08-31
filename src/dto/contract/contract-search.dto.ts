import { BaseDto, OrderByValue } from '@/core';
import { ContractDto } from './contract.dto';

export class ContractSearchDto extends BaseDto<ContractSearchDto>
  implements Partial<ContractDto> {
  nanudaUserNo?: number;
  deliverySpaceNo?: number;
  deliverySpaceTypeName?: string;
  deliverySpaceSize?: string;
  companyDistrictNo?: number;
  companyDistrictName?: string;
  hopeFoodCategory?: string;
  amenityName?: string;
  deliverySpaceOptionsName?: string;
  orderByNo?: OrderByValue;
}

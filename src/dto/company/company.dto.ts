import { BaseDto } from '@/core';
import { COMPANY, APPROVAL_STATUS } from '@/services/shared/common-code.type';
import { CodeManagementDto } from '@/services/init/dto';
import { FileAttachmentDto } from '@/services/shared/file-upload';

export class CompanyDto extends BaseDto<CompanyDto> {
  address?: string;
  adminNo: number;
  businessNo?: string;
  ceoEng?: string;
  ceoKr: string;
  codeManagement: CodeManagementDto;
  companyStatus: APPROVAL_STATUS;
  companyType: COMPANY;
  createdAt: Date;
  email?: string;
  fax?: string;
  managerNo: number;
  nameEng?: string;
  nameKr: string;
  no: number;
  phone?: string;
  population?: string;
  updatedAt: Date;
  website?: string;
  logo?: FileAttachmentDto[];
}

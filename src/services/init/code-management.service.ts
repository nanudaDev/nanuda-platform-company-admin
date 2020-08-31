import { BaseService } from '@/core';
import { CodeManagementDto } from '@/services/init/dto';

class codeManagementService extends BaseService {
  constructor() {
    super();
  }
  // 공간 신청 상태
  findFounderConsultStates() {
    return this.get<CodeManagementDto[]>('code-management/founder-consult');
  }

  // 희망 상담 시간
  findAvailableHopeTimes() {
    return this.get<CodeManagementDto[]>('code-management/available-times');
  }
  findCompanyFounderConsultStatusList() {
    return this.get<CodeManagementDto[]>('code-management/b2b-founder-consult');
  }

  // 문의 유형
  findInquiryType() {
    return this.get<CodeManagementDto[]>('code-management/inquiry');
  }

  // 공지사항 카테고리
  findNoticeBoardType() {
    return this.get<CodeManagementDto[]>('code-management/notice-board');
  }

  // 승인 상태
  findAccountStatus() {
    return this.get<CodeManagementDto[]>('code-management/account-status');
  }
}
export default new codeManagementService();

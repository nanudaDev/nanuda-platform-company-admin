<template>
  <div v-if="companyUserDto">
    <InfoChangeDialog :dialog.sync="infoChangeDialog"></InfoChangeDialog>
    <PasswordChangeDialog
      :dialog.sync="passwordChangeDialog"
    ></PasswordChangeDialog>
    <CardWithTitle title="내 정보">
      <template v-slot:top>
        <v-btn
          color="primary"
          dark
          depressed=""
          fab
          small
          @click="infoChangeDialog = !infoChangeDialog"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
      <v-card-text>
        <ul class="u-list">
          <li v-if="companyUserDto.name">이름 : {{ companyUserDto.name }}</li>
          <li v-if="companyUserDto.phone">
            핸드폰번호: {{ companyUserDto.phone }}
          </li>
          <li v-if="companyUserDto.email">
            이메일: {{ companyUserDto.email }}
          </li>
          <li v-if="companyUserDto.authCode">
            권한 :
            <v-icon
              class="orange--text caption"
              v-if="companyUserDto.authCode == companyUserAdminRole[0]"
              >mdi-crown</v-icon
            >
            <span>{{ companyUserDto.authCode | enumTransformer }}</span>
          </li>
        </ul>
      </v-card-text>
      <v-btn
        class="primary"
        @click="passwordChangeDialog = !passwordChangeDialog"
        >비밀번호 변경</v-btn
      >
    </CardWithTitle>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { CompanyUserDto } from '@/dto/company-user/company-user.dto';
import companyUserService from '@/services/company-user.service';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import InfoChangeDialog from '@/modules/my-page/components/InfoChangeDialog.vue';
import PasswordChangeDialog from '@/modules/my-page/components/PasswordChangeDialog.vue';
import { BaseUser } from '@/services/shared/auth';
import { COMPANY_USER, CONST_COMPANY_USER } from '@/services/shared';

import { getColor } from '@/modules/_common/utils/getColor';

@Component({
  name: 'MyPage',
  components: { CardWithTitle, InfoChangeDialog, PasswordChangeDialog },
})
export default class Mypage extends BaseComponent {
  private companyUserDto = new CompanyUserDto(BaseUser);
  private infoChangeDialog = false;
  private passwordChangeDialog = false;
  private companyUserAdminRole: COMPANY_USER[] = [...CONST_COMPANY_USER];

  getColor(status) {
    return getColor(status);
  }

  getUser() {
    companyUserService.findMe().subscribe(res => {
      this.companyUserDto = res.data;
    });
  }

  created() {
    this.getUser();
  }
}
</script>

<style></style>

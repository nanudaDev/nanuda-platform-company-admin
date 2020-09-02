<template>
  <div>
    <CardWithTitle title="유저 정보">
      <v-card-text>
        <ul class="u-list">
          <li>핸드폰번호: {{ companyUserDto.phone }}</li>
          <li>이름: {{ companyUserDto.name }}</li>
          <li>이메일: {{ companyUserDto.email }}</li>
          <li v-if="companyUserDto.codeManagement">
            상태: {{ companyUserDto.codeManagement.value }}
          </li>
          <li>
            권한:
            <v-icon
              class="orange--text caption"
              v-if="companyUserDto.authCode == companyUserAdminRole[0]"
              >mdi-crown</v-icon
            >
            <span>{{ companyUserDto.authCode | enumTransformer }}</span>
          </li>
        </ul>
      </v-card-text>
    </CardWithTitle>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { CompanyUserDto } from '@/dto/company-user/company-user.dto';
import companyUserService from '@/services/company-user.service';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import { BaseUser } from '../../../services/shared/auth';
import { COMPANY_USER, CONST_COMPANY_USER } from '@/services/shared';
@Component({
  name: 'UserDetail',
  components: { CardWithTitle },
})
export default class UserDetail extends BaseComponent {
  private companyUserDto = new CompanyUserDto(BaseUser);
  private companyUserAdminRole: COMPANY_USER[] = [...CONST_COMPANY_USER];
  getUser() {
    companyUserService.findOne(this.$route.params.id).subscribe(res => {
      this.companyUserDto = res.data;
    });
  }
  created() {
    this.getUser();
  }
}
</script>

<style></style>

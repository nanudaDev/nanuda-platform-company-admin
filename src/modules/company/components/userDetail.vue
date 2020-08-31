<template>
  <div>
    <CardWithTitle title="유저 정보">
      <ul>
        <li>핸드폰번호: {{ companyUserDto.phone }}</li>
        <li>이름: {{ companyUserDto.name }}</li>
        <li>이메일: {{ companyUserDto.email }}</li>
        <li v-if="companyUserDto.codeManagement">
          상태: {{ companyUserDto.codeManagement.value }}
        </li>
        <li>권한: {{ companyUserDto.authCode }}</li>
      </ul>
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
@Component({
  name: 'UserDetail',
  components: { CardWithTitle },
})
export default class UserDetail extends BaseComponent {
  private companyUserDto = new CompanyUserDto(BaseUser);

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

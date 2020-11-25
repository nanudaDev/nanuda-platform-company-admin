<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" @click:outside="reset()">
      <v-card>
        <v-card-title>
          <span class="headline">유저 정보 변경 신청</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="이름*"
                  required
                  v-model="companyUserDto.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="핸드폰번호*"
                  required
                  v-model="companyUserDto.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  label="Email"
                  v-model="companyUserDto.email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <div class="mb-3"><small>*는 필수값입니다</small></div>
          <ApprovalStatusChangeInfoText />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset()">Close</v-btn>
          <v-btn
            :disabled="!isInputChanged"
            color="blue darken-1"
            text
            @click="requestChange()"
            :loading="loading"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop } from 'vue-property-decorator';
import { CompanyUserDto } from '@/dto/company-user/company-user.dto';
import { BaseUser } from '../../../services/shared/auth';
import companyUserService from '../../../services/company-user.service';
import store from '@/store';
import { APPROVAL_STATUS } from '@/services/shared';
import jwtStorageService from '@/services/shared/auth/jwt-storage.service';
import ApprovalStatusChangeInfoText from '@/modules/_common/components/info-text/ApprovalStatusChangeInfoText.vue';
@Component({
  name: 'infoChangeDialog',
  components: { ApprovalStatusChangeInfoText },
})
export default class InfoChangeDialog extends BaseComponent {
  private companyUserDto = new CompanyUserDto(BaseUser);
  private loading = false;
  private originalCompanyUserDto = {};
  @Prop() readonly dialog: boolean;

  get isInputChanged() {
    // dto가 원래데이터와 다르면 true return else return false
    if (
      JSON.stringify(this.originalCompanyUserDto) ==
      JSON.stringify(this.companyUserDto)
    ) {
      return false;
    } else {
      return true;
    }
  }

  reset() {
    // this.userAddDialog = false;
    this.$emit('update:dialog', !this.dialog);
    this.loading = false;
    this.getMyInfo();
  }
  getMyInfo() {
    companyUserService.findMe().subscribe(res => {
      this.companyUserDto = res.data;
      this.originalCompanyUserDto = { ...this.companyUserDto };
    });
  }
  requestChange() {
    this.loading = true;
    companyUserService.change(this.companyUserDto).subscribe(res => {
      if (res) {
        companyUserService.getTokenById().subscribe(res => {
          jwtStorageService.setToken(res.data.token);
          this.reset();
          this.$toasted.global.custom_success({
            message: '정보 변경 신청 성공!',
          });
        });
      }
      this.loading = false;
    });
  }
  created() {
    this.getMyInfo();
  }
}
</script>

<style></style>

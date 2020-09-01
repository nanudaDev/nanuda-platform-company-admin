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
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset()">Close</v-btn>
          <v-btn
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
import { BaseUser, GetTokenByPhoneNoDto } from '../../../services/shared/auth';
import companyUserService from '../../../services/company-user.service';
import store from '@/store';
import { APPROVAL_STATUS } from '@/services/shared';
@Component({
  name: 'PasswordChangeDialog',
})
export default class PasswordChangeDialog extends BaseComponent {
  private getTokenByPhoneNoDto = new GetTokenByPhoneNoDto();
  private loading = false;

  @Prop() readonly dialog: boolean;

  reset() {
    // this.userAddDialog = false;
    this.$emit('update:dialog', !this.dialog);
    this.loading = false;
  }

  requestChange() {
    this.loading = true;
  }
}
</script>

<style></style>

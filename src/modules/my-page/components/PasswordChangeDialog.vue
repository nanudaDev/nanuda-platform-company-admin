<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="400px" @click:outside="reset()">
      <v-card>
        <v-card-title>
          <span class="headline">비밀번호 변경</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row v-show="!isPasswordValidated">
              <v-col cols="8">
                <v-text-field
                  v-model="validatePasswordDto.password"
                  label="기존 비밀번호"
                  :type="showOldPassword ? 'text' : 'password'"
                  :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showOldPassword = !showOldPassword"
                  v-on:keyup.enter="validatePassword()"
                  :autofocus="isOldPasswordFocused"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  class="primary"
                  :loading="confirmPasswordLoading"
                  @click="validatePassword()"
                  >확인</v-btn
                >
              </v-col>
            </v-row>
            <v-row v-show="isPasswordValidated">
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="updatePasswordDto.password"
                    label="새로운 비밀번호"
                    :type="showNewPassword ? 'text' : 'password'"
                    :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showNewPassword = !showNewPassword"
                    hint="6자리 이상"
                    :autofocus="isNewPasswordFocused"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="updatePasswordDto.passwordConfirm"
                    label="새로운 비밀번호 확인"
                    :type="showNewPasswordConfirm ? 'text' : 'password'"
                    :append-icon="
                      showNewPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append="
                      showNewPasswordConfirm = !showNewPasswordConfirm
                    "
                    v-on:keyup.enter="updatePassword()"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn
                    class="primary"
                    :loading="updatePasswordLoading"
                    @click="updatePassword()"
                    :disabled="!(isNewPasswordMatched && passwordLength > 5)"
                    >확인</v-btn
                  >
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset()">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop, Watch } from 'vue-property-decorator';
import authService from '@/services/shared/auth/auth.service';
import store from '@/store';
import { APPROVAL_STATUS } from '@/services/shared';
import { ChangePasswordDto } from '@/services/shared/auth';
@Component({
  name: 'PasswordChangeDialog',
})
export default class PasswordChangeDialog extends BaseComponent {
  private confirmPasswordLoading = false;
  private updatePasswordLoading = false;
  private showOldPassword = false;
  private showNewPassword = false;
  private showNewPasswordConfirm = false;
  private validatePasswordDto = new ChangePasswordDto();
  private updatePasswordDto = new ChangePasswordDto();
  private isPasswordValidated = false;
  private isOldPasswordFocused = false;
  private isNewPasswordFocused = false;
  @Prop() readonly dialog: boolean;

  get isNewPasswordMatched() {
    if (
      this.updatePasswordDto.password === this.updatePasswordDto.passwordConfirm
    ) {
      return true;
    } else {
      return false;
    }
  }
  get passwordLength() {
    if (this.updatePasswordDto.password) {
      return this.updatePasswordDto.password.length;
    } else {
      return 0;
    }
  }

  @Watch('dialog')
  onDialogChanged() {
    if (this.dialog) {
      this.isOldPasswordFocused = true;
    }
  }

  reset() {
    // this.userAddDialog = false;
    this.$emit('update:dialog', !this.dialog);
    this.isPasswordValidated = false;
    this.confirmPasswordLoading = false;
    this.updatePasswordLoading = false;
    this.validatePasswordDto = new ChangePasswordDto();
    this.updatePasswordDto = new ChangePasswordDto();
  }
  validatePassword() {
    this.confirmPasswordLoading = true;
    authService.validatePassword(this.validatePasswordDto).subscribe(res => {
      if (res) {
        this.confirmPasswordLoading = false;
        this.isPasswordValidated = res.data.isValidated;
        this.isNewPasswordFocused = true;
      } else {
        this.confirmPasswordLoading = false;
      }
    });
  }
  updatePassword() {
    this.updatePasswordLoading = true;
    authService.updatePassword(this.updatePasswordDto).subscribe(res => {
      if (res) {
        this.$toasted.global.custom_success({ message: '수정 성공!' });
        this.reset();
      }
    });
  }
}
</script>

<style></style>

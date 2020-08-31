<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">
            <v-toolbar color="orange" dark flat>
              <v-toolbar-title
                class="black--text title text-h5 font-weight-bold"
                >NND</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="py-5 px-5">
              <div class="form-wrap">
                <div
                  v-if="!codeCorrect"
                  class="form-row no-gutters align-items-center"
                >
                  <div class="input-field">
                    <v-text-field
                      outlined
                      label="휴대폰 번호"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="registerSMSCodeDto.phone"
                      hide-details
                      autofocus
                      dense
                      v-on:keyup.enter="getSMSCode()"
                      ref="phoneNoInput"
                    ></v-text-field>
                  </div>
                  <div class="btn-wrap">
                    <v-btn
                      color="primary"
                      @click="getSMSCode()"
                      :disabled="isGetCodeBtnDisabled"
                      style="max-width:100%"
                      :loading="phoneNoLoading"
                      >{{
                        isGetCodeBtnDisabled ? time : '인증번호 받기'
                      }}</v-btn
                    >
                  </div>
                </div>
                <div
                  v-if="codeSent && !codeCorrect"
                  class="form-row no-gutters align-items-center"
                >
                  <div class="input-field">
                    <v-text-field
                      outlined
                      label="인증 번호"
                      placeholder="6자리 숫자"
                      name="login"
                      prepend-icon="mdi-lock"
                      type="text"
                      v-model="checkSMSCodeDto.authCode"
                      hide-details
                      dense
                      ref="authNoInput"
                      v-on:keyup.enter="checkSMSCode()"
                    ></v-text-field>
                  </div>
                  <div class="btn-wrap">
                    <v-btn
                      color="primary"
                      @click="checkSMSCode()"
                      style="max-width:100%"
                      :loading="authNoLoading"
                      >인증번호 확인</v-btn
                    >
                  </div>
                </div>
                <div
                  class="form-row no-gutters align-items-center"
                  v-if="codeCorrect"
                >
                  <div class="input-field">
                    <v-text-field
                      outlined
                      id="password"
                      label="비밀번호"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="signinDto.password"
                      hide-details
                      dense
                      v-on:keyup.enter="signIn()"
                      ref="passwordInput"
                    ></v-text-field>
                  </div>
                  <div class="btn-wrap">
                    <v-btn
                      color="primary"
                      @click="signIn()"
                      :loading="passwordLoading"
                      >로그인</v-btn
                    >
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="primary" @click="getSMSCode">인증번호 받기</v-btn> -->
            </v-card-actions>
          </v-card>
          <p class="mt-5 small text-center">
            © 2020 The Great Trading Company, Ltd. All Rights Reserved.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import AuthService from '@/services/shared/auth/auth.service';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { throttleTime } from 'rxjs/operators';
import {
  SigninDto,
  CheckSMSCodeDto,
  RegisterSMSCodeDto,
} from '@/services/shared/auth';

@Component
export default class Login extends BaseComponent {
  private signinDto: SigninDto = new SigninDto();
  private checkSMSCodeDto: CheckSMSCodeDto = new CheckSMSCodeDto();
  private registerSMSCodeDto: RegisterSMSCodeDto = new RegisterSMSCodeDto();
  private codeCorrect = false;
  private codeSent = false;
  private isGetCodeBtnDisabled = false;
  private time = 30;
  private phoneNoLoading = false;
  private authNoLoading = false;
  private passwordLoading = false;
  private clearOut() {
    this.signinDto = new SigninDto();
    this.checkSMSCodeDto = new CheckSMSCodeDto();
    this.registerSMSCodeDto = new RegisterSMSCodeDto();
  }
  @Watch('registerSMSCodeDto', { deep: true })
  registerDtoChanged() {
    this.checkSMSCodeDto.phone = this.registerSMSCodeDto.phone;
    this.signinDto.phone = this.checkSMSCodeDto.phone;
  }

  // sign in for user
  signIn() {
    this.passwordLoading = true;
    AuthService.signin(this.signinDto).subscribe(res => {
      this.passwordLoading = false;
      if (!res) {
        this.signinDto.password = '';
      } else {
        JwtStorageService.setToken(res.data);
        this.$router.push('/dashboard');
      }
    });
  }
  countDownTimer() {
    if (this.time > 0) {
      setTimeout(() => {
        this.time -= 1;
        this.countDownTimer();
      }, 1000);
    }
  }
  getSMSCode() {
    this.phoneNoLoading = true;
    AuthService.getSMSCode(this.registerSMSCodeDto).subscribe(res => {
      this.phoneNoLoading = false;
      if (res) {
        this.time = 30;
        this.codeSent = true;
        this.isGetCodeBtnDisabled = true;
        setTimeout(() => {
          this.isGetCodeBtnDisabled = false;
        }, this.time * 1000);
        this.countDownTimer();
        this.$nextTick(() => this.$refs.authNoInput.focus());
      }
    });
  }
  checkSMSCode() {
    this.authNoLoading = true;
    AuthService.checkSMSCode(this.checkSMSCodeDto).subscribe(res => {
      this.authNoLoading = false;
      if (res) {
        this.codeCorrect = res.data as boolean;
        this.$nextTick(() => this.$refs.passwordInput.focus());
      } else {
        this.checkSMSCodeDto.authCode = '';
      }
    });
  }
  mounted() {
    // console.log(this.isLoggedIn);
    this.clearOut();
    this.$nextTick(() => {
      this.$refs.phoneNoInput.focus();
    });
  }
}
</script>
<style lang="scss">
.form-wrap {
  .form-row {
    + .form-row {
      margin-top: 1.5rem;
    }
  }
  .input-field {
    width: calc(100% - 140px);
  }
  .btn-wrap {
    width: 130px;
    margin-left: 10px;
    .v-btn {
      width: 100%;
    }
  }
}

@media screen and (max-width: 560px) {
  .form-wrap {
    .input-field {
      width: 100%;
    }
    .btn-wrap {
      width: 100%;
      margin-top: 1rem;
    }
  }
}
</style>

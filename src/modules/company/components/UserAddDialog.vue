<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" @click:outside="reset()">
      <v-card>
        <v-card-title>
          <span class="headline">유저 정보</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="이름*"
                  required
                  v-model="companyUserCreateDto.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="핸드폰번호*"
                  required
                  v-model="companyUserCreateDto.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="비밀번호*"
                  type="password"
                  required
                  v-model="companyUserCreateDto.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="비밀번호 확인*"
                  type="password"
                  required
                  v-model="companyUserCreateDto.passwordConfirm"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  label="Email"
                  v-model="companyUserCreateDto.email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="add()" :loading="loading"
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
import { CompanyUserCreateDto } from '@/dto/company-user/company-user-create.dto';
import { BaseUser } from '../../../services/shared/auth';
import companyUserService from '../../../services/company-user.service';
@Component({
  name: 'UserAddDialog',
})
export default class UserAddDialog extends BaseComponent {
  private companyUserCreateDto = new CompanyUserCreateDto(BaseUser);
  private loading = false;

  @Prop({ required: true }) readonly dialog: boolean;

  reset() {
    console.log('reset');
    // this.userAddDialog = false;
    this.$emit('update:dialog', !this.dialog);
    this.loading = false;
    this.companyUserCreateDto = new CompanyUserCreateDto(BaseUser);
  }
  add() {
    this.loading = true;
    companyUserService.create(this.companyUserCreateDto).subscribe(
      res => {
        this.loading = false;
        this.reset();
        console.log(res);
        this.$emit('added');
      },
      err => {
        this.loading = false;
        console.log('에러입니당', err);
      },
    );
  }
}
</script>

<style></style>

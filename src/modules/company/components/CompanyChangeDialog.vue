<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="600px"
      @click:outside="reset()"
    >
      <v-card>
        <v-card-title>
          <span class="headline">업체 정보 변경</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row align="center" justify="center">
              <div
                v-if="
                  companyDto.logo && companyDto.logo.length > 0 && !logoChanged
                "
                class="my-3"
              >
                <div
                  v-for="logo in companyDto.logo"
                  :key="logo.endpoint"
                  style="background-color: white;"
                >
                  <v-img :src="logo.endpoint" max-width="100"></v-img>
                </div>
              </div>
              <div v-if="logo && logo.length > 0 && logoChanged" class="my-3">
                <div v-for="newLogo in logo" :key="newLogo.endpoint">
                  <v-img :src="newLogo.endpoint" max-width="100"></v-img>
                </div>
              </div>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="업체명*"
                  required
                  v-model="companyDto.nameKr"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="대표자명*"
                  required
                  v-model="companyDto.ceoKr"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="주소*"
                  required
                  v-model="companyDto.address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="전화번호*"
                  required
                  v-model="companyDto.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  label="이메일"
                  v-model="companyDto.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  label="FAX"
                  v-model="companyDto.fax"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  label="웹사이트"
                  v-model="companyDto.website"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-file-input
                  label="로고 변경"
                  @change="upload($event)"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*는 필수값입니다</small>
          <ApprovalStatusChangeInfoText />
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
import { CompanyDto } from '@/dto/company/company.dto';
import { BaseUser } from '../../../services/shared/auth';
import companyService from '../../../services/company.service';
import fileUploadService, {
  UPLOAD_TYPE,
} from '../../../services/shared/file-upload/file-upload.service';
import {
  FileAttachmentDto,
  ATTACHMENT_REASON_TYPE,
} from '../../../services/shared/file-upload';
import ApprovalStatusChangeInfoText from '@/modules/_common/components/info-text/ApprovalStatusChangeInfoText.vue';
import jwtStorageService from '@/services/shared/auth/jwt-storage.service';
import companyUserService from '../../../services/company-user.service';
@Component({
  name: 'CompanyChangeDialog',
  components: { ApprovalStatusChangeInfoText },
})
export default class CompanyChangeDialog extends BaseComponent {
  private companyDto = new CompanyDto();
  private loading = false;
  private logoChanged = false;
  private logo: FileAttachmentDto[] = [];

  @Prop() readonly dialog: boolean;

  reset() {
    // this.userAddDialog = false;
    this.$emit('update:dialog', !this.dialog);
    this.loading = false;
    this.logo = [];
    this.logoChanged = false;
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    companyService.findOne().subscribe(res => {
      this.companyDto = res.data;
    });
  }

  async upload(event: File) {
    const attachments = await fileUploadService.upload(
      UPLOAD_TYPE.COMPANY_LOGO,
      [event],
    );
    this.logo.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
    this.logoChanged = true;
  }

  requestChange() {
    if (this.logo && this.logo.length > 0) {
      this.companyDto.logo = this.logo;
    } else {
      delete this.companyDto.logo;
    }
    this.loading = true;
    companyService.change(this.companyDto).subscribe(res => {
      if (res) {
        companyUserService.getTokenById().subscribe(res => {
          this.loading = false;
          jwtStorageService.setToken(res.data.token);
          this.reset();
          this.$emit('requested');
          this.$toasted.global.custom_success({
            message: '정보 변경 신청 성공!',
          });
        });
      } else {
        this.loading = false;
      }
    });
  }

  created() {
    this.getCompanyInfo();
  }
}
</script>

<style></style>

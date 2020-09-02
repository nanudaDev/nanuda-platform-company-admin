<template>
  <v-dialog v-model="dialog" max-width="500" @click:outside="reset()">
    <v-card class="pa-5">
      <v-card-title class="headline">문의하기</v-card-title>
      <v-select
        placeholder="타입선택"
        :items="QNASelectionList"
        item-value="key"
        item-text="value"
        v-model="QNACreateDto.inquiryType"
      ></v-select>
      <v-text-field
        placeholder="제목"
        v-model="QNACreateDto.title"
      ></v-text-field>
      <v-textarea
        label="내용"
        v-model="QNACreateDto.content"
        auto-grow
      ></v-textarea>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="reset()">
          취소
        </v-btn>
        <v-btn color="green darken-1" text @click="add()" :loading="loading">
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop } from 'vue-property-decorator';
import QNAService from '@/services/qna.service';
import { QNACreateDto } from '@/dto/qna';
import { CONST_INQUIRY_TYPE } from '@/services/shared/common-code.type';
import codeManagementService from '@/services/init/code-management.service';
import { CodeManagementDto } from '@/services/init/dto';
@Component({
  name: 'QNAddDialog',
})
export default class QNAddDialog extends BaseComponent {
  @Prop({ required: true }) readonly dialog: boolean;
  private loading = false;
  private QNACreateDto = new QNACreateDto();
  private QNASelectionList: CodeManagementDto[] = [];

  add() {
    this.loading = true;
    QNAService.create(this.QNACreateDto).subscribe(
      res => {
        this.loading = false;
        this.reset();
        this.$emit('added');
      },
      err => {
        this.loading = false;
      },
    );
  }
  reset() {
    // this.userAddDialog = false;
    this.$emit('update:dialog', !this.dialog);
    this.loading = false;
    this.QNACreateDto = new QNACreateDto();
  }
  toggle() {
    this.$emit('update:dialog', !this.dialog);
  }
  getInquiryTypeList() {
    codeManagementService.findInquiryType().subscribe(res => {
      this.QNASelectionList = res.data;
    });
  }
  created() {
    this.getInquiryTypeList();
  }
}
</script>
<style></style>

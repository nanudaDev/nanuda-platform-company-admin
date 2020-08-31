<template>
  <v-dialog v-model="dialog" max-width="500" @click:outside="toggle()">
    <v-card class="pa-5">
      <v-card-title class="headline">리플 수정</v-card-title>
      <v-textarea label="내용" v-model="QNAReplyDto.content"></v-textarea>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="toggle()">
          취소
        </v-btn>
        <v-btn color="green darken-1" :loading="loading" text @click="change()">
          수정
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop, Watch } from 'vue-property-decorator';
import QNAService from '@/services/qna.service';
import { QNAReplyCreateDto, QNAReplyDto } from '@/dto/qna';
import { CONST_INQUIRY_TYPE } from '@/services/shared/common-code.type';
@Component({
  name: 'ReplyChangeDialog',
})
export default class ReplyChangeDialog extends BaseComponent {
  @Prop({ required: true }) readonly dialog: boolean;
  @Prop() readonly QNAid: number;
  @Prop() readonly replyNo: number;
  private loading = false;
  private QNAReplyDto = new QNAReplyDto();
  private QNAReplyCreateDto = new QNAReplyCreateDto();

  @Watch('dialog')
  replyNoChanged() {
    this.getReply();
  }
  get QNAReplyChangeDto() {
    this.QNAReplyCreateDto = this.QNAReplyDto;
    return this.QNAReplyCreateDto;
  }
  getReply() {
    console.log('getReply');
    QNAService.getReply(this.QNAid, this.replyNo).subscribe(res => {
      console.log('res', res);
      this.QNAReplyDto = res.data;
    });
  }
  change() {
    this.loading = true;
    QNAService.changeReply(
      this.QNAid,
      this.replyNo,
      this.QNAReplyChangeDto,
    ).subscribe(res => {
      this.loading = false;
      if (res) {
        console.log('res', res);
        this.toggle();
        this.$emit('changed');
        this.$toasted.global.custom_success({ message: '수정 성공!' });
      }
    });
  }
  // reset() {
  //   console.log('reset');
  //   // this.userAddDialog = false;
  //   this.$emit('update:dialog', !this.dialog);
  //   this.loading = false;
  //   this.QNAReplyCreateDto = new QNAReplyCreateDto();
  // }
  toggle() {
    this.$emit('update:dialog', !this.dialog);
  }
  created() {
    this.getReply();
  }
}
</script>
<style></style>

<template>
  <v-container ref="container" id="container">
    <ReplyChangeDialog
      v-if="selectedReply"
      :dialog.sync="changeDialog"
      :QNAid="$route.params.id"
      :replyNo="selectedReply.no"
      @changed="getReply()"
    ></ReplyChangeDialog>
    <v-card class="pa-5">
      <div class="text-center ma-5">
        <v-progress-circular
          v-if="QNAContentLoading"
          rotate
          color="orange"
          size="50"
          width="4"
          indeterminate
        >
        </v-progress-circular>
      </div>
      <div v-if="!QNAContentLoading">
        <v-card-title>{{ QNADto.title }}</v-card-title>
        <v-row>
          <v-col>
            <v-card-subtitle
              >작성자: {{ QNADto.companyUser.name }}</v-card-subtitle
            >
          </v-col>
          <v-col>
            <v-card-subtitle
              >작성일:
              {{
                $moment(QNADto.createdAt).format('YYYY.MM.DD - h:mm a')
              }}</v-card-subtitle
            >
          </v-col>
        </v-row>
        <v-card-text>{{ QNADto.content }}</v-card-text>
      </div>
    </v-card>
    <v-row justify="center">
      <v-btn
        @click="pagination.limit += 20"
        class="ma-5 primary"
        v-if="replyCount > pagination.limit"
        >더보기</v-btn
      >
    </v-row>
    <div class="text-center ma-5">
      <v-progress-circular
        v-if="replyLoading"
        rotate
        color="orange"
        size="50"
        width="4"
        indeterminate
      >
      </v-progress-circular>
    </div>
    <div v-for="reply in replyList" :key="reply.no">
      <!-- ******************업체 유저 코멘트****************************** -->
      <v-row v-if="reply.companyUser">
        <v-col cols="12">
          <v-row justify="end" align="end">
            <v-col>
              <v-row
                justify="end"
                v-if="store.state.myName === reply.companyUser.name"
              >
                <v-btn
                  color="primary"
                  dark
                  fab
                  x-small
                  @click="onChangeReplyBtn(reply)"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </v-row>
              <v-row justify="end">
                <p>
                  {{ $moment(reply.createdAt).format('YYYY.MM.DD - h:mm a') }}
                </p>
              </v-row>
              <v-row justify="end" v-if="reply.isEdited === 'Y'">
                <small>edited</small>
              </v-row>
            </v-col>
            <v-card class="ma-3 pa-3" max-width="700">
              <v-card-text class="heading-2 text--primary">
                {{ reply.content }}
              </v-card-text>
            </v-card>

            <v-avatar color="indigo" size="55">
              <span class="white--text">{{ reply.companyUser.name }}</span>
            </v-avatar>
          </v-row>
        </v-col>
      </v-row>
      <!-- ******************나누다 직원 코멘트****************************** -->
      <v-row v-else align="end">
        <v-avatar color="orange" size="55">
          <span class="white--text">NND</span>
        </v-avatar>
        <v-card class="ma-3 pa-3" max-width="700">
          <v-card-text class="heading-2 text--primary">
            {{ reply.content }}
          </v-card-text>
        </v-card>
        <v-col>
          <v-row>
            <p>
              {{ $moment(reply.createdAt).format('YYYY.MM.DD - h:mm a') }}
            </p>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row class="mt-5" align="center">
      <v-text-field
        placeholder="댓글달기"
        outlined
        hide-details="auto"
        v-model="QNAReplyCreateDto.content"
        v-on:keyup.enter="addReply()"
        class="mr-5"
      ></v-text-field>

      <v-btn class="primary" large @click="addReply()" :loading="addBtnLoading"
        >확인</v-btn
      >
    </v-row>
  </v-container>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Watch } from 'vue-property-decorator';
import QNAService from '@/services/qna.service';
import { QNADto } from '@/dto/qna';
import { QNAReplyDto, QNAReplyCreateDto } from '../../../dto/qna';
import { Pagination } from '../../../core';
import ReplyChangeDialog from './ReplyChangeDialog.vue';
import store from '@/store';
@Component({
  name: 'QNADetail',
  components: { ReplyChangeDialog },
})
export default class QNADetail extends BaseComponent {
  private QNADto = new QNADto();
  private replyList: QNAReplyDto[] = [];
  private QNAReplyCreateDto = new QNAReplyCreateDto();
  private pagination = new Pagination();
  private changeDialog = false;
  private selectedReply = null;
  private store = store;
  private replyCount = null;
  private replyLoading = false;
  private QNAContentLoading = false;
  private addBtnLoading = false;

  // @Watch('replyList', {
  //   deep: true,
  // })
  // replyListChanged() {
  //   this.scrollToEnd();
  // }
  @Watch('pagination', {
    deep: true,
  })
  paginationChanged() {
    this.getReply();
  }
  getDetail() {
    this.QNAContentLoading = true;
    QNAService.findOne(this.$route.params.id).subscribe(res => {
      console.log('res', res);
      this.QNADto = res.data;
      this.QNAContentLoading = false;
    });
  }
  getReply() {
    this.replyLoading = true;
    QNAService.findAllReply(this.$route.params.id, this.pagination).subscribe(
      res => {
        console.log('reply', res);
        this.replyList = res.data.items.reverse();
        this.replyCount = res.data.totalCount;
        this.replyLoading = false;
      },
    );
  }
  onChangeReplyBtn(reply) {
    console.log('reply', reply);
    this.selectedReply = reply;
    this.changeDialog = !this.changeDialog;
  }
  createReply() {
    this.addBtnLoading = true;
    QNAService.createReply(
      this.$route.params.id,
      this.QNAReplyCreateDto,
    ).subscribe(res => {
      console.log('res', res);
      this.addBtnLoading = false;
      this.QNAReplyCreateDto = new QNAReplyCreateDto();
      this.getReply();
    });
  }
  addReply() {
    this.createReply();
    this.scrollToEnd();
  }
  scrollToEnd() {
    console.log('scrollToEnd');
    this.$nextTick(() => {
      window.scrollTo(0, 99999);
    });
  }
  async init() {
    this.getDetail();
    const res = await this.getReply();
    this.scrollToEnd();
  }
  created() {
    this.init();
  }
}
</script>
<style></style>

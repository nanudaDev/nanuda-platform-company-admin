<template>
  <v-container ref="container" id="container">
    <ReplyChangeDialog
      v-if="selectedReply"
      :dialog.sync="changeDialog"
      :QNAid="$route.params.id"
      :replyNo="selectedReply.no"
      @changed="getReply()"
    ></ReplyChangeDialog>
    <v-card class="pa-5" flat>
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
        <h4>{{ QNADto.title }}</h4>
        <div class="text-right">
          <span class="caption">{{ QNADto.companyUser.name }}</span>
          <span class="caption mx-2">|</span>
          <span class="caption">
            {{ $moment(QNADto.createdAt).format('YYYY.MM.DD - h:mm a') }}</span
          >
        </div>
        <div>{{ QNADto.content }}</div>
      </div>
    </v-card>
    <v-row no-gutters justify="center">
      <v-btn
        @click="pagination.limit += 20"
        class="ma-5 primary"
        v-if="replyCount > pagination.limit"
        >이전 내용 더보기</v-btn
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
      <v-container>
        <!-- ******************업체 유저 코멘트****************************** -->
        <v-row v-if="reply.companyUser">
          <v-col cols="12">
            <v-row no-gutters justify="end" align="end">
              <v-col class="mr-2">
                <v-row
                  justify="end"
                  v-if="store.state.myName === reply.companyUser.name"
                >
                  <v-btn
                    color="primary"
                    dark
                    fab
                    depressed
                    x-small
                    @click="onChangeReplyBtn(reply)"
                  >
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-row>
                <v-row justify="end">
                  <p class="caption m-0">
                    <small v-if="reply.isEdited === 'Y'" class="indigo--text"
                      >(edited)</small
                    >
                    {{ $moment(reply.createdAt).format('YYYY.MM.DD - h:mm a') }}
                  </p>
                </v-row>
              </v-col>
              <v-card flat class="mx-3" max-width="700">
                <v-card-text class="heading-2 text--primary">
                  {{ reply.content }}
                </v-card-text>
              </v-card>
              <v-avatar color="indigo" size="60">
                <span class="white--text">{{ reply.companyUser.name }}</span>
              </v-avatar>
            </v-row>
          </v-col>
        </v-row>
        <!-- ******************나누다 직원 코멘트****************************** -->
        <v-row no-gutters v-else align="end">
          <v-avatar color="orange" size="60">
            <span class="white--text">NND</span>
          </v-avatar>
          <v-card flat class="mx-3" max-width="700">
            <v-card-text class="heading-2 text--primary">
              {{ reply.content }}
            </v-card-text>
          </v-card>
          <v-col class="ml-2">
            <v-row>
              <p class="caption mb-0">
                {{ $moment(reply.createdAt).format('YYYY.MM.DD - h:mm a') }}
              </p>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-card class="pa-5 mt-5" flat>
      <v-container>
        <v-row align="center">
          <v-text-field
            placeholder="댓글달기"
            outlined
            dense
            hide-details="auto"
            v-model="QNAReplyCreateDto.content"
            v-on:keyup.enter="addReply()"
            class="mr-5"
          ></v-text-field>

          <v-btn class="primary" @click="addReply()" :loading="addBtnLoading"
            >확인</v-btn
          >
        </v-row>
      </v-container>
    </v-card>
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
      this.QNADto = res.data;
      this.QNAContentLoading = false;
    });
  }
  getReply() {
    this.replyLoading = true;
    QNAService.findAllReply(this.$route.params.id, this.pagination).subscribe(
      res => {
        this.replyList = res.data.items.reverse();
        this.replyCount = res.data.totalCount;
        this.replyLoading = false;
      },
    );
  }
  onChangeReplyBtn(reply) {
    this.selectedReply = reply;
    this.changeDialog = !this.changeDialog;
  }
  createReply() {
    this.addBtnLoading = true;
    QNAService.createReply(
      this.$route.params.id,
      this.QNAReplyCreateDto,
    ).subscribe(res => {
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

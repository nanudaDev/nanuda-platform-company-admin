<template>
  <section>
    <v-card
      flat
      class="p-3 px-lg-8 py-lg-6 mb-4 rounded"
      v-on:keyup.enter="getList()"
    >
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            label="카테고리"
            outlined
            placeholder="전체"
            :items="noticeBoardTypeSelect"
            item-value="key"
            item-text="value"
            v-model="noticeBoardSearchDto.noticeBoardType"
            hide-details
            clearable
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            label="제목"
            placeholder=" "
            outlined
            dense
            v-model="noticeBoardSearchDto.title"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="text-center mt-4">
        <v-btn color="indigo" dark class="mx-2" @click="reset()">
          <span class="caption">초기화</span>
        </v-btn>
        <v-btn color="success" dark class="mx-2" @click="search()">
          <span class="caption">검색</span>
        </v-btn>
      </div>
    </v-card>
    <CommonTable
      :headers="headers"
      :items="noticeBoardList"
      :pagination="pagination"
      :dataLoading="loading"
      :listCount="noticeBoradListCount"
      @rowClicked="toSelectedItemPage"
      @paginationChanged="getList()"
    ></CommonTable>
  </section>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Watch } from 'vue-property-decorator';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
import noticeboardService from '@/services/notice-board.service';
import { Pagination } from '@/common/interfaces/pagination.type';
import { NoticeBoardDto, NoticeBoardSearchDto } from '@/dto/notice-board';
import { NOTICE_BOARD_TYPE, CONST_NOTICE_BOARD_TYPE } from '@/services/shared';
import codeManagementService from '@/services/init/code-management.service';
import { CodeManagementDto } from '@/services/init/dto';

@Component({
  name: 'NoticeBoard',
  components: { CommonTable },
})
export default class Contracts extends BaseComponent {
  private pagination = new Pagination();
  private noticeBoardList: NoticeBoardDto[] = [];
  private noticeBoradListCount = null;
  private noticeBoardSearchDto = new NoticeBoardSearchDto();
  private loading = false;
  private noticeBoardTypeSelect: CodeManagementDto[] = [];
  private headers = [
    {
      text: '문의유형',
      value: 'codeManagement.value',
      align: 'center',
    },
    {
      text: '제목',
      value: 'title',
      align: 'left',
    },
    {
      text: '생성일',
      value: 'createdAt',
      align: 'center',
    },
  ];

  toSelectedItemPage(value) {
    this.$router.push(`/notice-board/${value.no}`);
  }

  getNoticeBoardType() {
    codeManagementService.findNoticeBoardType().subscribe(res => {
      if (res) {
        this.noticeBoardTypeSelect = res.data;
      }
    });
  }

  getList() {
    this.loading = true;
    noticeboardService
      .findAll(this.noticeBoardSearchDto, this.pagination)
      .subscribe(res => {
        this.noticeBoardList = res.data.items;
        this.noticeBoradListCount = res.data.totalCount;
        this.loading = false;
      });
  }

  search() {
    this.getList();
  }

  reset() {
    this.noticeBoardSearchDto = new NoticeBoardSearchDto();
    this.getList();
  }

  created() {
    this.getList();
    this.getNoticeBoardType();
  }
  activated() {
    this.getList();
  }
}
</script>

<style></style>

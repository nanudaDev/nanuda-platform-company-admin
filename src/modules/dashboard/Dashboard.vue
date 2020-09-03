<template>
  <div>
    <v-row justify="center" height="100">
      <!-- <v-col>
          <CardWithTitle title="월간 신청 추이">
            <LineChart
              :chartData="dashboardDto"
              :options="lineOption()"
            ></LineChart>
          </CardWithTitle>
      </v-col>-->
      <v-col cols="12" class="my-3">
        <v-row no-gutters justify="space-between" align="center" class="px-3">
          <div>
            <h5 class="mb-0">최신 공지 사항</h5>
          </div>
          <div>
            <v-btn
              fab
              depressed
              small
              color="grey"
              dark
              @click="$router.push('/notice-board')"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-row>
        <CommonTable
          :dataLoading="noticeLoading"
          :headers="noticeBoardHeader"
          :items="noticeList"
          :pagination="noticePagination"
          @rowClicked="toSelectedNoticePage"
          @paginationChanged="getNoticeList()"
          :showPagination="false"
        >
        </CommonTable>
      </v-col>
      <v-col cols="12" class="my-3">
        <v-row no-gutters justify="space-between" align="center" class="px-3">
          <div>
            <h5 class="mb-0">최신 신청</h5>
          </div>
          <div>
            <v-btn
              fab
              depressed
              small
              color="grey"
              dark
              @click="$router.push('/founder-consult')"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-row>
        <CommonTable
          :dataLoading="recentLoading"
          :headers="founderConsultHeaders"
          :items="founderConsultList"
          :pagination="consultPagination"
          @rowClicked="toSelectedItemPage"
          :showPagination="false"
        ></CommonTable>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import dashboardService from '@/services/dashboard.service';
import { DashboardDto, NoticeBoardDto } from '@/dto/dashboard';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
import { FounderConsultDto } from '@/dto/founder-consult';

import founderConsultService from '@/services/founder-consult.service';
import { Pagination } from '@/common/interfaces/pagination.type';
import noticeBoardService from '@/services/notice-board.service';
import FounderConsultMixin from '@/mixins/founder-consult.mixin';
@Component({
  name: 'Dashboard',
  components: { CardWithTitle, CommonTable },
})
export default class Dashboard extends Mixins(FounderConsultMixin) {
  private dashboardDto = new DashboardDto();
  private founderConsultList: FounderConsultDto[] = [];
  private noticePagination = new Pagination(5);
  private consultPagination = new Pagination(5);
  private noticeListCount = null;
  private noticeList: NoticeBoardDto[] = [];
  private noticeLoading = false;
  private recentLoading = false;
  private noticeBoardHeader = [
    { text: '공지사항 종류', value: 'codeManagement.value', align: 'center' },
    {
      text: '제목',
      value: 'title',
      align: 'center',
    },
    {
      text: '작성일',
      value: 'createdAt',
      align: 'center',
    },
  ];
  private founderConsultHeaders = [
    // TODO: 공간타입 식당형 배달형
    // {
    //   text: '공간타입',
    //   value: 'space.spaceTypeNo',
    //   align: 'center',
    // },
    {
      text: 'no',
      value: 'no',
      align: 'center',
    },
    {
      text: '이름',
      value: 'nanudaUser.name',
      align: 'center',
    },
    {
      text: '계약 수',
      value: 'deliverySpaces.contracts.length',
      align: 'center',
    },
    {
      text: '타입 수',
      value: 'deliverySpaces.quantity',
      align: 'center',
    },
    // {
    //   text: '공간주소',
    //   value: 'deliverySpaces.companyDistrict.address',
    //   align: 'center',
    // },
    {
      text: '통화 가능 시간',
      value: 'availableTime.value',
      align: 'center',
    },
    {
      text: '지점명',
      value: 'deliverySpaces.companyDistrict.nameKr',
      align: 'center',
    },
    {
      text: '타입',
      value: 'deliverySpaces.typeName',
      align: 'center',
    },
    {
      text: '상태',
      value: 'companyDecisionStatusCode.value',
      align: 'center',
    },
    {
      text: '공간 신청 상태',
      value: 'codeManagement.value',
      align: 'center',
    },
    {
      text: '열람유무',
      value: 'viewCount',
      align: 'center',
    },
    // TODO: 신청일 filter
    {
      text: '신청일',
      value: 'createdAt',
      align: 'center',
    },
  ];
  getList() {
    this.recentLoading = true;
    founderConsultService
      .findAll(null, this.noticePagination)
      .subscribe(res => {
        this.founderConsultList = res.data.items;
        this.recentLoading = false;
      });
  }

  getNoticeList() {
    this.noticeLoading = true;
    noticeBoardService.findAll(null, this.noticePagination).subscribe(res => {
      if (res) {
        this.noticeList = res.data.items;
        this.noticeLoading = false;
      }
    });
  }
  toSelectedNoticePage(value) {
    this.$router.push(`/notice-board/${value.no}`);
  }
  created() {
    // dashboardService.findOne().subscribe(res => {
    //   this.dashboardDto = res.data;
    // });
    this.getList();
    this.getNoticeList();
  }
  activated() {
    this.getList();
    this.getNoticeList();
  }
}
</script>

<style>
.small {
  max-width: 600px;
  /* margin: 150px auto; */
}
</style>

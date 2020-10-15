<template>
  <div>
    <!-- <FounderConsultConfirmDialog
      :dialog.sync="confirmDialog"
      @agree="$router.push(`/founder-consult/${clickedRowNo}`)"
    ></FounderConsultConfirmDialog>-->
    <v-card flat class="p-3 px-lg-8 py-lg-6 mb-4 rounded">
      <v-row>
        <v-col cols="6" lg="3">
          <v-select
            v-if="availableHopeTimeSelect"
            label="통화가능 시간"
            outlined
            placeholder="전체"
            :items="availableHopeTimeSelect"
            item-value="key"
            item-text="value"
            v-model="founderConsultSearchDto.hopeTime"
            clearable
            hide-details
            dense
          ></v-select>
        </v-col>
        <!-- <v-col cols="6" lg="3">
          <v-select
            label="공간유형"
            outlined
            placeholder="전체"
            :items="spaceTypeSelect"
            item-value="no"
            item-text="displayName"
            v-model="founderConsultSearchDto.spaceTypeNo"
            clearable
            hide-details
            dense
          >
          </v-select>
        </v-col>-->
        <v-col cols="6" lg="3">
          <v-select
            v-if="founderConsultStatusSelect"
            label="공간상태"
            outlined
            placeholder="전체"
            :items="founderConsultStatusSelect"
            item-value="key"
            item-text="value"
            v-model="founderConsultSearchDto.status"
            hide-details
            clearable
            dense
          ></v-select>
        </v-col>
        <v-col cols="6" lg="3">
          <v-select
            v-if="companyDistrictSelect"
            label="지점"
            outlined
            placeholder="전체"
            :items="companyDistrictSelect"
            item-value="nameKr"
            item-text="nameKr"
            v-model="founderConsultSearchDto.companyDistrictNameKr"
            hide-details
            clearable
            dense
          ></v-select>
        </v-col>
        <v-col cols="6" lg="3">
          <v-select
            label="열람 유무"
            outlined
            placeholder="전체"
            :items="viewCountYn"
            :item-text="['있음', '없음']"
            v-model="founderConsultSearchDto.viewCount"
            hide-details
            clearable
            dense
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" lg="3">
          <DateField
            title="시작일(열람일 기준)"
            :date.sync="founderConsultSearchDto.startDate"
          ></DateField>
        </v-col>
        <v-col cols="6" lg="3">
          <DateField
            title="종료일(열람일 기준)"
            :date.sync="founderConsultSearchDto.endDate"
          ></DateField>
        </v-col>
        <v-col cols="12" lg="6">
          <v-text-field
            label="공간주소"
            placeholder=" "
            outlined
            dense
            v-model="founderConsultSearchDto.address"
            hide-details
            clearable
            v-on:keyup.enter="getList()"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="text-center mt-4">
        <v-btn color="indigo" dark class="mx-2" @click="reset()">
          <span class="caption">초기화</span>
        </v-btn>
        <v-btn color="success" dark class="mx-2" @click="getList()">
          <span class="caption">검색</span>
        </v-btn>
      </div>
    </v-card>
    <CommonTable
      :headers="headers"
      :dataLoading="dataLoading"
      :pagination="pagination"
      :items="founderConsultList"
      :listCount="founderConsultListCount"
      @rowClicked="toSelectedItemPage"
      @paginationChanged="getList()"
    ></CommonTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { CodeManagementDto } from '@/services/init/dto';
import { CompanyDistrictDto } from '@/dto/company-district/company-district.dto';
import codeManagementService from '@/services/init/code-management.service';
import FounderConsultService from '@/services/founder-consult.service';
import companyDistrictService from '@/services/company-district.service';
import { getColor } from '@/modules/_common/utils/getColor';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
import FounderConsultConfirmDialog from '@/modules/founder-consult/components/FounderConsultConfirmDialog.vue';
import {
  FOUNDER_CONSULT,
  CONST_FOUNDER_CONSULT,
  CONST_YN,
  YN,
} from '@/services/shared';
import {
  FounderConsultDto,
  FounderConsultSearchDto,
} from '@/dto/founder-consult';
import { Pagination } from '@/common/interfaces/pagination.type';
import DateField from '@/modules/_common/components/fields/DateField.vue';
import FounderConsultMixin from '@/mixins/founder-consult.mixin';

@Component({
  name: 'FounderCounsultList',
  components: { CommonTable, FounderConsultConfirmDialog, DateField },
})
export default class FounderConsultList extends Mixins(FounderConsultMixin) {
  private founderConsultList: FounderConsultDto[] = [];
  private founderConsultListCount = null;
  private founderConsultSearchDto = new FounderConsultSearchDto();

  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private availableHopeTimeSelect: CodeManagementDto[] = [];
  private companyDistrictSelect: CompanyDistrictDto[] = [];

  private pagination = new Pagination();

  private viewCountYn: YN[] = [...CONST_YN];

  private dataLoading = false;
  private confirmDialog = false;
  private clickedRowNo: number;

  private headers = [
    // TODO: 공간타입 식당형 배달형
    // {
    //   text: '공간타입',
    //   value: 'space.spaceTypeNo',
    //   align: 'center',
    // },
    {
      text: 'ID',
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
      value: 'deliverySpace.contracts.length',
      align: 'center',
    },
    {
      text: '타입 수',
      value: 'deliverySpace.quantity',
      align: 'center',
    },
    // {
    //   text: '공간주소',
    //   value: 'deliverySpaces.companyDistrict.address',
    //   align: 'center',
    // },
    // {
    //   text: '사용자 전화번호',
    //   value: 'nanudaUser.phone',
    //   align: 'center',
    // },
    // TODO: 통화가능시간
    {
      text: '통화 가능 시간',
      value: 'availableTime.value',
      align: 'center',
    },
    {
      text: '지점',
      value: 'deliverySpace.companyDistrict.nameKr',
      align: 'center',
    },
    {
      text: '타입',
      value: 'deliverySpace.typeName',
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
      text: '열람일',
      value: 'openedAt',
      align: 'center',
    },
    {
      text: '신청일',
      value: 'createdAt',
      align: 'center',
    },
  ];

  // 희망 상담 시간
  getHopeTimes() {
    codeManagementService.findAvailableHopeTimes().subscribe(res => {
      this.availableHopeTimeSelect = res.data;
    });
  }

  // 공간 신청 상태
  getConsultStates() {
    codeManagementService.findFounderConsultStates().subscribe(res => {
      this.founderConsultStatusSelect = res.data;
    });
  }
  getDistrictList() {
    companyDistrictService.findDistrictSelectList().subscribe(res => {
      this.companyDistrictSelect = res.data;
    });
  }

  // 공간 유형
  // getSpaceTypes() {
  //   SpaceTypeService.findAll().subscribe(res => {
  //     this.spaceTypeSelect = res.data;
  //   });
  // }

  getList() {
    this.dataLoading = true;
    FounderConsultService.findAll(
      this.founderConsultSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.founderConsultList = res.data.items;
      this.founderConsultListCount = res.data.totalCount;
    });
  }
  reset() {
    this.pagination = new Pagination();
    this.founderConsultSearchDto = new FounderConsultSearchDto();
    this.getList();
  }
  // toSelectedItemPage(value) {
  //   console.log('row value', value);
  //   // if (
  //   //   value.status === FOUNDER_CONSULT.F_DIST_COMPLETE &&
  //   //   value.viewCount === YN.N
  //   // ) {
  //   //   this.clickedRowNo = value.no;
  //   //   this.confirmDialog = !this.confirmDialog;
  //   // } else if (
  //   //   value.status === FOUNDER_CONSULT.F_DIST_COMPLETE &&
  //   //   value.viewCount === YN.Y
  //   // ) {
  //   // this.$router.push(`/founder-consult/${value.no}`);
  //   // }
  //   if (value.status === FOUNDER_CONSULT.F_DIST_COMPLETE) {
  //     this.$router.push(`/founder-consult/${value.no}`);
  //   } else {
  //     this.$toasted.info('전달완료가 끝난 상담신청만 열람가능합니다');
  //   }
  // }

  created() {
    this.getList();
    this.getConsultStates();
    this.getHopeTimes();
    this.getDistrictList();
  }
  activated() {
    this.getList();
  }
}
</script>

<style></style>

<template>
  <v-container>
    <SpaceTypeDetailDialog
      v-if="founderConsultDto.deliverySpaceNo"
      :dialog.sync="spaceTypeDetailDialog"
      :spaceTypeNo="founderConsultDto.deliverySpaceNo"
      :readonly="true"
    ></SpaceTypeDetailDialog>
    <v-row>
      <v-col cols="6">
        <TableWithTitle
          :loading="loading"
          title="상담신청인 정보"
          :headers="nanudaUserTableHeader"
          :items="[founderConsultDto.nanudaUser]"
          hideFooter
        ></TableWithTitle>
      </v-col>
      <v-col
        cols="6"
        v-if="
          !(Object.keys(founderConsultDto).length === 0 && founderConsultDto)
        "
      >
        <!-- <TableWithTitle
          :loading="loading"
          title="신청공간 정보"
          :headers="spaceTableHeader"
          :items="[founderConsultDto]"
          :disableLink="false"
          route="/company/district"
          hideFooter
        ></TableWithTitle> -->
        <SpaceInfoCard
          :loading="loading"
          title="신청공간 정보"
          :founderConsultDto="founderConsultDto"
          @click="spaceTypeDetailDialog = true"
        ></SpaceInfoCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <CardWithTitle title="상담 상세정보">
          <ul class="u-list">
            <li>
              창업유무:
              <v-chip
                :color="
                  founderConsultDto.changUpExpYn === 'Y' ? 'success' : 'red'
                "
                dark
                >{{ founderConsultDto.changUpExpYn }}</v-chip
              >
            </li>
            <li v-if="founderConsultDto.availableTime">
              상담희망시간: {{ founderConsultDto.availableTime.value }}
            </li>
            <li>희망음식: {{ founderConsultDto.hopeFoodCategory }}</li>
            <li v-if="founderConsultDto.codeManagement">
              상담상태:
              <v-chip color="orange" dark small>{{
                founderConsultDto.codeManagement.value
              }}</v-chip>
            </li>
          </ul>
        </CardWithTitle>
      </v-col>
      <v-col cols="6">
        <CardWithTitle title="상담상태">
          <v-select
            outlined
            placeholder="상태"
            :items="companyFounderConsultList"
            item-text="value"
            item-value="key"
            v-model="founderConsultDto.companyDecisionStatus"
            :disabled="isContractComplete"
            hint="상담상태를 계약완료로 변경하면 다신 바꿀 수 없습니다"
            persistent-hint
          ></v-select>
          <ul class="u-list mt-3">
            <li v-if="founderConsultDto.companyUser">
              열람한사람: {{ founderConsultDto.companyUser.name }}
            </li>
            <li>
              열람유무:
              <v-chip
                :color="
                  founderConsultDto.viewCount === 'Y'
                    ? 'success'
                    : 'red lighten-1'
                "
                dark
                >{{ founderConsultDto.viewCount }}</v-chip
              >
            </li>
            <li>
              열람한시간:
              {{
                $moment(founderConsultDto.openedAt).format(
                  'YYYY.MM.DD - h:mm a',
                )
              }}
            </li>
          </ul>
        </CardWithTitle>
      </v-col>
    </v-row>
    <v-row justify="end" class="ma-5">
      <v-btn class="primary" @click="patchDetail()" v-if="!isContractComplete"
        >수정하기</v-btn
      >
    </v-row>
  </v-container>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Watch } from 'vue-property-decorator';
import FounderConsultService from '@/services/founder-consult.service';
import {
  FounderConsultDto,
  CompanyFounderConsultFetchDto,
} from '@/dto/founder-consult';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import TableWithTitle from '@/modules/_common/components/TableWithTitle.vue';
import { animationFrameScheduler } from 'rxjs';
import codeManagementService from '@/services/init/code-management.service';
import { CodeManagementDto } from '@/services/init/dto';
import { B2B_FOUNDER_CONSULT } from '@/services/shared';
import SpaceInfoCard from '@/modules/_common/components/cards/SpaceInfoCard.vue';
import SpaceTypeDetailDialog from '@/modules/company/components/district/components/SpaceTypeDetailDialog.vue';
@Component({
  name: 'FounderConsultDetail',
  components: {
    CardWithTitle,
    TableWithTitle,
    SpaceInfoCard,
    SpaceTypeDetailDialog,
  },
})
export default class FounderConsultDetail extends BaseComponent {
  private founderConsultDto = new FounderConsultDto();
  private loading = false;
  private companyFounderConsultList: CodeManagementDto[] = [];
  private companyFounderFetchDto = new CompanyFounderConsultFetchDto();
  private isContractComplete = true;
  private spaceTypeDetailDialog = false;
  private spaceTypeNo: number | string | string[] = null;
  private nanudaUserTableHeader: any[] = [
    {
      text: '이름',
      value: 'name',
      align: 'center',
      sortable: false,
    },
    {
      text: '전화번호',
      value: 'phone',
      align: 'center',
      sortable: false,
    },
    {
      text: '성별',
      value: 'genderInfo.value',
      align: 'center',
      sortable: false,
    },
  ];
  private spaceTableHeader: any[] = [
    {
      text: '지점',
      value: 'deliverySpaces.companyDistrict.nameKr',
      align: 'center',
      sortable: false,
    },
    {
      text: '타입',
      value: 'deliverySpaces.typeName',
      align: 'center',
      sortable: false,
    },
    // {
    //   text: '주소',
    //   value: 'companyDistrict.address',
    //   align: 'center',
    //   sortable: false,
    // },
  ];
  @Watch('founderConsultDto', { deep: true })
  founderConsultDtoChanged() {
    this.companyFounderFetchDto.companyDecisionStatus = this.founderConsultDto.companyDecisionStatus;
  }
  getDetail() {
    this.loading = true;
    FounderConsultService.findOne(this.$route.params.id).subscribe(res => {
      if (!res) {
        this.$router.push('/dashboard');
      } else {
        this.founderConsultDto = res.data;
        res.data.companyDecisionStatus === 'B2B_F_CONTRACT_COMPLETE'
          ? (this.isContractComplete = true)
          : (this.isContractComplete = false);
        this.loading = false;
      }
    });
  }

  ifConsultComplete(status?: B2B_FOUNDER_CONSULT) {
    if (status === B2B_FOUNDER_CONSULT.B2B_F_CONTRACT_COMPLETE) {
      this.patchDetail();
    }
  }

  getCompanyFounderConsultList() {
    codeManagementService
      .findCompanyFounderConsultStatusList()
      .subscribe(res => {
        console.log('res', res);
        this.companyFounderConsultList = res.data;
      });
  }
  patchDetail() {
    if (this.companyFounderFetchDto === this.founderConsultDto) {
      return;
    }
    FounderConsultService.patchOne(
      this.$route.params.id,
      this.companyFounderFetchDto,
    ).subscribe(res => {
      if (res) {
        this.$toasted.global.custom_success({ message: '수정 성공!' });
      }
    });
  }
  created() {
    this.getDetail();
    this.getCompanyFounderConsultList();
  }
}
</script>

<style></style>

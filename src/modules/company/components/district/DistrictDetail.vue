<template>
  <section v-if="companyDistrictDto">
    <SpaceTypeDetailDialog
      v-if="spaceTypeNo"
      :dialog.sync="spaceTypeDetailDialog"
      :spaceTypeNo="spaceTypeNo"
      @patched="getSpaceTypeList()"
    ></SpaceTypeDetailDialog>
    <SpaceTypeCreateDialog
      :dialog.sync="spaceTypeCreateDialog"
      @created="getSpaceTypeList()"
    ></SpaceTypeCreateDialog>
    <div class="my-6">
      <CardWithTitle title="지점 정보" :loading="detailLoading">
        <v-card-text>
          <v-row>
            <v-col>
              <div id="map" style="width:500px;height:400px;"></div>
            </v-col>
            <v-col>
              <div v-if="companyDistrictDto.codeManagement" class="text-right">
                <v-chip
                  :color="getColor(companyDistrictDto.codeManagement.key)"
                  dark
                  >{{ companyDistrictDto.codeManagement.value }}</v-chip
                >
              </div>

              <ul class="u-list" v-if="companyDistrictDto">
                <li v-if="companyDistrictDto.nameKr">
                  지점명 : {{ companyDistrictDto.nameKr }}
                  <span v-if="companyDistrictDto.nameEng"
                    >({{ companyDistrictDto.nameEng }})</span
                  >
                </li>
                <li v-if="companyDistrictDto.address">
                  주소 : {{ companyDistrictDto.address }}
                </li>
                <li
                  v-if="
                    companyDistrictDto.amenities &&
                      companyDistrictDto.amenities.length > 0
                  "
                >
                  공용시설:
                  <span
                    v-for="item in companyDistrictDto.amenities"
                    :key="item.no"
                    class="m-1"
                  >
                    <v-chip
                      color="teal"
                      dark
                      label
                      x-small
                      class="darken-3 mx-1"
                    >
                      {{ item.amenityName }}
                    </v-chip>
                  </span>
                </li>
                <li v-if="companyDistrictDto.createdAt">
                  등록일 :
                  {{
                    $moment(companyDistrictDto.createdAt).format(
                      'YYYY.MM.DD h:mm A',
                    )
                  }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-card-text>
      </CardWithTitle>
    </div>
    <div class="my-6">
      <CardWithTitle title="공간 타입" :loading="detailLoading">
        <template v-slot:top>
          <div>
            <v-btn
              dark
              fab
              depressed
              small
              color="primary"
              @click="spaceTypeCreateDialog = true"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </div>
        </template>
        <v-card-text>
          <v-data-iterator
            v-if="spaceTypeListCount"
            :items="spaceTypeDtoList"
            hide-default-footer
            :loading="typeListLoading"
          >
            <template v-slot:default="props">
              <v-row
                v-if="props.items && props.items.length > 0"
                align="stretch"
              >
                <v-col
                  v-for="item in props.items"
                  :key="item.no"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card outlined style="height:100%">
                    <v-row
                      no-gutters
                      justify="space-between"
                      align="center"
                      class="pl-4 pr-2 py-1"
                    >
                      <v-row no-gutters align="center" justify="start">
                        <v-switch
                          v-model="item.showYn"
                          false-value="N"
                          true-value="Y"
                          inset
                          hide-details
                          @change="toggleShow(item.no, item.showYn)"
                          class="mt-0"
                          :label="
                            item.delYn === 'Y'
                              ? '승인전 노출 활성화 불가'
                              : null
                          "
                          :disabled="item.delYn === 'Y'"
                        ></v-switch>
                      </v-row>
                      <v-btn
                        icon
                        color="grey lighten-1"
                        @click="showSpaceTypeDetailDialog(item.no)"
                      >
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </v-row>
                    <v-img
                      v-if="item.images && item.images.length > 0"
                      :src="item.images[0].endpoint"
                      class="border-top border-bottom"
                    ></v-img>
                    <v-img
                      v-else
                      :src="require('@/assets/images/common/default-image.jpg')"
                      class="border-top border-bottom"
                    ></v-img>
                    <v-card-title class="subheading font-weight-bold">
                      {{ item.typeName }}
                    </v-card-title>
                    <v-card-text>
                      <ul class="u-list">
                        <li v-if="item.size">평수 : {{ item.size }}평</li>
                        <li v-if="item.deposit">
                          보증금 : {{ item.deposit }}만원
                        </li>
                        <li v-if="item.monthlyRentFee">
                          월 임대료 : {{ item.monthlyRentFee }}만원
                        </li>
                        <li v-if="item.monthlyUtilityFee">
                          월 관리비 : {{ item.monthlyUtilityFee }}만원
                        </li>
                        <li v-if="item.quantity && item.contracts.length">
                          구좌 현황 :
                          <b
                            :class="[
                              item.contracts.length > 0
                                ? 'blue--text'
                                : 'red--text',
                            ]"
                            >{{ item.contracts.length }}</b
                          >
                          / {{ item.quantity }}개
                        </li>
                        <!-- <li>
                    공간 옵션:
                    <span
                      v-for="item in item.deliverySpaceOptions"
                      :key="item.no"
                    >
                      <v-chip class="ma-1 primary">{{
                        item.deliverySpaceOptionName
                      }}</v-chip></span
                    >
                  </li>
                  <li>
                    주방 시설:
                    <span v-for="item in item.amenities" :key="item.no">
                      <v-chip class="ma-1 primary">{{
                        item.amenityName
                      }}</v-chip></span
                    >
                        </li>-->
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </template>
            <template v-slot:footer>
              <v-row no-gutters class="mt-2" align="center" justify="center">
                <v-spacer></v-spacer>
                <span class="mr-4 grey--text"
                  >Page {{ pagination.page }} of {{ pageCount }}</span
                >
                <v-btn
                  fab
                  dark
                  small
                  color="blue darken-3"
                  class="mr-1"
                  @click="formerPage()"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  small
                  color="blue darken-3"
                  class="ml-1"
                  @click="nextPage()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>
      </CardWithTitle>
    </div>
  </section>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Watch } from 'vue-property-decorator';
import SpaceTypeDetailDialog from '@/modules/company/components/district/components/SpaceTypeDetailDialog.vue';
import SpaceTypeCreateDialog from '@/modules/company/components/district/components/SpaceTypeCreateDialog.vue';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import store from '@/store';
import companyDistrictService from '@/services/company-district.service';
import {
  CompanyDistrictDto,
  SpaceTypeSearchDto,
  SpaceTypePatchDto,
} from '@/dto/company-district';
import { Pagination } from '@/core';
import { SpaceTypeDto } from '@/dto/company-district/space-type.dto';
import { YN } from '@/services/shared';
import { getColor } from '@/modules/_common/utils/getColor';

@Component({
  name: 'DistrictDetail',
  components: {
    CardWithTitle,
    SpaceTypeDetailDialog,
    SpaceTypeCreateDialog,
  },
})
export default class DistrictDetail extends BaseComponent {
  private companyDistrictDto = new CompanyDistrictDto();
  private detailLoading = false;
  private spaceTypeSearchDto = new SpaceTypeSearchDto();
  private spaceTypePatchDto = new SpaceTypePatchDto();
  private spaceTypeDtoList: SpaceTypeDto[] = [];
  private pagination = new Pagination(8);
  private spaceTypeListCount: number = null;
  private typeListLoading = false;
  private spaceTypeDetailDialog = false;
  private spaceTypeCreateDialog = false;
  private spaceTypeNo: number | string | string[] = null;
  get pageCount(): number {
    return Math.ceil(this.spaceTypeListCount / this.pagination.limit);
  }
  @Watch('pagination', {
    deep: true,
  })
  paginationChanged() {
    this.getSpaceTypeList();
  }

  getColor(status) {
    return getColor(status);
  }

  getDistrict() {
    this.detailLoading = true;
    companyDistrictService.findOne(this.$route.params.id).subscribe(res => {
      this.companyDistrictDto = res.data;
      this.setMap(res.data);
      this.detailLoading = false;
    });
  }
  getSpaceTypeList() {
    this.typeListLoading = true;
    this.spaceTypeSearchDto.companyDistrictNo = this.$route.params.id;

    companyDistrictService
      .findDistrictSpaceTypeList(this.spaceTypeSearchDto, this.pagination)
      .subscribe(res => {
        this.typeListLoading = false;
        this.spaceTypeDtoList = res.data.items;
        this.spaceTypeListCount = res.data.totalCount;
      });
  }
  formerPage() {
    if (this.pagination.page > 1) {
      this.pagination.page--;
    }
  }
  nextPage() {
    if (this.pagination.page < this.pageCount) {
      this.pagination.page++;
    }
  }
  showSpaceTypeDetailDialog(no: number) {
    this.spaceTypeDetailDialog = true;
    this.spaceTypeNo = no;
  }
  toggleShow(no: number, showYN: YN) {
    this.spaceTypePatchDto.showYn = showYN;
    companyDistrictService
      .patchDistrictSpaceType(no, this.spaceTypePatchDto)
      .subscribe(res => {
        // if (res.data.delYn === YN.Y) {
        //   this.$toasted.info(
        //     '나누다키친의 심사가 끝나지않아 노출되지 않습니다',
        //   );
        // }
        this.getSpaceTypeList();
      });
  }
  // 지도 가져오기
  setMap(district: CompanyDistrictDto) {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new window.kakao.maps.LatLng(district.lat, district.lon),
        level: 3,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const markerPosition = new window.kakao.maps.LatLng(
      district.lat,
      district.lon,
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }
  created() {
    // console.log('companyDetail mounted');
    this.getDistrict();
    this.getSpaceTypeList();
  }
}
</script>

<style></style>

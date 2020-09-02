<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="1000px"
    @click:outside="toggle()"
  >
    <v-card :loading="loading">
      <v-card-title class="headline">타입 상세보기</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" align-self="center">
            <v-carousel
              v-if="spaceTypeDto.images && spaceTypeDto.images.length > 0"
            >
              <v-carousel-item
                v-for="item in spaceTypeDto.images"
                :key="item.key"
                :src="item.endpoint"
              >
                ></v-carousel-item
              >
            </v-carousel>
            <v-img
              v-else
              :src="require('@/assets/images/common/default-image.jpg')"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-row justify="space-around">
              <v-col cols="12">
                <v-text-field
                  v-model="spaceTypeDto.typeName"
                  label="타입 이름"
                  outlined
                  hide-details
                  dense
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="spaceTypeDto.quantity"
                  label="구좌수"
                  outlined
                  hide-details
                  dense
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="spaceTypeDto.size"
                  label="평수"
                  outlined
                  hide-details
                  dense
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="spaceTypeDto.deposit"
                  label="보증금"
                  suffix="만원"
                  outlined
                  hide-details
                  dense
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="spaceTypeDto.monthlyUtilityFee"
                  label="관리비"
                  suffix="만원"
                  outlined
                  hide-details
                  dense
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="spaceTypeDto.monthlyRentFee"
                  label="월세"
                  suffix="만원"
                  outlined
                  hide-details
                  dense
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <label for="">주방 시설 </label>

                <v-row no-gutters="" justify="start">
                  <span
                    v-for="item in kitchenFacilityList"
                    :key="item.no"
                    class="mx-1"
                  >
                    <v-checkbox
                      v-model="amenityArr"
                      :label="item.amenityName"
                      :value="item.no"
                      hide-details
                      :readonly="readonly"
                    ></v-checkbox>
                  </span>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-alert type="info" outlined dense
          >주방시설 항목을 넣고 싶으면 나누다키친에 문의해주세요</v-alert
        >
        <div v-if="contractListCount" class="mt-4">
          <span class="text-h6">계약 리스트</span>
          <CommonTable
            :headers="headers"
            :items="contractDtoList"
            :pagination="pagination"
            :listCount="contractListCount"
            @rowClicked="toSelectedItemPage"
          ></CommonTable>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="toggle()">
          취소
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="patch()"
          :loading="patchLoading"
          v-if="!readonly"
        >
          수정
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop, Watch } from 'vue-property-decorator';
import companyDistrictService from '@/services/company-district.service';
import amenityService from '@/services/amenity.service';
import { SpaceTypeDto, SpaceTypePatchDto } from '@/dto/company-district';
import { AmenityDto } from '@/dto/amenity/amenity.dto';
import { ContractDto } from '@/dto/contract/contract.dto';
import { ContractSearchDto } from '@/dto/contract/contract-search.dto';
import contractService from '@/services/contract.service';
import { Pagination } from '@/core';

@Component({
  name: 'SpaceTypeDetailDialog',
})
export default class SpaceTypeDetailDialog extends BaseComponent {
  @Prop({ required: true }) readonly dialog: boolean;
  @Prop() readonly spaceTypeNo: number;
  @Prop({ default: false }) readonly readonly: boolean;

  private spaceTypeDto = new SpaceTypeDto();
  private spacePatchDto = new SpaceTypePatchDto();
  private kitchenFacilityList: AmenityDto[] = [];
  private loading = false;
  private patchLoading = false;
  private amenityArr = [];

  // 계약 리스트
  private contractDtoList: ContractDto[] = [];
  private contractSearchDto = new ContractSearchDto();
  private contractListCount = null;
  private pagination = new Pagination();

  private headers = [
    {
      text: '지점명',
      value: 'deliverySpace.companyDistrict.nameKr',
      align: 'center',
    },
    {
      text: '공간타입',
      value: 'deliverySpace.typeName',
      align: 'center',
    },
    {
      text: '계약자',
      value: 'nanudaUser.name',
      align: 'center',
    },
    {
      text: '생성일',
      value: 'createdAt',
      align: 'center',
    },
  ];

  @Watch('dialog')
  dialogChanged() {
    if (this.dialog) {
      this.getSpaceType();
      this.getContractList();
    }
  }

  toggle() {
    this.$emit('update:dialog', !this.dialog);
    this.reset();
  }
  patch() {
    this.patchLoading = true;
    this.spacePatchDto = this.spaceTypeDto;
    this.spacePatchDto.amenityIds = this.amenityArr;
    companyDistrictService
      .patchDistrictSpaceType(this.spaceTypeNo, this.spacePatchDto)
      .subscribe(res => {
        this.patchLoading = false;
        this.$toasted.global.custom_success({ message: '수정 완료!' });
        this.toggle();
        this.$emit('patched');
      });
  }
  getSpaceType() {
    this.loading = true;
    companyDistrictService
      .findDistrictSpaceType(this.spaceTypeNo)
      .subscribe(res => {
        this.spaceTypeDto = res.data;
        this.amenityArr = res.data.amenities.map(e => {
          return e.no;
        });
        this.spacePatchDto.deliverySpaceOptionIds =
          res.data.deliverySpaceOptions;
        this.loading = false;
      });
  }
  getAmenityList() {
    amenityService.findkitchenFacility().subscribe(res => {
      this.kitchenFacilityList = res.data;
    });
  }

  // 타입별 계약 리스트
  getContractList() {
    this.contractSearchDto.deliverySpaceNo = this.spaceTypeNo;
    contractService
      .findAll(this.contractSearchDto, this.pagination)
      .subscribe(res => {
        if (res) {
          this.contractDtoList = res.data.items;
          this.contractListCount = res.data.totalCount;
        }
      });
  }
  // 타입별 계약 리스트 상세 보기
  toSelectedItemPage(value) {
    this.$router.push(`/contract/${value.no}`);
  }

  reset() {
    this.spaceTypeDto = new SpaceTypeDto();
    this.spacePatchDto = new SpaceTypePatchDto();
    this.contractDtoList = [];
    this.amenityArr = [];
  }
  created() {
    this.getSpaceType();
    this.getAmenityList();
    this.getContractList();
  }
}
</script>
<style></style>

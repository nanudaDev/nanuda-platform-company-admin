<template>
  <v-dialog v-model="dialog" max-width="1000px" @click:outside="toggle()">
    <v-card :loading="loading">
      <v-card-title class="headline">타입 추가하기</v-card-title>
      <v-card-text>
        <v-row justify="space-around" class="pa-5">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="spaceCreateDto.typeName"
              label="타입 이름"
              outlined
              hide-details
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="spaceCreateDto.quantity"
              label="구좌수"
              outlined
              hide-details
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="spaceCreateDto.size"
              label="평수"
              outlined
              hide-details
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="spaceCreateDto.deposit"
              label="보증금"
              suffix="만원"
              outlined
              hide-details
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="spaceCreateDto.monthlyUtilityFee"
              label="관리비"
              suffix="만원"
              outlined
              hide-details
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="spaceCreateDto.monthlyRentFee"
              label="월세"
              suffix="만원"
              outlined
              hide-details
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <label>주방 시설</label>
            <v-row justify="space-around" class="pa-5">
              <div v-for="item in kitchenFacilityList" :key="item.no">
                <v-checkbox
                  class="ma-2"
                  v-model="amenityArr"
                  :label="item.amenityName"
                  :value="item.no"
                  hide-details
                ></v-checkbox>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-alert type="info" dense outlined
          >이미지 추가는 나누다키친 측에서 하게 됩니다</v-alert
        >
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="toggle()">
          취소
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="create()"
          :loading="createLoading"
        >
          생성
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
import { SpaceTypeCreateDto } from '@/dto/company-district';
import { AmenityDto } from '@/dto/amenity/amenity.dto';
@Component({
  name: 'SpaceTypeCreateDialog',
})
export default class SpaceTypeCreateDialog extends BaseComponent {
  @Prop({ required: true }) readonly dialog: boolean;

  private spaceCreateDto = new SpaceTypeCreateDto();
  private kitchenFacilityList: AmenityDto[] = [];
  private loading = false;
  private createLoading = false;
  private amenityArr = [];

  toggle() {
    this.$emit('update:dialog', !this.dialog);
    this.reset();
  }

  getAmenityList() {
    amenityService.findkitchenFacility().subscribe(res => {
      console.log('kitchenFacility', res);
      this.kitchenFacilityList = res.data;
    });
  }
  reset() {
    console.log('reset');
    this.spaceCreateDto = new SpaceTypeCreateDto();
    this.amenityArr = [];
  }
  create() {
    this.createLoading = true;
    this.spaceCreateDto.amenityIds = this.amenityArr;
    this.spaceCreateDto.companyDistrictNo = this.$route.params.id;
    companyDistrictService
      .createDistrictSpaceType(this.spaceCreateDto)
      .subscribe(res => {
        if (res) {
          this.createLoading = false;
          console.log('create', res);
          this.$toasted.global.custom_success({ message: '생성 성공!' });
          this.toggle();
          this.$emit('created');
        } else {
          this.createLoading = false;
        }
      });
  }
  created() {
    this.getAmenityList();
  }
}
</script>
<style></style>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500px" @click:outside="toggle">
      <v-card>
        <v-card-title>
          <span class="headline">매출 기록 생성</span>
        </v-card-title>
        <v-row justify="center">
          <v-card-subtitle>{{ selectedYear }}년</v-card-subtitle>
          <v-card-subtitle>{{ selectedMonth }}월</v-card-subtitle>
        </v-row>
        <v-row justify="center">
          <v-text-field
            v-model="revenueRecordCreateDto.maxRevenue"
            label="최고 매출"
            suffix="만원"
            style="max-width:150px"
            class="ma-5"
          ></v-text-field>
          <v-text-field
            v-model="revenueRecordCreateDto.minRevenue"
            label="최저 매출"
            suffix="만원"
            style="max-width:150px"
            class="ma-5"
          ></v-text-field>
        </v-row>
        <v-row justify="center">
          <v-btn class="ma-2" @click="toggle">취소</v-btn>
          <v-btn class="primary ma-2" @click="save">저장</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { CompanyDistrictRevenueRecordCreateDto } from '@/dto/company-district/revenue-record';
import companyDistrictService from '@/services/company-district.service';
import { Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'RevenueRecordCreateDialog',
})
export default class RevenueRecordCreateDialog extends BaseComponent {
  @Prop() readonly dialog: boolean;
  @Prop() readonly selectedMonth: string;
  @Prop() readonly selectedYear: string;

  private revenueRecordCreateDto = new CompanyDistrictRevenueRecordCreateDto();

  toggle() {
    this.$emit('update:dialog', false);
    this.reset();
  }
  reset() {
    this.revenueRecordCreateDto = new CompanyDistrictRevenueRecordCreateDto();
  }
  createRevenueRecords() {
    this.revenueRecordCreateDto.companyDistrictNo = this.$route.params.id;
    this.revenueRecordCreateDto.year = this.selectedYear;
    this.revenueRecordCreateDto.month = this.selectedMonth;
    companyDistrictService
      .createDistrictRevenueRecords(this.revenueRecordCreateDto)
      .subscribe(res => {
        if (res) {
          this.$toasted.global.custom_success({ message: '저장 성공!' });
          this.$emit('created');
          this.toggle();
        }
      });
  }
  save() {
    this.createRevenueRecords();
  }
}
</script>

<style></style>

<template>
  <v-dialog v-model="dialog" max-width="500px" @click:outside="toggle">
    <v-card>
      <v-card-title>
        <span class="headline">매출 기록 수정</span>
      </v-card-title>
      <v-row justify="center">
        <v-card-subtitle>{{ selectedYear }}년</v-card-subtitle>
        <v-card-subtitle>{{ selectedMonth }}월</v-card-subtitle>
      </v-row>

      <v-row justify="center">
        <v-text-field
          v-model="revenueRecordPatchDto.maxRevenue"
          label="최고 매출"
          suffix="만원"
          style="max-width:150px"
          class="ma-5"
        ></v-text-field>
        <v-text-field
          v-model="revenueRecordPatchDto.minRevenue"
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
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { CompanyDistrictRevenueRecordPatchDto } from '@/dto/company-district/revenue-record';
import companyDistrictService from '@/services/company-district.service';
import { Component, Prop, Watch } from 'vue-property-decorator';
@Component({
  name: 'RevenueRecordUpdateDialog',
})
export default class RevenueRecordUpdateDialog extends BaseComponent {
  @Prop() readonly dialog: boolean;
  @Prop() readonly selectedMonth: string;
  @Prop() readonly selectedYear: string;
  @Prop() readonly minRevenue: number;
  @Prop() readonly maxRevenue: number;
  @Prop() readonly recordNo: number;
  private revenueRecordPatchDto = new CompanyDistrictRevenueRecordPatchDto();

  @Watch('dialog')
  onDialogChanged() {
    this.$set(this.revenueRecordPatchDto, 'minRevenue', this.minRevenue);
    this.$set(this.revenueRecordPatchDto, 'maxRevenue', this.maxRevenue);
  }
  toggle() {
    this.$emit('update:dialog', false);
    this.reset();
  }
  reset() {
    this.revenueRecordPatchDto = new CompanyDistrictRevenueRecordPatchDto();
  }
  updateRevenueRecords() {
    this.$set(
      this.revenueRecordPatchDto,
      'minRevenue',
      this.revenueRecordPatchDto.minRevenue.toString().trim(),
    );
    this.$set(
      this.revenueRecordPatchDto,
      'maxRevenue',
      this.revenueRecordPatchDto.maxRevenue.toString().trim(),
    );
    companyDistrictService
      .updateDistrictRevenueRecords(this.recordNo, this.revenueRecordPatchDto)
      .subscribe(res => {
        if (res) {
          this.$toasted.global.custom_success({ message: '저장 성공!' });
          this.$emit('updated');
          this.toggle();
        }
      });
  }
  save() {
    this.updateRevenueRecords();
  }
}
</script>

<style></style>

<template>
  <v-container fluid>
    <revenue-record-create-dialog
      :dialog.sync="createDialog"
      :selectedMonth="selectedMonth"
    />
    <v-data-iterator :items="months" :items-per-page="12" hide-default-footer>
      <template v-slot:header>
        <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
          <v-select
            v-model="selectedYear"
            flat
            solo-inverted
            hide-details
            :items="years"
            prepend-inner-icon="mdi-magnify"
            label="Search by year"
            style="max-width: 200px"
          ></v-select>
        </v-toolbar>
      </template>
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.month"
            cols="12"
            sm="4"
            md="3"
            lg="2"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.month }}월
              </v-card-title>

              <v-list
                dense
                v-if="item.maxRevenue !== null && item.minRevenue !== null"
              >
                <v-list-item>
                  <v-list-item-content>최고매출:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.maxRevenue }}만원
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>최저매출:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.minRevenue }}만원
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-btn
                v-else
                class="ma-5 primary"
                @click="onCreateBtnClicked(item.month)"
                >기록하기</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { CompanyDistrictRevenueRecordDto } from '@/dto/company-district/company-district-revenue-record.dto';
import { Component, Prop, Watch } from 'vue-property-decorator';
import companyDistrictService from '@/services/company-district.service';
import RevenueRecordCreateDialog from './dialogs/RevenueRecordCreateDialog.vue';
@Component({
  name: 'RevenueRecordIterator',
  components: { RevenueRecordCreateDialog },
})
export default class RevenueRecordIterator extends BaseComponent {
  private revenueRecords: CompanyDistrictRevenueRecordDto[] = [];
  private createDialog = false;

  private currentYear: string = new Date().getFullYear().toString();
  private selectedYear: string = this.currentYear;
  private selectedMonth: string = null;
  get months() {
    const arr = [];
    for (let i = 1; i < 13; i++) {
      const theIndex = this.revenueRecords.findIndex(e => +e.month == i);
      if (theIndex > -1) {
        arr.push({
          month: i,
          maxRevenue: this.revenueRecords[theIndex].maxRevenue,
          minRevenue: this.revenueRecords[theIndex].minRevenue,
        });
      } else {
        arr.push({ month: i, maxRevenue: null, minRevenue: null });
      }
    }
    return arr;
  }
  get years() {
    const arr = [];
    for (let i = 2020; i <= +this.currentYear; i++) {
      arr.push(i.toString());
    }
    return arr;
  }
  getRevenueRecords() {
    companyDistrictService
      .findDistrictRevenueRecords(this.$route.params.id, this.selectedYear)
      .subscribe(res => {
        this.revenueRecords = res.data;
      });
  }
  onCreateBtnClicked(month) {
    this.createDialog = true;
    this.selectedMonth = month;
  }
  @Watch('selectedYear')
  yearChanged() {
    this.getRevenueRecords();
  }
  created() {
    this.getRevenueRecords();
  }
}
</script>

<style></style>

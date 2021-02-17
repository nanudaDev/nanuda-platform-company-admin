<template>
  <div class="mt-5">
    <revenue-record-create-dialog
      :dialog.sync="createDialog"
      :selectedMonth="selectedMonth"
      :selectedYear="selectedYear"
      @created="recordCreated"
    />
    <revenue-record-update-dialog
      :dialog.sync="updateDialog"
      :selectedMonth="selectedMonth"
      :selectedYear="selectedYear"
      :maxRevenue="selectedMax"
      :minRevenue="selectedMin"
      :recordNo="selectedRecordNo"
      @updated="recordUpdated"
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
            <v-card outlined>
              <v-row>
                <v-col>
                  <v-card-title class="subheading font-weight-bold">
                    {{ item.month }}월
                  </v-card-title>
                </v-col>
                <v-col>
                  <v-btn
                    dark
                    fab
                    depressed
                    small
                    color="primary"
                    @click="
                      onUpdateBtnClicked(
                        item.month,
                        item.minRevenue,
                        item.maxRevenue,
                        item.no,
                      )
                    "
                    v-if="item.maxRevenue !== null && item.minRevenue !== null"
                    ><v-icon>mdi-pencil-outline</v-icon></v-btn
                  >
                </v-col>
              </v-row>

              <v-list
                dense
                v-if="item.maxRevenue !== null && item.minRevenue !== null"
              >
                <v-list-item>
                  <v-list-item-content>최고매출:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.maxRevenue }} 만원
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>최저매출:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.minRevenue }} 만원
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
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop, Watch } from 'vue-property-decorator';
import companyDistrictService from '@/services/company-district.service';
import RevenueRecordCreateDialog from './dialogs/RevenueRecordCreateDialog.vue';
import {
  CompanyDistrictRevenueRecordCreateDto,
  CompanyDistrictRevenueRecordDto,
} from '@/dto/company-district/revenue-record';
import RevenueRecordUpdateDialog from './dialogs/RevenueRecordUpdateDialog.vue';
@Component({
  name: 'RevenueRecordIterator',
  components: { RevenueRecordCreateDialog, RevenueRecordUpdateDialog },
})
export default class RevenueRecordIterator extends BaseComponent {
  private revenueRecords: CompanyDistrictRevenueRecordDto[] = [];
  private revenueCreateDto = new CompanyDistrictRevenueRecordCreateDto();
  private createDialog = false;
  private updateDialog = false;
  private currentYear: string = new Date().getFullYear().toString();
  private selectedYear: string = this.currentYear;
  private selectedMonth: string = null;
  private selectedMax: number = null;
  private selectedMin: number = null;
  private selectedRecordNo: number = null;
  get months() {
    const arr = [];
    for (let i = 1; i < 13; i++) {
      const theIndex = this.revenueRecords.findIndex(e => +e.month == i);
      if (theIndex > -1) {
        arr.push({
          month: i,
          maxRevenue: this.revenueRecords[theIndex].maxRevenue,
          minRevenue: this.revenueRecords[theIndex].minRevenue,
          no: this.revenueRecords[theIndex].no,
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
    this.$emit('loading', true);
    companyDistrictService
      .findDistrictRevenueRecords(this.$route.params.id, this.selectedYear)
      .subscribe(res => {
        this.revenueRecords = res.data;
        this.$emit('loading', false);
      });
  }

  onCreateBtnClicked(month: string) {
    this.createDialog = true;
    this.selectedMonth = month;
  }
  onUpdateBtnClicked(
    month: string,
    minRevenue: number,
    maxRevenue: number,
    recordNo: number,
  ) {
    this.updateDialog = true;
    this.selectedMonth = month;
    this.selectedMin = minRevenue;
    this.selectedMax = maxRevenue;
    this.selectedRecordNo = recordNo;
  }
  @Watch('selectedYear')
  yearChanged() {
    this.getRevenueRecords();
  }
  recordCreated() {
    this.createDialog = false;
    this.getRevenueRecords();
  }
  recordUpdated() {
    this.updateDialog = false;
    this.getRevenueRecords();
  }
  created() {
    this.getRevenueRecords();
  }
}
</script>

<style></style>

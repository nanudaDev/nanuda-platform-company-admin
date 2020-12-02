<template>
  <section>
    <v-card
      flat
      class="p-3 px-lg-8 py-lg-6 mb-4 rounded"
      v-on:keyup.enter="getList()"
    >
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            label="지점명"
            placeholder=" "
            outlined
            dense
            v-model="companyDistrictSearchDto.nameKr"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="주소"
            placeholder=" "
            outlined
            dense
            v-model="companyDistrictSearchDto.address"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            label="승인상태"
            outlined
            placeholder="전체"
            :items="accountStatusSelect"
            item-value="key"
            item-text="value"
            v-model="companyDistrictSearchDto.companyDistrictStatus"
            hide-details
            clearable
            dense
          ></v-select>
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
      :items="companyDistrictDtoList"
      :listCount="companyDistrictListCount"
      @rowClicked="toSelectedItemPage"
      @paginationChanged="getList()"
    >
    </CommonTable>
  </section>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import TableWithTitle from '@/modules/_common/components/TableWithTitle.vue';
import companyDistrictService from '@/services/company-district.service';
import { CompanyDistrictDto } from '@/dto/company-district/company-district.dto';
import { CompanyDistrictSearchDto } from '@/dto/company-district/company-district-search.dto';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
import { Pagination } from '@/core';
import { CodeManagementDto } from '@/services/init/dto';
import codeManagementService from '@/services/init/code-management.service';

@Component({ name: 'District', components: { CommonTable } })
export default class District extends BaseComponent {
  private companyDistrictDtoList: CompanyDistrictDto[] = [];
  private companyDistrictSearchDto = new CompanyDistrictSearchDto();
  private pagination = new Pagination();
  private dataLoading = false;
  private companyDistrictListCount = null;
  private accountStatusSelect: CodeManagementDto[] = [];

  private headers = [
    {
      text: '지점명',
      value: 'nameKr',
      align: 'center',
    },
    {
      text: '주소',
      value: 'address',
      align: 'center',
    },
    {
      text: '상태',
      value: 'codeManagement.value',
      align: 'center',
    },
  ];

  toSelectedItemPage(value) {
    this.$router.push(`/company/district/${value.no}`);
  }

  getAccountStatus() {
    codeManagementService.findAccountStatus().subscribe(res => {
      if (res) {
        this.accountStatusSelect = res.data;
      }
    });
  }

  getList() {
    this.dataLoading = true;
    companyDistrictService
      .findAll(this.companyDistrictSearchDto, this.pagination)
      .subscribe(res => {
        this.dataLoading = false;
        this.companyDistrictDtoList = res.data.items;
        this.companyDistrictListCount = res.data.totalCount;
      });
  }

  reset() {
    this.companyDistrictSearchDto = new CompanyDistrictSearchDto();
    this.getList();
  }
  created() {
    this.getList();
    this.getAccountStatus();
  }
  activated() {
    this.getList();
  }
}
</script>

<style></style>

<template>
  <div>
    <CommonTable
      :headers="headers"
      :items="contractDtoList"
      :pagination="pagination"
      :dataLoading="loading"
      :listCount="contractListCount"
      @rowClicked="toSelectedItemPage"
    ></CommonTable>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Watch } from 'vue-property-decorator';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
import contractService from '@/services/contract.service';
import { Pagination } from '@/common/interfaces/pagination.type';
import { ContractDto } from '@/dto/contract/contract.dto';
import { ContractSearchDto } from '@/dto/contract';
@Component({
  name: 'Contracts',
  components: { CommonTable },
})
export default class Contracts extends BaseComponent {
  private pagination = new Pagination();
  private contractDtoList: ContractDto[] = [];
  private contractSearchDto = new ContractSearchDto();
  private loading = false;
  private contractListCount = null;
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

  toSelectedItemPage(value) {
    this.$router.push(`/contract/${value.no}`);
  }
  getList() {
    this.loading = true;
    contractService
      .findAll(this.contractSearchDto, this.pagination)
      .subscribe(res => {
        this.contractDtoList = res.data.items;
        this.contractListCount = res.data.totalCount;
        this.loading = false;
      });
  }
  created() {
    this.getList();
  }
  activated() {
    this.getList();
  }
}
</script>

<style></style>

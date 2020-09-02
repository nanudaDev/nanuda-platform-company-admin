<template>
  <div>
    <UserAddDialog
      :dialog.sync="userAddDialog"
      @added="getList()"
    ></UserAddDialog>
    <div>
      <v-row justify="start" align="center">
        <p class="body-1 ma-3" v-if="companyUserListCount">
          검색결과 수
          <strong class="indigo--text">{{ companyUserListCount }}</strong>
        </p>

        <!-- <v-btn @click="dialog = !dialog">유저 추가하기</v-btn> -->
        <v-btn
          fab
          small
          color="primary"
          @click="userAddDialog = !userAddDialog"
          class="ma-3"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-row>
    </div>
    <v-card>
      <!-- <v-data-table
        :headers="headers"
        :items="companyUserList"
        :loading="dataLoading"
        :item-key="companyUserList.adminNo"
        hide-default-footer
        @click:row="toSelectedItemPage"
      >
        <template v-slot:item.codeManagement.value="{ item }">
          <v-chip :color="getStatusColor(item.codeManagement.value)" dark>{{
            item.codeManagement.value
          }}</v-chip>
        </template></v-data-table
      > -->
      <CommonTable
        :headers="headers"
        :items="companyUserList"
        :pagination="pagination"
        :dataLoading="dataLoading"
        @rowClicked="toSelectedItemPage"
        :listCount="companyUserListCount"
        @paginationChanged="getList()"
      ></CommonTable>
    </v-card>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { CompanyUserDto } from '../../../dto/company-user';
import companyUserService from '../../../services/company-user.service';
import { Pagination } from '@/common/interfaces/pagination.type';
import UserAddDialog from '@/modules/company/components/UserAddDialog.vue';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
@Component({
  components: { UserAddDialog },
})
export default class User extends BaseComponent {
  private companyUserList: CompanyUserDto[] = [];
  private pagination = new Pagination();
  private dataLoading = false;
  private companyUserListCount = null;
  private userAddDialog = false;
  private headers = [
    {
      text: '이름',
      value: 'name',
      align: 'center',
    },
    {
      text: '핸드폰 번호',
      value: 'phone',
      align: 'center',
    },
    {
      text: '이메일',
      value: 'email',
      align: 'center',
    },
    {
      text: '상태',
      value: 'codeManagement.value',
      align: 'center',
    },
  ];
  //페이지네이션 페이지 length
  // get pageCount(): number {
  //   return Math.ceil(this.companyUserListCount / this.pagination.limit);
  // }
  // //pagination 객체가 변할때마다 리스트를 새로가져옴
  // @Watch('pagination', {
  //   deep: true,
  // })
  // paginationChanged() {
  //   this.getList();
  // }

  getList() {
    this.dataLoading = true;
    companyUserService.findAll(null, this.pagination).subscribe(res => {
      this.dataLoading = false;
      this.companyUserList = res.data.items;
      this.companyUserListCount = res.data.totalCount;
    });
  }
  toSelectedItemPage(value) {
    this.$router.push(`/company/user/${value.no}`);
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

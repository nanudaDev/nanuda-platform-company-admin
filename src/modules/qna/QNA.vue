<template>
  <div>
    <QNAAddDialog :dialog.sync="addDialog" @added="getList()"></QNAAddDialog>
    <CommonTable
      :dataLoading="loading"
      :headers="QNAheaders"
      :items="QNAList"
      :pagination="QNAPagination"
      :listCount="QNAListCount"
      @rowClicked="toSelectedQNAPage"
      @paginationChanged="getList()"
    >
      <template v-slot:leftArea>
        <v-btn fab small depressed color="primary" @click="addDialog = !addDialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </CommonTable>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import QNAService from '@/services/qna.service';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
import { QNADto } from '@/dto/qna';
import { Pagination } from '@/common/interfaces/pagination.type';
import QNAAddDialog from '@/modules/qna/components/QNAAddDialog.vue';

@Component({ name: 'QNA', components: { CommonTable, QNAAddDialog } })
export default class QNA extends BaseComponent {
  private QNAList: QNADto[] = [];
  private QNAPagination = new Pagination();
  private QNAListCount = null;
  private addDialog = false;
  private loading = false;
  private QNAheaders = [
    {
      text: 'ID',
      value: 'no',
      align: 'center',
    },
    {
      text: '제목',
      value: 'title',
      align: 'center',
    },
    {
      text: '타입',
      value: 'codeManagement.value',
      align: 'center',
    },
    {
      text: '작성자',
      value: 'companyUser.name',
      align: 'center',
    },
    {
      text: '작성일',
      value: 'createdAt',
      align: 'center',
    },
  ];
  toSelectedQNAPage(value) {
    this.$router.push(`/qna/${value.no}`);
  }
  getList() {
    this.loading = true;
    QNAService.findAll(null, this.QNAPagination).subscribe(res => {
      this.QNAList = res.data.items;
      this.QNAListCount = res.data.totalCount;
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

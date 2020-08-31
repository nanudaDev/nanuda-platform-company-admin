<template>
  <div>
    <div v-if="listCount" class="px-4">
      <v-row justify="space-between" align="end">
        <v-col>
          <p class="body-1 mb-0" v-if="listCount">
            TOTAL
            <strong class="indigo--text">{{ listCount }}</strong>
          </p>
        </v-col>
        <!-- TODO: 출력수 input 이벤트 함수로 -->
        <!-- <v-col cols="2" class="py-0"
          ><v-select
            :items="[1, 2, 3]"
            label="출력 수"
            v-model="pagination.limit"
            @change="pagination.page = 1"
          >
          </v-select
        ></v-col> -->
      </v-row>
    </div>
    <v-card flat class="rounded">
      <!-- :items-per-page="pagination.limit"
        @page-count="pageCount = $event" 
           :page.sync="pagination.page"-->
      <v-data-table
        :headers="headers"
        :items="items"
        :item-key="items.no"
        hide-default-footer
        :loading="dataLoading"
        @click:row="onRowClicked"
        :items-per-page="pagination.limit"
      >
        <template v-slot:[`item.companyDecisionStatusCode.value`]="{ item }">
          <v-chip :color="getColor(item.companyDecisionStatusCode.key)" light>
            <strong>{{ item.companyDecisionStatusCode.value }}</strong>
          </v-chip>
        </template>
        <template v-slot:[`item.codeManagement.value`]="{ item }">
          <v-chip :color="getColor(item.codeManagement.key)" light>
            <strong>{{ item.codeManagement.value }}</strong>
          </v-chip>
        </template>
        <template v-slot:[`item.viewCount`]="{ item }">
          <v-chip :color="getColor(item.viewCount)" light>
            <strong>{{ item.viewCount }}</strong>
          </v-chip>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ $moment(item.createdAt).format('YYYY.MM.DD h:mm A') }}
        </template>
        <template v-slot:[`item.openedAt`]="{ item }">
          {{ $moment(item.openedAt).format('YYYY.MM.DD h:mm A') }}
        </template>
      </v-data-table>
    </v-card>
    <v-pagination
      v-model="pagination.page"
      :length="pageCount"
      v-if="showPagination"
      class="mt-2 pb-4"
    ></v-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { getColor } from '@/modules/_common/utils/getColor';
import { Pagination } from '../../../core';
@Component({
  name: 'CommonTable',
})
export default class CommonTable extends Vue {
  @Prop() readonly headers: any[];
  @Prop() readonly dataLoading: boolean;
  @Prop() readonly pagination: Pagination;
  // @Prop() readonly pageCount: number;
  @Prop() readonly items: any[];
  @Prop() readonly path: string;
  @Prop() readonly listCount: number;
  @Prop({ default: true }) readonly showPagination: boolean;

  get pageCount(): number {
    return Math.ceil(this.listCount / this.pagination.limit);
  }
  @Watch('pagination', {
    deep: true,
  })
  paginationChanged() {
    this.$emit('paginationChanged');
  }

  getColor(status) {
    return getColor(status);
  }

  onRowClicked(value) {
    this.$emit('rowClicked', value);
  }
}
</script>
<style>
.v-data-table * {
  font-size: 12px !important;
}
.v-data-table th {
  white-space: nowrap;
}
.v-data-table td {
  cursor: pointer;
  white-space: nowrap;
}
</style>

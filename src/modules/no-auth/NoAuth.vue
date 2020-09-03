<template>
  <v-alert
    border="top"
    colored-border
    type="error"
    elevation="1"
    icon="mdi-lock-outline"
    prominent
    plat
  >
    <div class="py-4 pl-4">
      <div>
        현재 <b>{{ store.state.myName }}</b
        >의 상태는
        <v-chip :color="getColor(store.state.userStatus)" dark>{{
          store.state.userStatus | enumTransformer
        }}</v-chip>
        입니다
      </div>
      <div class="mt-2">
        현재 업체의 상태는
        <v-chip :color="getColor(store.state.companyStatus)" dark>{{
          store.state.companyStatus | enumTransformer
        }}</v-chip>
        입니다
      </div>
      <div class="mt-2">
        유저와 업체 전부 승인상태여야 열람이 가능합니다
      </div>
    </div>
  </v-alert>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store';
import { getColor } from '@/modules/_common/utils/getColor';

@Component({ name: 'NoAuth' })
export default class NoAuth extends BaseComponent {
  private store = store;

  getColor(status) {
    return getColor(status);
  }
}
</script>

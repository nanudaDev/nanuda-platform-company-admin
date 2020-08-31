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
        <span class="orange--text">{{
          store.state.userStatus | enumTransformer
        }}</span>
        입니다
      </div>
      <div>
        현재 업체의 상태는
        <span class="orange--text">{{
          store.state.companyStatus | enumTransformer
        }}</span>
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

@Component({ name: 'NoAuth' })
export default class NoAuth extends BaseComponent {
  private store = store;
}
</script>

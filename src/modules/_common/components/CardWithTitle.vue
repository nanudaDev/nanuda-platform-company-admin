<template>
  <div>
    <v-row justify="space-between" align="center" class="ma-2">
      <div class="subtitle">{{ title }}</div>
      <slot name="top"></slot>
    </v-row>
    <v-card class="card pa-5" flat :loading="loading">
      <slot>내용</slot>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class CardWithTitle extends Vue {
  @Prop() readonly title: string;
  @Prop() readonly loading: boolean;
}
</script>

<style lang="scss">
.card {
  overflow: hidden;
  .card-title {
    margin-bottom: 0;
    h3 {
      font-size: 20px;
    }
  }
  .u-list {
    margin: 0;
    padding-left: 0;
    li {
      margin: 4px 0;
      list-style: none;
      font-size: 13px;
    }
  }
}
</style>

<template>
  <v-card class="card pa-5" flat :loading="loading">
    <v-card-title class="card-title">
      <v-row no-gutters align="center" justify="space-between">
        <h3 class="mb-0">{{ title }}</h3>
        <slot name="top"></slot>
      </v-row>
    </v-card-title>
    <slot>내용</slot>
  </v-card>
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

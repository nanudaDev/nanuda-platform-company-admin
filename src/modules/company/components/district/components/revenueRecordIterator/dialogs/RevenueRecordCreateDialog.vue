<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="600px"
      @click:outside="toggle"
    >
      <v-card>
        <v-card-title>
          <span class="headline">매출 기록 생성</span>
        </v-card-title>
        <v-card-subtitle>{{ selectedMonth }}월</v-card-subtitle>
        <v-card-text>
          <v-text-field v-model="maxRevenue" label="최대매출"></v-text-field>
          <v-text-field v-model="minRevenue" label="최소매출"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop, Watch } from 'vue-property-decorator';
@Component({
  name: 'RevenueRecordCreateDialog',
})
export default class RevenueRecordCreateDialog extends BaseComponent {
  @Prop() readonly dialog: boolean;
  @Prop() readonly selectedMonth: string;

  private maxRevenue: number;
  private minRevenue: number;
  toggle() {
    this.$emit('update:dialog', false);
    // this.reset();
  }
}
</script>

<style></style>

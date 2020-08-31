<template>
  <v-dialog v-model="dialog" max-width="500" @click:outside="toggle()">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="toggle()">
          취소
        </v-btn>

        <v-btn color="green darken-1" text @click="confirm()">
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'ConfirmDialog',
})
export default class ConfirmDialog extends BaseComponent {
  @Prop({ required: true }) readonly dialog: boolean;
  @Prop() readonly title: string;
  toggle() {
    this.$emit('update:dialog', !this.dialog);
  }
  confirm() {
    this.toggle();
    this.$emit('confirm');
  }
}
</script>
<style></style>

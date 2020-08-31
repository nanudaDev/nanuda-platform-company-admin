<template>
  <v-dialog v-model="dialog" max-width="500" @click:outside="toggle()">
    <v-card>
      <v-card-title class="headline"
        >상담신청정보를 열람하시겠습니까?</v-card-title
      >

      <v-card-text>
        열람 유무가 Y로 체크되고 건당 5만원이 청구됩니다.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="toggle()">
          취소
        </v-btn>

        <v-btn color="green darken-1" text @click="agree()">
          동의
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'FounderConsultConfirmDialog',
})
export default class FounderConsultConfirmDialog extends BaseComponent {
  @Prop({ required: true }) readonly dialog: boolean;

  toggle() {
    this.$emit('update:dialog', !this.dialog);
  }
  agree() {
    this.toggle();
    this.$emit('agree');
  }
}
</script>
<style></style>

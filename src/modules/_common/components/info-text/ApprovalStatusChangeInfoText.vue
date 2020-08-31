<template>
  <div class="my-5">
    <v-alert type="info" dense outlined
      >정보 변경을 신청한 다음 나누다 키친의 관리자가 확인 및 승인 후 실제로
      변경되게 됩니다
    </v-alert>
    <v-alert type="info" dense outlined
      >정보 변경 신청을 하게되면 승인될때까지 본 사이트를 이용할수없게됩니다
    </v-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({ name: 'ApprovalStatusChangeInfoText' })
export default class ApprovalStatusChangeInfoText extends Vue {}
</script>

<style lang="scss"></style>

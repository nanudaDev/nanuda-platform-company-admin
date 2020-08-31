<template>
  <div>
    <div class="subtitle mb-3">{{ title }}</div>
    <v-card class="card pa-5" flat :loading="loading">
      <v-row align="center">
        <v-col>
          <ul class="u-list">
            <li>지점: {{ districtName }}</li>
            <li>타입: {{ typeName }}</li>
            <li>평수: {{ size }}</li>
            <li>보증금: {{ deposit }}</li>
            <li>관리비: {{ monthlyUtilityFee }}</li>
            <li>월세: {{ monthlyUtilityFee }}</li>
            <li>구좌현황: {{ `${lengthOfContracts}/${quantity}` }}</li>
          </ul>
        </v-col>
        <v-col>
          <v-row justify="center"
            ><v-btn class="primary" @click="$emit('click')"
              >상세 보기</v-btn
            ></v-row
          ></v-col
        >
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SpaceInfoCard extends Vue {
  @Prop() readonly title: string;
  @Prop() readonly loading: boolean;
  @Prop() readonly districtName: string;
  @Prop() readonly typeName: string;
  @Prop() readonly deposit: number | string;
  @Prop() readonly size: number | string;
  @Prop() readonly monthlyRentFee: number | string;
  @Prop() readonly monthlyUtilityFee: number | string;
  @Prop() readonly quantity: number | string;
  @Prop() readonly lengthOfContracts: number | string;
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

<template>
  <div>
    <v-row class="ma-2">
      <div class="subtitle">{{ title }}</div>
    </v-row>
    <v-card class="card pa-5" flat :loading="loading">
      <v-row align="center">
        <v-col>
          <ul class="u-list">
            <li>
              지점:
              {{ founderConsultDto.deliverySpace.companyDistrict.nameKr }}
            </li>
            <li>타입: {{ founderConsultDto.deliverySpace.typeName }}</li>
            <li>평수: {{ founderConsultDto.deliverySpace.size }}평</li>
            <li v-if="founderConsultDto.deliverySpace.deposit">
              보증금: {{ founderConsultDto.deliverySpace.deposit }} 만원
            </li>
            <li>
              관리비:
              {{ founderConsultDto.deliverySpace.monthlyUtilityFee }} 만원
            </li>
            <li>
              월세: {{ founderConsultDto.deliverySpace.monthlyRentFee }} 만원
            </li>
            <li>
              타입현황:
              {{
                `${founderConsultDto.deliverySpace.remainingCount}/${founderConsultDto.deliverySpace.quantity}`
              }}
            </li>
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { FounderConsultDto } from '@/dto';
@Component
export default class SpaceInfoCard extends Vue {
  @Prop() readonly title: string;
  @Prop() readonly loading: boolean;
  @Prop() readonly founderConsultDto: FounderConsultDto;
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

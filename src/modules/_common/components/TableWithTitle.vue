<template>
  <div>
    <v-row align="center" class="ma-2">
      <div class="subtitle">{{ title }}</div>
      <slot name="top"></slot>
    </v-row>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      class="elevation-1 mb-6"
      :hide-default-footer="hideFooter"
      style="height: calc(100% - 64px);"
      @click:row="onRowClicked"
    >
      <!-- <template v-slot:item.phone="{ item }">
        {{ formatPhoneNum(item.phone) }}
      </template> -->
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { formatPhoneNum } from '@/modules/_common/utils/formatPhoneNum';
@Component({
  name: 'TableWithTitle',
})
export default class TableWithTitle extends Vue {
  @Prop() readonly title: string;
  @Prop() readonly headers: any[];
  @Prop() readonly items: any[];
  @Prop() readonly hideFooter: boolean;
  @Prop({ default: true }) readonly disableLink: boolean;
  @Prop() readonly loading: boolean;
  @Prop() readonly route: boolean;
  @Prop() readonly params: object;
  formatPhoneNum(value) {
    return formatPhoneNum(value);
  }
  onRowClicked(value) {
    if (!this.disableLink) {
      this.$router.push({
        path: `${this.route}/${value.deliverySpaces.companyDistrictNo}`,
        query: { deliverySpaceNo: value.deliverySpaceNo },
      });
    }
  }
}
</script>

<style></style>

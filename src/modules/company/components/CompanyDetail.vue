<template>
  <div v-if="companyDto">
    <CompanyChangeDialog
      :dialog.sync="infoChangeDialog"
      @requested="getCompany()"
    ></CompanyChangeDialog>
    <CardWithTitle title="업체 정보" :loading="detailLoading">
      <template v-slot:top>
        <div>
          <v-btn
            color="primary"
            dark
            fab
            small
            depressed
            @click="infoChangeDialog = !infoChangeDialog"
            v-if="myRole === 'ADMIN_COMPANY_USER'"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card-text>
        <div>
          <div class="text-right">
            <v-chip
              v-if="companyDto.codeManagement"
              dark
              :color="getColor(companyDto.codeManagement.key)"
              class="mr-2"
            >
              {{ companyDto.codeManagement.value }}
            </v-chip>
          </div>
          <v-row
            v-if="companyDto.logo && companyDto.logo.length > 0"
            align="center"
            justify="center"
            class="my-4"
          >
            <div
              v-for="logo in companyDto.logo"
              :key="logo.endpoint"
              style="background-color: white;"
            >
              <v-img
                :src="logo.endpoint"
                max-width="200"
                max-height="200"
              ></v-img>
            </div>
          </v-row>
          <ul class="u-list">
            <li>업체명: {{ companyDto.nameKr }}</li>
            <li>대표: {{ companyDto.ceoKr }}</li>
            <li>전화번호: {{ companyDto.phone }}</li>
            <li>주소: {{ companyDto.address }}</li>
            <li>이메일: {{ companyDto.email }}</li>
            <li v-if="companyDto.fax">팩스: {{ companyDto.fax }}</li>
            <li v-if="companyDto.website">
              웹사이트:
              <a :href="companyDto.website" target="_blank">
                {{ companyDto.website }}
              </a>
            </li>
          </ul>
        </div>
      </v-card-text>
    </CardWithTitle>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { CompanyDto } from '@/dto/company/company.dto';
import companyService from '@/services/company.service';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import CompanyChangeDialog from '@/modules/company/components/CompanyChangeDialog.vue';
import store from '@/store';

import { getColor } from '@/modules/_common/utils/getColor';

@Component({
  name: 'CompanyDetail',
  components: { CardWithTitle, CompanyChangeDialog },
})
export default class CompanyDetail extends BaseComponent {
  private companyDto = new CompanyDto();
  private infoChangeDialog = false;
  private detailLoading = false;

  get myRole() {
    return store.state.myRole;
  }

  getColor(status) {
    return getColor(status);
  }

  getCompany() {
    this.detailLoading = true;
    companyService.findOne().subscribe(res => {
      this.companyDto = res.data;
      this.detailLoading = false;
    });
  }
  mounted() {
    this.getCompany();
  }
  activated() {
    this.getCompany();
  }
}
</script>

<style></style>

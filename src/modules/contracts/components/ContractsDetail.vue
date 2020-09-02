<template>
  <div>
    <ConfirmDialog
      :dialog.sync="deleteDialog"
      title="계약을 삭제하시겠습니까? 한번 삭제하면 다신 복구할수없습니다"
      @confirm="deleteContract()"
    ></ConfirmDialog>
    <v-row>
      <v-col cols="12" sm="6">
        <TableWithTitle
          title="계약인 정보"
          :headers="nanudaUserTableHeader"
          :items="[contractDto.nanudaUser]"
          hideFooter
        ></TableWithTitle>
      </v-col>
      <v-col cols="12" sm="6">
        <TableWithTitle
          title="신청공간 정보"
          :headers="spaceTableHeader"
          :items="[contractDto.deliverySpace]"
          hideFooter
        ></TableWithTitle>
      </v-col>
    </v-row>
    <v-row justify="end"
      ><v-btn class="error mr-5" @click="deleteDialog = true"
        >삭제하기</v-btn
      ></v-row
    >
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import contractService from '@/services/contract.service';
import { ContractDto } from '@/dto/contract/contract.dto';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import TableWithTitle from '@/modules/_common/components/TableWithTitle.vue';
import ConfirmDialog from '@/modules/_common/components/dialogs/ConfirmDialog.vue';

@Component({
  name: 'ContractsDetail',
  components: {
    CardWithTitle,
    TableWithTitle,
    ConfirmDialog,
  },
})
export default class ContractsDetail extends BaseComponent {
  private contractDto = new ContractDto();
  private detailLoading = false;
  private deleteDialog = false;
  private nanudaUserTableHeader = [
    {
      text: '이름',
      value: 'name',
      align: 'center',
      sortable: false,
    },
    {
      text: '전화번호',
      value: 'phone',
      align: 'center',
      sortable: false,
    },
    {
      text: '성별',
      value: 'gender',
      align: 'center',
      sortable: false,
    },
  ];
  private spaceTableHeader = [
    {
      text: '지점명',
      value: 'companyDistrict.nameKr',
      align: 'center',
      sortable: false,
    },
    {
      text: '공간 타입',
      value: 'typeName',
      align: 'center',
      sortable: false,
    },
  ];
  getDetail() {
    this.detailLoading = true;
    contractService.findOne(this.$route.params.id).subscribe(res => {
      this.detailLoading = false;
      this.contractDto = res.data;
    });
  }
  deleteContract() {
    contractService.deleteOne(this.$route.params.id).subscribe(res => {
      if (res) {
        this.$router.go(-1);
        this.$toasted.global.custom_success({ message: '삭제 성공!' });
      }
    });
  }
  created() {
    this.getDetail();
  }
}
</script>
<style></style>

import { Component, Vue } from 'vue-property-decorator';
import { FOUNDER_CONSULT } from '@/services/shared';
@Component
class FounderConsultMixin extends Vue {
  toSelectedItemPage(value) {
    console.log('row value', value);
    // if (
    //   value.status === FOUNDER_CONSULT.F_DIST_COMPLETE &&
    //   value.viewCount === YN.N
    // ) {
    //   this.clickedRowNo = value.no;
    //   this.confirmDialog = !this.confirmDialog;
    // } else if (
    //   value.status === FOUNDER_CONSULT.F_DIST_COMPLETE &&
    //   value.viewCount === YN.Y
    // ) {
    // this.$router.push(`/founder-consult/${value.no}`);
    // }
    if (value.status === FOUNDER_CONSULT.F_DIST_COMPLETE) {
      this.$router.push(`/founder-consult/${value.no}`);
    } else {
      this.$toasted.global.custom_info({
        message: '전달완료가 끝난 상담신청만 열람 가능합니다',
      });
    }
  }
}
export default FounderConsultMixin;

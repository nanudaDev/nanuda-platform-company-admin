// import { Component, Vue, Watch } from 'vue-property-decorator';
// import { Pagination } from '@/common/interfaces/pagination.type';

// @Component
// export default class pagenationMixin extends Vue {
//   private pagination = new Pagination();
//   readonly listCount: number;
//   readonly getList;
//   constructor(listCount, getList) {
//     super();
//     this.listCount = listCount;
//     this.getList = getList;
//   }

//   get pageCount(): number {
//     return Math.ceil(this.listCount / this.pagination.limit);
//   }
//   //pagination 객체가 변할때마다 리스트를 새로가져옴
//   @Watch('pagination', {
//     deep: true,
//   })
//   paginationChanged() {
//     this.getList();
//   }
// }

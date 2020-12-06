<template>
  <v-container v-if="noticeBoardDto">
    <v-card class="px-2">
      <v-card-title
        class="display-1 text--primary justify-content-between align-items-end mb-4"
      >
        <div>
          <v-chip
            color="orange"
            label
            small
            class="notice-board-category mb-4"
            >{{ noticeBoardDto.noticeBoardType | enumTransformer }}</v-chip
          >
          <h3 class="notice-board-title">{{ noticeBoardDto.title }}</h3>
        </div>
        <div>
          <span class="notice-board-date caption">
            {{ noticeBoardDto.createdAt | dateTransformer }}
          </span>
        </div>
      </v-card-title>
      <v-row justify="end" class="pa-2">
        <v-chip
          class="ma-1 pa-3"
          v-for="item in noticeBoardDto.attachments"
          :key="item.key"
          @click="downloadWithVueResource(item.endpoint, item.originFilename)"
          >{{ item.originFilename }}</v-chip
        >
      </v-row>

      <v-card-text>
        <div v-html="noticeBoardDto.content" style="min-height:300px;">
          {{ noticeBoardDto.content }}
        </div>
      </v-card-text>
    </v-card>
    <div class="text-right mt-4">
      <v-btn color="secondary" @click="$router.push('/notice-board')"
        >목록으로</v-btn
      >
    </div>
  </v-container>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import noticeBoardService from '@/services/notice-board.service';
import { NoticeBoardDto } from '@/dto/notice-board/notice-board.dto';

@Component({
  name: 'NoticeBoardDetail',
})
export default class NoticeBoardDetail extends BaseComponent {
  private noticeBoardDto = new NoticeBoardDto();

  getDetail() {
    noticeBoardService.findOne(this.$route.params.id).subscribe(res => {
      this.noticeBoardDto = res.data;
    });
  }
  forceFileDownload(response, fileName) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); //or any other extension
    document.body.appendChild(link);
    link.click();
  }
  downloadWithVueResource(filePath, fileName) {
    this.$http.get(filePath, { responseType: 'arraybuffer' }).then(res => {
      this.forceFileDownload(res, fileName);
    });
  }
  created() {
    this.getDetail();
  }
}
</script>
<style></style>

import Vue from 'vue';

export const downloadWithVueResource = (filePath, fileName) => {
  //     const forceFileDownload = (response, fileName) => {
  //         const url = window.URL.createObjectURL(new Blob([response.data]));
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.setAttribute("download", fileName); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();
  //       }
  //   Vue.http({
  //     method: 'get',
  //     url: filePath,
  //     responseType: 'arraybuffer',
  //   })
  //     .then(response => {
  //       this.forceFileDownload(response, fileName);
  //     })
  //     .catch(() => console.log('error occured'));
};

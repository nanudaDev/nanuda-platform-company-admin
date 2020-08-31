import moment from 'moment';
import Vue from 'vue';

export const DatePipeTransformer = () =>
  Vue.filter('dateTransformer', (value: Date | string): string => {
    if (!value) {
      return;
    }
    return moment(String(value)).format('YYYY/MM/DD hh:mm A');
  });

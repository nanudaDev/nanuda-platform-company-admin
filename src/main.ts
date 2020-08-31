import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '../src/router';
import '@/router/router-guard';
import vuetify from '@/plugins/vuetify';
import EmptyLayout from '@/modules/_layouts/Empty.layout.vue';
import MainLayout from '@/modules/_layouts/Main.layout.vue';
import CardWithTitle from '@/modules/_common/components/CardWithTitle.vue';
import CommonTable from '@/modules/_common/components/CommonTable.vue';
import TableWithTitle from '@/modules/_common/components/TableWithTitle.vue';
import { EnumPipeTransformer, DatePipeTransformer } from '@/core';
import '@/core/pipes/index';
import vueMoment from 'vue-moment';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import '@/plugins/vue-toasted';
import VueResource from 'vue-resource';
Vue.config.productionTip = false;

EnumPipeTransformer();
DatePipeTransformer();

Vue.use(vuetify);
Vue.use(vueMoment);
Vue.use(VueResource);

Vue.component('EmptyLayout', EmptyLayout);
Vue.component('MainLayout', MainLayout);
Vue.component('CardWithTitle', CardWithTitle);
Vue.component('CommonTable', CommonTable);
Vue.component('TableWithTitle', TableWithTitle);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

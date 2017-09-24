import Vue from 'vue';
import axios from 'axios';
import VueElectron from 'vue-electron';
import low from 'lowdb';

import FileSync from 'lowdb/adapters/FileSync';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import VeeValidate from 'vee-validate';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(VueElectron);

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ passwords: [], setting: {} })
  .write();

Vue.use(VeeValidate);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

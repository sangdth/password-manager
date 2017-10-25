import Vue from 'vue';
import axios from 'axios';
import VueElectron from 'vue-electron';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import _ from 'lodash';

import 'bulma/css/bulma.css';
// import 'animate.css/animate.min.css';
import 'font-awesome/css/font-awesome.css';

import App from './App';
import router from './router';
import store from './store';
import db from './datastore';

if (!process.env.IS_WEB) Vue.use(VueElectron);

Vue.use(VeeValidate);
Vue.use(VueClipboard);

Vue.prototype.$http = axios;
Vue.prototype.$db = db;
Vue.prototype._ = _;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  db,
  template: '<App/>',
}).$mount('#app');

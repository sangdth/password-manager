import Vue from 'vue';
import axios from 'axios';
import VeeValidate from 'vee-validate';

import App from './App';
import router from './router';
import store from './store';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.use(VeeValidate);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// Vue.prototype.$db = db;
// db.info().then(function (info) {
//   console.log(info);
// }) 
// day la doan su dung pouchdb
// Vue.prototype.$db = db


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');

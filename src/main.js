import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';

import App from './App';
import router from './router';
import store from './store';
import api from './common/api.services';
import i18n from './common/i18n';
import './plugins/element';

api.init();

// change fieldsBagName to avoid conflict with ElementUI
// read more at https://github.com/ElemeFE/element/issues/4720
Vue.use(VeeValidate, { fieldsBagName: 'vFields' });
Vue.use(VueClipboard);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

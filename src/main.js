import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import VueProgressbar from 'vue-progressbar';

import App from './App';
import router from './router';
import store from './store';
import api from './common/api.services';
import simpleCrypto from './common/simple.crypto';
import i18n from './common/i18n';
import './plugins/element';

api.init();

// change fieldsBagName to avoid conflict with ElementUI
// read more at https://github.com/ElemeFE/element/issues/4720
Vue.use(VeeValidate, { fieldsBagName: 'vFields' });
Vue.use(VueClipboard);
Vue.use(VueProgressbar, {
  thickness: '4px',
});

// Set up global encode and decode
Vue.prototype.$encode = (s, p) => simpleCrypto.encode(JSON.stringify(s), p);
Vue.prototype.$decode = (s, p) => JSON.parse(simpleCrypto.decode(s, p));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';

import App from './App';
import router from './router';
import store from './store';
import api from './common/api.services';
import simpleCrypto from './common/simple.crypto';
import i18n from './common/i18n';
import './plugins/element';

api.init();
Vue.use(VueClipboard);

// Set up global encode and decode
Vue.prototype.$encode = (s, p) => simpleCrypto.encode(JSON.stringify(s), p);
Vue.prototype.$decode = (s, p) => JSON.parse(simpleCrypto.decode(s, p));

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.performance = true;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

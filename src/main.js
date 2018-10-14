import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import 'element-ui/lib/theme-chalk/display.css';

import App from './App';
import router from './router';
import store from './store';
import api from './common/api.services';
import i18n from './common/i18n';
import './plugins/element';

api.init();

Vue.use(VeeValidate);
Vue.use(VueClipboard);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

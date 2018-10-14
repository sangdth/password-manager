import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
  .config('https://43389517c19046dfae956c547b7b7ac4@sentry.io/1300632')
  .addPlugin(RavenVue, Vue)
  .install();

const api = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = process.env.NODE_ENV === 'production'
      ? '' // let user config their gist here
      : ''; // also dev part
  },

  setHeaders(token, callback) {
    Vue.axios.defaults.headers.common.Authorization = `Token ${token}`;
    callback();
  },

  get(resource) {
    return Vue.axios
      .get(resource)
      .catch((e) => {
        Raven.captureException(e);
        throw e;
      });
  },

  query(resource, slug = '') {
    return Vue.axios
      .get(`${resource}?${slug}`)
      .catch((e) => {
        Raven.captureException(e);
        throw e;
      });
  },

  post(resource, data) {
    return Vue.axios
      .post(resource, data)
      .catch((e) => {
        Raven.captureException(e);
        throw e;
      });
  },

  put(resource, data) {
    return Vue.axios
      .put(resource, data)
      .catch((e) => {
        Raven.captureException(e);
        throw e;
      });
  },

  delete(resource) {
    return Vue.axios
      .delete(resource)
      .catch((e) => {
        Raven.captureException(e);
        throw e;
      });
  },
};

export default api;

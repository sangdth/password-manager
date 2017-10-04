import Vue from 'vue';
import Router from 'vue-router';
import PasswordTable from '../components/PasswordTable';
import Setting from '../components/Setting'; // Replace @/ with ../ to stop eslint

Vue.use(Router);

export default new Router({
  mode: 'hash', 
  routes: [
    {
      path: '/',
      name: 'home',
      component: PasswordTable,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
  ],
});

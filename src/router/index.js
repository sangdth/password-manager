import Vue from 'vue';
import Router from 'vue-router';
import PasswordTable from '../views/PasswordTable';
import Setting from '../views/Setting';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'password-table',
      component: PasswordTable,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
  ],
});

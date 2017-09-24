import Vue from 'vue';
import Router from 'vue-router';
import PasswordTable from '@/components/PasswordTable';
import Setting from '@/components/Setting';

Vue.use(Router);

export default new Router({
  mode: 'history',
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

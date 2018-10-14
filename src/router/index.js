import Vue from 'vue';
import Router from 'vue-router';
import PasswordTable from '../views/PasswordTable';
import Setting from '../views/Setting';
import SigninForm from '../components/SigninForm';

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
    {
      path: '/signin',
      name: 'signin',
      component: SigninForm,
    },
  ],
});

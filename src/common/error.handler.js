import { Message, MessageBox } from 'element-ui';
import i18n from '@/common/i18n';
import router from '@/router';
import store from '@/store';

export default (error, message) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // response has: status, headers, and data.
    switch (error.response.status) {
      case 400:
        Message({
          showClose: true,
          message: message || i18n.t('errors.bad_request'),
          type: 'error',
        });
        break;
      case 401:
        MessageBox.alert(
          // if token invalid and cause 401, signout user
          // and ask them sign in again
          i18n.t('errors.unauthorized'),
          {
            confirmButtonText: i18n.t('general.yes'),
            callback: () => {
              store.dispatch('moduleAuth/SIGNOUT');
              router.push('/signin');
            },
          },
        );
        break;
      case 403:
        Message({
          showClose: true,
          message: message || i18n.t('errors.access_denied'),
          type: 'error',
        });
        break;
      case 410:
        Message({
          showClose: true,
          message: message || i18n.t('errors.code_used'),
          type: 'error',
        });
        break;
      case 500:
        Message({
          showClose: true,
          message: message || i18n.t('errors.network_error'),
          type: 'error',
        });
        break;
      default:
        Message({
          showClose: true,
          message: message || i18n.t('errors.something_wrong'),
          type: 'error',
        });
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    Message({
      showClose: true,
      message: message || i18n.t('errors.network_error') + error.request,
      type: 'error',
    });
  } else {
    Message({
      showClose: true,
      message: message || i18n.t('errors.something_wrong') + error.message,
      type: 'error',
    });
  }
};

import storage from 'electron-json-storage';
import api from '@/common/api.services';
import errorHandler from '@/common/error.handler';
import { SIGN_IN, SET_AUTH } from '@/store/types';
// import simpleCrypto from '@/common/simple.crypto';

const state = {
  isAuthed: false,
  dummy: '',
};

const getters = {
  isAuthed: state => state.isAuthed,
};

const actions = {
  async [SIGN_IN]({ commit, dispatch }, formData) {
    try {
      const setHead = await api.setHeaders(formData.token);

      storage.set('user-data', formData, e => e);

      if (formData.gistId.length > 0 && setHead.success) {
        // console.log('start dispatch');
        await dispatch('gist/GET_GIST', formData.gistId, { root: true })
          .then((response) => {
            if (response.status === 200) {
              commit(SET_AUTH, true);
            }
            return response;
          })
          .catch((e) => {
            errorHandler(e);
          });
      }
    } catch (e) {
      errorHandler(e);
    }
  },
};

const mutations = {
  [SET_AUTH](state, status) {
    console.log('run set auth');
    state.isAuthed = status;
  },
};

/*
if (formData.newGist) {
  console.log('start dispatch new gist');
  dispatch(
    'gist/CREATE_GIST',
    {
      description: 'Data of Password Manager app',
      public: false,
      files: {
        'Password Manager': {
          content: simpleCrypto.encode('Hello World', formData.passphrase),
        },
      },
    },
    { root: true },
  )
    .then(res => res)
    .catch(error => error);
}
*/
export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};


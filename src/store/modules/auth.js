import storage from 'electron-json-storage';
import api from '../../common/api.services';
import errorHandler from '../../common/error.handler';
import simpleCrypto from '../../common/simple.crypto';
import { SIGN_IN, SET_AUTH } from '../types';

const state = {
  isAuthed: false,
};

const getters = {
  isAuthed: state => state.isAuthed,
};

const actions = {
  async [SIGN_IN]({ commit, dispatch }, formData) {
    // Prepare data
    // If we have token, save it to storage
    try {
      console.log('formData', formData);
      api.setHeaders(formData.token, () => {});
      storage.set(
        'user-data',
        {
          token: formData.token,
          passphrase: formData.passphrase,
        },
        (e) => {
          console.log('callback with e');
          if (e) return e;
        },
      );

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
      // const response = await api.get('/gists');
      // commit(SET_AUTH);
      // return response;
    } catch (e) {
      console.log('here here here', e);
      errorHandler(e);
    }
    throw new Error('SIGN_IN got error');
  },
};

const mutations = {
  [SET_AUTH](state, data) {
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};


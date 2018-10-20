import storage from 'electron-json-storage';
import api from '@/common/api.services';
import errorHandler from '@/common/error.handler';
import {
  SIGN_IN,
  SET_AUTH,
  GET_USER_DATA,
  SET_USER_DATA,
  REMOVE_USER_DATA,
} from '@/store/types';

const state = {
  isAuthed: false,
  userData: null,
  dummy: '',
};

const getters = {
  isAuthed: state => state.isAuthed,
  userData: state => state.userData,
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

  [GET_USER_DATA]({ commit }) {
    return new Promise((resolve, reject) => {
      storage.get('user-data', (error, data) => {
        if (data.passphrase.length > 0) {
          localStorage.setItem('first-time', 'false');
          commit(SET_USER_DATA, data);
          resolve({ data });
        } else if (error) {
          localStorage.setItem('first-time', 'true');
          reject(new Error(error));
        } else {
          reject(new Error('[GET_USER_DATA] Something wrong.'));
        }
      });
    });
  },

  [REMOVE_USER_DATA]({ commit }) {
    return new Promise((resolve, reject) => {
      storage.remove('user-data', (error) => {
        if (error) {
          reject(new Error(error));
        } else {
          commit(SET_USER_DATA, {});
          resolve('Deleted!');
        }
      });
    });
  },
};

const mutations = {
  [SET_AUTH](state, status) {
    console.log('run set auth');
    state.isAuthed = status;
  },

  [SET_USER_DATA](state, userData) {
    state.userData = userData;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};


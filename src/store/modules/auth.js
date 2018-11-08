import storage from 'electron-json-storage';
// import api from '@/common/api.services';
// import errorHandler from '@/common/error.handler';
import {
  SET_AUTH,
  GET_USER_DATA,
  SET_USER_DATA,
  REMOVE_USER_DATA,
  CLEAR_ALL_DATA,
} from '@/store/types';

const state = {
  isAuthed: false,
  userData: {},
  dummy: '',
};

const getters = {
  isAuthed: state => state.isAuthed,
  userData: state => state.userData,
};

const actions = {
  [GET_USER_DATA]({ commit }) {
    return new Promise((resolve, reject) => {
      storage.get('user-data', (error, data) => {
        if (data.passphrase) {
          commit(SET_USER_DATA, data);
          resolve(data);
        } else if (error) {
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

  [CLEAR_ALL_DATA]({ commit }) {
    return new Promise((resolve, reject) => {
      storage.clear((error) => {
        if (error) {
          reject(new Error(error));
        } else {
          commit(SET_USER_DATA, {});
          resolve('Cleared!');
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


import storage from 'electron-json-storage';
import errorHandler from '@/common/error.handler';
import {
  GET_PASSWORDS,
  SET_PASSWORDS,
} from '@/store/types';

const state = {
  localPasswords: null,
};

const getters = {
  localPasswords: state => state.localPasswords,
};

const actions = {
  [GET_PASSWORDS]({ commit }) {
    try {
      storage.get('local-passwords', (error, data) => {
        if (error) throw error;
        commit(SET_PASSWORDS, data);
      });
    } catch (e) {
      errorHandler(e);
    }
  },
};

const mutations = {
  [SET_PASSWORDS](state, passwords) {
    state.localPasswords = passwords;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};


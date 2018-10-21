// import storage from 'electron-json-storage';
import api from '../../common/api.services';
import errorHandler from '../../common/error.handler';
import {
  GET_GIST,
  SET_GIST,
  EDIT_GIST,
  CREATE_GIST,
} from '../types';

const state = {
  passwords: [],
  rawData: {},
};

const getters = {
  passwords: state => state.passwords,
  rawData: state => state.rawData,
};

const actions = {
  async [GET_GIST]({ commit }, gistId) {
    try {
      const response = await api.get(`/gists/${gistId}`);
      commit(SET_GIST, response.data);
      return response;
    } catch (e) {
      errorHandler(e);
    }
    throw new Error('GET_DATA got error');
  },

  async [CREATE_GIST]({ commit }, data) {
    try {
      const response = await api.post('/gists', data);
      commit(SET_GIST, response.data);
      return response;
    } catch (e) {
      errorHandler(e);
    }
    throw new Error('CREATE_GIST got error');
  },

  async [EDIT_GIST]({ commit }, data) {
    try {
      const response = await api.patch(`/gists/${data.id}`, data.gist);
      commit(SET_GIST, response.data);
      return response;
    } catch (e) {
      errorHandler(e);
    }
    throw new Error('EDIT_GIST got error');
  },
};

const mutations = {
  [SET_GIST](state, data) {
    state.rawData = data;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};


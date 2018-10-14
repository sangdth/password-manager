import api from '../../common/api.services';
import errorHandler from '../../common/error.handler';
import {
  GET_DATA,
  SET_DATA,
  CREATE_GIST,
} from '../types';

const gistId = '34b3e32f2c866cdcaa74f5c56d6924b5';

const state = {
  passwords: [],
  rawData: {},
};

const getters = {
  passwords: state => state.passwords,
  rawData: state => state.rawData,
};

const actions = {
  async [GET_DATA]({ commit }) {
    try {
      const response = await api.get(`/gists/${gistId}`);
      commit(SET_DATA, response.data.files);
      return response;
    } catch (e) {
      errorHandler(e);
    }
    throw new Error('GET_DATA got error');
  },

  async [CREATE_GIST]({ commit }, data) {
    console.log('CREATE_GIST', data);
    try {
      const response = await api.post('/gists', data);
      console.log('response CREATE_GIST', response);
      commit(SET_DATA, response.data.files);
      return response;
    } catch (e) {
      errorHandler(e);
    }
    throw new Error('CREATE_GIST got error');
  },
};

const mutations = {
  [SET_DATA](state, data) {
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


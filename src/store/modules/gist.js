import api from '../../common/api.services';
import errorHandler from '../../common/error.handler';
import { GET_DATA } from '../types';

const gistId = '34b3e32f2c866cdcaa74f5c56d6924b5';

const state = {
  passwords: [],
};

const getters = {
  passwords: state => state.passwords,
};

const actions = {
  async [GET_DATA]({ commit }) {
    try {
      const response = await api.get(`/gists/${gistId}`);
      console.log(response);
      commit('SET_DATA', response);
      return response;
    } catch (e) {
      errorHandler(e);
    }
    throw new Error('GET_DATA got error');
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
};


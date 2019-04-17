import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const images = {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    setList(state, { list }) {
      state.list = list;
    },
  },
  actions: {
    init({ commit }, list) {
      commit('setList', { list });
    },
  },
  getters: { },
};

export default new Vuex.Store({
  modules: {
    images,
  },
  strict: debug,
});

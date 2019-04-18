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
      state.list = list.map(l => ({ ...l, canvas: null }));
    },

    setCanvas(state, { canvas, index }) {
      state.list[index].canvas = canvas;
    },
  },
  actions: {
    init({ commit }, list) {
      commit('setList', { list });
    },

    updateImageResized({ commit }, { canvas, index }) {
      commit('setCanvas', { canvas, index });
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

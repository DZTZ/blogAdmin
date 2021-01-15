import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedKeys: []
  },
  mutations: {
    setSelectedKeys(state, selectedKeys) {
      state.selectedKeys = selectedKeys;
    }
  },
  actions: {},
  modules: {}
});

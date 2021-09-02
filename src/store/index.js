import Vue from 'vue'
import Vuex from 'vuex'

import userdata from "./modules/userdata";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userdata,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

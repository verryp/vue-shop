import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideBar: false,
  },

  mutations: {
    setSideBar: (state, value) => {
      state.sideBar = value
    },
  },

  actions: {
    setSideBar: ({commit}, value) => {
      commit('setSideBar', value)
    },
  },

  getters: {
    sideBar: state => state.sideBar,
  },
})

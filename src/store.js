import Vue from 'vue'
import Vuex from 'vuex'
import cart from './store/cart'
import alert from './store/alert'
import slide from './store/slide'
import dialog from './store/dialog'
import auth from './store/auth'
import region from './store/region'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prevUrl: '',
    payment: []
  },

  mutations: {
    setPrevUrl: (state, value) => {
      state.prevUrl = value
    },

    setPayment: (state, value) => {
      state.payment = value
    },
  },

  actions: {
    setPrevUrl: ({commit}, value) => {
      commit('setPrevUrl', value)
    },

     setPayment: ({commit}, value) => {
       commit('setPayment', value)
     }
  },

  getters: {
    prevUrl: state => state.prevUrl,
    payment: state => state.payment
  },

  modules: {
    cart,
    alert,
    slide,
    dialog,
    auth,
    region
  }
})

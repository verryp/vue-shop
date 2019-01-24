import Vue from 'vue'
import Vuex from 'vuex'
import cart from './store/cart'
import alert from './store/alert'
import slide from './store/slide'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    cart,
    alert,
    slide,
  }
})

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#1F9CEB',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FE2124',
    info: '#3DDAFE',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md',
})

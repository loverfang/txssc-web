import Vue from 'vue'
import App from './App.vue'

import Cookies from 'js-cookie'
import Element from 'element-ui'
import './styles/element-variables.scss'

import router from './router'
import store from './store'
import request from '@/utils/request'

Vue.prototype.$request = request

Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

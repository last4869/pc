import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './api/api'
import './plugins/iview.js'
import './plugins/element.js'
import './plugins/vueLazyload.js'
import './assets/css/reset.css'
import './assets/css/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

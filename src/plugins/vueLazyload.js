import VueLazyload from 'vue-lazyload'
import Vue from 'vue'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 1
})

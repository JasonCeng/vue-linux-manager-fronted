// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// add this after Vue import
import VeeValidate from 'vee-validate'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

// add these before Vue is instantiated
window.axios = axios
axios.defaults.baseURL = 'http://120.78.183.194:3334'

// register vee validate plugin
// const config = {
//   // errorBagName: 'errorBags', // change if property conflicts.
//   fieldsBagName: 'fieldBags'
// }
Vue.use(VeeValidate)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

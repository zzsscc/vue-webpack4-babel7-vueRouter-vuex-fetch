require("core-js")
import Vue from 'vue'
import Router from 'vue-router'
import App from './APP'
import Variable from 'utils/variable'
import router from 'router/init'
import store from 'store'

Vue.use(Router)

Variable.vm = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

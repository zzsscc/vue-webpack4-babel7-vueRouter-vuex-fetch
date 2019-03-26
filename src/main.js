require("core-js")
import Vue from 'vue'
import Router from 'vue-router'
import App from './APP'
import Variable from 'utils/variable'
import router from 'router/init'

Vue.use(Router)

Variable.vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

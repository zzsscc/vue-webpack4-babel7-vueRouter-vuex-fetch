require("core-js");
import Vue from 'vue';
import App from './APP';
import Variable from 'utils/variable';
import router from 'router/init';

Variable.vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

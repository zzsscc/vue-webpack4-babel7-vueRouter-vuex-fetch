require("core-js");
import Vue from 'vue';
import App from './APP';
import Variable from 'utils/variable';

Variable.vm = new Vue({
  render: h => h(App),
}).$mount('#app')

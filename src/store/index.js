import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: ['dev', 'development'].includes(process.env.NODE_ENV),
  state,
  getters,
  mutations
})

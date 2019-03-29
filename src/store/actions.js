import {
  TEST_ACTION,
  FETCHCONFIG_ACTION
} from './action-types'

import {
  ADDCOUNT_MUTATION,
  CHANGECONFIG_MUTATION
} from './mutation-types'

export default {
  /**
   * @description: actions general for async
   * @param context 一个与 store 实例具有相同方法和属性的 context 对象
   * {
   *    @param commit
   *    @param state
   *    @param getters
   *    @param dispatch
   *    @param rootState
   *    @param rootGetters
   * }
   * @param {object} params 参数
   * @success: {string}
   * @failure: {object}
   */
  [TEST_ACTION]({ state, getters, commit, dispatch, rootState, rootGetters }, params) {
    return new Promise(() => {
      setTimeout(() => {
        commit(ADDCOUNT_MUTATION, params)
      }, 1500)
    })
  },
  async [FETCHCONFIG_ACTION]({ state, getters, commit, dispatch, rootState, rootGetters }, params) {
    await setTimeout(() => {}, 1000)
    commit(CHANGECONFIG_MUTATION, params)
  }
}

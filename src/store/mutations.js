import {
  ADDCOUNT_MUTATION,
  PUSHDATA_MUTATION
} from './mutation-types'

export default {
  /**
   * @description: Mutation
   * @param state 状态树
   * @param {object} params 参数
   * @success: {string}
   * @failure: {object}
   */
  [ADDCOUNT_MUTATION](state, params = {}) {
    const { count } = params
    if (count || count === 0) {
      state.count += count
    } else {
      state.count++
    }
    if (state.count > 20) {
      state.count = 0
    }
  },
  [PUSHDATA_MUTATION](state, params = {}) {
    const { data } = params
    const { c } = state.data
    state.data.c = [...c, ...data] // 不能使用c = [...c, ...data]的方式赋值，实际state并未改变
  }
}

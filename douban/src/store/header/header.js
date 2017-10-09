/**
 * Created by Administrator on 2017/10/1.
 */
import * as types from '../types-mutations'
const state = {
  isShow: true
}

const getters = {
  Showing: state => state.isShow
}

const mutations = {
  [types.SHOW](state) {
    state.isShow = !state.isShow
  }
}

export default {
  state,
  getters,
  mutations
}

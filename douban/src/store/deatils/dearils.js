/**
 * Created by Administrator on 2017/10/5.
 */
import * as types from '../types-mutations'
import Vue from 'vue'
const state = {
  images: [],
  OBJ: {}
}

const getters = {
  showObj: state => state.OBJ,
  imagesArr: state => state.images
}
const mutations = {
  [types.LAZY](state, {obj}) {
    let H = window.innerHeight
    let S = document.documentElement.scrollTop || document.body.scrollTop
    if (obj) {
      for (let i = 0; i < obj.length; i++) {
        if (H + S > obj[i].getBoundingClientRect().top) {
          state.images.push(obj[i].getAttribute('data-src'))
          console.log(state.images)
          Vue.set(state.OBJ, i, true)
        }
      }
    }
  }
}
const actions = {
  lazy({commit}, {obj}) {
    commit(types.LAZY, {obj})
    window.addEventListener('scroll', () => {
      commit(types.LAZY, {obj})
    })
  }
}

// function getTop(e) {
//   let T = e.offsetTop
//   while (e.offsetParent) {
//     e = e.offsetParent
//     T += e.offsetParent
//   }
//   return T
// }

export default {
  state,
  getters,
  mutations,
  actions
}

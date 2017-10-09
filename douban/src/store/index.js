/**
 * Created by Administrator on 2017/10/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import header from './header/header'
import deatils from './deatils/dearils'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  modules: {
    header,
    deatils
  }
})

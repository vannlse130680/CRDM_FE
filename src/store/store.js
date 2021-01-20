import Vue from 'vue'
import Vuex from 'vuex'

import Login from './modules/Login'
Vue.use(Vuex)

// ストアオブジェクトを定義
const store = new Vuex.Store({
  namespaced: true,
  modules: {
    login: Login
  }
})

export default store
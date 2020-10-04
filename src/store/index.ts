import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = JSON.parse(window.localStorage.getItem('user') || 'null')

export default new Vuex.Store({
  state: {
    user: user // 当前登录用户状态
  },
  mutations: {
    // 修改容器数据必须使用 mutation 函数
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})

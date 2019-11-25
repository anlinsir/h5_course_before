import { local } from '@/libs/storage'

export default {
  state: {
    token: local.get('token') /* 用户token */,
    user: local.get('user') /* 用户信息 */
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user
  },
  mutations: {
    setToken (state, value) {
      state.token = value
      value ? local.set('token', value) : local.remove('token', value)
    },
    setUser (state, value) {
      state.user = value
      value ? local.set('user', value) : local.remove('user', value)
    }
  },
  actions: {
    login (state, { token, user }) {
      state.commit('setUser', user)
      state.commit('setToken', token)
    },
    logout (state) {
      state.commit('setUser')
      state.commit('setToken')
    }
  }
}

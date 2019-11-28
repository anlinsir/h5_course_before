import { local } from '@/libs/storage'

export default {
  state: {
    token: local.get('token') /* 用户token */,
    user: local.get('user'), /* 用户信息 */
    paperInfo: null, /* 试卷信息 */
    questionList: [] /* 题目列表 */
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
    getPaper: state => state.paperInfo,
    getQuestionList: state => state.questionList
  },
  mutations: {
    setToken (state, value) {
      state.token = value
      value ? local.set('token', value) : local.remove('token', value)
    },
    setUser (state, value) {
      state.user = value
      value ? local.set('user', value) : local.remove('user', value)
    },
    setPaperInfo (state, paper) {
      state.paperInfo = paper
      state.questionList = paper.paper_question.json_description.question_list
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

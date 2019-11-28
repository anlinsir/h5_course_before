
import fetch from '../../axios'

/* 获取试卷详情 */
export function diagnoseGetPaper (params) {
  return fetch.post({
    url: '/api/student/diagnose/getPaper',
    method: 'get',
    params
  })
}
/* 提交试卷 */
export function diagnoseAnswerQuestion (params) {
  return fetch.post({
    url: '/api/student/diagnose/answerQuestion',
    method: 'get',
    params
  })
}

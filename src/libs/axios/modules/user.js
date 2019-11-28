import fetch from '../../axios'

export function getCampusOptions (params) {
  return fetch.get({
    url: '/api/area/campus/positionOption',
    method: 'get',
    params
  })
}

/* 用户登录 */
export function Login (data) {
  return fetch.post({
    url: '/api/student/loginBySmsCode',
    method: 'post',
    data
  })
}

/* 获取验证码 */
export function sendSmsCode (data) {
  return fetch.post({
    url: '/api/student/sendSmsCode',
    method: 'post',
    data
  })
}

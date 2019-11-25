import fetch from '../../axios'

export function getCampusOptions (params) {
  return fetch.get({
    url: '/api/area/campus/positionOption',
    method: 'get',
    params
  })
}
export function getCampusList (params) {
  return fetch({
    url: '/api/area/campus/campusLists',
    method: 'get',
    params
  })
}

export function getCampusDetail (params) {
  return fetch({
    url: '/api/area/campus/campusDetail',
    method: 'get',
    params
  })
}

export const diagnose = [
  {
    path: '/diagnose',
    name: 'diagnose',
    component: () => import(/* webpackChunkName: "diagnose" */ '_views/diagnose/index')
  },
  {
    path: '/answer',
    name: 'answer',
    component: () => import(/* webpackChunkName: "diagnose" */ '_views/diagnose/answer')
  }
]

export default diagnose

export const statistics = [
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import(/* webpackChunkName: "statistics" */ '_views/statistics/index')
  }
]

export default statistics

import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/user/login'
import OverTime from '../views/error-page/over-time'
import Diag from './modules/diagnose'
import Statistics from './modules/statistics'

/* 按照模块进行路由加载 */
// import personalCenter from './modules/personal-center'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/over-time',
      name: 'over-time',
      component: OverTime
    },
    ...Diag,
    ...Statistics
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router

import Vue from 'vue'
import Router from 'vue-router'
import account from './account-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: account.accountEntry
    },
    {
      path: '/main',
      name: 'main',
      component: account.accountMain
    }
  ]
})
export default router

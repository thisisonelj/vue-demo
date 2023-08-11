import Vue from 'vue'
import Router from 'vue-router'
import account from './account-router'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: account.accountEntry
    },
    {
      path: '/main',
      name: 'main',
      component: account.accountMain,
      children: [
        {
          path: '/user',
          name: 'user',
          component: account.userManage,
          meta: { headerTitle: '用户管理' }
        },
        {
          path: '/role',
          name: 'role',
          component: account.roleManage,
          meta: { headerTitle: '角色管理' }
        },
        {
          path: '/power',
          name: 'power',
          component: account.powerManage,
          meta: { headerTitle: '权限管理' }
        },
        {
          path: '/cm-import',
          name: 'cmImport',
          component: account.cmImport,
          meta: { headerTitle: '出纳导入' }
        },
        {
          path: '/cm-manage',
          name: 'cmManage',
          component: account.cmManage,
          meta: { headerTitle: '出纳管理' }
        },
        {
          path: '/voucher-import',
          name: 'voucherImport',
          component: account.voucherImport,
          meta: { headerTitle: '凭证录入' }
        },
        {
          path: '/voucher-manage',
          name: 'voucherManage',
          component: account.voucherManage,
          meta: { headerTitle: '凭证管理' }
        },
        {
          path: '/system-setting',
          name: 'systemSetting',
          component: account.systemManage,
          meta: { headerTitle: '系统管理' }
        },
        {
          path: '/detail-book',
          name: 'detailBook',
          component: account.detailBook,
          meta: { headerTitle: '明细账' }
        },
        {
          path: '/balance-book',
          name: 'balanceBook',
          component: account.balanceBook,
          meta: { headerTitle: '余额账' }
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: account.userManage,
      meta: { headerTitle: '用户管理' }
    },
    {
      path: '/role',
      name: 'role',
      component: account.roleManage,
      meta: { headerTitle: '角色管理' }
    },
    {
      path: '/power',
      name: 'power',
      component: account.powerManage,
      meta: { headerTitle: '权限管理' }
    },
    {
      path: '/cm-import',
      name: 'cmImport',
      component: account.cmImport,
      meta: { headerTitle: '出纳导入' }
    },
    {
      path: '/cm-manage',
      name: 'cmManage',
      component: account.cmManage,
      meta: { headerTitle: '出纳管理' }
    },
    {
      path: '/voucher-import',
      name: 'voucherImport',
      component: account.voucherImport,
      meta: { headerTitle: '凭证录入' }
    },
    {
      path: '/voucher-manage',
      name: 'voucherManage',
      component: account.voucherManage,
      meta: { headerTitle: '凭证管理' }
    },
    {
      path: '/system-setting',
      name: 'systemSetting',
      component: account.systemManage,
      meta: { headerTitle: '系统管理' }
    },
    {
      path: '/detail-book',
      name: 'detailBook',
      component: account.detailBook,
      meta: { headerTitle: '明细账' }
    },
    {
      path: '/balance-book',
      name: 'balanceBook',
      component: account.balanceBook,
      meta: { headerTitle: '余额账' }
    }
  ]
})
export default router

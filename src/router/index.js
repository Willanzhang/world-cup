import Vue from 'vue'
import Router from 'vue-router'
import i18n from './../language'
Vue.use(Router)
const Home = () => import(/* webpackChunkName: "home" */'@/pages/home/home')
const Game = () => import('@/pages/game/game')
const UserCenter = () => import('@/pages/userCenter/userCenter')
const Kiting = () => import('@/pages/kiting/kiting')
export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve) => {
        require(['@/pages/home/home'], resolve)
      },
      meta: {
        // 首页
        title: i18n.t('meta.index')
      },
      redirect: `home/${i18n.locale}`
    },
    {
      path: `/home/${i18n.locale}`,
      name: 'homes',
      component: Home,
      meta: {
        // 首页
        title: i18n.t('meta.index')
      }
    },
    {
      path: `/game/${i18n.locale}`,
      name: 'game',
      component: Game,
      meta: {
        // 记录
        title: i18n.t('meta.game')
      }
    },
    {
      path: `/userCenter/${i18n.locale}`,
      name: 'userCenter',
      component: UserCenter,
      meta: {
        // 个人中心
        title: i18n.t('meta.userCenter')
      }
    },
    {
      path: `/kiting/${i18n.locale}`,
      name: 'kiting',
      component: Kiting,
      meta: {
        // 提现
        title: i18n.t('meta.kiting')
      }
    }
  ]
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: (resolve) => {
  //       require(['@/pages/home/home'], resolve)
  //     },
  //     meta: {
  //       // 首页
  //       title: i18n.t('meta.index')
  //     },
  //     redirect: `home/${i18n.locale}`
  //   },
  //   {
  //     path: `/home/${i18n.locale}`,
  //     name: 'homes',
  //     component: (resolve) => {
  //       require(['@/pages/home/home'], resolve)
  //     },
  //     meta: {
  //       // 首页
  //       title: i18n.t('meta.index')
  //     }
  //   },
  //   {
  //     path: `/game/${i18n.locale}`,
  //     name: 'game',
  //     component: (resolve) => {
  //       require(['@/pages/game/game'], resolve)
  //     },
  //     meta: {
  //       // 记录
  //       title: i18n.t('meta.game')
  //     }
  //   },
  //   {
  //     path: `/userCenter/${i18n.locale}`,
  //     name: 'userCenter',
  //     component: (resolve) => {
  //       require(['@/pages/userCenter/userCenter'], resolve)
  //     },
  //     meta: {
  //       // 个人中心
  //       title: i18n.t('meta.userCenter')
  //     }
  //   },
  //   {
  //     path: `/kiting/${i18n.locale}`,
  //     name: 'kiting',
  //     component: (resolve) => {
  //       require(['@/pages/kiting/kiting'], resolve)
  //     },
  //     meta: {
  //       // 提现
  //       title: i18n.t('meta.kiting')
  //     }
  //   }
  // ]
})

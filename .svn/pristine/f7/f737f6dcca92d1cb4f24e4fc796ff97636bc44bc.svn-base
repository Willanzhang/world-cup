
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './language'
import fastclick from 'fastclick'
import store from './store'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
import * as filters from './filter'
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import { Loading } from './plugins/index'
// Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin, {position: 'middle'})
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})

Vue.use(i18n)
Vue.use(Loading)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

fastclick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 判断app的登录态
  // console.log(to, from, next, 'to from next')
  // if (!localStorage.getItem('userCodeNBA')) {
  // }
  // next({path: 'list'})
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
const intance = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
export default intance

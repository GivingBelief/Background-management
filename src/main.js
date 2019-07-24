import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ElementUi from 'element-ui'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUi, zhLocale)
import 'element-ui/lib/theme-chalk/index.css';
import './assets/base.css'


// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem('token') && to.path == '/login') {
//     next(from)
//   } else if (!localStorage.getItem('token') && to.path != '/login') {
//     next('/login')
//   } else {
//     next()
//   }
// })

// 编译发送请求
Vue.prototype.$axios = Axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

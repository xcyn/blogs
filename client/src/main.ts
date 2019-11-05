import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import 'normalize.css'

Vue.config.productionTip = false
// 引入调试工具
/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
  import('vconsole').then((Vconsole) => {
    new Vconsole.default()
  })
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

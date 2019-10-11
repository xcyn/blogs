import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const notFound = {
  path: '*',
  redirect: '/'
}
const defaultPage = {
  path: '/',
  redirect: {
    name: ''
  }
}

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'guide'
    },
    // 炫酷引导页
    {
      path: '/guide',
      name: 'guide',
      component: () => import('@/pages/guide/index.vue')
    },
    notFound,
    defaultPage
  ]
})

export default router

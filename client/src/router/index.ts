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
  // mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'guide',
      redirect: 'guide'
    },
    // 炫酷引导页
    {
      path: '/guide',
      name: 'guide',
      component: () => import('@/pages/guide/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: '/syb-active',
      name: 'syb-active',
      component: () => import('@/pages/syb-active/index.vue')
    },
    notFound,
    defaultPage
  ]
})

export default router

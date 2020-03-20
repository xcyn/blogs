import VueRouter from 'vue-router'
import Vue from 'vue'
const isDev = process.env.NODE_ENV === "development";

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
  base: isDev ? '/' : '/blogs',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        level: 1
      },
      component: () => import(/* webpackChunkName: 'home' */'@/pages/home/index.vue')
    },
    {
      path: '/message-history',
      name: 'message-history',
      meta: {
        level: 2
      },
      component: () => import(/* webpackChunkName: 'message-history' */'@/pages/message-history/index.vue')
    },
    {
      path: '/syb-active',
      name: 'syb-active',
      component: () => import(/* webpackChunkName: 'syb-active' */'@/pages/syb-active/index.vue')
    },
    {
      path: '/test-skeleton',
      name: 'test-skeleton',
      component: () => import(/* webpackChunkName: 'test-skeleton' */'@/pages/test-skeleton/index.vue')
    },
    notFound,
    defaultPage
  ]
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'

const routes = [{
  name: 'home',
  path: '/',
  meta: {
    title: '首页'
  },
  component: Home,
  redirect: '/welcome',  // 重定向
  children: [{
    name: 'welcome',
    path: '/welcome',
    meta: {
      title: '欢迎页'
    },
    component: () => import('@/views/Welcome.vue')  // 按需加载
  }]
}, {
  name: 'login',
  path: '/login',
  meta: {
    title: '登录'
  },
  component: () => import('@/views/Login.vue')  // 按需加载
}]

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式路由
  routes
})

export default router

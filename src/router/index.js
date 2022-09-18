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
  }, {
    name: 'user',
    path: '/system/user',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/User.vue')
  }, {
    name: 'menu',
    path: '/system/menu',
    meta: {
      title: '菜单管理'
    },
    component: () => import('@/views/Menu.vue')
  }, {
    name: 'role',
    path: '/system/role',
    meta: {
      title: '角色管理'
    },
    component: () => import('@/views/Role.vue')
  }, {
    name: 'dept',
    path: '/system/dept',
    meta: {
      title: '部门管理'
    },
    component: () => import('@/views/Dept.vue')
  }]
}, {
  name: 'login',
  path: '/login',
  meta: {
    title: '登录'
  },
  component: () => import('@/views/Login.vue')  // 按需加载
}, {
  name: '404',
  path: '/404',
  meta: {
    title: '页面不存在'
  },
  component: () => import('@/views/404.vue')
}]

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式路由
  routes
})

export default router

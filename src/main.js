import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import request from './utils/request'
import api from './api'
import storage from './utils/storage'

const app = createApp(App)
app.use(router)  // 引入 vue-router 并挂载到 app 实例上
app.use(store)  // 引入 vuex 并挂载到 app 实例上
/**
 * ElementPlus 就像插件，也是 use 引入
 * 可以全局配置 element-plus 的表单组件尺寸，large > medium > small，默认为 medium
 */
app.use(ElementPlus, { size: 'medium' })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.config.globalProperties 可以往全局实例挂载东西
app.config.globalProperties.$request = request  // 以后可以通过 vm.$request 访问 request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage

app.mount('#app')

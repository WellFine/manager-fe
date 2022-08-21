import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request'

const app = createApp(App)
app.use(router)  // 引入 router 并挂载到 app 实例上
app.use(ElementPlus)  // ElementPlus 就像插件，也是 use 引入

// app.config.globalProperties 可以往全局实例挂载东西
app.config.globalProperties.$request = request  // 以后可以通过 vm.$request 访问 request

app.mount('#app')

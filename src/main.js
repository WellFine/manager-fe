import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import config from './config'

axios.get(config.mockApi + '/login').then(console.log)

const app = createApp(App)
app.use(router)  // 引入 router 并挂载到 app 实例上
app.use(ElementPlus)  // ElementPlus 就像插件，也是 use 引入
app.mount('#app')

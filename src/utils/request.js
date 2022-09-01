import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
import storage from './storage'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

// 创建 axios 实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000  // 后台管理系统一般都设置 8s 超时
})

// 请求拦截，在这里可以对参数做处理，例如将时间戳变为日期
service.interceptors.request.use(req => {
  const headers = req.headers
  // 登录成功后会将返回的用户信息和 token 值存入 storage 中
  const { token } = storage.getItem('userInfo')
  if (!headers.Authorization) headers.Authorization = `Bearer ${token}`
  return req
})

// 响应拦截，在这里可以做状态码的处理、错误拦截等
service.interceptors.response.use(res => {
  // res 中的状态码是 http 的状态码，res.data 中的状态码才是接口的状态码
  const { code, data, msg } = res.data
  if (code === 200) return data
  else if (code === 50001) {  // 50001 在本项目中是登录状态异常状态码
    ElMessage.error(TOKEN_INVALID)  // element-plus 组件提示错误
    setTimeout(() => {
      router.push('/login')  // 跳转登录页面
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {  // 其它错误状态码
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

/**
 * 请求核心函数
 * @param {*} options 请求配置对象
 * @returns axios 调用后的 promise 实例
 */
function request (options) {
  options.method = options.method || 'get'  // 默认值
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data  // 使外部调用 request 函数时可以统一传入 data 属性
  }

  if (typeof options.mock != 'undefined') {
    config.mock = options.mock  // 局部 mock 有值则覆盖全局 mock 配置
  }

  // 这里再次对不同环境下的基础接口地址做校验，每次调用 request 都做校验
  if (config.env === 'production') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }

  return service(options)
}

// 使 request 还可以用 request.get('/login') 的方式调用
['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
  // 虽然 request 是函数，但也可以直接添加静态属性
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})

export default request

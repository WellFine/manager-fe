const env = import.meta.env.MODE || 'production'  // 给一个线上的默认值，防止上线时出现意外
const EnvConfig = {
  development: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/c5cee191a657c9f7734bad9a0d6a03be/api'
  },
  test: {
    baseApi: '//test.futurefe.com/api',  // url 是举例说明
    mockApi: 'https://www.fastmock.site/mock/c5cee191a657c9f7734bad9a0d6a03be/api'
  },
  production: {
    baseApi: '//futurefe.com/api',  // 举例说明
    mockApi: ''
  }
}

export default {
  env,
  mock: true,  // 是否用 mock 接口
  namespace: 'manager',  // storage 用到的命名空间
  ...EnvConfig[env]
}

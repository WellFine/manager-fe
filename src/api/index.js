import request from "../utils/request"

export default {
  login (params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      mock: false  // true 开启局部 mock
    })
  },
  noticeCount () {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {}
    })
  },
  getMenuList () {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {}
    })
  },
  getUserList (params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params,
      mock: true
    })
  }
}

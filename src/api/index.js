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
  getMenuList (params) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: params,
      mock: false
    })
  },
  getUserList (params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params,
      mock: false
    })
  },
  userDel (params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
      mock: false
    })
  },
  getRoleList (params) {
    return request({
      url: '/roles/list',
      method: 'get',
      data: params,
      mock: true
    })
  },
  getRoleAllList () {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {},
      mock: true
    })
  },
  getDeptList () {
    return request({
      url: '/dept/list',
      method: 'get',
      data: {},
      mock: true
    })
  },
  userSubmit (params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      mock: false
    })
  },
  menuSubmit (params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params,
      mock: false
    })
  },
  roleSubmit (params) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params,
      mock: true
    })
  }
}

/**
 * 用户相关请求模块
 */

// 对于代码中的请求操作
// 1、接口请求可能需要重用
// 2、实际工作中，接口非常容易变动，改起来麻烦
// 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
// 这样做的好处就是：管理维护更方便，也好重用

import request from '@/utils/request'
// 用户登录函数
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))

  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据
    //   // Bearer 就是持票人的意思，就好比你的学生证上写了学生证三个字
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

// 创建一个axios实例，其实就是复制了一个axios
// 通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://api-toutiao-web.itheima.net'
})

// 请求拦截器 因为创建了axios实例 所以前面是request 原先是axios.interceptors 设置token值
request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config是当前请求相关的配置信息对象
  // config是可以修改的
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 在本地存储不空的情况下 如果有登录用户信息 则统一设置token
    if (user) {
      // 设置token值
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 当执行完return config后 请求才会真正发出去
    // 可以在允许请求出去之前定制统一业务功能处理 例如 统一的设置token
    return config
  },
  // 请求失败 会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 导出请求方法 谁要使用谁就加载request模块
export default request

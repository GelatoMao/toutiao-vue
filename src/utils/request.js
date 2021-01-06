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

// 导出请求方法 谁要使用谁就加载request模块
export default request

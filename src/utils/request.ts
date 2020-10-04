import axios from 'axios'
import store from '@/store'
const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  console.log('接口请求进来了', config)
  // 通过改写 config 配置信息来实现业务功能
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  // 注意: 这里一定要返回 config， 否则请求就发不出去了
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
export default request

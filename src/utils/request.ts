import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'
const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
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
// 收到响应以后，优先进入响应拦截器，经过拦截器以后，继续真正走到发起请求的地方
// Add a response interceptor
request.interceptors.response.use(function (response) { // 状态码为 2xx 都是进入这里
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('请求响应成功了 =>', response)
  // 如果是自定义错误状态码，错误处理就写到这里
  return response
}, async function (error) {
  // 超出 2xx 状态码都执行这里
  // 如果是使用的 HTTP 状态码，错误处理就写到这里
  if (error.response) {
    // 请求收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 尝试刷新获取新的 token
      try {
        const { data } = await axios.create()({
          method: 'POST',
          url: '/front/user/refresh_token',
          data: qs.stringify({
            refreshtoken: store.state.user.refresh_token
          })
        })
        console.log(data)
        // 把刷新拿到的新的 access_token 更新到容器和本地存储中
        store.commit('setUser', data.content)
        // 成功了 -> 本次失败的请求重新发出去
        return request(error.config)
      } catch (err) {
        // 把当前登录用户状态清除
        store.commit('setUser', null)
        redirectLogin()
        return Promise.reject(error)
      }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务器错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})

export default request

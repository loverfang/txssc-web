import axios from 'axios'
import { MessageBox,  Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code == null) {
      return res;
    }

    if (res.code !== 200) {
      Message({
        message: res.message || res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.msg = '请求错误'
          break
        case 401:
          error.msg = '登录凭证已失效，请重新登录'
          setTimeout(() => {

          })
          break
        case 403:
          error.msg = '您还未登录，登录体验完整功能'
          break
        case 404:
          error.msg = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.msg = '请求超时'
          break
        case 500:
          if (error.response.data.status !== undefined && error.response.data.status !== 500) {
            error.msg = error.response.data.message
          } else {
            error.msg = '服务器内部错误'
          }
          break
        case 501:
          error.msg = '服务未实现'
          break
        case 502:
          error.msg = '网关错误'
          break
        case 503:
          error.msg = '服务不可用'
          break
        case 504:
          error.msg = '网关超时'
          break
        case 505:
          error.msg = 'HTTP版本不受支持'
          break
        default:
          error.msg = '请求出现异常'
      }
    } else {
      error.code = 500
      error.msg = '请求错误'
    }

    Message({  message: error.msg,  type: 'error',  duration: 5 * 1000  })
    return Promise.reject(error)
  }
)

export default service

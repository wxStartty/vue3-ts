import WXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const wxRequest = new WXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('拦截成功')
      // 携带token的拦截
      const token = localCache.getCache('token') || ''
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: () => {
      // console.log('拦截失败')
    },
    responseInterceptor: (res) => {
      // console.log('响应成功')
      return res
    },
    responseInterceptorCatch: () => {
      // console.log('响应失败')
    }
  }
})

export default wxRequest

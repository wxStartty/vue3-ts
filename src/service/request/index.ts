import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { WXRequestInterceptors, WXRequestConfig } from './type'
import { ElLoading } from 'element-plus/lib'
// import { ILoadingInstance } from 'element-plus/lib/'

const DEFAULT_LOADING = true

class WXRequest {
  instance: AxiosInstance
  interceptors?: WXRequestInterceptors
  showLoading: boolean
  loading?: any
  constructor(config: WXRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)',
            spinner: 'el-icon',
            customClass: 'full-loading'
          })
        }
        // console.log('所有的实例的拦截器：请求成功的拦截')
        return config
      },
      (error) => {
        // console.log('所有的实例的拦截器：请求失败的拦截')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        // console.log('所有的实例的拦截器：响应成功的拦截')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (error) => {
        this.loading?.close()
        // console.log('所有的实例的拦截器：响应失败的拦截')
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (error.response.status === 404) {
          console.log('404的错误~')
        }
        return error
      }
    )
  }

  request<T>(config: WXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3.单独请求的拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: WXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: WXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: WXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: WXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default WXRequest

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface WXRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface WXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WXRequestInterceptors<T>
  showLoading?: boolean
}

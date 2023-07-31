import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export interface BobxRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface BobxRequestConfig<T = AxiosResponse> extends Omit<InternalAxiosRequestConfig, 'headers'> {
  interceptors?: BobxRequestInterceptors<T>
  showLoading?: boolean
}

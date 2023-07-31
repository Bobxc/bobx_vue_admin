import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { BobxRequestInterceptors, BobxRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class BobxRequest {
  instance: AxiosInstance
  interceptors?: BobxRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: BobxRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    //从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求成功拦截，所有实例')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '拼命加载中...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('响应成功拦截，所有实例')
        this.loading?.close()
        const { data } = res
        return data
      },
      (err) => {
        // err.response.status === 404
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: BobxRequestConfig<T>): Promise<T> {
    return new Promise((resove, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          resove(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: BobxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: BobxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: BobxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: BobxRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default BobxRequest

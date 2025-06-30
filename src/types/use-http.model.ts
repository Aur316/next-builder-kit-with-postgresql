import { AxiosRequestConfig } from 'axios'

export interface UseHttp {
  httpGet: <T>(
    endpoint: string,
    params?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  httpPost: <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  httpPut: <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  httpPatch: <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<T>
  httpDelete: <T>(endpoint: string, config?: AxiosRequestConfig) => Promise<T>
}

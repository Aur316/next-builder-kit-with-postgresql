import { AxiosRequestConfig } from 'axios'

import { apiClient } from '../lib'
import { UseHttp } from '../types/use-http-model'

export default function useHttp(): UseHttp {
  const httpGet = async <T>(
    endpoint: string,
    params: unknown = {},
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.get<T>(endpoint, { ...config, params })
    return response.data
  }

  const httpPost = async <T>(
    endpoint: string,
    data: unknown = {},
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.post<T>(endpoint, data, config)
    return response.data
  }

  const httpPut = async <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.put<T>(endpoint, data, config)
    return response.data
  }

  const httpPatch = async <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.patch<T>(endpoint, data, config)
    return response.data
  }

  const httpDelete = async <T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.delete<T>(endpoint, config)
    return response.data
  }

  return { httpGet, httpPost, httpPut, httpPatch, httpDelete }
}

import axios, { AxiosRequestConfig } from 'axios'

import { authApiClient } from '../auth/auth.client'

// Global logout function - will be set by auth provider
let globalLogout: (() => void | Promise<void>) | null = null

export const setGlobalLogout = (logoutFn: () => void | Promise<void>) => {
  globalLogout = logoutFn
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor for adding the access token to the request headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for handling 401 errors and refreshing the access token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 error and we haven't tried to refresh yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await authApiClient.refreshToken()

        // New tokens are saved
        localStorage.setItem('accessToken', response.tokens.accessToken)

        // The original request is repeated with the new token
        originalRequest.headers.Authorization = `Bearer ${response.tokens.accessToken}`
        return instance(originalRequest)
      } catch (refreshError) {
        // If the refresh fails, we log out the user
        if (globalLogout) {
          try {
            await globalLogout()
          } catch (error) {
            console.error('Global logout failed:', error)
          }
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export const httpClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await instance.get<T>(url, config)
    return response.data
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await instance.post<T>(url, data, config)
    return response.data
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await instance.put<T>(url, data, config)
    return response.data
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await instance.patch<T>(url, data, config)
    return response.data
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await instance.delete<T>(url, config)
    return response.data
  },
}

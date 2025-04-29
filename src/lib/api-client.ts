import axios from 'axios'

const isExternalAPI = process.env.NEXT_PUBLIC_USE_EXTERNAL_API === 'true'

export const apiClient = axios.create({
  baseURL: isExternalAPI
    ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

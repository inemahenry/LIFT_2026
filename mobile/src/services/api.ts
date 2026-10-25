
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '')

console.log('LIFT API URL:', API_URL)

if (!API_URL) {
  throw new Error(
    'EXPO_PUBLIC_API_URL is not configured. Check mobile/.env',
  )
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    await SecureStore.setItemAsync('lift_token', token)
  } else {
    delete api.defaults.headers.common.Authorization
    await SecureStore.deleteItemAsync('lift_token')
  }
}

export async function restoreAuthToken() {
  const token = await SecureStore.getItemAsync('lift_token')

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return token
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('API ERROR:', error?.message)
    console.log('API URL:', error?.config?.baseURL)
    console.log('API PATH:', error?.config?.url)
    console.log('HTTP STATUS:', error?.response?.status)
    console.log('SERVER RESPONSE:', error?.response?.data)

    if (error.response?.status === 401) {
      delete api.defaults.headers.common.Authorization
      await SecureStore.deleteItemAsync('lift_token')
    }

    return Promise.reject(error)
  },
)

export default api

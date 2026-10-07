import api from './api'
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth'

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', payload)

    return response.data
  },

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      '/auth/register',
      payload,
    )

    return response.data
  },

  async me(): Promise<MeResponse> {
    const response = await api.get<MeResponse>('/auth/me')

    return response.data
  },
}
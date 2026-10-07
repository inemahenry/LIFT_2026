export type UserRole = 'PASSENGER' | 'DRIVER' | 'ADMIN'

export interface User {
  id?: number | string
  fullName?: string
  name?: string
  email?: string
  phone?: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginRequest {
  identifier: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  phone: string
  email?: string
  password: string
  role: 'PASSENGER' | 'DRIVER'
}
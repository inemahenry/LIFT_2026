export type UserRole = 'PASSENGER' | 'DRIVER' | 'ADMIN'

export interface User {
  id: number
  fullName: string
  phone: string
  email?: string | null
  role: UserRole
  status: string
}

export interface LoginRequest {
  phone: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  phone: string
  email?: string
  password: string
  role: 'PASSENGER' | 'DRIVER'
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    userId: number
    fullName: string
    phone: string
    role: UserRole
    token: string
  }
}

export interface RegisterResponse {
  success: boolean
  message: string
  data: {
    userId: number
    role: UserRole
    token: string
  }
}

export interface MeResponse {
  success: boolean
  message: string
  data: User
}
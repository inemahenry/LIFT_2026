import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as SecureStore from 'expo-secure-store'

import { authService } from '../services/auth.service'
import {
  restoreAuthToken,
  setAuthToken,
} from '../services/api'

import type {
  LoginRequest,
  RegisterRequest,
  User,
} from '../types/auth'

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginRequest) => Promise<User>
  register: (payload: RegisterRequest) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(async () => {
    setUser(null)
    setToken(null)

    await setAuthToken(null)
    await SecureStore.deleteItemAsync('lift_user')
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const storedToken = await restoreAuthToken()

      if (!storedToken) {
        setIsLoading(false)
        return
      }

      setToken(storedToken)

      const response = await authService.me()

      setUser(response.data)

      await SecureStore.setItemAsync(
        'lift_user',
        JSON.stringify(response.data),
      )
    } catch {
      await logout()
    } finally {
      setIsLoading(false)
    }
  }, [logout])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = useCallback(
    async (payload: LoginRequest) => {
      const response = await authService.login(payload)

      const newToken = response.data.token

      await setAuthToken(newToken)
      setToken(newToken)

      const meResponse = await authService.me()
      const authenticatedUser = meResponse.data

      setUser(authenticatedUser)

      await SecureStore.setItemAsync(
        'lift_user',
        JSON.stringify(authenticatedUser),
      )

      return authenticatedUser
    },
    [],
  )

  const register = useCallback(
    async (payload: RegisterRequest) => {
      const response = await authService.register(payload)

      const newToken = response.data.token

      await setAuthToken(newToken)
      setToken(newToken)

      const meResponse = await authService.me()
      const authenticatedUser = meResponse.data

      setUser(authenticatedUser)

      await SecureStore.setItemAsync(
        'lift_user',
        JSON.stringify(authenticatedUser),
      )

      return authenticatedUser
    },
    [],
  )

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [
      user,
      token,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { authService } from '../services/auth.service'
import type { User } from '../types/auth'

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setSession: (token: string, user: User) => void
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('lift_token'),
  )

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('lift_user')

    if (!storedUser) {
      return null
    }

    try {
      return JSON.parse(storedUser) as User
    } catch {
      localStorage.removeItem('lift_user')
      return null
    }
  })

  const [isLoading, setIsLoading] = useState(true)

  const setSession = (newToken: string, newUser: User) => {
    localStorage.setItem('lift_token', newToken)
    localStorage.setItem('lift_user', JSON.stringify(newUser))

    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem('lift_token')
    localStorage.removeItem('lift_user')

    setToken(null)
    setUser(null)
  }

  const refreshUser = async () => {
    const currentToken = localStorage.getItem('lift_token')

    if (!currentToken) {
      setIsLoading(false)
      return
    }

    try {
      const response = await authService.me()

      const backendUser = response?.data ?? response

      if (backendUser) {
        localStorage.setItem(
          'lift_user',
          JSON.stringify(backendUser),
        )

        setUser(backendUser)
      }
    } catch {
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      setSession,
      logout,
      refreshUser,
    }),
    [user, token, isLoading],
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
    throw new Error(
      'useAuth must be used inside an AuthProvider',
    )
  }

  return context
}
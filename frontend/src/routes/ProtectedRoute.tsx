import { Navigate, Outlet, useLocation } from 'react-router-dom'

import LoadingState from '../components/common/LoadingState'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../types/auth'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isLoading,
    user,
  } = useAuth()

  const location = useLocation()

  if (isLoading) {
    return (
      <LoadingState
        fullScreen
        message="Loading LIFT..."
      />
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  if (
    allowedRoles &&
    (!user || !allowedRoles.includes(user.role))
  ) {
    if (user?.role === 'DRIVER') {
      return <Navigate to="/driver" replace />
    }

    if (user?.role === 'ADMIN') {
      return <Navigate to="/admin" replace />
    }

    return <Navigate to="/passenger" replace />
  }

  return <Outlet />
}
import { useEffect } from "react"
import { useAuth } from "./auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean // true = require auth, false = require no auth
}

export function ProtectedRoute({ children, redirectTo = "/signin", requireAuth = true }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // User needs to be authenticated but isn't
        console.log("ProtectedRoute: Redirecting to", redirectTo, "- user not authenticated")
        window.location.href = redirectTo
      } else if (!requireAuth && user) {
        // User needs to be NOT authenticated but is
        console.log("ProtectedRoute: Redirecting to", redirectTo, "- user already authenticated")
        window.location.href = redirectTo
      }
    }
  }, [user, loading, redirectTo, requireAuth])

  if (loading) {
    return (
      <div className="cyguides-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show content if:
  // - requireAuth is true and user exists
  // - requireAuth is false and user doesn't exist
  if ((requireAuth && user) || (!requireAuth && !user)) {
    return <>{children}</>
  }

  // Don't render anything while redirecting
  return null
}

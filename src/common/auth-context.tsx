import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { auth } from "../service/firebase-config"
import { toast } from "react-toastify"

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.error("useAuth must be used within an AuthProvider")
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener")

    // Check localStorage for persisted auth state
    const checkPersistedAuth = () => {
      const persistedUser = localStorage.getItem("cyguides_user")
      if (persistedUser) {
        try {
          const userData = JSON.parse(persistedUser)
          console.log("AuthProvider: Found persisted user data", userData.email)
          // Don't set user from localStorage directly, let Firebase handle it
          // This is just for debugging
        } catch (error) {
          console.error("AuthProvider: Error parsing persisted user data", error)
          localStorage.removeItem("cyguides_user")
        }
      }
    }

    checkPersistedAuth()

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("AuthProvider: Auth state changed", user ? `User: ${user.email}` : "User logged out")

      if (user) {
        // User is signed in, persist to localStorage
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
        }
        localStorage.setItem("cyguides_user", JSON.stringify(userData))
        localStorage.setItem("cyguides_auth_timestamp", Date.now().toString())
        console.log("AuthProvider: User data persisted to localStorage")
      } else {
        // User is signed out, clear localStorage
        localStorage.removeItem("cyguides_user")
        localStorage.removeItem("cyguides_auth_timestamp")
        console.log("AuthProvider: Cleared localStorage")
      }

      setUser(user)
      setLoading(false)
    })

    return () => {
      console.log("AuthProvider: Cleaning up auth state listener")
      unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      console.log("AuthProvider: Logging out user")

      // Clear localStorage immediately
      localStorage.removeItem("cyguides_user")
      localStorage.removeItem("cyguides_auth_timestamp")

      await signOut(auth)

      toast.success("👋 Logged out successfully!", {
        position: "top-right",
        autoClose: 2000,
      })

      // Redirect to signin page
      setTimeout(() => {
        window.location.href = "/signin"
      }, 1000)
    } catch (error: any) {
      console.error("AuthProvider: Logout error", error)
      toast.error("Failed to log out. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  const value = {
    user,
    loading,
    logout,
  }

  console.log("AuthProvider: Rendering with state", { user: !!user, loading })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Helper function to check if user is authenticated (can be used in components)
export const isAuthenticated = (): boolean => {
  const persistedUser = localStorage.getItem("cyguides_user")
  const timestamp = localStorage.getItem("cyguides_auth_timestamp")

  if (!persistedUser || !timestamp) {
    return false
  }

  // Check if auth is not too old (optional: expire after 30 days)
  const authAge = Date.now() - Number.parseInt(timestamp)
  const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds

  if (authAge > maxAge) {
    localStorage.removeItem("cyguides_user")
    localStorage.removeItem("cyguides_auth_timestamp")
    return false
  }

  return true
}

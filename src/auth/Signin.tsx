import { useState } from "react"
import { signinWithEmail } from "../service/auth-service"
import { toast } from "react-toastify"
import { ProtectedRoute } from "../common/protected-route"
import "./signin.css"

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

function SigninContent() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        general: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Sign in form submitted")

    if (!validateForm()) {
      console.log("Form validation failed")
      toast.error("Please fix the errors in the form")
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      console.log("Starting Firebase signin process...")

      const user = await signinWithEmail({
        email: formData.email,
        password: formData.password,
      })

      console.log("User signed in successfully:", user.uid)

      // Show success toast
      toast.success("🎉 Welcome back! Redirecting to dashboard...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Reset form
      setFormData({
        email: "",
        password: "",
      })

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } catch (error: any) {
      console.error("Signin error:", error)
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="cyguides-signin">
      <nav>
        <div className="container">
          <svg className="logo" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#00ff88", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#00ffff", stopOpacity: 1 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform="translate(15, 30)">
              <path
                d="M0 -15 L15 -10 L15 5 Q15 15 0 20 Q-15 15 -15 5 L-15 -10 Z"
                fill="url(#logoGradient)"
                filter="url(#glow)"
              />
              <path d="M0 -5 L0 8 M-7 2 L7 2" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            <text x="45" y="35" fontSize="32" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif">
              CY<tspan fill="url(#logoGradient)">GUIDES</tspan>
            </text>

            <rect x="45" y="42" width="140" height="2" fill="url(#logoGradient)" opacity="0.5" />
          </svg>

          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="signin-container">
          <div className="signin-header">
            <h1 className="signin-title">Sign In</h1>
            <p className="signin-subtitle">Access Your Account</p>
          </div>

          {errors.general && (
            <div className="error-message">
              <p>{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={errors.password ? "error" : ""}
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="divider">or</div>

          <div className="signup-prompt">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>

          <div className="security-note">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L4 7V12C4 16.5 6.8 20.7 11 21.9C11.3 22 11.7 22 12 21.9C16.2 20.7 20 16.5 20 12V7L12 2M12 4.2L18 7.8V12C18 15.5 15.8 18.7 12.9 19.9C12.3 20 11.7 20 11.1 19.9C8.2 18.7 6 15.5 6 12V7.8L12 4.2M12 7L9 10L11 12L15 8L13 6L11 8L10 7L12 7Z" />
            </svg>
            Your connection is secured with SSL encryption
          </div>
        </div>
      </div>
    </div>
  )
}

function Signin() {
  return (
    <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
      <SigninContent />
    </ProtectedRoute>
  )
}

export default Signin

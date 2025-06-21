import { useAuth } from "../common/auth-context"
import { ProtectedRoute } from "../common/protected-route"

function DashboardContent() {
  const { user, logout } = useAuth()

  console.log("Dashboard: Rendering for user", user?.email)

  // Get user's display name or fallback to email
  const getUserName = () => {
    if (user?.displayName) {
      return user.displayName
    }
    if (user?.email) {
      return user.email.split("@")[0]
    }
    return "User"
  }

  const getInitials = () => {
    const name = getUserName()
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="cyguides-signup">
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
            <a onClick={logout} className="cta-button">Logout</a>
          </div>

        </div>
      </nav>
    </div>
  )
}

function Dashboard() {
  return (
    <ProtectedRoute requireAuth={true} redirectTo="/signin">
      <DashboardContent />
    </ProtectedRoute>
  )
}

export default Dashboard

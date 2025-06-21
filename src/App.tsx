import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./pages/Landing"
import Signin from "./auth/signin"
import Signup from "./auth/signup"
import Dashboard from "./components/dashboard"
import { AuthProvider } from "./common/auth-context"

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path={routes.landing} element={<Landing />} />
            <Route path={routes.signin} element={<Signin />} />
            <Route path={routes.signup} element={<Signup />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

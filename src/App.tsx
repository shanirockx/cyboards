import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import Landing from "./pages/Landing"
import Signin from "./auth/Signin"
import Signup from "./auth/Signup"

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path={routes.landing} element={<Landing />} />
          <Route path={routes.signin} element={<Signin />} />
          <Route path={routes.signup} element={<Signup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

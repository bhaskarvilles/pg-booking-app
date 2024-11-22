import { Routes, Route } from 'react-router-dom'
import Navigation from './components/common/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/common/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import Footer from './components/common/Footer'

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App 
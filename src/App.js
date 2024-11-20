import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import PGDetails from './components/PGDetails';
import BookingForm from './components/BookingForm';
import VideoCall from './components/VideoCall';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/pg/:id" element={<PGDetails />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/book/:pgId"
                element={
                  <PrivateRoute>
                    <BookingForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/video-call/:bookingId"
                element={
                  <PrivateRoute>
                    <VideoCall />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 
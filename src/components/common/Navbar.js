import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export default function Navigation() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">PG Booking</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Button variant="outline-primary" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 
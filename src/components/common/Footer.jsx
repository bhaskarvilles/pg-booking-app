import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row className="justify-content-between">
          <Col md={4} className="mb-4 mb-md-0">
            <h5>PG Booking</h5>
            <p className="text-muted">
              Find your perfect PG accommodation with ease. Browse, book, and connect with PG owners directly.
            </p>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none text-muted">Login</Link>
              </li>
              <li className="mb-2">
                <Link to="/signup" className="text-decoration-none text-muted">Sign Up</Link>
              </li>
            </ul>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">FAQs</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Connect With Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center text-muted">
            <small>&copy; {new Date().getFullYear()} PG Booking. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
} 
import { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      
      // Create authentication user
      const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        role: 'user', // Default role
        createdAt: new Date()
      });

      navigate('/');
    } catch (err) {
      console.error("Signup error:", err);
      setError('Failed to create an account: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
              </Form.Group>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="phone" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" ref={phoneRef} required />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
} 
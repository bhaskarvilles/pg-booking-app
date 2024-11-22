import { useState, useRef } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile() {
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useState(() => {
    async function fetchUserData() {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (err) {
        setError('Failed to load user data');
      }
    }
    fetchUserData();
  }, [currentUser.uid]);

  async function handleEmailUpdate(e) {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await updateUserEmail(emailRef.current.value);
      setSuccess('Email updated successfully');
    } catch {
      setError('Failed to update email');
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordUpdate(e) {
    e.preventDefault();
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await updateUserPassword(passwordRef.current.value);
      setSuccess('Password updated successfully');
    } catch {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileUpdate(e) {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      await setDoc(doc(db, 'users', currentUser.uid), userData, { merge: true });
      setSuccess('Profile updated successfully');
    } catch {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Profile Settings</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <h4 className="mb-4">Profile Information</h4>
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                >
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Update Email</h4>
              <Form onSubmit={handleEmailUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>New Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                >
                  Update Email
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-4">Change Password</h4>
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                >
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 
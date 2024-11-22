import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { db } from '../firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function BookingForm() {
  const { pgId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [pgData, setPgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    visitDate: '',
    visitTime: '',
    visitType: 'in-person',
    message: ''
  });

  useEffect(() => {
    async function fetchPGDetails() {
      try {
        const pgRef = doc(db, 'pgs', pgId);
        const pgSnap = await getDoc(pgRef);
        
        if (pgSnap.exists()) {
          setPgData({ id: pgSnap.id, ...pgSnap.data() });
        } else {
          setError('PG not found');
        }
      } catch (err) {
        setError('Failed to load PG details');
      } finally {
        setLoading(false);
      }
    }

    fetchPGDetails();
  }, [pgId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        pgId,
        pgName: pgData.name,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        status: 'pending',
        createdAt: new Date(),
        ...formData
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      navigate('/dashboard', { state: { message: 'Booking request submitted successfully!' } });
    } catch (err) {
      setError('Failed to submit booking request');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!pgData) return <div>PG not found</div>;

  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Book a Visit</h2>
          <h5 className="mb-4">PG: {pgData.name}</h5>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Visit Date</Form.Label>
              <Form.Control
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preferred Time</Form.Label>
              <Form.Control
                type="time"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Visit Type</Form.Label>
              <Form.Select
                name="visitType"
                value={formData.visitType}
                onChange={handleInputChange}
                required
              >
                <option value="in-person">In-Person Visit</option>
                <option value="virtual">Virtual Tour</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Message (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Any specific requirements or questions..."
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
} 
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, Alert, Form } from 'react-bootstrap';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './common/LoadingSpinner';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [myPGs, setMyPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddPGForm, setShowAddPGForm] = useState(false);
  const [pgFormData, setPgFormData] = useState({
    name: '',
    address: '',
    price: '',
    description: '',
    roomType: 'single',
    gender: 'any',
    amenities: [],
    contactNumber: '',
    availableFrom: ''
  });

  const amenitiesList = ['WiFi', 'AC', 'Parking', 'Food', 'Laundry', 'Security', 'TV', 'Gym'];

  useEffect(() => {
    fetchBookings();
    fetchMyPGs();
  }, [currentUser.uid]);

  async function fetchBookings() {
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('hostId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const bookingsData = [];
      querySnapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() });
      });
      
      setBookings(bookingsData);
    } catch (err) {
      setError('Failed to load bookings');
    }
  }

  async function fetchMyPGs() {
    try {
      const pgsRef = collection(db, 'pgs');
      const q = query(pgsRef, where('ownerId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const pgsData = [];
      querySnapshot.forEach((doc) => {
        pgsData.push({ id: doc.id, ...doc.data() });
      });
      
      setMyPGs(pgsData);
    } catch (err) {
      setError('Failed to load PGs');
    } finally {
      setLoading(false);
    }
  }

  const handlePGSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const pgData = {
        ...pgFormData,
        ownerId: currentUser.uid,
        ownerEmail: currentUser.email,
        createdAt: new Date(),
        price: parseInt(pgFormData.price)
      };

      await addDoc(collection(db, 'pgs'), pgData);
      setSuccess('PG added successfully!');
      setPgFormData({
        name: '',
        address: '',
        price: '',
        description: '',
        roomType: 'single',
        gender: 'any',
        amenities: [],
        contactNumber: '',
        availableFrom: ''
      });
      setShowAddPGForm(false);
      fetchMyPGs();
    } catch (err) {
      setError('Failed to add PG');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePG = async (pgId) => {
    if (window.confirm('Are you sure you want to delete this PG?')) {
      try {
        await deleteDoc(doc(db, 'pgs', pgId));
        setSuccess('PG deleted successfully');
        fetchMyPGs();
      } catch (err) {
        setError('Failed to delete PG');
      }
    }
  };

  const handleAmenityToggle = (amenity) => {
    setPgFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const renderPGCard = (pg) => (
    <Card key={pg.id} className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>{pg.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              ₹{pg.price}/month
            </Card.Subtitle>
          </div>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => handleDeletePG(pg.id)}
          >
            Delete
          </Button>
        </div>
        <Card.Text>
          <strong>Address:</strong> {pg.address}<br />
          <strong>Room Type:</strong> {pg.roomType}<br />
          <strong>Gender:</strong> {pg.gender}<br />
          <strong>Contact:</strong> {pg.contactNumber}<br />
          <strong>Available From:</strong> {pg.availableFrom}
        </Card.Text>
        <div className="mb-2">
          {pg.amenities?.map((amenity, index) => (
            <Badge key={index} bg="secondary" className="me-1">
              {amenity}
            </Badge>
          ))}
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="py-5">
      <h2 className="mb-4">Owner Dashboard</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Tabs defaultActiveKey="pgs" className="mb-4">
        <Tab eventKey="pgs" title="My PGs">
          <div className="mb-4">
            <Button 
              variant="primary" 
              onClick={() => setShowAddPGForm(!showAddPGForm)}
            >
              {showAddPGForm ? 'Cancel' : 'Add New PG'}
            </Button>
          </div>

          {showAddPGForm && (
            <Card className="mb-4">
              <Card.Body>
                <h4 className="mb-3">Add New PG</h4>
                <Form onSubmit={handlePGSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>PG Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={pgFormData.name}
                          onChange={(e) => setPgFormData(prev => ({
                            ...prev,
                            name: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price per Month</Form.Label>
                        <Form.Control
                          type="number"
                          value={pgFormData.price}
                          onChange={(e) => setPgFormData(prev => ({
                            ...prev,
                            price: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={pgFormData.address}
                      onChange={(e) => setPgFormData(prev => ({
                        ...prev,
                        address: e.target.value
                      }))}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Room Type</Form.Label>
                        <Form.Select
                          value={pgFormData.roomType}
                          onChange={(e) => setPgFormData(prev => ({
                            ...prev,
                            roomType: e.target.value
                          }))}
                        >
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                          <option value="triple">Triple</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          value={pgFormData.gender}
                          onChange={(e) => setPgFormData(prev => ({
                            ...prev,
                            gender: e.target.value
                          }))}
                        >
                          <option value="any">Any</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Amenities</Form.Label>
                    <div className="d-flex gap-2 flex-wrap">
                      {amenitiesList.map(amenity => (
                        <Badge
                          key={amenity}
                          bg={pgFormData.amenities.includes(amenity) ? 'primary' : 'secondary'}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleAmenityToggle(amenity)}
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="tel"
                          value={pgFormData.contactNumber}
                          onChange={(e) => setPgFormData(prev => ({
                            ...prev,
                            contactNumber: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Available From</Form.Label>
                        <Form.Control
                          type="date"
                          value={pgFormData.availableFrom}
                          onChange={(e) => setPgFormData(prev => ({
                            ...prev,
                            availableFrom: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={pgFormData.description}
                      onChange={(e) => setPgFormData(prev => ({
                        ...prev,
                        description: e.target.value
                      }))}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add PG'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {myPGs.length > 0 ? (
            myPGs.map(renderPGCard)
          ) : (
            <p>No PGs added yet</p>
          )}
        </Tab>

        <Tab eventKey="bookings" title="Booking Requests">
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <Card key={booking.id} className="mb-3">
                <Card.Body>
                  <Card.Title>Booking from {booking.userEmail}</Card.Title>
                  <Card.Text>
                    Visit Type: {booking.visitType}<br />
                    Date: {booking.visitDate}<br />
                    Time: {booking.visitTime}<br />
                    Status: {booking.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No booking requests yet</p>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
} 
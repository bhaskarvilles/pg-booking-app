import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel, Badge } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './common/LoadingSpinner';

const mapContainerStyle = {
  width: '100%',
  height: '300px'
};

export default function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [pgData, setPgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPGDetails() {
      try {
        const pgRef = doc(db, 'pgs', id);
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
  }, [id]);

  const handleBooking = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate(`/book/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-5">{error}</div>;
  if (!pgData) return <div className="text-center py-5">PG not found</div>;

  return (
    <Container className="py-5 fade-in">
      <Row>
        <Col lg={8}>
          {pgData.images && pgData.images.length > 0 ? (
            <Carousel className="mb-4">
              {pgData.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`PG view ${index + 1}`}
                    style={{ height: '400px', objectFit: 'cover', borderRadius: '12px' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div 
              className="mb-4 bg-light d-flex align-items-center justify-content-center"
              style={{ height: '400px', borderRadius: '12px' }}
            >
              <p className="text-muted">No images available</p>
            </div>
          )}

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="h2 mb-4">{pgData.name}</Card.Title>
              <div className="mb-3">
                <h5>Location</h5>
                <p className="text-muted">{pgData.address}</p>
              </div>
              <div className="mb-3">
                <h5>Description</h5>
                <p className="text-muted">{pgData.description}</p>
              </div>
              <div className="mb-3">
                <h5>Amenities</h5>
                <div className="d-flex flex-wrap gap-2">
                  {pgData.amenities?.map((amenity, index) => (
                    <Badge key={index} bg="secondary" className="badge-clickable">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h5>Location on Map</h5>
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: pgData.location?.lat, lng: pgData.location?.lng }}
                  zoom={15}
                >
                  <Marker position={{ lat: pgData.location?.lat, lng: pgData.location?.lng }} />
                </GoogleMap>
              </LoadScript>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h3 className="mb-4 text-primary">₹{pgData.price}/month</h3>
              <div className="mb-3">
                <h6>Contact</h6>
                <p className="text-muted">{pgData.contactNumber}</p>
              </div>
              <div className="mb-4">
                <h6>Available From</h6>
                <p className="text-muted">{pgData.availableFrom}</p>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mb-3"
                onClick={handleBooking}
              >
                Book Visit
              </Button>
              <Button 
                variant="outline-primary" 
                size="lg" 
                className="w-100"
                onClick={() => window.open(`tel:${pgData.contactNumber}`)}
              >
                Call Owner
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 
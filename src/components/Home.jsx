import { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import LoadingSpinner from './common/LoadingSpinner';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    amenities: [],
    gender: 'all',
    roomType: 'all'
  });
  const [pgListings, setPgListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const amenitiesList = ['WiFi', 'AC', 'Parking', 'Food', 'Laundry', 'Security', 'TV', 'Gym'];

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      setLoading(true);
      setError('');

      let q = collection(db, 'pgs');
      let constraints = [];

      if (searchQuery) {
        constraints.push(where('address', '>=', searchQuery.toLowerCase()));
        constraints.push(where('address', '<=', searchQuery.toLowerCase() + '\uf8ff'));
      }

      if (filters.priceMin) {
        constraints.push(where('price', '>=', parseInt(filters.priceMin)));
      }

      if (filters.priceMax) {
        constraints.push(where('price', '<=', parseInt(filters.priceMax)));
      }

      if (filters.gender !== 'all') {
        constraints.push(where('gender', '==', filters.gender));
      }

      if (filters.roomType !== 'all') {
        constraints.push(where('roomType', '==', filters.roomType));
      }

      constraints.push(orderBy('price', 'asc'));
      constraints.push(limit(20));

      q = query(q, ...constraints);
      const querySnapshot = await getDocs(q);

      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({ id: doc.id, ...doc.data() });
      });

      setPgListings(listings);
    } catch (err) {
      setError('Failed to load PG listings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPGs();
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <Container>
      <div className="py-5">
        <h1 className="text-center mb-4">Find Your Perfect PG Accommodation</h1>
        
        <Form onSubmit={handleSearch} className="mb-5">
          <Row className="g-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Form.Select
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="all">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Select
                value={filters.roomType}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
              >
                <option value="all">Any Room</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button variant="primary" type="submit" className="w-100">
                Search
              </Button>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <div className="d-flex gap-2 flex-wrap">
                {amenitiesList.map(amenity => (
                  <Badge
                    key={amenity}
                    bg={filters.amenities.includes(amenity) ? 'primary' : 'secondary'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex gap-3">
                <Form.Control
                  type="number"
                  placeholder="Min Price"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder="Max Price"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Form>

        <h2 className="mt-5 mb-4">Available PG Accommodations</h2>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Row>
            {pgListings.map(pg => (
              <Col key={pg.id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{pg.name}</Card.Title>
                    <Card.Text>
                      Location: {pg.address}<br />
                      Price: ₹{pg.price}/month<br />
                      Room Type: {pg.roomType}
                    </Card.Text>
                    <div className="mb-3">
                      {pg.amenities?.map((amenity, index) => (
                        <Badge key={index} bg="secondary" className="me-1">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/pg/${pg.id}`} className="btn btn-primary w-100">
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {pgListings.length === 0 && !loading && (
              <Col>
                <p className="text-center">No PGs found matching your criteria</p>
              </Col>
            )}
          </Row>
        )}
      </div>
    </Container>
  );
} 
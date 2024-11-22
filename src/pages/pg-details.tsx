import { useParams } from 'react-router-dom';
import { MapPin, Phone, Star, Wifi, Coffee, Utensils, Calendar } from 'lucide-react';
import { ImageCarousel } from '@/components/pg/image-carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// This would typically come from an API or Redux store
const mockPGData = {
  id: '1',
  name: 'Sunshine Residency',
  description: 'Modern PG accommodation with all amenities and comfortable living space',
  location: 'Koramangala, Bangalore',
  price: '₹12,000/month',
  rating: 4.5,
  contact: '+91 9876543210',
  amenities: ['WiFi', 'AC', 'Food', 'Laundry', 'Power Backup', 'Security'],
  images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  ],
  reviews: [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent PG with great facilities and friendly staff.',
      date: '2024-02-15'
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good location and clean rooms. Food could be better.',
      date: '2024-02-10'
    }
  ]
};

function PGDetails() {
  const { id } = useParams();
  // In a real app, fetch PG details based on id
  const pg = mockPGData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{pg.name}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{pg.location}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
              <span>{pg.rating}</span>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <ImageCarousel images={pg.images} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About this PG</h2>
                <p className="text-gray-600">{pg.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pg.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      {amenity === 'WiFi' && <Wifi className="w-4 h-4" />}
                      {amenity === 'Food' && <Utensils className="w-4 h-4" />}
                      {amenity === 'Coffee' && <Coffee className="w-4 h-4" />}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {pg.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1">{review.rating}</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking & Contact */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {pg.price}
                </div>
                <div className="space-y-4">
                  <Button className="w-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {pg.contact}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PGDetails;
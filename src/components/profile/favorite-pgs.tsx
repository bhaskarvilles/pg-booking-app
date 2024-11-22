import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockFavorites = [
  {
    id: 1,
    name: 'Sunshine Residency',
    location: 'Koramangala, Bangalore',
    price: '₹12,000/month',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
  },
  {
    id: 2,
    name: 'Green Valley PG',
    location: 'HSR Layout, Bangalore',
    price: '₹15,000/month',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'
  }
];

export function FavoritePGs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Favorite PGs</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {mockFavorites.map((pg) => (
          <Link key={pg.id} to={`/pg/${pg.id}`}>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={pg.image}
                alt={pg.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{pg.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{pg.location}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-semibold">{pg.price}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>{pg.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
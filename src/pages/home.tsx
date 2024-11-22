import { ArrowRight, Building2, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Home() {
  const featuredPGs = [
    {
      id: 1,
      name: "Sunshine Residency",
      location: "Koramangala, Bangalore",
      price: "₹12,000/month",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 2,
      name: "Green Valley PG",
      location: "HSR Layout, Bangalore",
      price: "₹15,000/month",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 3,
      name: "Urban Living",
      location: "Indiranagar, Bangalore",
      price: "₹18,000/month",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Perfect PG Accommodation
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover comfortable and affordable PG accommodations in your preferred location
        </p>
        <Link to="/search">
          <Button size="lg" className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Start Your Search</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Featured PGs */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured PG Accommodations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPGs.map((pg) => (
            <Link key={pg.id} to={`/pg/${pg.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img src={pg.image} alt={pg.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{pg.name}</h3>
                  <div className="flex items-center space-x-1 text-gray-600 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{pg.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-blue-600 font-semibold">{pg.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{pg.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
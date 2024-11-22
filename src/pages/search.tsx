import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, MapPin, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Mock data - In a real app, this would come from an API
const mockPGs = [
  {
    id: 1,
    name: "Comfort Zone PG",
    location: "JP Nagar, Bangalore",
    price: 10000,
    amenities: ["WiFi", "AC", "Food", "Laundry"],
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 2,
    name: "Student Hub",
    location: "BTM Layout, Bangalore",
    price: 8000,
    amenities: ["WiFi", "Food", "Security"],
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 3,
    name: "Green Valley PG",
    location: "Koramangala, Bangalore",
    price: 15000,
    amenities: ["WiFi", "AC", "Food", "Gym", "Laundry"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  }
];

const amenitiesList = ["WiFi", "AC", "Food", "Laundry", "Gym", "Security"];

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  const filteredPGs = useMemo(() => {
    return mockPGs.filter(pg => {
      // Search term filter
      const searchMatch = 
        pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pg.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Price range filter
      const priceMatch = 
        pg.price >= priceRange.min && pg.price <= priceRange.max;

      // Amenities filter
      const amenitiesMatch = 
        selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => pg.amenities.includes(amenity));

      return searchMatch && priceMatch && amenitiesMatch;
    });
  }, [searchTerm, priceRange, selectedAmenities]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location, PG name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-2">Price Range (₹)</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-24 px-2 py-1 border rounded"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({
                        ...prev,
                        min: parseInt(e.target.value) || 0
                      }))}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-24 px-2 py-1 border rounded"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({
                        ...prev,
                        max: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-medium mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedAmenities.includes(amenity)
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {amenity}
                        {selectedAmenities.includes(amenity) && (
                          <X className="inline-block w-3 h-3 ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Filters */}
        {(selectedAmenities.length > 0 || priceRange.min > 0 || priceRange.max < 50000) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {priceRange.min > 0 && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Min: ₹{priceRange.min}
              </span>
            )}
            {priceRange.max < 50000 && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Max: ₹{priceRange.max}
              </span>
            )}
            {selectedAmenities.map((amenity) => (
              <span
                key={amenity}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {amenity}
                <button
                  onClick={() => toggleAmenity(amenity)}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPGs.length > 0 ? (
          filteredPGs.map((pg) => (
            <Link key={pg.id} to={`/pg/${pg.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex h-48">
                  <img src={pg.image} alt={pg.name} className="w-1/3 object-cover" />
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{pg.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-600 mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{pg.location}</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-blue-600 font-semibold">₹{pg.price}/month</p>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{pg.rating}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {pg.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {pg.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{pg.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No PGs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
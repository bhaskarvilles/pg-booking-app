import { Calendar, MapPin, Clock } from 'lucide-react';

const mockBookings = [
  {
    id: 1,
    pgName: 'Sunshine Residency',
    location: 'Koramangala, Bangalore',
    date: '2024-03-15',
    time: '10:00 AM',
    status: 'upcoming'
  },
  {
    id: 2,
    pgName: 'Green Valley PG',
    location: 'HSR Layout, Bangalore',
    date: '2024-03-10',
    time: '2:30 PM',
    status: 'completed'
  }
];

export function BookingHistory() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Booking History</h2>
      
      <div className="space-y-4">
        {mockBookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{booking.pgName}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{booking.location}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {booking.status}
              </span>
            </div>
            
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{booking.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
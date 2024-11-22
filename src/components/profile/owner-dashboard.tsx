import { useState } from 'react';
import { Building2, Users, IndianRupee, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const mockPGs = [
  {
    id: 1,
    name: 'Sunshine Residency',
    location: 'Koramangala',
    occupancy: '85%',
    revenue: '₹1,20,000',
    pendingRequests: 3
  },
  {
    id: 2,
    name: 'Green Valley PG',
    location: 'HSR Layout',
    occupancy: '92%',
    revenue: '₹1,50,000',
    pendingRequests: 5
  }
];

export function OwnerDashboard() {
  const [activeView, setActiveView] = useState<'overview' | 'properties'>('overview');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Owner Dashboard</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Property
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-2xl font-semibold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tenants</p>
                <p className="text-2xl font-semibold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <IndianRupee className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-semibold">₹2,70,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Properties</h3>
        <div className="space-y-4">
          {mockPGs.map((pg) => (
            <Card key={pg.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold">{pg.name}</h4>
                    <p className="text-gray-600">{pg.location}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Occupancy</p>
                    <p className="font-semibold">{pg.occupancy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="font-semibold">{pg.revenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Requests</p>
                    <p className="font-semibold">{pg.pendingRequests}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
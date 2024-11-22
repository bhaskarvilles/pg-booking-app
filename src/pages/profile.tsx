import { useState } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { 
  User, Settings, Building, History, Heart, 
  Calendar, LogOut, Edit, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RootState } from '@/store';
import { auth } from '@/lib/firebase';
import { ProfileInfo } from '@/components/profile/profile-info';
import { BookingHistory } from '@/components/profile/booking-history';
import { FavoritePGs } from '@/components/profile/favorite-pgs';
import { OwnerDashboard } from '@/components/profile/owner-dashboard';
import { ProfileSettings } from '@/components/profile/profile-settings';

type TabType = 'profile' | 'bookings' | 'favorites' | 'owner' | 'settings';

function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isOwner] = useState(true); // In real app, this would come from user data

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    ...(isOwner ? [{ id: 'owner', label: 'Owner Dashboard', icon: Building }] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo />;
      case 'bookings':
        return <BookingHistory />;
      case 'favorites':
        return <FavoritePGs />;
      case 'owner':
        return <OwnerDashboard />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Profile'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <h2 className="text-xl font-semibold">{user?.displayName || 'User'}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-6">
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
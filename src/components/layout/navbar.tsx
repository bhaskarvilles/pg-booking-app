import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PG Finder</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/search">
              <Button variant="secondary" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Find PG</span>
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
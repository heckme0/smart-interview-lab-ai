
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg">
              <User className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Interview.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/interview" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Interview
                </Link>
                <Link to="/quiz" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Quiz
                </Link>
                <Link to="/ai-qna" className="text-gray-700 hover:text-purple-600 transition-colors">
                  AI Q&A
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Profile
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Hi, {user?.name}!</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/interview" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Interview
                </Link>
                <Link to="/quiz" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Quiz
                </Link>
                <Link to="/ai-qna" className="text-gray-700 hover:text-purple-600 transition-colors">
                  AI Q&A
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Profile
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-fit">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login">
                  <Button variant="ghost" className="w-full">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

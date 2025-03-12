import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, ShoppingBag, User, Menu, X, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'customer':
        return '/customer/dashboard';
      case 'chef':
        return '/chef/dashboard';
      case 'rider':
        return '/rider/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="ml-2 text-xl font-display font-bold text-gray-900">Cloud Kitchen</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md">
              Menu
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md">
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative text-gray-700 hover:text-orange-600 px-3 py-2">
                  <ShoppingBag className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md">
                    <span className="mr-2">{user?.fullname}</span>
                    <User className="h-5 w-5" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="px-4 py-3">
                      <p className="text-sm">Signed in as</p>
                      <p className="text-sm font-medium truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className='hover:bg-orange-500 hover:text-white hover:border-white border border-gray-500'>
                    Log in
                  </Button>
                </Link>
                <Link to="/chef-register">
               <Button size="sm" variant="secondary">Register your Kitchen</Button>
               </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {isAuthenticated && (
              <Link to="/cart" className="relative text-gray-700 mr-4">
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
        
        {isAuthenticated ? (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-orange-500 font-medium">
                    {user?.fullname.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.fullname}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to={getDashboardLink()}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-gray-200 px-5 space-y-2">
            <Link
              to="/login"
              className="block w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="outline" fullWidth className='border border-gray-500'>
                Log in
              </Button>
            </Link>
            <Link
              to="/chef-register"
              className="block w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button fullWidth>Register your Kitchen</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
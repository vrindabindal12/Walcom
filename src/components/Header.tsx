
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">WI</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">WalmartIndia</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="hidden md:block text-sm text-gray-600">
                  Hello, {user.user_metadata?.full_name || 'User'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline ml-1">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <User className="h-5 w-5" />
                <span className="hidden md:block">Login</span>
              </Link>
            )}

            <Link to="/cart" className="relative flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:block">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm"
            >
              Search
            </button>
          </form>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t">
          <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">
            All Products
          </Link>
          <Link to="/products?category=Electronics" className="text-gray-600 hover:text-blue-600">
            Electronics
          </Link>
          <Link to="/products?category=Fashion" className="text-gray-600 hover:text-blue-600">
            Fashion
          </Link>
          <Link to="/products?category=Home & Kitchen" className="text-gray-600 hover:text-blue-600">
            Home & Kitchen
          </Link>
          <Link to="/products?category=Groceries" className="text-gray-600 hover:text-blue-600">
            Groceries
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

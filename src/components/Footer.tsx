
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold text-xl px-3 py-2 rounded-lg mb-4 inline-block">
              Walmart
            </div>
            <p className="text-gray-400 mb-4">
              India's favorite shopping destination with millions of products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                f
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                ig
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                tw
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Home & Kitchen</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Groceries</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Beauty</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Walmart. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

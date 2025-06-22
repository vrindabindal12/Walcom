import React from 'react';
import { ChevronRight, Zap, Package, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center py-16 md:py-20">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                ROLLBACK DEALS
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Save money.<br />
              <span className="text-yellow-300">Live better.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Shop millions of items with everyday low prices, plus free shipping on orders $35+
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-blue-100">
                <Package className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Free pickup</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Truck className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Free delivery</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Easy returns</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center group"
              >
                Shop now
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products?discounted=true"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                View deals
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block animate-scale-in">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/products?category=Electronics"
                    className="bg-white/20 rounded-xl p-6 text-center hover:bg-white/30 transition-colors group cursor-pointer"
                  >
                    <div className="text-4xl mb-3">📱</div>
                    <div className="text-sm font-semibold">Electronics</div>
                    <div className="text-xs text-blue-200 mt-1">Up to 50% off</div>
                  </Link>
                  <Link 
                    to="/products?category=Fashion"
                    className="bg-white/20 rounded-xl p-6 text-center hover:bg-white/30 transition-colors group cursor-pointer"
                  >
                    <div className="text-4xl mb-3">👕</div>
                    <div className="text-sm font-semibold">Fashion</div>
                    <div className="text-xs text-blue-200 mt-1">New arrivals</div>
                  </Link>
                  <Link 
                    to="/products?category=Home & Kitchen"
                    className="bg-white/20 rounded-xl p-6 text-center hover:bg-white/30 transition-colors group cursor-pointer"
                  >
                    <div className="text-4xl mb-3">🏠</div>
                    <div className="text-sm font-semibold">Home</div>
                    <div className="text-xs text-blue-200 mt-1">Best sellers</div>
                  </Link>
                  <Link 
                    to="/products?category=Groceries"
                    className="bg-white/20 rounded-xl p-6 text-center hover:bg-white/30 transition-colors group cursor-pointer"
                  >
                    <div className="text-4xl mb-3">🛒</div>
                    <div className="text-sm font-semibold">Grocery</div>
                    <div className="text-xs text-blue-200 mt-1">Fresh daily</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
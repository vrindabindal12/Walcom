import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp } from 'lucide-react';

const categories = [
  { 
    id: 1, 
    name: 'Electronics', 
    icon: '📱', 
    color: 'bg-blue-500', 
    items: '2.5M+ items',
    deal: 'Up to 50% off',
    trending: true
  },
  { 
    id: 2, 
    name: 'Fashion', 
    icon: '👗', 
    color: 'bg-pink-500', 
    items: '1.8M+ items',
    deal: 'New arrivals daily'
  },
  { 
    id: 3, 
    name: 'Home & Kitchen', 
    icon: '🏠', 
    color: 'bg-green-500', 
    items: '950K+ items',
    deal: 'Best sellers'
  },
  { 
    id: 4, 
    name: 'Groceries', 
    icon: '🛒', 
    color: 'bg-orange-500', 
    items: '500K+ items',
    deal: 'Fresh & organic',
    trending: true
  },
  { 
    id: 5, 
    name: 'Books', 
    icon: '📚', 
    color: 'bg-purple-500', 
    items: '200K+ items',
    deal: 'Free shipping'
  },
  { 
    id: 6, 
    name: 'Sports', 
    icon: '⚽', 
    color: 'bg-red-500', 
    items: '150K+ items',
    deal: 'Fitness deals'
  },
  { 
    id: 7, 
    name: 'Toys', 
    icon: '🧸', 
    color: 'bg-yellow-500', 
    items: '100K+ items',
    deal: 'Kids favorites'
  },
  { 
    id: 8, 
    name: 'Beauty', 
    icon: '💄', 
    color: 'bg-indigo-500', 
    items: '80K+ items',
    deal: 'Top brands'
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Department
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need, all in one place. From everyday essentials to special finds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className={`${category.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden`}>
                {category.trending && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 rounded-full p-1">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                )}
                
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm opacity-90 mb-2">{category.items}</p>
                
                <div className="flex items-center justify-center gap-1 text-xs bg-white/20 rounded-full px-2 py-1">
                  {category.deal.includes('off') && <Zap className="w-3 h-3" />}
                  <span>{category.deal}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            View All Departments
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
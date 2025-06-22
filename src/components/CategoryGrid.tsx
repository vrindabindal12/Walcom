
import React from 'react';

const categories = [
  { id: 1, name: 'Electronics', icon: '📱', color: 'bg-blue-500', items: '2.5M+ items' },
  { id: 2, name: 'Fashion', icon: '👗', color: 'bg-pink-500', items: '1.8M+ items' },
  { id: 3, name: 'Home & Kitchen', icon: '🏠', color: 'bg-green-500', items: '950K+ items' },
  { id: 4, name: 'Groceries', icon: '🛒', color: 'bg-orange-500', items: '500K+ items' },
  { id: 5, name: 'Books', icon: '📚', color: 'bg-purple-500', items: '200K+ items' },
  { id: 6, name: 'Sports', icon: '⚽', color: 'bg-red-500', items: '150K+ items' },
  { id: 7, name: 'Toys', icon: '🧸', color: 'bg-yellow-500', items: '100K+ items' },
  { id: 8, name: 'Beauty', icon: '💄', color: 'bg-indigo-500', items: '80K+ items' },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className={`${category.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.items}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

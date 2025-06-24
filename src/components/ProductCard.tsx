import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image: string;
  rating: number;
  reviews_count: number;
  brand: string;
  discount_percentage?: number;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product.id);
  };

  const getProductImage = (product: Product) => {
    const name = product.name.toLowerCase();
    
    if (name.includes('iphone') || name.includes('apple')) {
      return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop';
    }
    if (name.includes('samsung') && (name.includes('galaxy') || name.includes('phone'))) {
      return 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop';
    }
    if (name.includes('samsung') && name.includes('tv')) {
      return 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop';
    }
    if (name.includes('oneplus')) {
      return 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop';
    }
    if (name.includes('redmi') || name.includes('xiaomi') || name.includes('poco')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop';
    }
    if (name.includes('boat') || name.includes('earbuds') || name.includes('headphones') || name.includes('airpods') || name.includes('sony')) {
      return 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop';
    }
    if (name.includes('macbook') || name.includes('laptop') || name.includes('dell')) {
      return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop';
    }
    if (name.includes('ipad') || name.includes('tablet')) {
      return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop';
    }
    if (name.includes('pressure cooker') || name.includes('prestige') || name.includes('hawkins')) {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop';
    }
    if (name.includes('kurta') || name.includes('fabindia') || name.includes('shirt')) {
      return 'https://images.unsplash.com/photo-1583743814966-8936f37f8052?w=400&h=300&fit=crop';
    }
    if (name.includes('nike') || name.includes('adidas') || name.includes('shoes') || name.includes('sneakers')) {
      return 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop';
    }
    if (name.includes('jeans') || name.includes('levi')) {
      return 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop';
    }
    
    // Grocery items
    if (name.includes('banana') || name.includes('apple') || name.includes('fruit')) {
      return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop';
    }
    if (name.includes('milk') || name.includes('butter') || name.includes('dairy')) {
      return 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop';
    }
    if (name.includes('salt') || name.includes('tata')) {
      return 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop';
    }
    if (name.includes('rice') || name.includes('atta') || name.includes('dal')) {
      return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop';
    }
    
    // Default images based on category
    if (product.category === 'Electronics') {
      return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop';
    }
    if (product.category === 'Fashion') {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
    }
    if (product.category === 'Home & Kitchen') {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop';
    }
    if (product.category === 'Groceries') {
      return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop';
    }
    
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
        <div className="flex p-4 gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={getProductImage(product)}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
              }}
            />
            {product.discount_percentage && product.discount_percentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {product.discount_percentage}% OFF
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">{product.brand}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews_count.toLocaleString('en-IN')} reviews)
                </span>
              </div>

              {product.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden border border-gray-200">
      <div className="relative">
        <img
          src={getProductImage(product)}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
          }}
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </button>
        {product.discount_percentage && product.discount_percentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {product.discount_percentage}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-600 mb-1 font-medium">{product.brand}</div>
        <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating} ({product.reviews_count.toLocaleString('en-IN')})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
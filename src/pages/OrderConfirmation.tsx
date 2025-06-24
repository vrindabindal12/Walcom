import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price?: number;
  category: string;
}

interface CartItem {
  id: string;
  products: Product;
  quantity: number;
}

interface OrderState {
  orderItems: CartItem[];
  totalAmount: number;
}

const OrderConfirmation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { orderItems, totalAmount } = (location.state as OrderState) || { orderItems: [], totalAmount: 0 };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
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
    if (product.category === 'Electronics') {
      return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop';
    }
    if (product.category === 'Fashion') {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d7d7d';
    }
    if (product.category === 'Home & Kitchen') {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop';
    }
    if (product.category === 'Groceries') {
      return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-8">You need to login to view your order</p>
          <Button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700">
            Login Now
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Order Found</h2>
          <p className="text-gray-600 mb-8">Place an order to see details here</p>
          <Button onClick={() => navigate('/products')} className="bg-blue-600 hover:bg-blue-700">
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Confirmation</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Thank you for your order!</h2>
          <p className="text-gray-600 mb-4">Your order has been placed successfully and will be delivered within 3-5 business days.</p>
          <p className="text-gray-600">Order ID: #{Math.floor(Math.random() * 1000000)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {orderItems.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={getProductImage(item.products)}
                      alt={item.products.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.products.name}</h3>
                      <p className="text-sm text-gray-600">{item.products.brand}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-bold text-lg">{formatPrice(item.products.price)}</span>
                        {item.products.original_price && item.products.original_price > item.products.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.products.original_price)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({orderItems.length} items)</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>
              <Button
                onClick={() => navigate('/products')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
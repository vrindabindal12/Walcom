import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, CheckCircle, Package, Truck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

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
  orderId?: string;
  orderItems: CartItem[];
  totalAmount: number;
}

interface OrderData {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    price: number;
    products: Product;
  }[];
}

const OrderConfirmation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { orderId, orderItems, totalAmount } = (location.state as OrderState) || { 
    orderItems: [], 
    totalAmount: 0 
  };

  useEffect(() => {
    if (orderId && user) {
      fetchOrderData();
    } else {
      setLoading(false);
    }
  }, [orderId, user]);

  const fetchOrderData = async () => {
    if (!orderId || !user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (
              id,
              name,
              brand,
              price,
              original_price,
              category
            )
          )
        `)
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Use orderData if available, otherwise fall back to passed state
  const displayData = orderData || { 
    id: 'temp-id', 
    total_amount: totalAmount, 
    order_items: orderItems?.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.products.price,
      products: item.products
    })) || []
  };

  if (displayData.order_items.length === 0) {
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
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h2>
              <p className="text-gray-600">
                Order ID: #{orderData?.id.slice(-8).toUpperCase() || 'TEMP-ORDER'}
              </p>
              {orderData?.created_at && (
                <p className="text-gray-600">
                  Placed on: {new Date(orderData.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <Package className="w-5 h-5" />
                <span className="font-medium">Processing</span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Estimated Delivery</h3>
            </div>
            <p className="text-blue-700">Your order will be delivered within 3-5 business days</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
              </div>
              {displayData.order_items.map((item) => (
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
                      <h4 className="font-semibold text-gray-800">{item.products.name}</h4>
                      <p className="text-sm text-gray-600">{item.products.brand}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-bold text-lg">{formatPrice(item.price)}</span>
                        {item.products.original_price && item.products.original_price > item.price && (
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
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({displayData.order_items.length} items)</span>
                  <span>{formatPrice(displayData.total_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(displayData.total_amount)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/my-orders')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  View My Orders
                </Button>
                <Button
                  onClick={() => navigate('/products')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
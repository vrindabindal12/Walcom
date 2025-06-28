import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package, Calendar, Truck, CheckCircle, Clock, ShoppingBag, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: {
    id: string;
    name: string;
    brand: string;
    image: string;
    category: string;
  };
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    if (!user) return;

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
              image,
              category
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error loading orders",
        description: "Please try again later",
        variant: "destructive"
      });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getProductImage = (product: any) => {
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-8">You need to login to view your orders</p>
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
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-8 rounded mb-6 w-1/3"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="bg-gray-300 h-6 rounded mb-4 w-1/4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2 w-1/2"></div>
                  <div className="bg-gray-300 h-4 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Button onClick={() => navigate('/products')} className="bg-blue-600 hover:bg-blue-700">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Placed on {formatDate(order.created_at)}
                          </span>
                        </div>
                      </div>
                      
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          {formatPrice(order.total_amount)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.order_items.length} item{order.order_items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {selectedOrder?.id === order.id && (
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <img
                                src={getProductImage(item.products)}
                                alt={item.products.name}
                                className="w-16 h-16 object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
                                }}
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-800">{item.products.name}</h5>
                                <p className="text-sm text-gray-600">{item.products.brand}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                  <span className="font-semibold">{formatPrice(item.price)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Shipping Address */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Shipping Address</h4>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {order.shipping_address}
                        </p>
                      </div>

                      <Separator />

                      {/* Order Summary */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Order Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.total_amount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600">FREE</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{formatPrice(order.total_amount)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => navigate('/products')}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Buy Again
                        </Button>
                        {order.status.toLowerCase() === 'delivered' && (
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Package className="w-4 h-4" />
                            Return Items
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyOrders;
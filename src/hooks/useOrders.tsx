import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: {
    id: string;
    name: string;
    brand: string;
    category: string;
    image: string;
  };
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  createOrder: (cartItems: any[], totalAmount: number, shippingAddress: string) => Promise<string | null>;
  getOrder: (orderId: string) => Order | null;
  loading: boolean;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    setLoading(true);
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
              category,
              image
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

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const createOrder = async (cartItems: any[], totalAmount: number, shippingAddress: string = "Default Address") => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to place an order",
        variant: "destructive"
      });
      return null;
    }

    try {
      // Create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          status: 'processing',
          shipping_address: shippingAddress
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Refresh orders to include the new one
      await fetchOrders();

      toast({
        title: "Order placed successfully!",
        description: `Order #${orderData.id.slice(-8)} has been created`,
      });

      return orderData.id;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Order failed",
        description: "Please try again later",
        variant: "destructive"
      });
      return null;
    }
  };

  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId) || null;
  };

  const refreshOrders = async () => {
    await fetchOrders();
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrder,
      loading,
      refreshOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
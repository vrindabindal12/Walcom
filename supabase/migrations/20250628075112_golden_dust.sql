/*
  # Add INSERT policy for order_items table

  1. Security
    - Add policy for authenticated users to insert order items for their own orders
    - Ensures users can only create order items for orders they own

  This fixes the RLS violation that prevents users from completing checkout.
*/

-- Create RLS policy for order items INSERT
CREATE POLICY "Users can insert own order items" ON public.order_items 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);
/*
  # Fix Order Items RLS Policy

  1. Security Changes
    - Add INSERT policy for order_items table to allow users to create order items for their own orders
    - This fixes the "new row violates row level security policy" error when creating orders

  2. Policy Details
    - Users can insert order items only for orders they own
    - Maintains security by checking order ownership through the orders table
*/

-- Add INSERT policy for order_items table
CREATE POLICY "Users can insert own order items" ON public.order_items 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);
-- Create products table with Indian market products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image TEXT,
  description TEXT,
  brand TEXT,
  category TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'processing',
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products (public read access)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for cart items
CREATE POLICY "Users can view own cart items" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart items" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart items" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for order items
CREATE POLICY "Users can view own order items" ON public.order_items 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);
CREATE POLICY "Users can insert own order items" ON public.order_items 
FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )
);

-- Insert sample Indian products
INSERT INTO public.products (name, price, original_price, image, description, brand, category, rating, reviews_count, discount_percentage) VALUES
('Redmi Note 13 Pro 5G', 23999, 26999, '/placeholder.svg', 'Latest Redmi smartphone with 5G connectivity', 'Xiaomi', 'Electronics', 4.3, 1250, 11),
('Samsung Galaxy M34', 18999, 22999, '/placeholder.svg', 'Samsung Galaxy smartphone with great battery life', 'Samsung', 'Electronics', 4.1, 890, 17),
('OnePlus Nord CE 3', 26999, 29999, '/placeholder.svg', 'OnePlus Nord with premium features', 'OnePlus', 'Electronics', 4.2, 650, 10),
('Boat Airdopes 141', 1999, 2999, '/placeholder.svg', 'Wireless earbuds with great sound quality', 'boAt', 'Electronics', 4.0, 5600, 33),
('Prestige Pressure Cooker 5L', 1899, 2499, '/placeholder.svg', 'High quality pressure cooker for Indian cooking', 'Prestige', 'Home & Kitchen', 4.4, 2100, 24),
('Fabindia Cotton Kurta', 1599, 1999, '/placeholder.svg', 'Traditional Indian cotton kurta', 'Fabindia', 'Fashion', 4.2, 450, 20),
('Tata Salt 1kg', 25, 28, '/placeholder.svg', 'Pure and healthy Tata salt', 'Tata', 'Groceries', 4.5, 8900, 11),
('Amul Butter 500g', 270, 290, '/placeholder.svg', 'Fresh Amul butter for daily use', 'Amul', 'Groceries', 4.6, 3200, 7),
('Nike Air Force 1', 7995, 8995, '/placeholder.svg', 'Classic Nike sneakers', 'Nike', 'Fashion', 4.3, 125, 11),
('Samsung 32" Smart TV', 18999, 22999, '/placeholder.svg', '32 inch smart TV with Android', 'Samsung', 'Electronics', 4.1, 890, 17);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
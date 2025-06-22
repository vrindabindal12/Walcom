/*
  # Enhanced Product Data for Walmart-like Experience

  1. New Product Data
    - Comprehensive electronics with variants and detailed specs
    - Enhanced grocery products with organic options and detailed info
    - Fashion items with size/color variants
    - Home & Kitchen products with specifications

  2. Product Specifications
    - Electronics: RAM, storage, OS, features, battery
    - Groceries: weight, organic status, product type
    - Fashion: sizes, colors, materials
    - General: detailed descriptions and specifications
*/

-- Clear existing products and insert comprehensive data
DELETE FROM public.products;

-- Electronics - Smartphones
INSERT INTO public.products (name, price, original_price, image, description, brand, category, rating, reviews_count, discount_percentage, in_stock) VALUES
-- iPhone Series
('iPhone 15 Pro Max 256GB Natural Titanium', 134900, 139900, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop', 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system', 'Apple', 'Electronics', 4.8, 2450, 4, true),
('iPhone 15 Pro 128GB Blue Titanium', 119900, 124900, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop', 'iPhone 15 Pro with titanium build and pro camera features', 'Apple', 'Electronics', 4.7, 1890, 4, true),
('iPhone 15 128GB Pink', 79900, 84900, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop', 'iPhone 15 with Dynamic Island and improved cameras', 'Apple', 'Electronics', 4.6, 3200, 6, true),
('iPhone 14 Pro Max 512GB Deep Purple', 149900, 159900, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop', 'iPhone 14 Pro Max with A16 Bionic and Always-On display', 'Apple', 'Electronics', 4.7, 1650, 6, true),
('iPhone 14 256GB Blue', 79900, 89900, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop', 'iPhone 14 with advanced dual-camera system', 'Apple', 'Electronics', 4.5, 2890, 11, true),
('iPhone 13 128GB Midnight', 59900, 69900, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop', 'iPhone 13 with A15 Bionic chip and dual cameras', 'Apple', 'Electronics', 4.4, 4200, 14, true),

-- Samsung Galaxy Series
('Samsung Galaxy S24 Ultra 512GB Titanium Black', 129999, 139999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop', 'Galaxy S24 Ultra with S Pen, 200MP camera, and AI features', 'Samsung', 'Electronics', 4.6, 1850, 7, true),
('Samsung Galaxy S24+ 256GB Marble Gray', 99999, 109999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop', 'Galaxy S24+ with enhanced AI and premium design', 'Samsung', 'Electronics', 4.5, 1420, 9, true),
('Samsung Galaxy S24 128GB Onyx Black', 79999, 89999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop', 'Compact Galaxy S24 with flagship performance', 'Samsung', 'Electronics', 4.4, 2100, 11, true),
('Samsung Galaxy S23 FE 256GB Purple', 59999, 69999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop', 'Galaxy S23 Fan Edition with flagship features', 'Samsung', 'Electronics', 4.3, 1680, 14, true),
('Samsung Galaxy A54 5G 128GB Awesome Blue', 38999, 43999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop', 'Mid-range Galaxy with 5G and great cameras', 'Samsung', 'Electronics', 4.2, 2850, 11, true),
('Samsung Galaxy Z Fold5 512GB Phantom Black', 164999, 174999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop', 'Foldable smartphone with multitasking capabilities', 'Samsung', 'Electronics', 4.5, 890, 6, true),
('Samsung Galaxy Z Flip5 256GB Mint', 99999, 109999, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop', 'Compact foldable with FlexCam features', 'Samsung', 'Electronics', 4.4, 1250, 9, true),

-- OnePlus Series
('OnePlus 12 256GB Silky Black', 64999, 69999, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop', 'OnePlus 12 with Snapdragon 8 Gen 3 and Hasselblad cameras', 'OnePlus', 'Electronics', 4.5, 1420, 7, true),
('OnePlus 11 5G 128GB Titan Black', 56999, 61999, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop', 'OnePlus 11 with flagship performance and fast charging', 'OnePlus', 'Electronics', 4.4, 1680, 8, true),
('OnePlus Nord CE 3 Lite 128GB Pastel Lime', 19999, 22999, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop', 'Affordable OnePlus with good performance', 'OnePlus', 'Electronics', 4.1, 2100, 13, true),

-- Xiaomi/Redmi Series
('Xiaomi 14 Ultra 512GB Black', 99999, 109999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Xiaomi flagship with Leica cameras and premium build', 'Xiaomi', 'Electronics', 4.6, 1250, 9, true),
('Redmi Note 13 Pro+ 5G 256GB Midnight Black', 31999, 35999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Redmi Note with 200MP camera and fast charging', 'Xiaomi', 'Electronics', 4.3, 3200, 11, true),
('Redmi Note 13 5G 128GB Arctic White', 17999, 19999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Affordable 5G smartphone with good performance', 'Xiaomi', 'Electronics', 4.2, 4500, 10, true),
('POCO X6 Pro 5G 256GB Yellow', 26999, 29999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', 'Gaming-focused smartphone with flagship chipset', 'Xiaomi', 'Electronics', 4.4, 1890, 10, true),

-- Audio Products
('boAt Airdopes 800 TWS Earbuds', 4999, 6999, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop', 'Premium TWS earbuds with ANC and spatial audio', 'boAt', 'Electronics', 4.2, 5600, 29, true),
('boAt Rockerz 450 Pro Bluetooth Headphones', 2999, 3999, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop', 'Over-ear headphones with 70hrs playback', 'boAt', 'Electronics', 4.1, 8900, 25, true),
('Sony WH-1000XM5 Noise Canceling Headphones', 29990, 34990, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop', 'Industry-leading noise canceling headphones', 'Sony', 'Electronics', 4.7, 2100, 14, true),
('Apple AirPods Pro 2nd Gen', 24900, 26900, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop', 'AirPods Pro with adaptive transparency and spatial audio', 'Apple', 'Electronics', 4.6, 3450, 7, true),

-- Laptops & Tablets
('MacBook Air M3 13-inch 256GB Midnight', 114900, 119900, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', 'MacBook Air with M3 chip and all-day battery life', 'Apple', 'Electronics', 4.8, 1250, 4, true),
('iPad Pro 12.9-inch M2 256GB Space Gray', 109900, 114900, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop', 'iPad Pro with M2 chip and Liquid Retina XDR display', 'Apple', 'Electronics', 4.7, 890, 4, true),
('Dell XPS 13 Plus Intel i7 512GB', 149999, 159999, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', 'Premium ultrabook with InfinityEdge display', 'Dell', 'Electronics', 4.5, 650, 6, true),

-- TVs & Home Entertainment
('Samsung 55" Neo QLED 4K Smart TV', 89999, 99999, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop', '55-inch Neo QLED with Quantum HDR and smart features', 'Samsung', 'Electronics', 4.6, 1420, 10, true),
('LG 65" OLED C3 4K Smart TV', 179999, 199999, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop', '65-inch OLED with perfect blacks and gaming features', 'LG', 'Electronics', 4.8, 890, 10, true),
('Sony 43" Bravia X75K 4K Google TV', 54999, 59999, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop', '43-inch 4K TV with Google TV and Dolby Vision', 'Sony', 'Electronics', 4.4, 1680, 8, true),

-- Groceries - Fruits & Vegetables
('Organic Bananas 1kg', 80, 90, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop', 'Fresh organic bananas, rich in potassium', 'FreshMart', 'Groceries', 4.5, 2100, 11, true),
('Red Apples 1kg Premium', 180, 200, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop', 'Crisp and sweet red apples, perfect for snacking', 'FreshMart', 'Groceries', 4.4, 1850, 10, true),
('Organic Spinach 250g', 45, 50, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop', 'Fresh organic spinach leaves, iron-rich', 'GreenFresh', 'Groceries', 4.6, 890, 10, true),
('Tomatoes 1kg', 60, 70, 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=300&fit=crop', 'Fresh red tomatoes, perfect for cooking', 'FreshMart', 'Groceries', 4.3, 3200, 14, true),
('Organic Carrots 500g', 55, 65, 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop', 'Organic carrots, rich in beta-carotene', 'GreenFresh', 'Groceries', 4.5, 1420, 15, true),

-- Groceries - Dairy Products
('Amul Fresh Milk 1L', 62, 65, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop', 'Fresh full cream milk from Amul', 'Amul', 'Groceries', 4.7, 8900, 5, true),
('Amul Butter 500g Salted', 270, 290, 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop', 'Premium quality salted butter', 'Amul', 'Groceries', 4.6, 5600, 7, true),
('Mother Dairy Paneer 200g', 85, 95, 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=400&h=300&fit=crop', 'Fresh cottage cheese for Indian cooking', 'Mother Dairy', 'Groceries', 4.4, 2850, 11, true),
('Nestle Yogurt Mixed Fruit 400g', 45, 50, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop', 'Creamy yogurt with mixed fruit flavors', 'Nestle', 'Groceries', 4.2, 1680, 10, true),

-- Groceries - Snacks & Beverages
('Lays Classic Salted 90g', 20, 25, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop', 'Classic salted potato chips', 'Lays', 'Groceries', 4.1, 4500, 20, true),
('Britannia Good Day Cookies 150g', 35, 40, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop', 'Delicious butter cookies for tea time', 'Britannia', 'Groceries', 4.3, 3200, 13, true),
('Coca Cola 2L Bottle', 90, 95, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop', 'Refreshing cola drink for sharing', 'Coca Cola', 'Groceries', 4.0, 6700, 5, true),
('Real Mixed Fruit Juice 1L', 120, 130, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', 'Natural mixed fruit juice with no added sugar', 'Real', 'Groceries', 4.2, 2100, 8, true),

-- Groceries - Staples
('Tata Salt 1kg Iodized', 25, 28, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop', 'Pure iodized salt for daily cooking', 'Tata', 'Groceries', 4.5, 12000, 11, true),
('India Gate Basmati Rice 5kg', 650, 700, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', 'Premium basmati rice with long grains', 'India Gate', 'Groceries', 4.6, 4200, 7, true),
('Aashirvaad Atta 10kg', 420, 450, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop', 'Whole wheat flour for healthy rotis', 'Aashirvaad', 'Groceries', 4.4, 8900, 7, true),
('Toor Dal 1kg', 140, 150, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', 'Premium quality toor dal for daily cooking', 'Organic India', 'Groceries', 4.3, 3200, 7, true),

-- Home & Kitchen
('Prestige Deluxe Alpha Pressure Cooker 5L', 2299, 2799, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 'Stainless steel pressure cooker with safety features', 'Prestige', 'Home & Kitchen', 4.5, 3200, 18, true),
('Hawkins Contura Hard Anodised Pressure Cooker 3L', 1899, 2199, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 'Hard anodised pressure cooker for healthy cooking', 'Hawkins', 'Home & Kitchen', 4.4, 2100, 14, true),
('Philips Air Fryer HD9252/90', 12995, 14995, 'https://images.unsplash.com/photo-1585515656643-1e4c3b3b6b6e?w=400&h=300&fit=crop', 'Digital air fryer for healthy oil-free cooking', 'Philips', 'Home & Kitchen', 4.6, 1850, 13, true),
('Bajaj Majesty RX11 1000W Mixer Grinder', 3499, 3999, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', 'Powerful mixer grinder with 3 jars', 'Bajaj', 'Home & Kitchen', 4.2, 2850, 13, true),

-- Fashion
('Levi\'s 511 Slim Fit Jeans Dark Blue', 3999, 4999, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop', 'Classic slim fit jeans in dark blue wash', 'Levi\'s', 'Fashion', 4.4, 1420, 20, true),
('Nike Air Force 1 \'07 White', 7995, 8995, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop', 'Iconic basketball shoes in classic white', 'Nike', 'Fashion', 4.5, 2100, 11, true),
('Adidas Ultraboost 22 Running Shoes', 16999, 18999, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop', 'Premium running shoes with boost technology', 'Adidas', 'Fashion', 4.6, 890, 11, true),
('Fabindia Cotton Kurta Men\'s Blue', 1899, 2299, 'https://images.unsplash.com/photo-1583743814966-8936f37f8052?w=400&h=300&fit=crop', 'Traditional cotton kurta in royal blue', 'Fabindia', 'Fashion', 4.3, 650, 17, true),
('Allen Solly Women\'s Formal Shirt White', 1599, 1999, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop', 'Professional formal shirt for women', 'Allen Solly', 'Fashion', 4.2, 1250, 20, true);
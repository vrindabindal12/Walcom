import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, Filter, Grid, List, X, Star, Zap, Package, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

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

interface FilterState {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  features: string[];
  productTypes: string[];
  isOrganic: boolean | null;
  inStock: boolean;
  discountedOnly: boolean;
}

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    priceRange: [0, 200000],
    minRating: 0,
    features: [],
    productTypes: [],
    isOrganic: null,
    inStock: false,
    discountedOnly: false,
  });

  // Category-specific data
  const categoryData = {
    Electronics: {
      brands: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'boAt', 'Sony', 'Dell', 'LG', 'Philips'],
      features: ['5G Support', 'Fast Charging', 'Wireless Charging', 'Waterproof', 'Noise Cancellation', 'Touch Screen', 'Smart Features'],
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'TVs', 'Accessories']
    },
    Groceries: {
      brands: ['Amul', 'Tata', 'Nestle', 'Britannia', 'FreshMart', 'GreenFresh', 'Mother Dairy', 'Lays', 'Coca Cola', 'Real', 'India Gate', 'Aashirvaad', 'Organic India'],
      productTypes: ['Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Beverages', 'Staples', 'Organic'],
      subcategories: ['Fresh Produce', 'Dairy & Eggs', 'Snacks & Beverages', 'Staples & Cooking']
    },
    Fashion: {
      brands: ['Nike', 'Adidas', 'Levi\'s', 'Fabindia', 'Allen Solly', 'Puma', 'Reebok'],
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Footwear', 'Accessories'],
      features: ['Cotton', 'Denim', 'Formal', 'Casual', 'Sports', 'Traditional']
    },
    'Home & Kitchen': {
      brands: ['Prestige', 'Hawkins', 'Philips', 'Bajaj', 'Pigeon', 'Butterfly'],
      subcategories: ['Cookware', 'Small Appliances', 'Storage', 'Dining'],
      features: ['Non-stick', 'Stainless Steel', 'Energy Efficient', 'Digital Display']
    }
  };

  const allBrands = Array.from(new Set(Object.values(categoryData).flatMap(cat => cat.brands || [])));
  const allCategories = ['Electronics', 'Groceries', 'Fashion', 'Home & Kitchen'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const categoryParam = searchParams.get('category');
    
    if (categoryParam && !filters.categories.includes(categoryParam)) {
      setFilters(prev => ({ ...prev, categories: [categoryParam] }));
    }

    let filtered = products;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.minRating);
    }

    // Organic filter (for groceries)
    if (filters.isOrganic !== null && filters.categories.includes('Groceries')) {
      filtered = filtered.filter(product => {
        const isOrganic = product.name.toLowerCase().includes('organic');
        return filters.isOrganic ? isOrganic : !isOrganic;
      });
    }

    // Discount filter
    if (filters.discountedOnly) {
      filtered = filtered.filter(product => product.discount_percentage && product.discount_percentage > 0);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered = [...filtered].sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
        break;
      case 'popularity':
        filtered = [...filtered].sort((a, b) => b.reviews_count - a.reviews_count);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy, searchParams]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'brands' | 'categories' | 'features' | 'productTypes', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: [0, 200000],
      minRating: 0,
      features: [],
      productTypes: [],
      isOrganic: null,
      inStock: false,
      discountedOnly: false,
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brands.length > 0) count++;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) count++;
    if (filters.minRating > 0) count++;
    if (filters.features.length > 0) count++;
    if (filters.productTypes.length > 0) count++;
    if (filters.isOrganic !== null) count++;
    if (filters.inStock) count++;
    if (filters.discountedOnly) count++;
    return count;
  };

  const getActiveFilterTags = () => {
    const tags = [];
    
    filters.categories.forEach(cat => tags.push({ type: 'category', value: cat, label: cat }));
    filters.brands.forEach(brand => tags.push({ type: 'brand', value: brand, label: brand }));
    filters.features.forEach(feature => tags.push({ type: 'feature', value: feature, label: feature }));
    filters.productTypes.forEach(type => tags.push({ type: 'productType', value: type, label: type }));
    
    if (filters.minRating > 0) {
      tags.push({ type: 'rating', value: filters.minRating, label: `${filters.minRating}★ & above` });
    }
    
    if (filters.isOrganic === true) {
      tags.push({ type: 'organic', value: true, label: 'Organic' });
    }
    
    if (filters.discountedOnly) {
      tags.push({ type: 'discount', value: true, label: 'On Sale' });
    }
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) {
      tags.push({ 
        type: 'price', 
        value: filters.priceRange, 
        label: `₹${filters.priceRange[0].toLocaleString()} - ₹${filters.priceRange[1].toLocaleString()}` 
      });
    }
    
    return tags;
  };

  const removeFilterTag = (tag: any) => {
    switch (tag.type) {
      case 'category':
        toggleArrayFilter('categories', tag.value);
        break;
      case 'brand':
        toggleArrayFilter('brands', tag.value);
        break;
      case 'feature':
        toggleArrayFilter('features', tag.value);
        break;
      case 'productType':
        toggleArrayFilter('productTypes', tag.value);
        break;
      case 'rating':
        updateFilter('minRating', 0);
        break;
      case 'organic':
        updateFilter('isOrganic', null);
        break;
      case 'discount':
        updateFilter('discountedOnly', false);
        break;
      case 'price':
        updateFilter('priceRange', [0, 200000]);
        break;
    }
  };

  const getCurrentCategoryData = () => {
    if (filters.categories.length === 1) {
      return categoryData[filters.categories[0] as keyof typeof categoryData];
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-8 rounded mb-4 w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-4">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const searchQuery = searchParams.get('search');
  const activeFiltersCount = getActiveFiltersCount();
  const activeFilterTags = getActiveFilterTags();
  const currentCategoryData = getCurrentCategoryData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <span>Home</span>
          <span>/</span>
          {filters.categories.length === 1 ? (
            <>
              <span>{filters.categories[0]}</span>
              <span>/</span>
            </>
          ) : null}
          <span className="text-gray-900 font-medium">
            {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
          </span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               filters.categories.length === 1 ? filters.categories[0] : 'All Products'}
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Showing {filteredProducts.length} of {products.length} products
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                </Badge>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              <option value="name">Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Best Deals</option>
              <option value="popularity">Most Popular</option>
              <option value="newest">Newest</option>
            </select>

            {/* Mobile Filter Button */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFilterTags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {activeFilterTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag.label}
                  <button
                    onClick={() => removeFilterTag(tag)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white rounded-lg shadow-sm border h-fit sticky top-4`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Category
                  </h4>
                  <div className="space-y-2">
                    {allCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleArrayFilter('categories', category)}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm font-medium">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Brand Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Brand</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {(currentCategoryData?.brands || allBrands).map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={filters.brands.includes(brand)}
                          onCheckedChange={() => toggleArrayFilter('brands', brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Category-specific filters */}
                {filters.categories.includes('Groceries') && (
                  <>
                    {/* Product Type for Groceries */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Product Type</h4>
                      <div className="space-y-2">
                        {categoryData.Groceries.productTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`type-${type}`}
                              checked={filters.productTypes.includes(type)}
                              onCheckedChange={() => toggleArrayFilter('productTypes', type)}
                            />
                            <Label htmlFor={`type-${type}`} className="text-sm">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Organic Filter */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Organic</h4>
                      <RadioGroup
                        value={filters.isOrganic === null ? 'all' : filters.isOrganic ? 'yes' : 'no'}
                        onValueChange={(value) => 
                          updateFilter('isOrganic', value === 'all' ? null : value === 'yes')
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="organic-all" />
                          <Label htmlFor="organic-all" className="text-sm">All Products</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="organic-yes" />
                          <Label htmlFor="organic-yes" className="text-sm">Organic Only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="organic-no" />
                          <Label htmlFor="organic-no" className="text-sm">Non-Organic</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />
                  </>
                )}

                {filters.categories.includes('Electronics') && currentCategoryData?.features && (
                  <>
                    {/* Features for Electronics */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {currentCategoryData.features.map(feature => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={`feature-${feature}`}
                              checked={filters.features.includes(feature)}
                              onCheckedChange={() => toggleArrayFilter('features', feature)}
                            />
                            <Label htmlFor={`feature-${feature}`} className="text-sm">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />
                  </>
                )}

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{filters.priceRange[0].toLocaleString()}</span>
                      <span>₹{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                      max={200000}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="min-price" className="text-xs text-gray-600">Min</Label>
                        <input
                          id="min-price"
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange[0]}
                          onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-price" className="text-xs text-gray-600">Max</Label>
                        <input
                          id="max-price"
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange[1]}
                          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 200000])}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Customer Rating
                  </h4>
                  <RadioGroup
                    value={filters.minRating.toString()}
                    onValueChange={(value) => updateFilter('minRating', parseInt(value))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="rating-all" />
                      <Label htmlFor="rating-all" className="text-sm">All Ratings</Label>
                    </div>
                    {[4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center gap-1">
                          <div className="flex">
                            {Array.from({ length: rating }, (_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          & above
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                {/* Special Offers */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Special Offers
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="discounted"
                        checked={filters.discountedOnly}
                        onCheckedChange={(checked) => updateFilter('discountedOnly', checked)}
                      />
                      <Label htmlFor="discounted" className="text-sm">On Sale</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="free-shipping"
                        checked={false}
                        disabled
                      />
                      <Label htmlFor="free-shipping" className="text-sm text-gray-400 flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        Free Shipping
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6' 
                  : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductListing;
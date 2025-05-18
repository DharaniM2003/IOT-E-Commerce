import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { 
  Search, 
  FilterX, 
  ShoppingCart, 
  Grid3X3, 
  LayoutList,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Example product data
  const sampleProducts = [
    {
      id: 1,
      name: "Smart Home Hub",
      slug: "smart-home-hub",
      description: "Control all your smart devices from one central hub with voice commands and automation.",
      price: "129.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 25,
      category: "Smart Hubs",
      rating: 4.7,
      reviews: 124,
      featured: true,
      newArrival: false
    },
    {
      id: 2,
      name: "Wi-Fi Smart Plug (4-Pack)",
      slug: "wifi-smart-plug-4pack",
      description: "Control any electrical outlet from your smartphone. Set schedules, timers, and save energy.",
      price: "59.99",
      discountPrice: "49.99",
      imageUrl: "https://images.unsplash.com/photo-1561316441-1af1aaad668d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 42,
      category: "Smart Plugs",
      rating: 4.5,
      reviews: 89,
      featured: true,
      newArrival: false
    },
    {
      id: 3,
      name: "Smart Thermostat",
      slug: "smart-thermostat",
      description: "AI-powered temperature control that saves energy and improves comfort.",
      price: "179.99",
      discountPrice: "149.99",
      imageUrl: "https://images.unsplash.com/photo-1567201812486-0dad2e26eda5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 15,
      category: "Climate Control",
      rating: 4.8,
      reviews: 203,
      featured: true,
      newArrival: true
    },
    {
      id: 4,
      name: "Indoor Security Camera",
      slug: "indoor-security-camera",
      description: "HD camera with night vision, motion detection, and two-way audio for home security.",
      price: "89.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 8,
      category: "Security",
      rating: 4.6,
      reviews: 78,
      featured: false,
      newArrival: true
    },
    {
      id: 5,
      name: "Smart Door Lock",
      slug: "smart-door-lock",
      description: "Keyless entry with fingerprint, PIN, or smartphone app. Compatible with most standard doors.",
      price: "199.99",
      discountPrice: "169.99",
      imageUrl: "https://images.unsplash.com/photo-1622641263424-39880030834b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 0,
      category: "Security",
      rating: 4.4,
      reviews: 56,
      featured: false,
      newArrival: true
    },
    {
      id: 6,
      name: "Smart Light Bulbs (3-Pack)",
      slug: "smart-light-bulbs-3pack",
      description: "Color-changing LED bulbs that can be controlled via app or voice commands.",
      price: "49.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1552346989-e069318e20a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 32,
      category: "Lighting",
      rating: 4.5,
      reviews: 112,
      featured: true,
      newArrival: false
    },
    {
      id: 7,
      name: "Motion Sensors (2-Pack)",
      slug: "motion-sensors-2pack",
      description: "Detect movement in your home to trigger lights, alarms, or other smart home actions.",
      price: "39.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6919aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 18,
      category: "Sensors",
      rating: 4.3,
      reviews: 45,
      featured: false,
      newArrival: false
    },
    {
      id: 8,
      name: "Smart Doorbell",
      slug: "smart-doorbell",
      description: "Video doorbell with HD camera, motion detection, and two-way audio.",
      price: "149.99",
      discountPrice: "129.99",
      imageUrl: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 5,
      category: "Security",
      rating: 4.7,
      reviews: 89,
      featured: true,
      newArrival: false
    },
    {
      id: 9,
      name: "Water Leak Detector",
      slug: "water-leak-detector",
      description: "Early warning system for water leaks to prevent damage in your home.",
      price: "35.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 27,
      category: "Sensors",
      rating: 4.2,
      reviews: 38,
      featured: false,
      newArrival: true
    },
    {
      id: 10,
      name: "Robot Vacuum Cleaner",
      slug: "robot-vacuum-cleaner",
      description: "Smart vacuum with mapping technology, scheduling, and app control.",
      price: "299.99",
      discountPrice: "249.99",
      imageUrl: "https://images.unsplash.com/photo-1518542892153-b6d6e4af3838?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 3,
      category: "Appliances",
      rating: 4.6,
      reviews: 154,
      featured: true,
      newArrival: false
    },
    {
      id: 11,
      name: "Smart Speaker with Voice Assistant",
      slug: "smart-speaker-with-voice-assistant",
      description: "High-quality speaker with built-in voice assistant for controlling your smart home.",
      price: "129.99",
      discountPrice: "99.99",
      imageUrl: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 22,
      category: "Speakers",
      rating: 4.8,
      reviews: 209,
      featured: true,
      newArrival: false
    },
    {
      id: 12,
      name: "Outdoor Weather Station",
      slug: "outdoor-weather-station",
      description: "Monitor temperature, humidity, wind, and rainfall with this connected weather station.",
      price: "79.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1527515545081-5db817172677?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stock: 0,
      category: "Sensors",
      rating: 4.4,
      reviews: 67,
      featured: false,
      newArrival: true
    }
  ];
  
  // Get unique categories
  const categories = [...new Set(sampleProducts.map(product => product.category))];
  
  // Load products
  useEffect(() => {
    // Simulate API call to fetch products
    setIsLoading(true);
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Filter products when any filter changes
  useEffect(() => {
    if (products.length === 0) return;
    
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply price range filter
    result = result.filter(product => {
      const price = product.discountPrice ? parseFloat(product.discountPrice) : parseFloat(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply in-stock filter
    if (inStockOnly) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = a.discountPrice ? parseFloat(a.discountPrice) : parseFloat(a.price);
          const priceB = b.discountPrice ? parseFloat(b.discountPrice) : parseFloat(b.price);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = a.discountPrice ? parseFloat(a.discountPrice) : parseFloat(a.price);
          const priceB = b.discountPrice ? parseFloat(b.discountPrice) : parseFloat(b.price);
          return priceB - priceA;
        });
        break;
      case 'newest':
        result = result.filter(product => product.newArrival).concat(
          result.filter(product => !product.newArrival)
        );
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result = result.filter(product => product.featured).concat(
          result.filter(product => !product.featured)
        );
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchQuery, selectedCategories, priceRange, inStockOnly, sortBy]);
  
  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setInStockOnly(false);
    setSortBy('featured');
  };
  
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            {index < Math.floor(rating) ? "★" : (index < Math.ceil(rating) && index > Math.floor(rating - 0.5) ? "★" : "☆")}
          </span>
        ))}
      </div>
    );
  };
  
  // Add to cart handler
  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart`);
    // In a real app, this would dispatch an action to your cart store/context
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop IoT Devices</h1>
        <p className="text-muted-foreground">Browse our collection of smart home and IoT hardware</p>
      </div>
      
      {/* Search and view controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">New Arrivals</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            >
              <LayoutList className="h-5 w-5" />
            </button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Filters</CardTitle>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <FilterX className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Price range filter */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-4">
                  <Slider 
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              {/* Category filter */}
              <div>
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-1.5">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm font-normal"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* In stock filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={setInStockOnly}
                />
                <Label
                  htmlFor="in-stock"
                  className="text-sm font-normal"
                >
                  In Stock Only
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Products grid */}
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              
              {/* Grid view */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative">
                        <Link href={`/product/${product.slug}`}>
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        {product.discountPrice && (
                          <Badge className="absolute top-2 right-2 bg-red-500">
                            {Math.round(((parseFloat(product.price) - parseFloat(product.discountPrice)) / parseFloat(product.price)) * 100)}% OFF
                          </Badge>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-medium px-2 py-1 bg-black/60 rounded">Out of Stock</span>
                          </div>
                        )}
                        {product.newArrival && (
                          <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
                        )}
                      </div>
                      <CardHeader className="p-3 pb-0">
                        <Link href={`/product/${product.slug}`}>
                          <CardTitle className="text-base line-clamp-1">{product.name}</CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent className="p-3 pt-2">
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                        <div className="flex items-center mb-1">
                          {renderStars(product.rating)}
                          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                        </div>
                        <div className="flex items-center">
                          {product.discountPrice ? (
                            <>
                              <span className="font-medium">{formatCurrency(product.discountPrice)}</span>
                              <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                            </>
                          ) : (
                            <span className="font-medium">{formatCurrency(product.price)}</span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 pt-0">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button asChild variant="outline">
                            <Link href={`/product/${product.slug}`}>Details</Link>
                          </Button>
                          <Button 
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Cart
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                // List view
                <div className="space-y-4">
                  {currentProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 relative">
                          <Link href={`/product/${product.slug}`}>
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="w-full h-48 sm:h-full object-cover"
                            />
                          </Link>
                          {product.discountPrice && (
                            <Badge className="absolute top-2 right-2 bg-red-500">
                              {Math.round(((parseFloat(product.price) - parseFloat(product.discountPrice)) / parseFloat(product.price)) * 100)}% OFF
                            </Badge>
                          )}
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white font-medium">Out of Stock</span>
                            </div>
                          )}
                          {product.newArrival && (
                            <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
                          )}
                        </div>
                        <div className="sm:w-2/3 p-4">
                          <Link href={`/product/${product.slug}`}>
                            <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                          <div className="flex items-center mb-2">
                            {renderStars(product.rating)}
                            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                          </div>
                          <div className="flex items-center mb-4">
                            {product.discountPrice ? (
                              <>
                                <span className="font-medium text-lg">{formatCurrency(product.discountPrice)}</span>
                                <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                              </>
                            ) : (
                              <span className="font-medium text-lg">{formatCurrency(product.price)}</span>
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant={product.stock > 0 ? 'secondary' : 'outline'}>
                              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </Badge>
                            <div className="flex gap-2">
                              <Button asChild variant="outline">
                                <Link href={`/product/${product.slug}`}>Details</Link>
                              </Button>
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock === 0}
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <Button
                        key={number}
                        variant={currentPage === number ? "default" : "outline"}
                        size="icon"
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Button>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
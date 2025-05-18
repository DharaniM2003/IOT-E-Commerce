import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/utils';
import { Search, FilterX, Loader2, Grid3X3, LayoutList } from 'lucide-react';

const SearchPage = () => {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const queryFromURL = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryFromURL);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [inStock, setInStock] = useState(false);
  
  // Example data
  const allProducts = [
    {
      id: 1,
      name: "Smart Home Hub",
      slug: "smart-home-hub",
      description: "Control your entire smart home ecosystem with this powerful hub. Compatible with over 100 smart devices.",
      price: "129.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.5,
      reviewCount: 128,
      stock: 23,
      category: "Smart Hubs"
    },
    {
      id: 2,
      name: "Wi-Fi Smart Plug (4-Pack)",
      slug: "wifi-smart-plug-4pack",
      description: "Turn any outlet into a smart outlet. Control lights and appliances from your phone or with voice commands.",
      price: "59.99",
      discountPrice: "49.99",
      imageUrl: "https://images.unsplash.com/photo-1561316441-1af1aaad668d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviewCount: 95,
      stock: 42,
      category: "Smart Plugs"
    },
    {
      id: 3,
      name: "Smart Thermostat",
      slug: "smart-thermostat",
      description: "AI-powered temperature control that saves energy and improves comfort. Works with most HVAC systems.",
      price: "179.99",
      discountPrice: "149.99",
      imageUrl: "https://images.unsplash.com/photo-1567201812486-0dad2e26eda5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      reviewCount: 216,
      stock: 8,
      category: "Climate Control"
    },
    {
      id: 4,
      name: "Motion Sensor (2-Pack)",
      slug: "motion-sensor-2pack",
      description: "Detect movement in your home to trigger lights, alarms, or other smart home actions.",
      price: "39.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6919aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.2,
      reviewCount: 64,
      stock: 0,
      category: "Sensors"
    },
    {
      id: 5,
      name: "Security Camera System",
      slug: "security-camera-system",
      description: "High-definition security cameras with night vision, motion detection, and cloud storage.",
      price: "249.99",
      discountPrice: "199.99",
      imageUrl: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      reviewCount: 183,
      stock: 15,
      category: "Security"
    },
    {
      id: 6,
      name: "Smart Light Bulbs (3-Pack)",
      slug: "smart-light-bulbs-3pack",
      description: "Color-changing LED bulbs that can be controlled remotely. Set schedules, scenes, and more.",
      price: "49.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1552346989-e069318e20a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.4,
      reviewCount: 143,
      stock: 32,
      category: "Lighting"
    },
    {
      id: 7,
      name: "Door/Window Sensors (3-Pack)",
      slug: "door-window-sensors-3pack",
      description: "Get alerts when doors or windows are opened. Integrate with your security system or smart home routines.",
      price: "34.99",
      discountPrice: null,
      imageUrl: "https://images.unsplash.com/photo-1563459802257-2a97df940f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.3,
      reviewCount: 79,
      stock: 0,
      category: "Sensors"
    },
    {
      id: 8,
      name: "Smart Speaker with Voice Assistant",
      slug: "smart-speaker-with-voice-assistant",
      description: "Premium sound quality with built-in voice assistant. Control your smart home, play music, and more.",
      price: "129.99",
      discountPrice: "99.99",
      imageUrl: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      reviewCount: 204,
      stock: 18,
      category: "Speakers"
    }
  ];

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  // Search function
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (!searchQuery.trim()) {
        setResults(allProducts);
      } else {
        const query = searchQuery.toLowerCase();
        const filtered = allProducts.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
        setResults(filtered);
      }
      setIsLoading(false);
    }, 500);
  }, [searchQuery]);

  // Apply filters
  useEffect(() => {
    let filtered = [...results];

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = parseFloat(product.discountPrice || product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by rating
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Filter in-stock items
    if (inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.discountPrice || a.price) - parseFloat(b.discountPrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.discountPrice || b.price) - parseFloat(a.discountPrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you'd sort by release date
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Default relevance sorting already handled by search
        break;
    }

    setFilteredResults(filtered);
  }, [results, priceRange, selectedCategories, selectedRating, inStock, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already triggered by the useEffect
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedRating('all');
    setSortBy('relevance');
    setInStock(false);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-500">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-500">★</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">★</span>);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for IoT devices, smart home products, sensors..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </span>
            ) : (
              <>Showing {filteredResults.length} results{searchQuery && ` for "${searchQuery}"`}</>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`rounded-md p-1 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`rounded-md p-1 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'}`}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Filters</CardTitle>
                <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-sm">
                  <FilterX className="mr-1 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="mb-6">
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{formatCurrency(priceRange[0])}</span>
                  <span className="text-sm">{formatCurrency(priceRange[1])}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="ml-2 text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-medium mb-2">Rating</h3>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="2">2+ Stars</SelectItem>
                    <SelectItem value="1">1+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* In Stock */}
              <div className="flex items-center">
                <Checkbox 
                  id="in-stock" 
                  checked={inStock}
                  onCheckedChange={setInStock}
                />
                <Label htmlFor="in-stock" className="ml-2 text-sm">In Stock Only</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search results */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredResults.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredResults.map((product) => (
                viewMode === 'grid' ? (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.discountPrice && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          {Math.round(((parseFloat(product.price) - parseFloat(product.discountPrice)) / parseFloat(product.price)) * 100)}% OFF
                        </Badge>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-1">
                        {renderStars(product.rating)}
                        <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center">
                        {product.discountPrice ? (
                          <>
                            <span className="font-medium">{formatCurrency(product.discountPrice)}</span>
                            <span className="ml-2 text-sm text-muted-foreground line-through">
                              {formatCurrency(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="font-medium">{formatCurrency(product.price)}</span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button asChild className="w-full" disabled={product.stock === 0}>
                        <Link href={`/product/${product.slug}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-48 sm:h-full object-cover"
                        />
                        {product.discountPrice && (
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            {Math.round(((parseFloat(product.price) - parseFloat(product.discountPrice)) / parseFloat(product.price)) * 100)}% OFF
                          </Badge>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-medium">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <div className="sm:w-2/3 p-5">
                        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                        <div className="flex items-center mb-3">
                          {renderStars(product.rating)}
                          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                        </div>
                        <div className="flex items-center mb-4">
                          {product.discountPrice ? (
                            <>
                              <span className="font-medium text-lg">{formatCurrency(product.discountPrice)}</span>
                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                {formatCurrency(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium text-lg">{formatCurrency(product.price)}</span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant={product.stock > 0 ? 'secondary' : 'outline'}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </Badge>
                          <Button asChild disabled={product.stock === 0}>
                            <Link href={`/product/${product.slug}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">No results found</h3>
                <p className="text-muted-foreground text-center mt-2 mb-4">
                  We couldn't find any products matching your search or filters.
                  Try adjusting your search terms or filters.
                </p>
                <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
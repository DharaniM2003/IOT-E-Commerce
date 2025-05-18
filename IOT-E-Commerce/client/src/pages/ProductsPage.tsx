import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import ProductGrid from "@/components/product/ProductGrid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const useQueryParams = () => {
  const [location, setLocation] = useLocation();
  
  // Parse query parameters
  const getParams = () => {
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    return {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 1000,
    };
  };

  // Update query parameters
  const setParams = (params: Record<string, any>) => {
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, String(value));
      } else {
        searchParams.delete(key);
      }
    });
    
    const query = searchParams.toString();
    setLocation(`/products${query ? `?${query}` : ''}`);
  };

  return { params: getParams(), setParams };
};

const ProductsPage = () => {
  const { params, setParams } = useQueryParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([params.minPrice, params.maxPrice]);
  const [searchInput, setSearchInput] = useState(params.search);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    params.category ? [params.category] : []
  );
  
  // Fetch all products
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });

  // Fetch all categories
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });

  // Fetch filtered products
  const { data: filteredProducts = [], isLoading: isFilteredLoading } = useQuery({
    queryKey: [
      params.search ? `/api/products?search=${encodeURIComponent(params.search)}` : 
      params.category ? `/api/products?category=${encodeURIComponent(params.category)}` : 
      '/api/products'
    ],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch filtered products');
      return res.json();
    },
  });

  // Further filter products by price range
  const displayedProducts = filteredProducts.filter((product: any) => {
    const price = parseFloat(product.discountPrice || product.price);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // Apply filters
  const applyFilters = () => {
    setParams({
      search: searchInput,
      category: selectedCategories[0] || '',
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    setIsFiltersOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchInput('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setParams({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  // Handle category selection
  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([categorySlug]);
    } else {
      setSelectedCategories(selectedCategories.filter(slug => slug !== categorySlug));
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams({ ...params, search: searchInput });
  };

  return (
    <div className="bg-neutral-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                
                <form onSubmit={handleSearchSubmit} className="mb-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
                
                <Accordion type="single" collapsible defaultValue="categories">
                  <AccordionItem value="categories" className="border-b-0">
                    <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category: any) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category.slug}`}
                              checked={selectedCategories.includes(category.slug)}
                              onCheckedChange={(checked) => 
                                handleCategoryChange(category.slug, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={`category-${category.slug}`}
                              className="text-sm cursor-pointer"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price" className="border-b-0">
                    <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          min={0}
                          max={1000}
                          step={5}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-6"
                        />
                        <div className="flex items-center justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                  {(params.search || params.category || params.minPrice || params.maxPrice) && (
                    <Button variant="outline" className="w-full" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile Filters Button */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }} className="mb-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setSearchInput('')}
                    >
                      {searchInput ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </Button>
                  </div>
                </form>
                
                <Accordion type="single" collapsible defaultValue="categories">
                  <AccordionItem value="categories" className="border-b-0">
                    <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category: any) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-category-${category.slug}`}
                              checked={selectedCategories.includes(category.slug)}
                              onCheckedChange={(checked) => 
                                handleCategoryChange(category.slug, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={`mobile-category-${category.slug}`}
                              className="text-sm cursor-pointer"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="price" className="border-b-0">
                    <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          min={0}
                          max={1000}
                          step={5}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-6"
                        />
                        <div className="flex items-center justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                  {(params.search || params.category || params.minPrice || params.maxPrice) && (
                    <Button variant="outline" className="w-full" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold mb-4">
                {params.category 
                  ? `${categories.find((c: any) => c.slug === params.category)?.name || 'Category'}`
                  : params.search 
                  ? `Search results for "${params.search}"`
                  : 'All Products'}
              </h1>
            </div>
            
            {/* Active Filters */}
            {(params.search || params.category || (params.minPrice && params.maxPrice)) && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active Filters:</span>
                
                {params.search && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {params.search}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setParams({ ...params, search: '' })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {params.category && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {categories.find((c: any) => c.slug === params.category)?.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setParams({ ...params, category: '' })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                {(params.minPrice || params.maxPrice) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: ${params.minPrice} - ${params.maxPrice}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setParams({ ...params, minPrice: '', maxPrice: '' })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                
                <Button variant="link" size="sm" className="h-7 px-2" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}
            
            <ProductGrid 
              products={displayedProducts} 
              showSorting={true} 
              showPagination={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

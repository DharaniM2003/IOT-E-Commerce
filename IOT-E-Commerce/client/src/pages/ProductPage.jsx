import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Star, 
  Truck, 
  ShieldCheck, 
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const ProductPage = () => {
  const [, params] = useRoute('/product/:id');
  const productId = params?.id;
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  
  // Sample products data - in a real app, this would come from a database
  const sampleProducts = [
    {
      id: "smart-home-hub",
      name: "Smart Home Hub",
      description: "Control all your smart devices from one central hub with voice commands and automation. This smart home hub is compatible with over 100 different smart home devices from various manufacturers, making it the perfect central control point for your smart home ecosystem.",
      price: "129.99",
      discountPrice: null,
      images: [
        "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      rating: 4.7,
      reviews: 124,
      stock: 25,
      category: "Smart Hubs",
      features: [
        "Voice assistant compatibility (Alexa, Google Assistant, Siri)",
        "Controls up to 100 smart devices",
        "WiFi and Bluetooth connectivity",
        "Easy setup with mobile app",
        "Create custom automation routines"
      ],
      specifications: {
        "Dimensions": "4.3 x 4.3 x 1.4 inches",
        "Weight": "12 oz",
        "Power": "AC adapter (included)",
        "Connectivity": "WiFi 802.11 b/g/n/ac, Bluetooth 5.0",
        "Processor": "1.6 GHz quad-core",
        "Memory": "1 GB RAM, 8 GB storage",
        "Audio": "Built-in speaker and microphone"
      },
      relatedProducts: ["wifi-smart-plug-4pack", "smart-thermostat", "smart-light-bulbs-3pack"]
    },
    {
      id: "wifi-smart-plug-4pack",
      name: "Wi-Fi Smart Plug (4-Pack)",
      description: "Control any electrical outlet from your smartphone. Set schedules, timers, and save energy. These smart plugs are easy to install - just plug them into your existing outlets and connect to your WiFi network through the companion app.",
      price: "59.99",
      discountPrice: "49.99",
      images: [
        "https://images.unsplash.com/photo-1561316441-1af1aaad668d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      rating: 4.5,
      reviews: 89,
      stock: 42,
      category: "Smart Plugs",
      features: [
        "Control from anywhere with smartphone app",
        "Voice control with Alexa and Google Assistant",
        "Schedule and timer functionality",
        "Energy monitoring",
        "No hub required"
      ],
      specifications: {
        "Dimensions": "2.2 x 1.5 x 1.3 inches (each)",
        "Weight": "3 oz (each)",
        "Input": "120V~, 60Hz, 15A",
        "Maximum Load": "1800W",
        "Connectivity": "2.4GHz WiFi",
        "Operating Temperature": "32°F to 104°F"
      },
      relatedProducts: ["smart-home-hub", "smart-light-bulbs-3pack", "motion-sensors-2pack"]
    },
    {
      id: "smart-thermostat",
      name: "Smart Thermostat",
      description: "AI-powered temperature control that saves energy and improves comfort. This smart thermostat learns your preferences and automatically adjusts to save energy while keeping your home at the perfect temperature.",
      price: "179.99",
      discountPrice: "149.99",
      images: [
        "https://images.unsplash.com/photo-1567201812486-0dad2e26eda5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582138825631-c5267b25d8ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583606781659-51a1e419eae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      rating: 4.8,
      reviews: 203,
      stock: 15,
      category: "Climate Control",
      features: [
        "AI learning adapts to your schedule",
        "Remote control via smartphone app",
        "Energy usage reports",
        "Compatible with most HVAC systems",
        "Geofencing auto-adjusts when you leave or return home"
      ],
      specifications: {
        "Dimensions": "3.3 x 3.3 x 1.2 inches",
        "Display": "2.1 inch color LCD, 480x480 resolution",
        "Sensors": "Temperature, humidity, proximity, ambient light",
        "Power": "24V HVAC power or USB-C (adapter included)",
        "Connectivity": "WiFi 802.11 b/g/n (2.4GHz), Bluetooth 5.0",
        "Compatibility": "Works with 95% of 24V heating and cooling systems"
      },
      relatedProducts: ["smart-home-hub", "indoor-security-camera", "smart-light-bulbs-3pack"]
    }
  ];
  
  // Customer reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      date: "May 2, 2025",
      rating: 5,
      content: "I've been using this for a month now and it's completely transformed my home. Easy setup and the app is very intuitive. Highly recommended!",
      verified: true
    },
    {
      id: 2,
      author: "Michael Chen",
      date: "April 25, 2025",
      rating: 4,
      content: "Works great and was simple to set up. Taking off one star because the app occasionally has connectivity issues, but the device itself is flawless.",
      verified: true
    },
    {
      id: 3,
      author: "Lisa Garcia",
      date: "April 18, 2025",
      rating: 5,
      content: "Best smart home purchase I've made! The voice control feature works perfectly, and I love being able to set automated routines.",
      verified: true
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch product details
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = sampleProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }, 500);
  }, [productId]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name} to cart`);
    // In a real app, this would dispatch an action to your cart store/context
  };

  const handleAddToWishlist = () => {
    alert(`Added ${product.name} to wishlist`);
    // In a real app, this would dispatch an action to your wishlist store/context
  };

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/shop" className="hover:underline">Shop</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`/category/${product.category.toLowerCase().replace(/ /g, '-')}`} className="hover:underline">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden rounded-lg">
            <img 
              src={product.images[activeImage]} 
              alt={`${product.name} - Image ${activeImage + 1}`} 
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${index === activeImage ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="ml-2 text-sm">{product.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
          </div>
          
          <div className="mb-4">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold">{formatCurrency(product.discountPrice)}</span>
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
                <Badge className="ml-3 bg-red-500">
                  {Math.round(((parseFloat(product.price) - parseFloat(product.discountPrice)) / parseFloat(product.price)) * 100)}% OFF
                </Badge>
              </div>
            ) : (
              <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
            )}
          </div>
          
          <p className="text-muted-foreground mb-6">{product.description.split('.')[0] + '.'}</p>
          
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className={`mr-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? <Check className="h-5 w-5" /> : <span>•</span>}
              </div>
              <span className="font-medium">
                {product.stock > 0 ? 
                  `In Stock (${product.stock} available)` : 
                  'Out of Stock'}
              </span>
            </div>
            
            {product.stock > 0 && (
              <div className="flex items-center mb-6">
                <div className="flex items-center border rounded-md mr-4">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 border-r"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 border-l"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <Button onClick={handleAddToCart} className="mr-2">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" onClick={handleAddToWishlist}>
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="font-medium text-sm">Free Shipping</div>
                <div className="text-xs text-muted-foreground">Orders over $50</div>
              </div>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="font-medium text-sm">2-Year Warranty</div>
                <div className="text-xs text-muted-foreground">Full coverage</div>
              </div>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="font-medium text-sm">Secure Payment</div>
                <div className="text-xs text-muted-foreground">Encrypted checkout</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="mr-2">Share:</span>
            <button className="p-1 rounded-full hover:bg-muted">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product details tabs */}
      <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full border-b justify-start rounded-none">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">{product.description}</p>
              <h3 className="text-lg font-medium mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <img 
                src={product.images[1] || product.images[0]} 
                alt={product.name}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : 'bg-card'}>
                      <td className="px-4 py-3 font-medium">{key}</td>
                      <td className="px-4 py-3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">What's in the Box</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  {product.name}
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  User Manual
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  Quick Start Guide
                </li>
                {product.category === "Smart Hubs" && (
                  <>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      Power Adapter
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      Ethernet Cable
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="pt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="p-4 border rounded-lg">
                <h3 className="text-xl font-bold mb-1">Customer Reviews</h3>
                <div className="flex items-center mb-2">
                  {renderStars(product.rating)}
                  <span className="ml-2">{product.rating.toFixed(1)} out of 5</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{product.reviews} ratings</p>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => {
                    // Calculate percentage for each star rating (normally would use actual data)
                    const percentage = star === 5 ? 70 : 
                                      star === 4 ? 20 : 
                                      star === 3 ? 7 : 
                                      star === 2 ? 2 : 1;
                    return (
                      <div key={star} className="flex items-center">
                        <span className="w-12 text-sm">{star} stars</span>
                        <div className="flex-grow mx-2 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-yellow-400 h-2" 
                            style={{ width: `${percentage}%` }} 
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <p className="text-sm mb-3">Share your thoughts</p>
                  <Button variant="outline">Write a Review</Button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Recent Reviews</h3>
              <div className="space-y-6">
                {reviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">{review.author}</h4>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                        {review.verified && (
                          <Badge variant="outline" className="ml-2">
                            <Check className="h-3 w-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map(relatedId => {
              const relatedProduct = sampleProducts.find(p => p.id === relatedId);
              if (!relatedProduct) return null;
              
              return (
                <Card key={relatedId} className="overflow-hidden">
                  <Link href={`/product/${relatedProduct.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                      {relatedProduct.discountPrice && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          {Math.round(((parseFloat(relatedProduct.price) - parseFloat(relatedProduct.discountPrice)) / parseFloat(relatedProduct.price)) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <div className="p-3">
                    <Link href={`/product/${relatedProduct.id}`}>
                      <h3 className="font-medium line-clamp-1 hover:underline">{relatedProduct.name}</h3>
                    </Link>
                    <div className="flex items-center my-1">
                      {renderStars(relatedProduct.rating)}
                      <span className="text-xs text-muted-foreground ml-1">({relatedProduct.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      {relatedProduct.discountPrice ? (
                        <>
                          <span className="font-medium">{formatCurrency(relatedProduct.discountPrice)}</span>
                          <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(relatedProduct.price)}</span>
                        </>
                      ) : (
                        <span className="font-medium">{formatCurrency(relatedProduct.price)}</span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
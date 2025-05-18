import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import "./index.css";

// Basic product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

// Extended product interface to include more details
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  features?: string[];
  specs?: Record<string, string>;
  stock?: number;
  rating?: number;
}

// Enhanced products data with more details
const products: Product[] = [
  {
    id: "1",
    name: "Smart Home Hub",
    description: "Control all your smart devices from one central hub with voice commands and automated routines. Compatible with over 100 smart home brands.",
    price: "129.99",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Home Automation",
    features: [
      "Voice control",
      "Multi-device compatibility",
      "Custom automation routines",
      "Energy usage monitoring"
    ],
    specs: {
      "Connectivity": "Wi-Fi, Bluetooth, Zigbee, Z-Wave",
      "Power": "AC adapter (included)",
      "Dimensions": "4.3 x 4.3 x 3.2 inches",
      "Voice Assistants": "Amazon Alexa, Google Assistant"
    },
    stock: 42,
    rating: 4.7
  },
  {
    id: "2",
    name: "Smart Thermostat",
    description: "AI-powered temperature control that learns your preferences and saves energy. Reduces heating and cooling costs by up to 23% annually.",
    price: "179.99",
    image: "https://images.unsplash.com/photo-1567201812486-0dad2e26eda5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Climate Control",
    features: [
      "Learning algorithm adapts to your schedule",
      "Remote temperature control",
      "Energy usage reports",
      "Auto-away detection"
    ],
    specs: {
      "Compatibility": "Works with most HVAC systems",
      "Display": "2.8\" color touchscreen",
      "Sensors": "Temperature, humidity, proximity, occupancy",
      "Connectivity": "Wi-Fi, Bluetooth"
    },
    stock: 35,
    rating: 4.8
  },
  {
    id: "3",
    name: "Smart Security Camera",
    description: "HD security camera with night vision, motion detection, and two-way audio. Get alerts on your phone when movement is detected.",
    price: "89.99",
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Security",
    features: [
      "1080p HD video",
      "Night vision up to 30 feet",
      "Motion-activated alerts",
      "Two-way audio communication",
      "Weatherproof"
    ],
    specs: {
      "Resolution": "1920 x 1080 Full HD",
      "Field of View": "130° diagonal",
      "Storage": "Cloud and local microSD",
      "Power": "Wired or rechargeable battery",
      "Operating Temperature": "-4°F to 113°F"
    },
    stock: 28,
    rating: 4.5
  },
  {
    id: "4",
    name: "Smart Light Bulbs (4-Pack)",
    description: "Color-changing LED bulbs with app control. Set schedules, sync with music, and create custom scenes for any mood or occasion.",
    price: "49.99",
    image: "https://images.unsplash.com/photo-1552346989-e069318e20a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Lighting",
    features: [
      "16 million colors",
      "Dimmable from 1-100%",
      "Music synchronization",
      "Wake-up and sleep routines"
    ],
    specs: {
      "Wattage": "9W (60W equivalent)",
      "Lifetime": "25,000 hours",
      "Connectivity": "Wi-Fi, no hub required",
      "Base Type": "E26/E27",
      "Lumens": "800"
    },
    stock: 56,
    rating: 4.6
  },
  {
    id: "5",
    name: "Smart Door Lock",
    description: "Keyless entry with fingerprint, PIN code, or smartphone app. Monitor access and send virtual keys to guests remotely.",
    price: "199.99",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Security",
    features: [
      "Fingerprint recognition",
      "Keypad entry",
      "Temporary access codes",
      "Tamper alarm",
      "Auto-lock feature"
    ],
    specs: {
      "Battery Life": "Up to 1 year",
      "Unlock Methods": "Fingerprint, PIN, App, Physical key",
      "Installation": "DIY, fits standard doors",
      "Material": "Zinc alloy, matte black finish",
      "Warranty": "3 years"
    },
    stock: 19,
    rating: 4.4
  },
  {
    id: "6",
    name: "Smart Doorbell",
    description: "HD video doorbell with two-way talk, motion detection, and night vision. See and speak to visitors from anywhere.",
    price: "149.99",
    image: "https://images.unsplash.com/photo-1583452916722-ebc8a968ff76?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Security",
    features: [
      "1080p HD video with HDR",
      "Live view and recorded video",
      "Customizable motion zones",
      "Quick replies for when you're busy",
      "Works with existing doorbell wiring"
    ],
    specs: {
      "Video": "1920 x 1080 HD with night vision",
      "Field of View": "155° horizontal, 90° vertical",
      "Power": "Hardwired or battery-powered",
      "Connectivity": "2.4GHz and 5GHz Wi-Fi",
      "Operating Temperature": "-5°F to 120°F"
    },
    stock: 31,
    rating: 4.7
  },
  {
    id: "7",
    name: "Smart Robot Vacuum",
    description: "Self-navigating robot vacuum with mapping technology, voice control, and scheduled cleaning. Automatically returns to dock for charging.",
    price: "299.99",
    image: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Home Appliances",
    features: [
      "LIDAR room mapping",
      "Multi-surface cleaning",
      "3-stage cleaning system",
      "No-go zones via app",
      "Auto-resume after charging"
    ],
    specs: {
      "Suction Power": "2700Pa",
      "Runtime": "Up to 150 minutes",
      "Noise Level": "58dB on max setting",
      "Bin Capacity": "0.6L dustbin",
      "Filter": "HEPA filtration",
      "Climbing Ability": "0.8 inch threshold"
    },
    stock: 22,
    rating: 4.5
  },
  {
    id: "8",
    name: "Indoor Air Quality Monitor",
    description: "Real-time monitoring of air quality, temperature, humidity, and harmful chemicals. Get alerts and recommendations for healthier air.",
    price: "89.99",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6519fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Health & Wellness",
    features: [
      "PM2.5 particulate detection",
      "VOC and chemical sensing",
      "Historical data tracking",
      "Air quality tips",
      "Integration with smart ventilation"
    ],
    specs: {
      "Sensors": "PM2.5, VOCs, CO2, temperature, humidity",
      "Display": "Color-coded LED and app dashboard",
      "Power": "USB-C (adapter included)",
      "Data Storage": "Rolling 30-day history",
      "Dimensions": "3.5 x 3.5 x 1.2 inches"
    },
    stock: 42,
    rating: 4.3
  }
];

// Function to display star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      ))}
      {hasHalfStar && <span className="text-yellow-400">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ 
  product, 
  onAddToCart, 
  onViewDetails 
}: { 
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.stock !== undefined && product.stock <= 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Only {product.stock} left!
          </div>
        )}
        {product.category && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold line-clamp-1">{product.name}</h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{product.description}</p>
        
        {product.rating && (
          <div className="mt-2">
            <StarRating rating={product.rating} />
          </div>
        )}
        
        {product.features && product.features.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <div className="flex space-x-2">
            <button 
              className="bg-gray-200 text-gray-800 px-2 py-2 rounded hover:bg-gray-300"
              onClick={() => onViewDetails && onViewDetails(product)}
              title="View Details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button 
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              onClick={() => onAddToCart ? onAddToCart(product) : alert(`Added ${product.name} to cart!`)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Detail Page Component
const ProductDetail = ({ 
  product, 
  onAddToCart, 
  onNavigateBack
}: { 
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigateBack: () => void;
}) => {
  return (
    <div className="container mx-auto p-6">
      <button 
        onClick={onNavigateBack}
        className="flex items-center text-blue-600 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shop
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-6">
            {product.category && (
              <div className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-2">
                {product.category}
              </div>
            )}
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            {product.rating && (
              <div className="mt-2">
                <StarRating rating={product.rating} />
              </div>
            )}
            
            <div className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mt-6 flex items-center">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.stock !== undefined && (
                <span className={`ml-4 text-sm ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                  {product.stock > 0 
                    ? `${product.stock} in stock` 
                    : 'Out of stock'}
                </span>
              )}
            </div>
            
            <div className="mt-8">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t">
          <div className="md:flex">
            {/* Features Section */}
            {product.features && product.features.length > 0 && (
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                <h2 className="text-lg font-bold mb-4">Key Features</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Specifications Section */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="md:w-1/2">
                <h2 className="text-lg font-bold mb-4">Specifications</h2>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <div key={index} className="flex border-b pb-2">
                      <span className="font-medium w-1/3">{key}</span>
                      <span className="text-gray-700 w-2/3">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Shop Page Component
const ShopPage = ({ 
  onAddToCart,
  onViewDetails
}: { 
  onAddToCart?: (product: Product) => void,
  onViewDetails?: (product: Product) => void
} = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category || '').filter(Boolean)))];
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      selectedCategory === 'All' ||
      product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shop IoT Devices</h1>
      
      <div className="flex flex-col md:flex-row mb-8 gap-4">
        {/* Search bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                selectedCategory === category || (category === 'All' && selectedCategory === null)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No products found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Home Page Component
const HomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">IoT Hardware Shop</h1>
      <p className="mb-8">Welcome to our e-commerce store for IoT hardware!</p>
      
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">Smart Devices for a Connected Home</h2>
        <p className="mb-6">Discover cutting-edge IoT hardware that transforms your home.</p>
        <button 
          className="bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-gray-100"
          onClick={() => onNavigate('shop')}
        >
          Shop Now
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Define cart item type that includes quantity
interface CartItem extends Product {
  quantity: number;
}

// Cart Page Component
const CartPage = ({ 
  cartItems, 
  updateQuantity, 
  removeFromCart,
  onNavigate 
}: { 
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  onNavigate: (page: string) => void;
}) => {
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div>
          <p className="mb-6">Your cart is empty.</p>
          <button 
            onClick={() => onNavigate('shop')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full mb-6">
              <thead className="border-b">
                <tr>
                  <th className="py-2 text-left">Product</th>
                  <th className="py-2 text-left">Price</th>
                  <th className="py-2 text-left">Quantity</th>
                  <th className="py-2 text-left">Total</th>
                  <th className="py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.description.substring(0, 60)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">${item.price}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 border rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                    <td className="py-4">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-start mt-8">
            <button 
              onClick={() => onNavigate('shop')}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Continue Shopping
            </button>
            
            <div className="bg-gray-50 p-6 rounded w-72">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Checkout Page Component
const CheckoutPage = ({ 
  cartItems, 
  onPlaceOrder,
  onNavigate
}: { 
  cartItems: CartItem[];
  onPlaceOrder: () => void;
  onNavigate: (page: string) => void;
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit'
  });

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Calculate order total
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zipCode) errors.zipCode = 'Zip code is required';
    if (!formData.country) errors.country = 'Country is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onPlaceOrder();
      // In a real app, this would submit the order to the backend
    }
  };

  // Don't allow checkout with empty cart
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-6">
          <p>Your cart is empty. Add some products before checkout.</p>
        </div>
        <button 
          onClick={() => onNavigate('shop')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block mb-1">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block mb-1">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div className="mt-4">
                <label className="block mb-1">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block mb-1">State/Province*</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${formErrors.state ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.state && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-1">ZIP/Postal Code*</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
                  )}
                </div>
                
                <div>
                  <label className="block mb-1">Country*</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${formErrors.country ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.country && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  id="credit"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="credit">Credit Card</label>
              </div>
              
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
              
              {formData.paymentMethod === 'credit' && (
                <div className="border p-4 rounded">
                  <p className="text-sm text-gray-500 mb-4">
                    In a real application, this would include credit card form fields with validation.
                  </p>
                  <div className="bg-gray-100 p-2 rounded">
                    <p className="text-sm">Credit card input fields would go here</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => onNavigate('cart')}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Return to Cart
              </button>
              
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center py-2 border-b">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Confirmation Page
const OrderConfirmation = ({ orderId, onNavigate }: { orderId: string, onNavigate: (page: string) => void }) => {
  return (
    <div className="container mx-auto p-6 text-center">
      <div className="bg-white p-8 rounded shadow-sm max-w-2xl mx-auto">
        <div className="text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
        
        <div className="bg-gray-50 p-4 rounded mb-6">
          <p className="font-medium">Order Reference: #{orderId}</p>
          <p className="text-sm text-gray-500">Please save this reference for tracking your order.</p>
        </div>
        
        <p className="mb-6">We've sent a confirmation email with all the details of your order.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Return to Home
          </button>
          
          <button
            onClick={() => alert('This would navigate to order tracking page')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

// Basic user type for authentication
interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// Login Page Component
const LoginPage = ({ 
  onLogin, 
  onNavigate 
}: { 
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    // Simulate login (in a real app, this would call an API)
    setTimeout(() => {
      // Mock user for demo
      if (formData.username === 'demo' && formData.password === 'password') {
        const user: User = {
          id: '1',
          username: 'demo',
          email: 'demo@example.com',
          firstName: 'Demo',
          lastName: 'User'
        };
        onLogin(user);
        onNavigate('home');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="demo"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="password"
            />
            <p className="text-sm text-gray-500 mt-1">
              Hint: Use "demo" / "password" to login
            </p>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Register Page Component
const RegisterPage = ({ 
  onRegister, 
  onNavigate 
}: { 
  onRegister: (user: User) => void;
  onNavigate: (page: string) => void;
}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill out all required fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Simulate registration (in a real app, this would call an API)
    setTimeout(() => {
      // Mock user creation
      const user: User = {
        id: '1',
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      };
      onRegister(user);
      onNavigate('home');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Username*</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2">Confirm Password*</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Track Order Page Component
const TrackOrderPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<{
    orderId: string;
    status: string;
    date: string;
    items: { name: string; quantity: number }[];
    total: string;
    shipping: { address: string; city: string; zipCode: string; country: string };
    trackingNumber?: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!orderNumber) {
      setError('Please enter an order number');
      setLoading(false);
      return;
    }

    // Simulate API call to get order data
    setTimeout(() => {
      if (orderNumber.toUpperCase() === 'DEMO123') {
        // Mock order data
        setOrderData({
          orderId: 'DEMO123',
          status: 'Shipped',
          date: '2025-05-12',
          items: [
            { name: 'Smart Home Hub', quantity: 1 },
            { name: 'Smart Light Bulbs (4-Pack)', quantity: 2 }
          ],
          total: '229.97',
          shipping: {
            address: '123 Main St',
            city: 'New York',
            zipCode: '10001',
            country: 'United States'
          },
          trackingNumber: 'TRK909090XYZ'
        });
      } else {
        setError('Order not found. Try using "DEMO123" for a demo.');
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
      
      {!orderData ? (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <p className="mb-4">Enter your order number to track your package</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Order Number</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="DEMO123"
              />
              <p className="text-sm text-gray-500 mt-1">
                Hint: Use "DEMO123" to see an example
              </p>
            </div>
            
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Order #{orderData.orderId}</h2>
                <p className="text-gray-600">Placed on {orderData.date}</p>
              </div>
              
              <div className={`px-3 py-1 rounded-full ${getStatusColor(orderData.status)}`}>
                {orderData.status}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-bold mb-2">Items</h3>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between pb-2 border-b">
                    <div>{item.name}</div>
                    <div>Qty: {item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 font-bold text-right">
                Total: ${orderData.total}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold mb-2">Shipping Address</h3>
              <div className="text-gray-600">
                <p>{orderData.shipping.address}</p>
                <p>{orderData.shipping.city}, {orderData.shipping.zipCode}</p>
                <p>{orderData.shipping.country}</p>
              </div>
            </div>
            
            {orderData.trackingNumber && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Tracking Information</h3>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="font-medium">Tracking #: {orderData.trackingNumber}</p>
                  <p className="text-sm mt-1">
                    Your package is on its way! Expected delivery: May 18, 2025
                  </p>
                  
                  <div className="mt-4">
                    <div className="relative">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                        <div className="ml-2">
                          <p className="font-medium">Order Processed</p>
                          <p className="text-xs text-gray-500">May 12, 2025</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-3 top-6 bottom-6 w-0.5 bg-gray-300"></div>
                      
                      <div className="flex items-center mb-2 mt-6">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                        <div className="ml-2">
                          <p className="font-medium">Shipped</p>
                          <p className="text-xs text-gray-500">May 13, 2025</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-3 top-18 bottom-6 w-0.5 bg-gray-300"></div>
                      
                      <div className="flex items-center mb-2 mt-6">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="ml-2">
                          <p className="font-medium">Out for Delivery</p>
                          <p className="text-xs text-gray-500">Expected May 17, 2025</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-3 top-30 bottom-0 w-0.5 bg-gray-300"></div>
                      
                      <div className="flex items-center mt-6">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="ml-2">
                          <p className="font-medium">Delivered</p>
                          <p className="text-xs text-gray-500">Expected May 18, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <button 
                onClick={() => onNavigate('home')}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Invoice Page Component
const InvoicePage = ({ 
  orderDetails, 
  onBack 
}: { 
  orderDetails: {
    orderId: string;
    date: string;
    items: { name: string; price: string; quantity: number }[];
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
    customer: {
      name: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  onBack: () => void;
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Invoice</h1>
            <p className="text-gray-600">#{orderDetails.orderId}</p>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold mb-1">TechHub</div>
            <div className="text-gray-600">
              <p>123 Main Street</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="font-bold mb-2">Bill To:</h2>
            <div className="text-gray-600">
              <p>{orderDetails.customer.name}</p>
              <p>{orderDetails.customer.email}</p>
              <p>{orderDetails.customer.address}</p>
              <p>{orderDetails.customer.city}, {orderDetails.customer.state} {orderDetails.customer.zipCode}</p>
              <p>{orderDetails.customer.country}</p>
            </div>
          </div>
          
          <div className="text-right">
            <h2 className="font-bold mb-2">Invoice Details:</h2>
            <table className="text-right">
              <tbody>
                <tr>
                  <td className="pr-4 text-gray-600">Invoice Date:</td>
                  <td>{orderDetails.date}</td>
                </tr>
                <tr>
                  <td className="pr-4 text-gray-600">Order ID:</td>
                  <td>{orderDetails.orderId}</td>
                </tr>
                <tr>
                  <td className="pr-4 text-gray-600">Payment Method:</td>
                  <td>Credit Card</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Quantity</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="text-right py-2">${item.price}</td>
                  <td className="text-right py-2">{item.quantity}</td>
                  <td className="text-right py-2">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <div>Subtotal:</div>
              <div>${orderDetails.subtotal}</div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Tax:</div>
              <div>${orderDetails.tax}</div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Shipping:</div>
              <div>${orderDetails.shipping}</div>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <div>Total:</div>
              <div>${orderDetails.total}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-4">
          <p className="text-gray-600 mb-4">Thank you for your business!</p>
          
          <div className="flex justify-between">
            <button 
              onClick={onBack}
              className="text-blue-600 hover:underline"
            >
              Back to Orders
            </button>
            
            <button 
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App with improved routing and cart functionality
const App = () => {
  // Main state
  const [page, setPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Demo invoice data
  const demoInvoice = {
    orderId: 'INV-20250514-001',
    date: '2025-05-14',
    items: [
      { name: 'Smart Home Hub', price: '129.99', quantity: 1 },
      { name: 'Smart Light Bulbs (4-Pack)', price: '49.99', quantity: 2 },
      { name: 'Smart Door Lock', price: '199.99', quantity: 1 }
    ],
    subtotal: '429.96',
    tax: '34.40',
    shipping: '0.00',
    total: '464.36',
    customer: {
      name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Demo User',
      email: user?.email || 'demo@example.com',
      address: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'United States'
    }
  };

  // Check for logged in user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      // Check if product already in cart
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if already in cart
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    
    // Show success message
    alert(`Added ${product.name} to cart!`);
  };

  // Update quantity in cart
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Place order
  const handlePlaceOrder = () => {
    // Generate a random order ID (in a real app, this would come from the backend)
    const newOrderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setOrderId(newOrderId);
    
    // Clear cart
    setCartItems([]);
    
    // Navigate to confirmation page
    setPage('confirmation');
  };

  // View product details
  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setPage('product-detail');
  };

  // Handle login
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setPage('home');
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl cursor-pointer" onClick={() => setPage('home')}>TechHub</div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setPage('home')} className="hover:text-blue-300">Home</button>
            <button onClick={() => setPage('shop')} className="hover:text-blue-300">Shop</button>
            <button onClick={() => setPage('cart')} className="hover:text-blue-300">
              Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
            </button>
            <button onClick={() => setPage('invoice')} className="hover:text-blue-300">
              Invoice
            </button>
            {!user ? (
              <button onClick={() => setPage('login')} className="hover:text-blue-300">Login</button>
            ) : (
              <div className="relative group">
                <button className="flex items-center hover:text-blue-300">
                  <span className="mr-1">{user.firstName || user.username}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="py-1">
                    <button 
                      onClick={() => setPage('profile')}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={() => setPage('track-order')}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Track Order
                    </button>
                    <button 
                      onClick={() => setPage('invoice')}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      View Invoice
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Page Content */}
      {page === 'home' && <HomePage onNavigate={setPage} />}
      
      {page === 'shop' && (
        <ShopPage 
          onAddToCart={handleAddToCart} 
          onViewDetails={handleViewProductDetails} 
        />
      )}
      
      {page === 'product-detail' && selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onNavigateBack={() => setPage('shop')}
        />
      )}
      
      {page === 'cart' && (
        <CartPage 
          cartItems={cartItems} 
          updateQuantity={updateCartItemQuantity}
          removeFromCart={removeFromCart}
          onNavigate={setPage}
        />
      )}
      
      {page === 'checkout' && (
        <CheckoutPage 
          cartItems={cartItems}
          onPlaceOrder={handlePlaceOrder}
          onNavigate={setPage}
        />
      )}
      
      {page === 'confirmation' && (
        <OrderConfirmation 
          orderId={orderId}
          onNavigate={setPage}
        />
      )}
      
      {page === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
          onNavigate={setPage}
        />
      )}
      
      {page === 'register' && (
        <RegisterPage 
          onRegister={handleLogin}
          onNavigate={setPage}
        />
      )}
      
      {page === 'track-order' && (
        <TrackOrderPage 
          onNavigate={setPage}
        />
      )}
      
      {page === 'invoice' && (
        <InvoicePage 
          orderDetails={demoInvoice}
          onBack={() => setPage('home')}
        />
      )}
      
      {page === 'profile' && user && (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">User Profile</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Username</p>
                  <p className="font-medium">{user.username}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">First Name</p>
                  <p className="font-medium">{user.firstName || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Name</p>
                  <p className="font-medium">{user.lastName || 'Not set'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <button 
                onClick={() => setPage('home')}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
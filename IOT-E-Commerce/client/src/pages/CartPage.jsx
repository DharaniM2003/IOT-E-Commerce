import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck,
  CreditCard,
  Truck
} from 'lucide-react';

const CartPage = () => {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  
  // Sample cart data
  const sampleCartItems = [
    {
      id: 1,
      product: {
        id: "smart-home-hub",
        name: "Smart Home Hub",
        price: "129.99",
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        stock: 25
      },
      quantity: 1
    },
    {
      id: 2,
      product: {
        id: "wifi-smart-plug-4pack",
        name: "Wi-Fi Smart Plug (4-Pack)",
        price: "59.99",
        discountPrice: "49.99",
        image: "https://images.unsplash.com/photo-1561316441-1af1aaad668d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        stock: 42
      },
      quantity: 2
    }
  ];
  
  // Initialize cart data
  useEffect(() => {
    // Simulate API call to get cart items
    setIsLoading(true);
    setTimeout(() => {
      setCartItems(sampleCartItems);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.discountPrice ? 
      parseFloat(item.product.discountPrice) : 
      parseFloat(item.product.price);
    return total + (price * item.quantity);
  }, 0);
  
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shippingCost + tax - promoDiscount;
  
  // Update quantity handler
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Remove item handler
  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    setPromoError('');
    
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    // Example promo code validation
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoDiscount(subtotal * 0.1); // 10% off
    } else if (promoCode.toUpperCase() === 'FREESHIP') {
      setPromoDiscount(shippingCost);
    } else {
      setPromoError('Invalid promo code');
    }
  };
  
  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cartItems.length === 0) return;
    setLocation('/checkout');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
      <p className="text-muted-foreground mb-8">Review and modify your items before checkout</p>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 border-b last:border-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="sm:ml-4 flex-grow">
                        <div className="flex justify-between">
                          <Link 
                            href={`/product/${item.product.id}`}
                            className="font-medium hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="mt-1 mb-3">
                          {item.product.discountPrice ? (
                            <div className="flex items-center">
                              <span className="font-medium">{formatCurrency(item.product.discountPrice)}</span>
                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                {formatCurrency(item.product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">{formatCurrency(item.product.price)}</span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-3 py-1 border-x">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 disabled:opacity-50"
                              disabled={item.quantity >= item.product.stock}
                            >
                              +
                            </button>
                          </div>
                          <div className="font-medium">
                            {formatCurrency(
                              (item.product.discountPrice ? 
                                parseFloat(item.product.discountPrice) : 
                                parseFloat(item.product.price)) * item.quantity
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-center">
                <Button variant="outline" asChild className="mb-3 sm:mb-0">
                  <Link href="/shop">
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setCartItems(sampleCartItems)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-{formatCurrency(promoDiscount)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                
                <div className="pt-4">
                  <Label htmlFor="promo-code">Promo Code</Label>
                  <div className="flex mt-1.5">
                    <Input 
                      id="promo-code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      className="rounded-l-none"
                    >
                      Apply
                    </Button>
                  </div>
                  {promoError && (
                    <p className="text-sm text-destructive mt-1">{promoError}</p>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={proceedToCheckout}
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </Button>
                
                <div className="pt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="h-4 w-4 mb-1" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="h-4 w-4 mb-1" />
                    <span>Fast Shipping</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <CreditCard className="h-4 w-4 mb-1" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
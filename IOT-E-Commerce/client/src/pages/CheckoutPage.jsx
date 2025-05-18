import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/lib/utils';
import { 
  CreditCard, 
  AlertCircle,
  ShieldCheck,
  Lock
} from 'lucide-react';

const CheckoutPage = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  // Sample cart data
  const sampleCartItems = [
    {
      id: 1,
      product: {
        id: "smart-home-hub",
        name: "Smart Home Hub",
        price: "129.99",
        discountPrice: null,
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
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
        image: "https://images.unsplash.com/photo-1561316441-1af1aaad668d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      quantity: 2
    }
  ];
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.discountPrice ? 
      parseFloat(item.product.discountPrice) : 
      parseFloat(item.product.price);
    return total + (price * item.quantity);
  }, 0);
  
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shippingCost + tax;
  
  // Initialize cart data
  useEffect(() => {
    // Simulate API call to get cart items
    setIsLoading(true);
    setTimeout(() => {
      setCartItems(sampleCartItems);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Handle shipping form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    
    // If same as shipping is checked, update billing info too
    if (sameAsShipping && 
       (name === 'firstName' || name === 'lastName' || name === 'address' || 
        name === 'city' || name === 'state' || name === 'zipCode' || name === 'country')) {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle billing form changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle card info changes
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Toggle same as shipping
  const handleSameAsShipping = (checked) => {
    setSameAsShipping(checked);
    if (checked) {
      // Copy shipping info to billing
      setBillingInfo({
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    let isValid = true;
    
    // Check shipping info fields
    Object.entries(shippingInfo).forEach(([key, value]) => {
      if (value.trim() === '' && key !== 'country') {
        isValid = false;
      }
    });
    
    // Check billing info if not same as shipping
    if (!sameAsShipping) {
      Object.entries(billingInfo).forEach(([key, value]) => {
        if (value.trim() === '' && key !== 'country') {
          isValid = false;
        }
      });
    }
    
    // Check payment info for credit card
    if (paymentMethod === 'credit-card') {
      Object.entries(cardInfo).forEach(([key, value]) => {
        if (value.trim() === '') {
          isValid = false;
        }
      });
    }
    
    if (!isValid) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Redirect to order review page
      setLocation('/place-order');
    }, 1500);
  };
  
  // country options
  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' }
  ];
  
  // state options (US only for demo)
  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-8">Complete your order details</p>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Shipping & Payment */}
            <div className="md:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Select 
                        value={shippingInfo.state} 
                        onValueChange={(value) => handleShippingChange({ target: { name: 'state', value } })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input 
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select 
                        value={shippingInfo.country} 
                        onValueChange={(value) => handleShippingChange({ target: { name: 'country', value } })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Billing Information</CardTitle>
                      <CardDescription>Enter your billing details</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="same-as-shipping"
                        checked={sameAsShipping}
                        onCheckedChange={handleSameAsShipping}
                      />
                      <Label htmlFor="same-as-shipping">Same as shipping</Label>
                    </div>
                  </div>
                </CardHeader>
                
                {!sameAsShipping && (
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingFirstName">First Name *</Label>
                        <Input 
                          id="billingFirstName"
                          name="firstName"
                          value={billingInfo.firstName}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingLastName">Last Name *</Label>
                        <Input 
                          id="billingLastName"
                          name="lastName"
                          value={billingInfo.lastName}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Street Address *</Label>
                      <Input 
                        id="billingAddress"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleBillingChange}
                        required
                      />
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City *</Label>
                        <Input 
                          id="billingCity"
                          name="city"
                          value={billingInfo.city}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State/Province *</Label>
                        <Select 
                          value={billingInfo.state} 
                          onValueChange={(value) => handleBillingChange({ target: { name: 'state', value } })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingZipCode">ZIP/Postal Code *</Label>
                        <Input 
                          id="billingZipCode"
                          name="zipCode"
                          value={billingInfo.zipCode}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCountry">Country *</Label>
                        <Select 
                          value={billingInfo.country} 
                          onValueChange={(value) => handleBillingChange({ target: { name: 'country', value } })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
              
              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select how you want to pay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex-grow cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Credit / Debit Card
                        </div>
                      </Label>
                      <div className="flex space-x-1">
                        <div className="bg-[#1434CB] text-white rounded px-1 text-xs">Visa</div>
                        <div className="bg-[#FF5F00] text-white rounded px-1 text-xs">MC</div>
                        <div className="bg-[#0066FF] text-white rounded px-1 text-xs">Amex</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-grow cursor-pointer">
                        <div className="flex items-center">
                          <div className="mr-2 text-[#253B80] font-bold text-sm">
                            Pay<span className="text-[#179BD7]">Pal</span>
                          </div>
                          PayPal Checkout
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-4 space-y-4 p-4 border rounded-md">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <div className="relative">
                          <Input 
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={cardInfo.cardNumber}
                            onChange={handleCardChange}
                          />
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input 
                          id="cardName"
                          name="cardName"
                          value={cardInfo.cardName}
                          onChange={handleCardChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration Date (MM/YY) *</Label>
                          <Input 
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={handleCardChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">Security Code (CVV) *</Label>
                          <div className="relative">
                            <Input 
                              id="cvv"
                              name="cvv"
                              value={cardInfo.cvv}
                              onChange={handleCardChange}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                              <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Lock className="h-4 w-4 mr-1" />
                        Your payment information is secured with SSL encryption
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items summary */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 mr-3">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.product.name}</div>
                            <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {formatCurrency(
                            (item.product.discountPrice ? 
                              parseFloat(item.product.discountPrice) : 
                              parseFloat(item.product.price)) * item.quantity
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-lg">{formatCurrency(total)}</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <Button 
                    type="submit" 
                    className="w-full mt-6" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Review Order'}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <div className="flex justify-center mb-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your personal data will be used to process your order, support
                      your experience throughout this website, and for other purposes
                      described in our privacy policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
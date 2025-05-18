import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, Truck, CreditCard, AlertCircle } from 'lucide-react';

const PlaceOrderPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  // Example data - would be fetched from the cart/checkout state in a real application
  const orderDetails = {
    items: [
      { 
        id: 1, 
        name: "Smart Home Hub", 
        quantity: 1, 
        price: "129.99", 
        imageUrl: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      },
      { 
        id: 2, 
        name: "Wi-Fi Smart Plug (4-Pack)", 
        quantity: 2, 
        price: "59.99", 
        imageUrl: "https://images.unsplash.com/photo-1561316441-1af1aaad668d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    ],
    shipping: {
      address: "123 Main Street",
      city: "Tech City",
      state: "CA",
      zipCode: "90210",
      country: "United States"
    },
    payment: {
      method: "Credit Card",
      cardLast4: "4242"
    },
    subtotal: 249.97,
    shippingCost: 9.99,
    tax: 20.00,
    total: 279.96
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to invoice page with a dummy order ID
      setLocation('/invoice/ORD-123456');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Review Your Order</h1>
        <p className="text-muted-foreground">Please review your order before placing it</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Items you're about to purchase</CardDescription>
            </CardHeader>
            <CardContent>
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex py-4 border-b last:border-0">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × {formatCurrency(item.price)}
                      </div>
                      <div>
                        {formatCurrency(parseFloat(item.price) * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-8 sm:grid-cols-2 mt-8">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Shipping</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{`${orderDetails.shipping.address}, ${orderDetails.shipping.city}`}</p>
                <p className="text-sm text-muted-foreground">{`${orderDetails.shipping.state} ${orderDetails.shipping.zipCode}, ${orderDetails.shipping.country}`}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">Payment</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{orderDetails.payment.method}</p>
                <p className="text-sm text-muted-foreground">Ending in {orderDetails.payment.cardLast4}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(orderDetails.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(orderDetails.shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatCurrency(orderDetails.tax)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(orderDetails.total)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                onClick={handlePlaceOrder} 
                className="w-full mb-3" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Place Order"}
              </Button>
              <div className="text-sm text-muted-foreground flex items-center justify-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>You can review this order before it's final</span>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-6 border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center text-green-700 dark:text-green-500">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span className="font-medium">Security</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              All transactions are secure and encrypted. Your personal information is protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
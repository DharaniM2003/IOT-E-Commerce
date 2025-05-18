import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  Truck, 
  MapPin, 
  Check, 
  Clock, 
  AlertCircle,
  ShoppingBag,
  Home
} from 'lucide-react';

const TrackOrderPage = () => {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const orderIdFromURL = searchParams.get('id');
  
  const [orderId, setOrderId] = useState(orderIdFromURL || '');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Example tracking data for demo purposes
  const trackingData = {
    'ORD-123456': {
      orderId: 'ORD-123456',
      trackingNumber: 'TRK928374651',
      carrier: 'FedEx',
      estimatedDelivery: 'May 18, 2025',
      status: 'In Transit',
      currentLocation: 'Distribution Center, San Francisco, CA',
      shippingAddress: '123 Main St, Tech City, CA 90210',
      timeline: [
        { 
          status: 'Order Placed', 
          date: 'May 10, 2025', 
          time: '10:30 AM', 
          location: 'Online', 
          completed: true,
          icon: <ShoppingBag className="h-5 w-5" />
        },
        { 
          status: 'Order Processed', 
          date: 'May 11, 2025', 
          time: '09:15 AM', 
          location: 'TechHub Warehouse', 
          completed: true,
          icon: <Package className="h-5 w-5" />
        },
        { 
          status: 'Shipped', 
          date: 'May 12, 2025', 
          time: '02:45 PM', 
          location: 'TechHub Warehouse', 
          completed: true,
          icon: <Truck className="h-5 w-5" />
        },
        { 
          status: 'In Transit', 
          date: 'May 14, 2025', 
          time: '11:20 AM', 
          location: 'Distribution Center, San Francisco, CA', 
          completed: true,
          icon: <Truck className="h-5 w-5" />
        },
        { 
          status: 'Out for Delivery', 
          date: 'Expected May 17, 2025', 
          time: '', 
          location: 'Local Carrier Facility', 
          completed: false,
          icon: <Truck className="h-5 w-5" />
        },
        { 
          status: 'Delivered', 
          date: 'Expected May 18, 2025', 
          time: '', 
          location: 'Tech City, CA', 
          completed: false,
          icon: <Home className="h-5 w-5" />
        }
      ]
    },
    'ORD-123455': {
      orderId: 'ORD-123455',
      trackingNumber: 'TRK837264591',
      carrier: 'UPS',
      estimatedDelivery: 'May 2, 2025',
      status: 'Shipped',
      currentLocation: 'Sorting Facility, Chicago, IL',
      shippingAddress: '123 Main St, Tech City, CA 90210',
      timeline: [
        { 
          status: 'Order Placed', 
          date: 'April 28, 2025', 
          time: '3:45 PM', 
          location: 'Online', 
          completed: true,
          icon: <ShoppingBag className="h-5 w-5" />
        },
        { 
          status: 'Order Processed', 
          date: 'April 29, 2025', 
          time: '10:30 AM', 
          location: 'TechHub Warehouse', 
          completed: true,
          icon: <Package className="h-5 w-5" />
        },
        { 
          status: 'Shipped', 
          date: 'April 30, 2025', 
          time: '01:15 PM', 
          location: 'TechHub Warehouse', 
          completed: true,
          icon: <Truck className="h-5 w-5" />
        },
        { 
          status: 'In Transit', 
          date: 'Expected May 1, 2025', 
          time: '', 
          location: 'Sorting Facility, Chicago, IL', 
          completed: false,
          icon: <Truck className="h-5 w-5" />
        },
        { 
          status: 'Out for Delivery', 
          date: 'Expected May 2, 2025', 
          time: '', 
          location: 'Local Carrier Facility', 
          completed: false,
          icon: <Truck className="h-5 w-5" />
        },
        { 
          status: 'Delivered', 
          date: 'Expected May 2, 2025', 
          time: '', 
          location: 'Tech City, CA', 
          completed: false,
          icon: <Home className="h-5 w-5" />
        }
      ]
    }
  };

  useEffect(() => {
    if (orderIdFromURL) {
      trackOrder();
    }
  }, [orderIdFromURL]);

  const trackOrder = () => {
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const trackingResult = trackingData[orderId];
      
      if (trackingResult) {
        setTrackingInfo(trackingResult);
        setError('');
      } else {
        setTrackingInfo(null);
        setError(`No tracking information found for order ${orderId}`);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (completed) => {
    return completed ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Track Order</h1>
        <p className="text-muted-foreground">Monitor the status and location of your shipment</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="sm:col-span-3 space-y-2">
              <Label htmlFor="order-id">Order ID</Label>
              <Input 
                id="order-id"
                placeholder="e.g. ORD-123456"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full" 
                onClick={trackOrder}
                disabled={isLoading}
              >
                {isLoading ? 'Tracking...' : 'Track Order'}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {trackingInfo && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Tracking Information</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Order #{trackingInfo.orderId}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">{trackingInfo.carrier}</div>
                  <p className="text-sm text-muted-foreground">Tracking #: {trackingInfo.trackingNumber}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Estimated Delivery</span>
                      <p className="font-medium">{trackingInfo.estimatedDelivery}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Package className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Current Status</span>
                      <p className="font-medium">{trackingInfo.status}</p>
                      <p className="text-sm text-muted-foreground">{trackingInfo.currentLocation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <span className="text-sm font-medium">Shipping Address</span>
                      <p className="text-sm text-muted-foreground">{trackingInfo.shippingAddress}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Shipping Updates</h3>
                  <div className="space-y-6">
                    {trackingInfo.timeline.map((event, index) => (
                      <div key={index} className="relative pl-7">
                        {index !== trackingInfo.timeline.length - 1 && (
                          <div className={`absolute left-[11px] top-[22px] h-full w-px ${event.completed ? 'bg-green-600 dark:bg-green-500' : 'bg-muted-foreground/30'}`}></div>
                        )}
                        <div className={`absolute left-0 top-1 rounded-full p-1 ${event.completed ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                          {event.completed ? <Check className="h-4 w-4" /> : event.icon}
                        </div>
                        <div>
                          <p className={`font-medium ${getStatusColor(event.completed)}`}>{event.status}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.date}
                            {event.time && ` at ${event.time}`}
                          </p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href={`/invoice/${trackingInfo.orderId}`}>View Invoice</Link>
            </Button>
            
            <Button asChild>
              <Link href="/history">View All Orders</Link>
            </Button>
          </div>
        </div>
      )}

      {!trackingInfo && !error && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Truck className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">Track Your Order</h3>
            <p className="text-muted-foreground text-center mt-2 mb-4 max-w-md">
              Enter your order ID above to see real-time tracking information and delivery updates.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mt-4">
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Real-Time Updates</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Get up-to-the-minute status of your delivery
                </p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Location Tracking</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Know exactly where your package is at all times
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackOrderPage;
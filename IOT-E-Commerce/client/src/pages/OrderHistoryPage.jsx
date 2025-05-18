import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { Search, Package, ArrowRight, MapPin } from 'lucide-react';

const OrderHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example orders data - would be fetched from API in a real app
  const orders = [
    {
      id: "ORD-123456",
      date: "May 10, 2025",
      total: 279.96,
      status: "Delivered",
      items: [
        { id: 1, name: "Smart Home Hub", quantity: 1 },
        { id: 2, name: "Wi-Fi Smart Plug (4-Pack)", quantity: 2 }
      ],
      shippingAddress: "123 Main St, Tech City, CA 90210",
      trackingNumber: "TRK928374651"
    },
    {
      id: "ORD-123455",
      date: "April 28, 2025",
      total: 189.99,
      status: "Shipped",
      items: [
        { id: 3, name: "Smart Thermostat", quantity: 1 },
        { id: 4, name: "Motion Sensor (2-Pack)", quantity: 1 }
      ],
      shippingAddress: "123 Main St, Tech City, CA 90210",
      trackingNumber: "TRK837264591"
    },
    {
      id: "ORD-123454",
      date: "April 15, 2025",
      total: 329.97,
      status: "Processing",
      items: [
        { id: 5, name: "Security Camera System", quantity: 1 },
        { id: 6, name: "Door/Window Sensors (3-Pack)", quantity: 1 }
      ],
      shippingAddress: "123 Main St, Tech City, CA 90210",
      trackingNumber: null
    }
  ];

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order History</h1>
        <p className="text-muted-foreground">View and track your past orders</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search orders by ID or product name..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge className={`${getStatusColor(order.status)} border-none`}>
                      {order.status}
                    </Badge>
                    <div className="text-lg font-medium">
                      {formatCurrency(order.total)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <div className="text-sm font-medium mb-1">Items</div>
                    <ul className="space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="text-sm flex justify-between">
                          <span>{item.name}</span>
                          <span className="text-muted-foreground">Qty: {item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1 flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      Shipping Address
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.shippingAddress}
                    </div>
                    
                    {order.trackingNumber && (
                      <div className="mt-3">
                        <div className="text-sm font-medium mb-1 flex items-center">
                          <Package className="h-3.5 w-3.5 mr-1" />
                          Tracking
                        </div>
                        <div className="text-sm font-mono">
                          {order.trackingNumber}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/invoice/${order.id}`}>View Invoice</Link>
                  </Button>
                  {['Shipped', 'Processing'].includes(order.status) && (
                    <Button size="sm" asChild>
                      <Link href={`/track-order?id=${order.id}`}>
                        Track Order
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No orders found</h3>
          <p className="mt-1 text-muted-foreground">
            {searchTerm ? "No orders match your search criteria" : "You haven't placed any orders yet"}
          </p>
          <Button className="mt-4" asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
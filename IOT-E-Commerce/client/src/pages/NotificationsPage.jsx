import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  ShoppingBag, 
  Truck, 
  Percent, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2,
  Tag,
  Bookmark,
  PackageCheck,
  X 
} from 'lucide-react';

const NotificationsPage = () => {
  // Example preferences - would be fetched from user settings in a real app
  const [preferences, setPreferences] = useState({
    email: {
      orderUpdates: true,
      shipping: true,
      promotions: false,
      payment: true,
      stockAlerts: true
    },
    push: {
      orderUpdates: true,
      shipping: true,
      promotions: true,
      payment: true,
      stockAlerts: false
    }
  });

  // Example notifications - would be fetched from API in a real app
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #ORD-123456 has been shipped and is on its way.',
      date: '2 hours ago',
      read: false,
      icon: <Truck className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Flash Sale',
      message: '24-hour flash sale! Get 25% off all smart home devices.',
      date: 'Yesterday',
      read: false,
      icon: <Percent className="h-5 w-5 text-green-500" />
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment for order #ORD-123455 was processed successfully.',
      date: '3 days ago',
      read: true,
      icon: <CreditCard className="h-5 w-5 text-purple-500" />
    },
    {
      id: 4,
      type: 'alert',
      title: 'Product Back in Stock',
      message: 'Smart Thermostat Pro is back in stock!',
      date: '5 days ago',
      read: true,
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD-123454 has been delivered.',
      date: '1 week ago',
      read: true,
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
    }
  ];

  const updatePreference = (category, type, value) => {
    setPreferences({
      ...preferences,
      [category]: {
        ...preferences[category],
        [type]: value
      }
    });
  };

  const [activeTab, setActiveTab] = useState('all');
  
  const filteredNotifications = 
    activeTab === 'all' 
      ? notifications 
      : notifications.filter(notification => notification.type === activeTab);

  const markAllAsRead = () => {
    // In a real app, this would make an API call
    alert('All notifications marked as read');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on your orders, deals, and more</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                <CardTitle>Your Notifications</CardTitle>
                {notifications.some(n => !n.read) && (
                  <Badge variant="default" className="ml-2">
                    {notifications.filter(n => !n.read).length} New
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all" className="flex items-center">
                    <Bell className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">All</span>
                  </TabsTrigger>
                  <TabsTrigger value="order" className="flex items-center">
                    <ShoppingBag className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="promotion" className="flex items-center">
                    <Tag className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Deals</span>
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="flex items-center">
                    <CreditCard className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Payments</span>
                  </TabsTrigger>
                  <TabsTrigger value="alert" className="flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Alerts</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`flex items-start p-4 border rounded-lg ${notification.read ? '' : 'bg-muted/30'}`}
                        >
                          <div className="flex-shrink-0 mr-3">
                            {notification.icon}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h4 className={`text-sm font-medium ${notification.read ? '' : 'font-semibold'}`}>
                                {notification.title}
                                {!notification.read && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                                )}
                              </h4>
                              <span className="text-xs text-muted-foreground">{notification.date}</span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8 rounded-full ml-2">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                      <p className="mt-1 text-muted-foreground">
                        You're all caught up! No new notifications.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="order" className="mt-4">
                  {/* Same pattern for other tabs, content will be filtered */}
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`flex items-start p-4 border rounded-lg ${notification.read ? '' : 'bg-muted/30'}`}
                        >
                          <div className="flex-shrink-0 mr-3">
                            {notification.icon}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h4 className={`text-sm font-medium ${notification.read ? '' : 'font-semibold'}`}>
                                {notification.title}
                                {!notification.read && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                                )}
                              </h4>
                              <span className="text-xs text-muted-foreground">{notification.date}</span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8 rounded-full ml-2">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <PackageCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No order notifications</h3>
                      <p className="mt-1 text-muted-foreground">
                        You don't have any order updates at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                {/* Other tabs would be implemented similarly */}
                <TabsContent value="promotion" className="mt-4">
                  {/* Promotions tab content */}
                </TabsContent>
                
                <TabsContent value="payment" className="mt-4">
                  {/* Payments tab content */}
                </TabsContent>
                
                <TabsContent value="alert" className="mt-4">
                  {/* Alerts tab content */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="order-email">Order Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Get notified about order status changes
                        </p>
                      </div>
                      <Switch
                        id="order-email"
                        checked={preferences.email.orderUpdates}
                        onCheckedChange={(checked) => updatePreference('email', 'orderUpdates', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shipping-email">Shipping Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Get notified when your order ships
                        </p>
                      </div>
                      <Switch
                        id="shipping-email"
                        checked={preferences.email.shipping}
                        onCheckedChange={(checked) => updatePreference('email', 'shipping', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="promotions-email">Promotions & Deals</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive emails about sales and special offers
                        </p>
                      </div>
                      <Switch
                        id="promotions-email"
                        checked={preferences.email.promotions}
                        onCheckedChange={(checked) => updatePreference('email', 'promotions', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="order-push">Order Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Get push notifications for order status
                        </p>
                      </div>
                      <Switch
                        id="order-push"
                        checked={preferences.push.orderUpdates}
                        onCheckedChange={(checked) => updatePreference('push', 'orderUpdates', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="stock-push">Stock Alerts</Label>
                        <p className="text-xs text-muted-foreground">
                          Be notified when wishlist items are back in stock
                        </p>
                      </div>
                      <Switch
                        id="stock-push"
                        checked={preferences.push.stockAlerts}
                        onCheckedChange={(checked) => updatePreference('push', 'stockAlerts', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
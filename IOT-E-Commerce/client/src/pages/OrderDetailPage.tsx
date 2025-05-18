import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/authStore";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Loader2, Package, ShoppingBag, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Fetch order details
  const { 
    data: order,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: [`/api/orders/${id}`],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch order details');
      return res.json();
    },
    enabled: isAuthenticated && !!id,
  });

  // Update document title
  useEffect(() => {
    if (order) {
      document.title = `Order #${order.id} - TechHub`;
    } else {
      document.title = "Order Details - TechHub";
    }
    
    return () => {
      document.title = "TechHub - Your One-Stop Shop for Tech Products";
    };
  }, [order]);

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">Shipped</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
    }
  };

  // Estimated delivery date (just for demonstration)
  const getEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // 7 days from now
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-4">Sign in to view your order</h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to view your order details.
        </p>
        <Button asChild>
          <Link href={`/login?redirect=orders/${id}`}>Sign In</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-64 w-full mb-8 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">
          We couldn't find the order you're looking for. It may have been removed or you don't have permission to view it.
        </p>
        <Button asChild>
          <Link href="/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <div className="ml-4">{getStatusBadge(order.status)}</div>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Order Information</h3>
                <p className="text-sm mb-1">
                  <span className="text-muted-foreground">Order Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm mb-1">
                  <span className="text-muted-foreground">Order Status:</span>{" "}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
                <p className="text-sm mb-1">
                  <span className="text-muted-foreground">Payment Method:</span>{" "}
                  {order.paymentMethod === 'credit_card' 
                    ? 'Credit Card'
                    : order.paymentMethod === 'paypal'
                    ? 'PayPal'
                    : 'Bank Transfer'}
                </p>
                {order.status !== 'cancelled' && (
                  <p className="text-sm mt-3 flex items-center text-green-600">
                    <Truck className="mr-2 h-4 w-4" />
                    Estimated delivery: {getEstimatedDelivery()}
                  </p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p className="text-sm">
                  {order.shippingAddress}<br />
                  {order.shippingCity}, {order.shippingState} {order.shippingZipCode}<br />
                  {order.shippingCountry}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between py-4 border-b last:border-0">
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-neutral-100 rounded overflow-hidden mr-4">
                      {item.product.imageUrls && item.product.imageUrls.length > 0 ? (
                        <img 
                          src={item.product.imageUrls[0]} 
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-neutral-200">
                          <Package className="h-8 w-8 text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <Link href={`/products/${item.product.slug}`} className="font-medium hover:text-primary transition">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right sm:self-center">
                    <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        {order.status !== 'cancelled' && (
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute top-0 left-4 h-full w-0.5 bg-neutral-200"></div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 rounded-full bg-primary text-white flex items-center justify-center h-8 w-8">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Order Placed</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className={`relative pl-10 pb-8 ${order.status === 'pending' ? 'opacity-50' : ''}`}>
                  <div className={`absolute left-0 rounded-full flex items-center justify-center h-8 w-8 ${
                    order.status !== 'pending' ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-400'
                  }`}>
                    {order.status !== 'pending' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Package className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="font-medium">Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.status !== 'pending' ? 'Your order is being processed' : 'Pending'}
                  </p>
                </div>
                
                <div className={`relative pl-10 pb-8 ${
                  order.status !== 'shipped' && order.status !== 'completed' ? 'opacity-50' : ''
                }`}>
                  <div className={`absolute left-0 rounded-full flex items-center justify-center h-8 w-8 ${
                    order.status === 'shipped' || order.status === 'completed' 
                      ? 'bg-primary text-white' 
                      : 'bg-neutral-200 text-neutral-400'
                  }`}>
                    {order.status === 'shipped' || order.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Truck className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="font-medium">Shipped</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.status === 'shipped' || order.status === 'completed' 
                      ? 'Your order has been shipped' 
                      : 'Waiting to be shipped'}
                  </p>
                </div>
                
                <div className={`relative pl-10 ${order.status !== 'completed' ? 'opacity-50' : ''}`}>
                  <div className={`absolute left-0 rounded-full flex items-center justify-center h-8 w-8 ${
                    order.status === 'completed' 
                      ? 'bg-primary text-white' 
                      : 'bg-neutral-200 text-neutral-400'
                  }`}>
                    {order.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="font-medium">Delivered</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.status === 'completed' 
                      ? 'Your order has been delivered' 
                      : 'Waiting to be delivered'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;

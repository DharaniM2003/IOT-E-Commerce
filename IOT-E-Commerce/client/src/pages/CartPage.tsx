import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowRight, Loader2, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import CartItem from "@/components/cart/CartItem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { cartItems, cartTotal, isLoading, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    setIsClearing(true);
    await clearCart();
    setIsClearing(false);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  const shippingFee = cartTotal < 75 && cartTotal > 0 ? 10 : 0;
  const orderTotal = cartTotal + shippingFee;

  // Update document title
  document.title = "Shopping Cart - TechHub";

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <h1 className="text-2xl font-bold">Loading your cart...</h1>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="px-6">
                  <div className="hidden sm:grid sm:grid-cols-12 text-sm text-muted-foreground">
                    <div className="sm:col-span-8">Product</div>
                    <div className="sm:col-span-2 text-center">Quantity</div>
                    <div className="sm:col-span-1 text-right">Price</div>
                    <div className="sm:col-span-1"></div>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </CardContent>
                <CardFooter className="px-6 py-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    className="flex items-center" 
                    onClick={handleClearCart}
                    disabled={isClearing}
                  >
                    {isClearing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Clear Cart
                  </Button>
                  <Button asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingFee === 0 
                        ? cartTotal > 0 ? "Free" : formatCurrency(0) 
                        : formatCurrency(shippingFee)}
                    </span>
                  </div>
                  
                  {cartTotal > 0 && cartTotal < 75 && (
                    <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Almost there!</AlertTitle>
                      <AlertDescription>
                        Add ${formatCurrency(75 - cartTotal)} more to qualify for free shipping.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(orderTotal)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link href="/products">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CartPage;

import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Home, ShoppingBag } from 'lucide-react';

const LogoutPage = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // In a real app, this would call a logout API endpoint
    const logout = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Clear local storage or cookies as needed
        localStorage.removeItem('authToken');
        
        // You might dispatch an action to clear auth state in your context/store
        // e.g., dispatch({ type: 'LOGOUT' });
        
        // Optionally redirect after a delay
        setTimeout(() => {
          setLocation('/');
        }, 3000);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    
    logout();
  }, [setLocation]);

  const handleGoHome = () => {
    setLocation('/');
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6 pb-4">
          <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <LogOut className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Logging Out</h1>
          <p className="text-muted-foreground mb-6">
            You are being securely logged out of your account.
            You will be redirected to the home page shortly.
          </p>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="outline" onClick={handleGoHome}>
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Button>
            <Button variant="outline" onClick={() => setLocation('/shop')}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
          
          <div className="mt-8 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Thank you for shopping with TechHub! We hope to see you again soon.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoutPage;
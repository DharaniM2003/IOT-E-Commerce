import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    discountPrice: string | null;
    imageUrls: string[];
    stock: number;
  };
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider(props: { children: ReactNode }) {
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const { 
    data: cartItems = [], 
    isLoading,
    refetch 
  } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: async ({ queryKey }) => {
      try {
        const res = await fetch(queryKey[0] as string, {
          credentials: 'include',
        });
        if (res.status === 401) {
          return [];
        }
        if (!res.ok) {
          throw new Error('Failed to fetch cart items');
        }
        return await res.json();
      } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
      }
    },
  });

  // Calculate cart count and total whenever cart items change
  useEffect(() => {
    const count = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    setCartCount(count);

    const total = cartItems.reduce((sum: number, item: CartItem) => {
      const price = item.product.discountPrice || item.product.price;
      return sum + (parseFloat(price) * item.quantity);
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number, quantity: number }) => 
      apiRequest('POST', '/api/cart', { productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to cart",
        description: "The item has been added to your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      });
    }
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number, quantity: number }) => 
      apiRequest('PUT', `/api/cart/${cartItemId}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update quantity",
        variant: "destructive",
      });
    }
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (cartItemId: number) => 
      apiRequest('DELETE', `/api/cart/${cartItemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Removed from cart",
        description: "The item has been removed from your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  });

  const clearCartMutation = useMutation({
    mutationFn: () => 
      apiRequest('DELETE', '/api/cart'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to clear cart",
        variant: "destructive",
      });
    }
  });

  async function addToCart(productId: number, quantity: number) {
    await addToCartMutation.mutateAsync({ productId, quantity });
  }

  async function updateQuantity(cartItemId: number, quantity: number) {
    await updateQuantityMutation.mutateAsync({ cartItemId, quantity });
  }

  async function removeFromCart(cartItemId: number) {
    await removeFromCartMutation.mutateAsync(cartItemId);
  }

  async function clearCart() {
    await clearCartMutation.mutateAsync();
  }

  const contextValue: CartContextType = {
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isLoading,
    cartTotal
  };

  return React.createElement(CartContext.Provider, { value: contextValue }, props.children);
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
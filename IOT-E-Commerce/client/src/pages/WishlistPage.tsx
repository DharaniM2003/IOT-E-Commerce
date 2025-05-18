import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store/authStore";
import { useCart } from "@/store/cartStore";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { Heart, Loader2, ShoppingBag, ShoppingCart, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WishlistPage = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  // Fetch wishlist items
  const { 
    data: wishlistItems = [], 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['/api/wishlist'],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch wishlist');
      return res.json();
    },
    enabled: isAuthenticated,
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/wishlist/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from wishlist",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setRemovingId(null);
    }
  });

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (id: number) => {
    setRemovingId(id);
    removeFromWishlistMutation.mutate(id);
  };

  // Handle add to cart
  const handleAddToCart = async (item: any) => {
    setAddingToCartId(item.productId);
    try {
      await addToCart(item.productId, 1);
      toast({
        title: "Added to cart",
        description: "The item has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setAddingToCartId(null);
    }
  };

  // Update document title
  document.title = "My Wishlist - TechHub";

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-4">Sign in to view your wishlist</h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to view and manage your wishlist.
        </p>
        <Button asChild>
          <Link href="/login?redirect=wishlist">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item: any) => (
              <Card key={item.id} className="relative group overflow-hidden">
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white shadow hover:bg-red-50"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    disabled={removingId === item.id}
                  >
                    {removingId === item.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </Button>
                </div>
                
                <Link href={`/products/${item.product.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    {item.product.imageUrls && item.product.imageUrls.length > 0 ? (
                      <img
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-neutral-400" />
                      </div>
                    )}
                    
                    {item.product.discountPrice && (
                      <Badge className="absolute top-2 left-2 bg-accent">
                        Sale
                      </Badge>
                    )}
                  </div>
                </Link>
                
                <CardContent className="p-4">
                  <Link href={`/products/${item.product.slug}`} className="block">
                    <h3 className="font-medium text-lg mb-1 line-clamp-1 hover:text-primary transition">
                      {item.product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-2 mb-4">
                    {item.product.discountPrice ? (
                      <div className="flex items-center">
                        <span className="font-bold text-lg">{formatCurrency(item.product.discountPrice)}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {formatCurrency(item.product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-lg">{formatCurrency(item.product.price)}</span>
                    )}
                    
                    <Badge variant={item.product.stock > 0 ? "outline" : "secondary"} className={
                      item.product.stock > 0 ? "text-green-500 border-green-500" : "bg-red-100 text-red-500"
                    }>
                      {item.product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(item)}
                    disabled={item.product.stock <= 0 || addingToCartId === item.productId}
                  >
                    {addingToCartId === item.productId ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="mr-2 h-4 w-4" />
                    )}
                    {item.product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save items you love to your wishlist and review them anytime.
              </p>
              <Button asChild>
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
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

export default WishlistPage;

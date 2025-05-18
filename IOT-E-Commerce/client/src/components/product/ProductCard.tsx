import { useState } from "react";
import { Link } from "wouter";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency, getImageFallback } from "@/lib/utils";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Rating from "@/components/ui/Rating";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    discountPrice?: string;
    imageUrls: string[];
    stock: number;
    featured?: boolean;
    newArrival?: boolean;
    averageRating?: string;
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const addToWishlistMutation = useMutation({
    mutationFn: (productId: number) => 
      apiRequest('POST', '/api/wishlist', { productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
      toast({
        title: "Added to wishlist",
        description: "The product has been added to your wishlist",
      });
    },
    onError: (error: Error) => {
      if (error.message.includes("already in wishlist")) {
        toast({
          title: "Already in wishlist",
          description: "This product is already in your wishlist",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to add to wishlist",
          variant: "destructive",
        });
      }
    }
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }
    
    addToWishlistMutation.mutate(product.id);
  };

  const imageUrl = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls[0] 
    : getImageFallback(product.id);

  const badge = product.newArrival 
    ? { text: "New", className: "bg-accent" }
    : product.discountPrice
    ? { text: "Sale", className: "bg-accent" }
    : product.featured
    ? { text: "Featured", className: "bg-warning" }
    : null;

  return (
    <Card 
      className="overflow-hidden group transition-shadow duration-300 hover:shadow-md h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="h-full flex flex-col">
        <div className="relative">
          <div className="h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-0 right-0 p-2 space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Quick view functionality would go here
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {badge && (
            <Badge className={`absolute top-2 left-2 ${badge.className}`}>
              {badge.text}
            </Badge>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          {product.averageRating && (
            <div className="mb-1">
              <Rating value={parseFloat(product.averageRating)} />
            </div>
          )}
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <div className="font-bold">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-lg">{formatCurrency(product.discountPrice)}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-lg">{formatCurrency(product.price)}</span>
              )}
            </div>
            <Button
              size="icon"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="text-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;

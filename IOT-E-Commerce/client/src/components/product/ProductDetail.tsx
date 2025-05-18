import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Heart, Share2, CheckCircle2, Loader2 } from "lucide-react";
import Rating from "@/components/ui/Rating";

type ProductDetailProps = {
  product: any;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [mainImage, setMainImage] = useState(product.imageUrls[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("standard");
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const { data: reviews = [] } = useQuery({
    queryKey: [`/api/products/${product.id}/reviews`],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (productId: number) => 
      apiRequest('POST', '/api/wishlist', { productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
      toast({
        title: "Added to wishlist",
        description: "This product has been added to your wishlist",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add to wishlist",
        variant: "destructive",
      });
    }
  });

  const stockStatus = getStockStatus(product.stock);
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleAddToWishlist = () => {
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

  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <img
                src={mainImage || product.imageUrls[0]}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
              {product.newArrival && (
                <span className="absolute top-4 left-4 bg-accent text-white text-sm font-medium px-3 py-1 rounded-full">
                  New Arrival
                </span>
              )}
              {product.featured && !product.newArrival && (
                <span className="absolute top-4 left-4 bg-warning text-white text-sm font-medium px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.imageUrls.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer ${
                      mainImage === image ? "border-2 border-primary" : "border border-neutral-mid"
                    }`}
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center">
                  {product.averageRating ? (
                    <>
                      <Rating value={parseFloat(product.averageRating)} />
                      <span className="text-sm text-neutral-dark ml-2">
                        {product.averageRating} ({reviews.length} reviews)
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-neutral-dark">No reviews yet</span>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon" aria-label="Share">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Price */}
            <div className="mb-4">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-primary">{formatCurrency(product.discountPrice)}</p>
                  <p className="text-lg text-muted-foreground line-through ml-3">{formatCurrency(product.price)}</p>
                </div>
              ) : (
                <p className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</p>
              )}
              <p className={`text-sm flex items-center mt-1 ${stockStatus.color}`}>
                <CheckCircle2 className="mr-1 h-4 w-4" />
                {stockStatus.text} {product.stock > 0 && `- Ships in 1-2 business days`}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-neutral-dark mb-4">{product.description}</p>
              
              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <ul className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key} className="flex items-start">
                      <CheckCircle2 className="text-primary mt-1 mr-2 h-4 w-4" />
                      <span><strong>{key}:</strong> {value as string}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Package Options */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Package Options</h4>
              <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-2 gap-2" onValueChange={setSelectedVariant}>
                <div className={`border rounded-lg p-3 ${selectedVariant === 'standard' ? 'border-primary bg-blue-50' : 'border-neutral-mid hover:border-primary transition'}`}>
                  <div className="flex items-center">
                    <RadioGroupItem value="standard" id="package-standard" className="mr-2" />
                    <Label htmlFor="package-standard" className="font-medium">Standard</Label>
                  </div>
                  <p className="text-sm ml-5 text-neutral-dark">Base package</p>
                </div>
                <div className={`border rounded-lg p-3 ${selectedVariant === 'premium' ? 'border-primary bg-blue-50' : 'border-neutral-mid hover:border-primary transition'}`}>
                  <div className="flex items-center">
                    <RadioGroupItem value="premium" id="package-premium" className="mr-2" />
                    <Label htmlFor="package-premium" className="font-medium">Premium</Label>
                  </div>
                  <p className="text-sm ml-5 text-neutral-dark">+ Additional accessories</p>
                </div>
              </RadioGroup>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center border rounded-lg overflow-hidden w-32">
                <Button
                  variant="ghost"
                  size="icon"
                  className="px-3 py-2 h-full rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min={1}
                  max={product.stock}
                  className="w-full py-2 text-center border-x focus:outline-none rounded-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="px-3 py-2 h-full rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              <Button
                className="flex-1 flex items-center justify-center"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddToWishlist}
                disabled={addToWishlistMutation.isPending}
              >
                {addToWishlistMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Heart className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            {/* SKU & Category */}
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>SKU: {product.sku}</span>
                <span>Category: {product.category?.name || "Uncategorized"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;

// Define or import missing components
const ShoppingCart = (props: any) => <Heart {...props} />;

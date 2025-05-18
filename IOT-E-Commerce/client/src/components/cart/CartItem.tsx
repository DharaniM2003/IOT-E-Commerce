import { useState } from "react";
import { X, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Link } from "wouter";
import { useCart } from "@/store/cartStore";

type CartItemProps = {
  item: {
    id: number;
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
};

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const productImage = item.product.imageUrls && item.product.imageUrls.length > 0
    ? item.product.imageUrls[0]
    : "https://images.unsplash.com/photo-1558002038-1055907df827";

  const price = item.product.discountPrice || item.product.price;
  const itemTotal = parseFloat(price) * item.quantity;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.product.stock) return;
    
    setQuantity(newQuantity);
    
    // Debounce the API call
    if (newQuantity !== item.quantity) {
      setIsUpdating(true);
      try {
        await updateQuantity(item.id, newQuantity);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeFromCart(item.id);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 py-4 border-b">
      {/* Product Image - 2 columns on mobile, 1 on larger screens */}
      <div className="col-span-3 sm:col-span-2">
        <Link href={`/products/${item.product.slug}`}>
          <img
            src={productImage}
            alt={item.product.name}
            className="w-full h-20 sm:h-24 object-cover rounded"
          />
        </Link>
      </div>
      
      {/* Product Details - 7 columns on mobile, 6 on larger screens */}
      <div className="col-span-9 sm:col-span-6 flex flex-col">
        <Link href={`/products/${item.product.slug}`} className="font-medium hover:text-primary transition">
          {item.product.name}
        </Link>
        
        <div className="mt-1 text-sm text-muted-foreground">
          {item.product.discountPrice ? (
            <div className="flex items-center">
              <span>{formatCurrency(item.product.discountPrice)}</span>
              <span className="text-xs line-through ml-2">{formatCurrency(item.product.price)}</span>
            </div>
          ) : (
            <span>{formatCurrency(item.product.price)}</span>
          )}
        </div>
        
        {/* Mobile Quantity Controls */}
        <div className="flex items-center mt-2 sm:hidden">
          <div className="flex items-center border rounded">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              min={1}
              max={item.product.stock}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-12 h-8 text-center p-0 border-0"
              disabled={isUpdating}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdating || quantity >= item.product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          {isUpdating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </div>
      </div>
      
      {/* Quantity Controls - Hidden on mobile */}
      <div className="hidden sm:flex sm:col-span-2 items-center justify-center">
        <div className="flex items-center border rounded">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={isUpdating || quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            min={1}
            max={item.product.stock}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-12 h-8 text-center p-0 border-0"
            disabled={isUpdating}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={isUpdating || quantity >= item.product.stock}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        {isUpdating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </div>
      
      {/* Total Price */}
      <div className="hidden sm:block sm:col-span-1 text-right font-medium">
        {formatCurrency(itemTotal)}
      </div>
      
      {/* Remove Button */}
      <div className="col-span-12 sm:col-span-1 flex justify-end items-start">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          disabled={isRemoving}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          {isRemoving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;

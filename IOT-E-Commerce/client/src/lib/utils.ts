import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(numValue);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function getDiscountPercentage(originalPrice: number | string, discountPrice: number | string): number {
  const original = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice;
  const discount = typeof discountPrice === 'string' ? parseFloat(discountPrice) : discountPrice;
  
  return Math.round(((original - discount) / original) * 100);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function getStockStatus(stock: number): { text: string; color: string } {
  if (stock <= 0) {
    return { text: 'Out of Stock', color: 'text-red-500' };
  } else if (stock < 10) {
    return { text: 'Low Stock', color: 'text-amber-500' };
  } else {
    return { text: 'In Stock', color: 'text-green-500' };
  }
}

export const getImageFallback = (index: number): string => {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1558002038-1055907df827",
    "https://images.unsplash.com/photo-1572516021446-cae3457fa956",
    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48",
    "https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae"
  ];
  
  return fallbackImages[index % fallbackImages.length];
};

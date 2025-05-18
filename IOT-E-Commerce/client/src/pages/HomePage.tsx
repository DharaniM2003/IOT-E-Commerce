import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  LifeBuoy 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  discountPrice: string | null;
  imageUrls: string[];
  stock: number;
  featured: boolean;
  newArrival: boolean;
};

const ProductCard = ({ product }: { product: Product }) => {
  const price = parseFloat(product.price);
  const discountPrice = product.discountPrice ? parseFloat(product.discountPrice) : null;
  
  return (
    <Card className="overflow-hidden group">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.imageUrls[0] || 'https://placehold.co/400x400?text=No+Image'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.newArrival && (
          <Badge variant="default" className="absolute top-2 left-2 bg-blue-600">
            New Arrival
          </Badge>
        )}
        {discountPrice && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            {Math.round(((price - discountPrice) / price) * 100)}% OFF
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-medium line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center">
          {discountPrice ? (
            <>
              <span className="font-medium">{formatCurrency(discountPrice)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(price)}</span>
            </>
          ) : (
            <span className="font-medium">{formatCurrency(price)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="w-full">
          <Link href={`/product/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const LoadingSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square">
        <Skeleton className="w-full h-full" />
      </div>
      <CardHeader className="p-4 pb-0">
        <Skeleton className="h-5 w-4/5" />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-2">
          <Skeleton className="h-5 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
};

const HeroSection = () => (
  <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Smart Devices for a <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Connected Future</span>
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover cutting-edge IoT hardware that transforms your home, business, and everyday life. Build, automate, and innovate with our premium selection.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Smart home devices and IoT hardware"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-12 md:py-16 bg-background">
    <div className="container px-4 md:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Why Choose TechHub?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We're dedicated to delivering quality, innovation, and exceptional service
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <ShieldCheck className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Quality Guaranteed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All products are thoroughly tested and backed by our satisfaction guarantee.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <Truck className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Fast Shipping</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Quick delivery with real-time tracking updates for all orders.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CreditCard className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Secure Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Multiple payment options with state-of-the-art security measures.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <LifeBuoy className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">Expert Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dedicated technical support team available to assist with any questions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  const { data: featuredProducts, isLoading: featuredLoading } = useQuery({
    queryKey: ['/api/products/featured'],
    queryFn: async () => {
      const res = await fetch('/api/products/featured');
      if (!res.ok) throw new Error('Failed to fetch featured products');
      return res.json();
    },
  });

  const { data: newArrivals, isLoading: newArrivalsLoading } = useQuery({
    queryKey: ['/api/products/new-arrivals'],
    queryFn: async () => {
      const res = await fetch('/api/products/new-arrivals');
      if (!res.ok) throw new Error('Failed to fetch new arrivals');
      return res.json();
    },
  });

  // Fallback for demo purposes (remove in production)
  const demoFeaturedProducts = featuredLoading || !featuredProducts ? Array(4).fill(null) : featuredProducts;
  const demoNewArrivals = newArrivalsLoading || !newArrivals ? Array(4).fill(null) : newArrivals;

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <Button variant="link" asChild className="flex items-center gap-1">
              <Link href="/products">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {demoFeaturedProducts.map((product, index) => (
              product ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <LoadingSkeleton key={`skeleton-featured-${index}`} />
              )
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />
      
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
            <Button variant="link" asChild className="flex items-center gap-1">
              <Link href="/products">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {demoNewArrivals.map((product, index) => (
              product ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <LoadingSkeleton key={`skeleton-new-${index}`} />
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
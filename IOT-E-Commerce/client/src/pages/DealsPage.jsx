import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

const DealsPage = () => {
  // Example data - would be fetched from API in a real app
  const deals = [
    {
      id: 1,
      name: "Smart Home Starter Kit",
      description: "Get started with smart home automation with this comprehensive starter kit.",
      originalPrice: "199.99",
      discountPrice: "149.99",
      imageUrl: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      discountPercentage: 25,
      slug: "smart-home-starter-kit"
    },
    {
      id: 2,
      name: "Wi-Fi Mesh System (3-Pack)",
      description: "Whole home coverage with seamless roaming and fast speeds.",
      originalPrice: "299.99",
      discountPrice: "229.99",
      imageUrl: "https://images.unsplash.com/photo-1592040179268-7582ba21e2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      discountPercentage: 23,
      slug: "wifi-mesh-system-3pack"
    },
    {
      id: 3,
      name: "Smart Security Camera Bundle",
      description: "Monitor your home inside and out with this 4-camera security system.",
      originalPrice: "349.99",
      discountPrice: "249.99",
      imageUrl: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      discountPercentage: 29,
      slug: "smart-security-camera-bundle"
    },
    {
      id: 4,
      name: "Smart Thermostat Pro",
      description: "AI-powered temperature control that saves energy and improves comfort.",
      originalPrice: "179.99",
      discountPrice: "139.99",
      imageUrl: "https://images.unsplash.com/photo-1567201812486-0dad2e26eda5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      discountPercentage: 22,
      slug: "smart-thermostat-pro"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Special Deals & Offers</h1>
        <p className="text-muted-foreground">Limited-time discounts on our most popular IoT devices</p>
      </div>

      <div className="mb-10 p-6 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-lg">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Flash Sale - Limited Time Only</h2>
            <p className="mb-4">Take advantage of these exclusive deals before they expire!</p>
            <div className="flex items-center gap-3 text-xl font-bold">
              <div className="bg-background p-2 rounded">48</div>
              <span>:</span>
              <div className="bg-background p-2 rounded">12</div>
              <span>:</span>
              <div className="bg-background p-2 rounded">33</div>
            </div>
            <div className="flex text-sm mt-1">
              <span className="w-10 text-center">Hours</span>
              <span className="w-10 text-center ml-3">Mins</span>
              <span className="w-10 text-center ml-3">Secs</span>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-block bg-primary text-white text-xl font-bold py-3 px-6 rounded-full transform rotate-3">
              Up to 50% OFF
            </div>
            <p className="mt-3">Use code: <span className="font-mono font-bold">IOTSAVE</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={deal.imageUrl} 
                alt={deal.name}
                className="w-full aspect-square object-cover"
              />
              <Badge variant="destructive" className="absolute top-2 right-2">
                {deal.discountPercentage}% OFF
              </Badge>
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg">{deal.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{deal.description}</p>
              <div className="flex items-center">
                <span className="font-medium">{formatCurrency(deal.discountPrice)}</span>
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  {formatCurrency(deal.originalPrice)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={`/product/${deal.slug}`}>View Deal</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">Why Shop Our Deals?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <div className="font-bold mb-2">Best Price Guarantee</div>
            <p className="text-sm text-muted-foreground">Find it cheaper elsewhere? We'll match the price plus give you an extra 5% off.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="font-bold mb-2">Free Express Shipping</div>
            <p className="text-sm text-muted-foreground">Get your discounted items fast with complimentary express delivery on orders over $100.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="font-bold mb-2">Extended Warranty</div>
            <p className="text-sm text-muted-foreground">All sale items come with our standard 2-year warranty for peace of mind.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import ProductDetail from "@/components/product/ProductDetail";
import ProductGrid from "@/components/product/ProductGrid";
import Newsletter from "@/components/ui/Newsletter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Rating from "@/components/ui/Rating";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  // Fetch product details
  const { 
    data: product, 
    isLoading, 
    isError, 
    error
  } = useQuery({
    queryKey: [`/api/products/${slug}`],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch product details');
      return res.json();
    },
  });

  // Fetch related products based on category
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['/api/products', product?.categoryId],
    queryFn: async ({ queryKey }) => {
      if (!product?.categoryId) return [];
      const res = await fetch(`/api/products?category=${product.categoryId}`);
      if (!res.ok) throw new Error('Failed to fetch related products');
      const data = await res.json();
      // Filter out the current product and limit to 4 products
      return data.filter((p: any) => p.id !== product.id).slice(0, 4);
    },
    enabled: !!product?.categoryId,
  });

  // Fetch product reviews
  const { data: reviews = [] } = useQuery({
    queryKey: [`/api/products/${product?.id}/reviews`],
    queryFn: async ({ queryKey }) => {
      if (!product?.id) return [];
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    },
    enabled: !!product?.id,
  });

  // Show error message if product fetch fails
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: (error as Error)?.message || "Failed to load product data",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  // Update page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - TechHub`;
    } else {
      document.title = "Product Details - TechHub";
    }

    return () => {
      document.title = "TechHub - Your One-Stop Shop for Tech Products";
    };
  }, [product]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="w-full h-[400px] rounded-xl mb-8" />
        <Skeleton className="w-2/3 h-10 mb-4" />
        <Skeleton className="w-full h-32 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light py-8">
      <div className="container mx-auto px-4">
        {/* Product Detail Section */}
        <ProductDetail product={product} />

        {/* Product Information Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specifications" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
              >
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="whitespace-pre-line">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b pb-2">
                          <div className="font-medium">{key}</div>
                          <div className="text-muted-foreground">{value as string}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specifications available for this product.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Customer Reviews
                    {product.averageRating && (
                      <div className="flex items-center ml-4">
                        <Rating value={parseFloat(product.averageRating)} />
                        <span className="ml-2 text-base">
                          {product.averageRating} out of 5
                        </span>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review: any) => (
                        <div key={review.id} className="pb-4 border-b last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.user.username}</h4>
                              <div className="flex items-center">
                                <Rating value={review.rating} size="sm" />
                                <span className="ml-2 text-sm text-muted-foreground">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <ProductGrid products={relatedProducts} title="Related Products" />
          </section>
        )}
        
        {/* Newsletter */}
        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

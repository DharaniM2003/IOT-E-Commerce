import { useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/product/ProductGrid";
import Hero from "@/components/ui/Hero";
import { Skeleton } from "@/components/ui/skeleton";
import Newsletter from "@/components/ui/Newsletter";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch category details
  const { 
    data: category,
    isLoading: categoryLoading,
    isError: categoryError
  } = useQuery({
    queryKey: [`/api/categories/${slug}`],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch category');
      return res.json();
    },
  });

  // Fetch products by category
  const { 
    data: products = [],
    isLoading: productsLoading,
    isError: productsError
  } = useQuery({
    queryKey: [`/api/products?category=${slug}`],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string);
      if (!res.ok) throw new Error('Failed to fetch category products');
      return res.json();
    },
    enabled: !!category,
  });

  // Update document title
  useEffect(() => {
    if (category) {
      document.title = `${category.name} - TechHub`;
    } else {
      document.title = "Category - TechHub";
    }
    
    return () => {
      document.title = "TechHub - Your One-Stop Shop for Tech Products";
    };
  }, [category]);

  // Hero background image based on category
  const getHeroImage = () => {
    if (!category) return "https://images.unsplash.com/photo-1558002038-1055907df827";
    
    const categoryLower = category.name.toLowerCase();
    
    if (categoryLower.includes('smart') || categoryLower.includes('home')) {
      return "https://images.unsplash.com/photo-1558002038-1055907df827";
    } else if (categoryLower.includes('computer')) {
      return "https://images.unsplash.com/photo-1587614382346-4ec70e388b28";
    } else if (categoryLower.includes('smartphone') || categoryLower.includes('phone')) {
      return "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf";
    } else if (categoryLower.includes('network')) {
      return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8";
    } else if (categoryLower.includes('component')) {
      return "https://images.unsplash.com/photo-1555664424-778a1e5e1b48";
    } else if (categoryLower.includes('wearable')) {
      return "https://images.unsplash.com/photo-1523275335684-37898b6baf30";
    } else {
      return "https://images.unsplash.com/photo-1558002038-1055907df827";
    }
  };

  // Loading state
  if (categoryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full rounded-xl mb-8" />
        <Skeleton className="h-10 w-1/3 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (categoryError || !category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The category you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={category.name}
        description={category.description || `Explore our collection of ${category.name} products.`}
        imageUrl={category.image || getHeroImage()}
        primaryButtonText="Shop Now"
        primaryButtonLink={`#products`}
      />

      {/* Products Section */}
      <section id="products" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {productsLoading ? (
            <>
              <Skeleton className="h-10 w-1/3 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-64 w-full rounded-xl" />
                ))}
              </div>
            </>
          ) : productsError ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                There was an error loading products. Please try again later.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
              <p className="text-lg text-muted-foreground">
                There are currently no products in this category.
              </p>
            </div>
          ) : (
            <ProductGrid
              products={products}
              title={`${category.name} Products`}
              showSorting={true}
              showPagination={true}
            />
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default CategoryPage;

import { useState } from "react";
import ProductCard from "./ProductCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductGridProps = {
  products: any[];
  title?: string;
  showSorting?: boolean;
  showPagination?: boolean;
};

const PRODUCTS_PER_PAGE = 12;

const ProductGrid = ({ 
  products, 
  title, 
  showSorting = false,
  showPagination = false 
}: ProductGridProps) => {
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        const priceA = parseFloat(a.discountPrice || a.price);
        const priceB = parseFloat(b.discountPrice || b.price);
        return priceA - priceB;
      case "price-high":
        const priceAHigh = parseFloat(a.discountPrice || a.price);
        const priceBHigh = parseFloat(b.discountPrice || b.price);
        return priceBHigh - priceAHigh;
      case "rating":
        const ratingA = a.averageRating ? parseFloat(a.averageRating) : 0;
        const ratingB = b.averageRating ? parseFloat(b.averageRating) : 0;
        return ratingB - ratingA;
      case "newest":
        return a.newArrival ? -1 : b.newArrival ? 1 : 0;
      case "featured":
      default:
        return a.featured ? -1 : b.featured ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = showPagination ? Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE) : 1;
  const paginatedProducts = showPagination
    ? sortedProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE)
    : sortedProducts;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {(title || showSorting) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          
          {showSorting && (
            <div className="mt-3 sm:mt-0 min-w-[180px]">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      )}

      {showPagination && totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductGrid;

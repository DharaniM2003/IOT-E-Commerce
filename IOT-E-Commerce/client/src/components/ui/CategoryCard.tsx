import { Link } from "wouter";

type CategoryCardProps = {
  category: {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
  };
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  // Fallback images based on category name if no image is provided
  const getFallbackImage = () => {
    const categoryLower = category.name.toLowerCase();
    
    if (categoryLower.includes('smart') || categoryLower.includes('home')) {
      return "https://pixabay.com/get/gb9fa9f1e7c9056fba6752442291ef1d3b65e1136551ef11c4ec3c624d87f584ffd36d8f3b314b32caff11ee50743d73faece29194e2235c86307f276e99cdcf8_1280.jpg";
    } else if (categoryLower.includes('component')) {
      return "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400";
    } else if (categoryLower.includes('smartphone') || categoryLower.includes('phone')) {
      return "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400";
    } else if (categoryLower.includes('gadget') || categoryLower.includes('accessory') || categoryLower.includes('accessories')) {
      return "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400";
    } else if (categoryLower.includes('network')) {
      return "https://pixabay.com/get/g9af02c5d1d424dce0a5ae2931444ff51a9249232b83fcbbcaf5bb9446210fb8c9c1c5e2718b9d63a7fca16d6083fb86c90976836557d4e10fcd428d2dcf15290_1280.jpg";
    } else if (categoryLower.includes('wearable')) {
      return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400";
    } else {
      return "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400";
    }
  };

  const imageUrl = category.image || getFallbackImage();

  return (
    <Link href={`/category/${category.slug}`} className="group">
      <div className="bg-neutral-light rounded-xl p-4 transition duration-200 group-hover:shadow-md h-full flex flex-col items-center">
        <img 
          src={imageUrl}
          alt={category.name} 
          className="w-full h-32 object-contain mb-4"
        />
        <h3 className="text-center font-medium group-hover:text-primary transition">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;

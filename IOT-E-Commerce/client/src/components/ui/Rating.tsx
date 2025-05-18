import { Star, StarHalf } from "lucide-react";

type RatingProps = {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
};

const Rating = ({ 
  value, 
  max = 5, 
  size = "md", 
  showCount = false,
  count = 0 
}: RatingProps) => {
  // Ensure value is between 0 and max
  const normalizedValue = Math.min(Math.max(0, value), max);
  
  // Create an array of size max
  const stars = Array.from({ length: max }, (_, index) => {
    const starValue = index + 1;
    
    // Determine if this position should be a full, half, or empty star
    if (normalizedValue >= starValue) {
      return 'full';
    } else if (normalizedValue + 0.5 >= starValue) {
      return 'half';
    } else {
      return 'empty';
    }
  });

  // Determine sizing based on prop
  const getSizing = () => {
    switch (size) {
      case "sm": 
        return "h-3 w-3";
      case "lg": 
        return "h-6 w-6";
      case "md":
      default: 
        return "h-4 w-4";
    }
  };

  const starSize = getSizing();

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-500">
        {stars.map((type, index) => (
          <span key={index}>
            {type === 'full' ? (
              <Star className={`${starSize} fill-current`} />
            ) : type === 'half' ? (
              <StarHalf className={`${starSize} fill-current`} />
            ) : (
              <Star className={`${starSize} text-gray-300`} />
            )}
          </span>
        ))}
      </div>
      
      {showCount && (
        <span className="text-muted-foreground text-sm ml-1">({count})</span>
      )}
    </div>
  );
};

export default Rating;

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button
        className="p-2.5 rounded-full hover:bg-dark_blue hover:text-white
       hoverEffect bg-deal-bg"
      >
        <Heart size={15} />
      </button>
    </div>
  );
};

export default AddToWishlistButton;

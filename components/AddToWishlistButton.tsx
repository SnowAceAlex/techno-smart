"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import useStore from "@/store";
import { useMemo } from "react";
import toast from "react-hot-toast";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteItems, addToFavorite } = useStore();
  const existingProduct = useMemo(
    () => favoriteItems.find((item) => item._id === product._id) || null,
    [favoriteItems, product._id]
  );
  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? `${product?.name?.substring(0, 18)}... removed from wishlist`
            : `${product?.name?.substring(0, 18)}... added to wishlist`
        );
      });
    }
  };
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button
        className="p-2.5 rounded-full hover:bg-dark_blue hover:text-white
       hoverEffect bg-deal-bg"
        onClick={handleFavorite}
      >
        <Heart
          size={15}
          className={
            existingProduct ? "text-red-500 fill-red-500" : "text-black"
          }
        />
      </button>
    </div>
  );
};

export default AddToWishlistButton;

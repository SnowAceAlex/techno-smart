"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favoriteItems, addToFavorite } = useStore();
  const existingProduct = useMemo<Product | null>(() => {
    return favoriteItems.find((item) => item?._id === product?._id) || null;
  }, [product, favoriteItems]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-light_blue hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-dark_blue text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {favoriteItems?.length ? favoriteItems?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-dark_blue hoverEffect border border-dark_blue/80 hover:border-dark_blue p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              size={15}
              className={cn(
                "text-dark_blue/80 group-hover:text-dark_blue hoverEffect mt-.5 w-5 h-5",
                existingProduct ? "text-red-500 fill-red-500" : "text-black"
              )}
            />
          ) : (
            <Heart
              size={15}
              className={cn(
                "text-dark_blue/80 group-hover:text-dark_blue hoverEffect mt-.5 w-5 h-5",
                existingProduct ? "text-red-500 fill-red-500" : "text-black"
              )}
            />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;

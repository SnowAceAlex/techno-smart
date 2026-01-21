import { Heart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/sanity.types";

const FavoriteButton = ({
  showProduct,
  product,
}: {
  showProduct: boolean;
  product: Product;
}) => {
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-light_blue hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-dark_blue text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            0
          </span>
        </Link>
      ) : (
        <button className="group relative hover:text-light_blue hoverEffect border border-light_blue/80 hover:border-light_blue p-1.5 rounded-sm">
          <Heart className="text-light_blue/80 group-hover:text-light_blue hoverEffect mt-.5 w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default FavoriteButton;

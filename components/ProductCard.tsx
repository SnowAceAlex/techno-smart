import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border border-dark_blue rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-light_bg">
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt={product?.name || ""}
            loading="lazy"
            width={700}
            height={700}
          />
        )}
        {product?.status === "sale" && (
          <p className="absolute top-2 left-2 z-10">Sale!</p>
        )}
      </div>
      <div className="p-3">Product Details</div>
    </div>
  );
};

export default ProductCard;

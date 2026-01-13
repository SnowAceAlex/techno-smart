import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToWishlistButton from "./AddToWishlistButton";
import Title from "./Title";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border border-dark_blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-light_bg rounded-t-md">
        {/* Product Images */}
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt={product?.name || ""}
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain overflow-hidden transition-transform bg-light_bg rounded-t-md duration-500 hoverEffect
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}
        <AddToWishlistButton product={product} />
        {/* Product Sale */}
        {product?.status === "sale" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border \
          border-darkColor/50 px-2 rounded-full 
          group-hover:border-light_blue group-hover:text-light_blue hoverEffect"
          >
            Sale!
          </p>
        )}
        {/* Product New */}
        {product?.status === "new" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border \
          border-darkColor/50 px-2 rounded-full 
          group-hover:border-light_blue group-hover:text-light_blue hoverEffect"
          >
            New!
          </p>
        )}
        {/* Product Hot */}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-orange/50 p-1 
            rounded-full group-hover:border-orange hover:text-dark_blue hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-orange/50 group-hover:text-orange hoverEffect"
            ></Flame>
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {/* Product Categories */}
        {product?.categories && (
          //line-clamp-1: 1 line of text (limited to 1 line)
          <p className="uppercase line-clamp-1 text-xs text-light_gray">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        {/* Product Name */}
        <Title className="text-sm  line-clamp-1">{product?.name}</Title>
        {/* Product Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={12}
                key={index}
                className={index < 4 ? "text-light_blue" : "text-lightColor"}
                fill={index < 4 ? "#5284fb" : "#707070"}
              />
            ))}
          </div>
          <p className="text-lightColor text-xs tracking-wider"> 5 reviews </p>
        </div>
        {/* Product Stock */}
        {(product?.stock as number) > 0 ? (
          <div className="flex items-center gap-2">
            <p className="font-medium">In Stock</p>
            <p className="text-dark_blue/80 font-semibold text-sm tracking-wider">
              {product?.stock}
            </p>
          </div>
        ) : (
          <p className="text-sm tracking-wider text-red-600/75 font-semibold">
            Out of Stock
          </p>
        )}
        {/* Product Price */}
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        {/* Product Add to Cart Button */}
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;

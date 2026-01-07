"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    window.alert("Product added to cart");
  };
  return (
    <div>
      <Button
        onClick={() => handleAddToCart()}
        disabled={isOutOfStock}
        className={cn(
          "w-full bg-dark_blue/80 text-light_bg shadow-none border border-dark_blue/80 font-semibold tracking-wide hover:text-white hover:bg-dark_blue hover:border-dark_blue hoverEffect",
          className
        )}
      >
        <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCartButton;

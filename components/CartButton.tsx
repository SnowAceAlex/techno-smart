"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import useStore from "@/store";

const CartButton = () => {
  const { items } = useStore();
  return (
    <Link href="/cart" className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-light_blue hoverEffect" />
      <span
        className="absolute -top-1 -right-1 bg-dark_blue 
      text-white h-3.5 w-3.5 rounded-full flex items-center justify-center text-xs"
      >
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartButton;

import React from "react";
import Link from "next/link";
import { productType } from "@/constants/data";

interface ProductTabBarProps {
  tabBar: string;
  onTabBar: (tabBar: string) => void;
}

const ProductTabBar = ({ tabBar, onTabBar }: ProductTabBarProps) => {
  // //Checking the tabBar is working or not
  // console.log(tabBar);
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-5 text-sm font-semibold">
        {productType.map((item) => (
          <button
            onClick={() => onTabBar(item?.title)}
            key={item.title}
            className={`border border-light_blue/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full
              hover:bg-light_blue hover:border-light_blue hover:text-white/90 hoverEffect hover:cursor-pointer
              ${tabBar === item?.title ? "bg-light_blue text-white border-light_blue" : "bg-light_blue/20"}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        href="/shop"
        className="border border-light_blue/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full
              hover:bg-light_blue hover:border-light_blue hover:text-white/90 hoverEffect hover:cursor-pointer"
      >
        Shop All
      </Link>
    </div>
  );
};

export default ProductTabBar;

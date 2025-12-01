"use client";

import { useEffect, useState } from "react";
import ProductTabBar from "./ProductTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";

const query = `*[_type == "product" && variant == $variant] | order(name asc){
  ...,"categories": categories[]->title
}`;

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabBar, setTabBar] = useState(productType[0].title || "");

  useEffect(() => {
    const params = { variant: tabBar.toLowerCase() };
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tabBar]);

  return (
    <div>
      <ProductTabBar tabBar={tabBar} onTabBar={setTabBar} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Product is loading...</span>
          </motion.div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProductGrid;

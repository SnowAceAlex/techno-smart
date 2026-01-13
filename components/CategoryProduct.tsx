"use client";

import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProductCard from "./NoProductCard";
import { Loader2 } from "lucide-react";
interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProduct = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCategoryClick = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"categories": categories[]->title}
      `;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-row flex-nowrap overflow-x-auto md:flex-col md:overflow-x-visible md:min-w-40 border w-full md:w-auto">
        {categories.map((item: Category) => (
          <Button
            onClick={() => handleCategoryClick(item?.slug?.current as string)}
            key={item?._id}
            className={`bg-transparent border-0 p-0 rounded-none text-darkColor shadow-none hover:bg-orange 
              hover:text-white font-semibold hoverEffect border-b md:last:border-b-0 border-r md:border-r-0 last:border-r-0 transition-colors 
              capitalize shrink-0 md:shrink ${item?.slug?.current === currentSlug && "bg-orange text-white border-orange"}`}
          >
            <p className="whitespace-nowrap text-left px-2 md:w-full">
              {item.title}
            </p>
          </Button>
        ))}
      </div>
      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {products?.map((product: Product) => (
              <AnimatePresence key={product._id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductCard tabBar={currentSlug} className="mt-0 w-full" />
        )}
      </div>{" "}
    </div>
  );
};

export default CategoryProduct;

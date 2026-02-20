"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "./Container";
import EmptyWishlist from "./EmptyWishlist";
import toast from "react-hot-toast";
import Link from "next/link";
import { X } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "./PriceView";
import { Button } from "./ui/button";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import { Product } from "@/sanity.types";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const { favoriteItems, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteItems.length));
  };
  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Wishlist reset successfully");
    }
  };

  return (
    <Container>
      {favoriteItems.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr className="bg-black/5">
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left hidden md:table-cell">
                    Category
                  </th>
                  <th className="p-2 text-left hidden md:table-cell">Type</th>
                  <th className="p-2 text-left hidden md:table-cell">Status</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-center md:text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteItems
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product) => (
                    <tr key={product?._id} className="border-b">
                      <td className="px-2 py-4 flex items-center gap-2">
                        <X
                          onClick={() => {
                            removeFromFavorite(product?._id);
                            toast.success("Product removed from wishlist");
                          }}
                          size={18}
                          className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                        />
                        {product?.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="border rounded-md group hidden md:inline-flex"
                          >
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={"product image"}
                              width={100}
                              height={100}
                              className="rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                            />
                          </Link>
                        )}
                        <p className="line-clamp-1">{product?.name}</p>
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.categories && (
                          <div className="flex flex-col gap-0.5 uppercase text-xs">
                            {(
                              product.categories as Array<
                                string | { title?: string | null } | null
                              >
                            )
                              .map((category) =>
                                typeof category === "string"
                                  ? category
                                  : (category as { title?: string })?.title
                              )
                              .filter(Boolean)
                              .map((title, i) => (
                                <span key={i}>{title}</span>
                              ))}
                          </div>
                        )}
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.variant}
                      </td>
                      <td
                        className={`p-2 w-24 ${
                          (product?.stock as number) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        } font-medium text-sm hidden md:table-cell`}
                      >
                        {(product?.stock as number) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </td>
                      <td className="p-2">
                        <PriceView
                          price={product?.price}
                          discount={product?.discount}
                        />
                      </td>
                      <td className="p-2">
                        <AddToCartButton product={product} className="w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2">
            {visibleProducts < favoriteItems?.length && (
              <div className="my-5">
                <Button variant="outline" onClick={loadMore}>
                  Load More
                </Button>
              </div>
            )}
            {visibleProducts > 10 && (
              <div className="my-5">
                <Button
                  onClick={() => setVisibleProducts(10)}
                  variant="outline"
                >
                  Load Less
                </Button>
              </div>
            )}
          </div>
          {favoriteItems?.length > 0 && (
            <Button
              onClick={handleResetWishlist}
              className="mb-5 font-semibold"
              variant="destructive"
              size="lg"
            >
              Reset Wishlist
            </Button>
          )}
        </>
      ) : (
        <EmptyWishlist />
      )}
    </Container>
  );
};
export default WishListProducts;

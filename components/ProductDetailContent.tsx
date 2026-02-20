"use client";

import { Product } from "@/sanity.types";
import ImageView from "@/components/ImageView";
import useStore from "@/store";

export default function ProductDetailContent({
  product,
}: {
  product: Product;
}) {
  const { getItemCount } = useStore();
  const availableStock =
    (product?.stock ?? 0) - getItemCount(product?._id ?? "");

  return (
    <>
      {product?.images && (
        <ImageView
          images={product?.images}
          isStock={availableStock}
        />
      )}
    </>
  );
}

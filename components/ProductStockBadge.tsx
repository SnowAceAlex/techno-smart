"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";

export default function ProductStockBadge({
  product,
}: {
  product: Product | null | undefined;
}) {
  const { getItemCount } = useStore();
  const availableStock =
    (product?.stock ?? 0) - getItemCount(product?._id ?? "");

  return (
    <p
      className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${availableStock <= 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}
    >
      {availableStock > 0
        ? `In Stock (${availableStock})`
        : "Out of Stock"}
    </p>
  );
}

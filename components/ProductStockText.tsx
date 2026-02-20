"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";

export default function ProductStockText({
  product,
}: {
  product: Product | null | undefined;
}) {
  const { getItemCount } = useStore();
  const availableStock =
    (product?.stock ?? 0) - getItemCount(product?._id ?? "");
  return (
    <span className="font-semibold tracking-wide">
      {availableStock > 0 ? `Available (${availableStock})` : "Out of Stock"}
    </span>
  );
}

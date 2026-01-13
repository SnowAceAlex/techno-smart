import Title from "./Title";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Brand } from "@/sanity.types";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="mb-10 lg:mb-20 bg-light_bg p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>Shop By Brands</Title>
        <Link
          href="/shop"
          className="text-sm font-semibold tracking-wide text-dark_blue hover:text-dark_blue/80 hoverEffect"
        >
          View All Brands
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((brand: Brand) => (
          <Link
            key={brand?._id}
            href={`/brand/${brand?.slug?.current || ""}`}
            className="bg-white w-36 h-24 flex items-center justify-center rounded-md overflow-hidden
            hover:shadow-lg shadow-dark_blue/20 hoverEffect"
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt={brand?.title || ""}
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-light_blue/20 py-5">
        {extraData.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 group text-light_gray hover:text-dark_blue "
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;

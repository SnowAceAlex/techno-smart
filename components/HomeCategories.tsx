import { Category } from "@/sanity.types";
import Title from "./Title";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface Props {
  categories: Category[];
}

const HomeCategories = ({ categories }: Props) => {
  return (
    <div className="bg-white border border-light_blue/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-light_bg p-5 flex items-center gap-3 group"
          >
            {category?.image && (
              <div className="overflow-hidden border border-dark_blue/20 hover:border-dark_blue hoverEffect w-20 h-20 p-1">
                <Link href={`/category/${category?.slug?.current || ""}`}>
                  <Image
                    src={urlFor(category?.image).url()}
                    alt="{category?.title}"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;

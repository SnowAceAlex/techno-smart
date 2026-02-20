import Title from "./Title";
import { getLatestBlogs } from "@/sanity/queries";
import { Blog, Blogcategory } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20 ">
      <Title>Latest Blog</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {blogs?.map((blog) => (
          <div key={blog?._id} className="rounded-lg overflow-hidden">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current || ""}`}>
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt={blog?.title || ""}
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
              </Link>
            )}
            <div className="bg-light_bg p-5">
              <div className="text-xs flex items-center gap-5">
                {/* Blog Categories Title */}
                <div className="flex items-center relative group cursor-pointer">
                  {/* cSpell:ignore blogcategories */}
                  {blog?.blogcategories?.map((item, index) => (
                    <p
                      key={index}
                      className="font-semibold text-dark_blue tracking-wider"
                    >
                      {(item as unknown as Blogcategory)?.title}
                    </p>
                  ))}
                  <span
                    className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full 
                  h-[2px] group-hover:bg-dark_blue hover:cursor-pointer hoverEffect"
                  />
                </div>
                <p
                  className="flex items-center gap-1 text-lightColor relative group hover:cursor-pointer hover:text-dark_blue hoverEffect"
                  suppressHydrationWarning
                >
                  <Calendar size={15} />{" "}
                  {dayjs(blog?.publishedAt).format("DD MMM YYYY")}
                  <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-dark_blue hoverEffect" />
                </p>
              </div>
              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-dark_blue hoverEffect"
              >
                {blog?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;

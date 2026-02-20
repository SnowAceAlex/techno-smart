import type { Metadata } from "next";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { getAllBlogsForPage } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { Blogcategory } from "@/sanity.types";

type BlogListItem = Awaited<ReturnType<typeof getAllBlogsForPage>>[number];

export const metadata: Metadata = {
  title: "Blog | Techno Smart",
  description:
    "Latest tech tips, product guides, and industry insights from Techno Smart.",
};

const BlogPage = async () => {
  const blogs = await getAllBlogsForPage();

  return (
    <div className="bg-white py-10 lg:py-16">
      <Container>
        <Title className="mb-2 text-center uppercase tracking-wide text-dark_blue">
          Our Blog
        </Title>
        <p className="mx-auto mb-10 max-w-2xl text-center text-lightColor">
          Stay updated with the latest tech tips, product guides, and industry
          insights.
        </p>
        {blogs?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {blogs.map((blog: BlogListItem) => (
              <article
                key={blog?._id}
                className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md hoverEffect"
              >
                {blog?.mainImage && (
                  <Link
                    href={`/blog/${blog?.slug?.current || ""}`}
                    className="block overflow-hidden"
                  >
                    <Image
                      src={urlFor(blog.mainImage).url()}
                      alt={blog?.title || ""}
                      width={600}
                      height={360}
                      className="aspect-[4/3] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
                <div className="bg-light_bg p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                    {blog?.blogcategories?.map((item: Blogcategory, index: number) => (
                      <span
                        key={index}
                        className="font-semibold text-dark_blue tracking-wider"
                      >
                        {item?.title}
                      </span>
                    ))}
                    <span
                      className="flex items-center gap-1 text-lightColor"
                      suppressHydrationWarning
                    >
                      <Calendar size={14} />
                      {blog?.publishedAt &&
                        dayjs(blog.publishedAt).format("DD MMM YYYY")}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${blog?.slug?.current || ""}`}
                    className="line-clamp-2 text-base font-semibold tracking-wide hover:text-dark_blue hoverEffect"
                  >
                    {blog?.title}
                  </Link>
                  {blog?.author && (
                    <p className="mt-2 text-sm text-lightColor">
                      by {(blog.author as { name?: string })?.name}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-lightColor">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default BlogPage;

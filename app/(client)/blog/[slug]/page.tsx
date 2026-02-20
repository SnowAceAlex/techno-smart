import type { Metadata } from "next";
import { getSingleBlog, getOthersBlog } from "@/sanity/queries";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import dayjs from "dayjs";
import { Calendar, ArrowLeft } from "lucide-react";
import type { PortableTextBlock } from "@portabletext/types";
import { Blog, Blogcategory } from "@/sanity.types";

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null;
      return (
        <span className="my-6 block">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={450}
            className="w-full rounded-lg"
            loading="lazy"
          />
        </span>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mt-8 mb-4 text-2xl font-bold text-dark_blue">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-6 mb-3 text-xl font-semibold text-dark_blue">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-4 mb-2 text-lg font-semibold">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-4 mb-2 text-base font-semibold">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-4 border-l-4 border-dark_blue pl-4 italic text-lightColor">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-darkColor">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-darkColor">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-darkColor">{children}</li>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => (
      <Link
        href={value?.href || "#"}
        className="text-light_blue underline hover:text-dark_blue hoverEffect"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);
  return {
    title: blog?.title ? `${blog.title} | Techno Smart Blog` : "Blog | Techno Smart",
    description: "Read our latest tech articles, product guides, and industry insights.",
  };
}

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);
  const relatedBlogs = await getOthersBlog(slug, 3);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="bg-white py-10 lg:py-16">
      <Container>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-lightColor hover:text-dark_blue hoverEffect"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>

        <article className="mx-auto max-w-3xl">
          {blog.mainImage && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <Image
                src={urlFor(blog.mainImage).url()}
                alt={blog.title || ""}
                width={900}
                height={500}
                className="aspect-[16/9] w-full object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
              {blog.blogcategories?.map((item: Blogcategory, index: number) => (
                <span
                  key={index}
                  className="font-semibold text-dark_blue tracking-wider"
                >
                  {item?.title}
                </span>
              ))}
              <span
                className="flex items-center gap-1.5 text-lightColor"
                suppressHydrationWarning
              >
                <Calendar size={16} />
                {blog.publishedAt &&
                  dayjs(blog.publishedAt).format("DD MMM YYYY")}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-dark_blue lg:text-4xl">
              {blog.title}
            </h1>
            {blog.author && (
              <p className="mt-3 text-lightColor">
                by {(blog.author as { name?: string })?.name}
              </p>
            )}
          </header>

          {blog.body && blog.body.length > 0 && (
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={blog.body as PortableTextBlock[]}
                components={portableTextComponents}
              />
            </div>
          )}
        </article>

        {relatedBlogs && relatedBlogs.length > 0 && (
          <aside className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="mb-6 text-xl font-semibold text-dark_blue">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(relatedBlogs as Array<Partial<Blog>>).map((related, index) => (
                <Link
                  key={related?._id ?? `related-${index}`}
                  href={`/blog/${related?.slug?.current || ""}`}
                  className="group overflow-hidden rounded-lg border border-gray-100 bg-light_bg transition-shadow hover:shadow-md hoverEffect"
                >
                  {related?.mainImage && (
                    <Image
                      src={urlFor(related.mainImage).url()}
                      alt={related?.title || ""}
                      width={400}
                      height={240}
                      className="aspect-[5/3] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <p
                      className="line-clamp-2 font-semibold hover:text-dark_blue"
                      suppressHydrationWarning
                    >
                      {related?.title}
                    </p>
                    <p
                      className="mt-1 text-sm text-lightColor"
                      suppressHydrationWarning
                    >
                      {related?.publishedAt &&
                        dayjs(related.publishedAt).format("DD MMM YYYY")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </Container>
    </div>
  );
};

export default SingleBlogPage;

import { getProductBySlug } from "@/sanity/queries";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import ProductDetailContent from "@/components/ProductDetailContent";
import ProductDetailsColumn from "@/components/ProductDetailsColumn";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
      <ProductDetailContent product={product} />
      <ProductDetailsColumn product={product} />
    </Container>
  );
};

export default ProductDetailPage;

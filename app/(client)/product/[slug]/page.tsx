import { getProductBySlug } from "@/sanity/queries";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import { notFound } from "next/navigation";
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
      {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}
      <div className="w-full md:w-1/2 flex flex-col gap-5">Product Details</div>
    </Container>
  );
};

export default ProductDetailPage;

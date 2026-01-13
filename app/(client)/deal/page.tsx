import { getDealProducts } from "@/sanity/queries";
import Container from "@/components/Container";
import Title from "@/components/Title";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/sanity.types";

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="text-base uppercase tracking-wide text-dark_blue ">
          Hot Deal Products
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-5">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;

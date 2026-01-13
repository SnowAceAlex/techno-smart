import { getCategories } from "@/sanity/queries";
import Container from "@/components/Container";
import Title from "@/components/Title";
import CategoryProduct from "@/components/CategoryProduct";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categories = await getCategories();
  const { slug } = await params;
  return (
    <div>
      <Container>
        <Title>
          Products by Category:{" "}
          <span className="text-light_blue capitalize tracking-wide">
            {slug && slug}
          </span>
        </Title>
        <CategoryProduct categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;

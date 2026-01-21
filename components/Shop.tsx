import { BRANDS_QUERY_RESULT, Category } from "@/sanity.types";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERY_RESULT[];
}

const Shop = ({ categories, brands }: Props) => {
  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-xl uppercase tracking-wide">
              Get the products as you needs
            </Title>
            <button className="text-dark_blue underline text-sm mt-2 font-medium hover:text-orange hoverEffect">
              Reset Filters
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-dark_blue/50 ">
          <div
            className="md:sticky md:top-20 md:self-start
          md:h-[calc(100vh-160px)] md:overflow-hidden
          md:min-w-64 pb-5 border-r border-dark_blue/50"
          >
            {/*Category List*/}
            <CategoryList />
            {/*Brand List*/}
            <BrandList />
            {/*Price List*/}
            <PriceList />
          </div>
          <div>Products</div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;

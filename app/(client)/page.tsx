import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import HomeCategories from "@/components/HomeCategories";
import { getCategories } from "@/sanity/queries";
import ShopByBrands from "@/components/ShopByBrands";
import LatestBlog from "@/components/LatestBlog";

const HomePage = async () => {
  const categories = await getCategories(6);

  return (
    <>
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
      </div>
      <HomeCategories categories={categories} />
      <ShopByBrands />
      <LatestBlog />
    </>
  );
};

export default HomePage;

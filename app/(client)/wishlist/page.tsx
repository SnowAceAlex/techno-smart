import { currentUser } from "@clerk/nextjs/server";
import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";

const WishlistPage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist. Don't miss out on your favorite products!" />
      )}
    </>
  );
};

export default WishlistPage;

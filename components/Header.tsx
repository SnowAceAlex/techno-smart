import Container from "./Container";
import Logo from "./Logo";
import HeaderNav from "./HeaderNav";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";
import CartButton from "./CartButton";
import LoginButton from "./LoginButton";
import HeaderNavMobile from "./HeaderNavMobile";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="bg-white/85 py-5 sticky top-0 z-50 backdrop-blur-md">
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0 shrink-0">
          <HeaderNavMobile />
          <Logo />
        </div>
        {/* Navigation */}
        <HeaderNav />
        {/* Admin Menu */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5 shrink-0 min-w-0">
          <SearchBar />
          <CartButton />
          <FavoriteButton />
          {/* Clerk */}
          <ClerkLoaded>
            <SignedIn>
              <div className="flex items-center shrink-0">
                <UserButton />
              </div>
            </SignedIn>
            {!user && <LoginButton />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;

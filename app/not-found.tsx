import Logo from "@/components/Logo";
import Link from "next/link";
import Container from "@/components/Container";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <Container className="py-10 md:py-20">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="text-center space-y-4">
          <Logo />
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark_blue mt-6">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-darkColor">
            Page Not Found
          </h2>
          <p className="text-base text-lightColor max-w-md mx-auto">
            We&apos;re sorry. The page you&apos;re looking for doesn&apos;t
            exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            asChild
            className="bg-light_blue hover:bg-dark_blue text-white font-semibold hoverEffect"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home size={18} />
              Go to Home Page
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-dark_blue/20 text-dark_blue hover:bg-light_bg hoverEffect"
          >
            <Link href="/shop" className="flex items-center gap-2">
              <Search size={18} />
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;

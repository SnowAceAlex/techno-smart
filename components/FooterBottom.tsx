import { categoriesData, quickLinksData } from "@/constants/data";
import Logo from "./Logo";
import { SubText, SubTitle } from "./ui/text";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FooterBottom = () => {
  return (
    <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/*Logo and description*/}
      <div className="space-y-4">
        <Logo />
        <SubText>
          Discover the latest in technology and innovation at Techno Smart, your
          trusted source for the best products and services.
        </SubText>
      </div>

      {/*Quick Links*/}
      <div>
        <SubTitle>Quick Links</SubTitle>
        <ul className="space-y-2 mt-3">
          {quickLinksData.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-light_blue hoverEffect font-medium"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/*Categories*/}
      <div>
        <SubTitle>Categories</SubTitle>
        <ul className="space-y-2 mt-3">
          {categoriesData.map((item) => (
            <li key={item.href}>
              <Link
                href={`/category/${item.href}`}
                className="hover:text-light_blue hoverEffect font-medium"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/*Newsletter*/}
      <div className="space-y-4">
        <SubTitle>Newsletter</SubTitle>
        <SubText>
          Subscribe to our newsletter to receive updates and exclusive offers
        </SubText>
        <form className="space-y-3">
          <Input placeholder="Enter your email" type="email" required />
          <Button className="w-full bg-dark_blue text-white hover:bg-light_blue hoverEffect ">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FooterBottom;

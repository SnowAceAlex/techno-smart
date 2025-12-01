import { banner_1 } from "@/images";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div>
        <Title className="mb-4">
          Shop the latest trends <br />
          and styles technology products
        </Title>
        <Link
          href="/shop"
          className="bg-dark_blue/90 text-white/90 px-5 py-2 rounded-md text-sm 
          font-semibold hover:text-white hover:bg-dark_blue hoverEffect inline-block"
        >
          Shop Now
        </Link>
      </div>
      <div>
        <Image
          src={banner_1}
          alt="banner_1"
          className="hidden md:inline-flex w-96"
        ></Image>
      </div>
    </div>
  );
};

export default HomeBanner;

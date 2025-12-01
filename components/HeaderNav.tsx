"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-8 text-sm capitalize font-normal text-light_gray">
      {headerData.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={`hover:text-light_blue hoverEffect relative group ${
            pathname === item?.href && "text-light_blue"
          }`}
        >
          {item.title}
          <span
            className={`absolute bottom-0 left-0 w-0 h-0.5 bg-light_blue group-hover:w-full transition-all duration-300 ${
              pathname === item?.href && "w-full"
            }`}
          ></span>
        </Link>
      ))}
    </div>
  );
};

export default HeaderNav;

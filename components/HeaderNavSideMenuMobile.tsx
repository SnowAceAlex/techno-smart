import { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import Link from "next/link";
import { headerData } from "@/constants/data";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/hooks";

interface HeaderNavSideMenuMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderNavSideMenuMobile: FC<HeaderNavSideMenuMobileProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();
  const sideBarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50
         shadow-xl text-white/80 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         } hoverEffect`}
    >
      <div
        className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-light_blue flex flex-col gap-6"
        ref={sideBarRef}
      >
        <div className="flex items-center justify-between gap-5">
          <Logo
            className="text-white hover:text-white"
            spanDesign="text-white group-hover:text-dark_blue"
          />
          <button
            onClick={onClose}
            className="hover:text-light_blue cursor-pointer hoverEffect"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`hover:text-light_blue hoverEffect ${
                pathname === item.href && "text-light_blue"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderNavSideMenuMobile;

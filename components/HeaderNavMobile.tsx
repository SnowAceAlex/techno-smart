"use client";
import { AlignLeft } from "lucide-react";
import HeaderNavSideMenuMobile from "./HeaderNavSideMenuMobile";
import { useState } from "react";

const HeaderNavMobile = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
        <AlignLeft className="w-5 h-5 hover:text-light_blue hoverEffect cursor-pointer md:hidden" />
      </button>
      <div className="md:hidden">
        <HeaderNavSideMenuMobile
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </div>
    </>
  );
};

export default HeaderNavMobile;

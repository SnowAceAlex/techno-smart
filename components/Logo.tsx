import Link from "next/link";
import { cn } from "@/lib/utils";
const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link href="/" className="inline-flex">
      <h2
        className={cn(
          "text-2xl font-black tracking-wider uppercase group hover:text-light_blue hoverEffect group font-sans text-dark_blue",
          className
        )}
      >
        Techno
        <span
          className={cn(
            "text-light_blue group-hover:text-dark_blue hoverEffect",
            spanDesign
          )}
        >
          Smart
        </span>
      </h2>
    </Link>
  );
};

export default Logo;

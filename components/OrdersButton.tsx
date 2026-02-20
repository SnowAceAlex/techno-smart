import Link from "next/link";
import { Logs } from "lucide-react";

const OrdersButton = ({ count = 0 }: { count?: number }) => {
  return (
    <Link href="/orders" className="group relative">
      <Logs className="w-5 h-5 hover:text-light_blue hoverEffect" />
      <span
        className="absolute -top-1 -right-1 bg-dark_blue 
        text-white h-3.5 w-3.5 rounded-full flex items-center justify-center text-xs"
      >
        {count}
      </span>
    </Link>
  );
};

export default OrdersButton;

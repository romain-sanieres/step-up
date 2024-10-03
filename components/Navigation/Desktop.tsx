import { FootprintsIcon } from "lucide-react";
import Link from "next/link";
import Search from "./Search";
import Cart from "./Cart/Cart";
import User from "./User";

export default function DesktopNavigation() {
  return (
    <div className="max-md:hidden py-5 grid grid-cols-3 items-center">
      <Link
        href={"/"}
        className="text-3xl place-self-start font-semibold flex items-center px-1"
      >
        Step 
        <FootprintsIcon />
        p
      </Link>
      <div className="place-self-center">
        <Link href={"/men"} className="px-4 py-2 rounded-xl mx-1 hover:bg-muted duration-300">Men</Link>
        <Link href={"/women"} className="px-4 py-2 rounded-xl mx-1 hover:bg-muted duration-300">Women</Link>
        <Link href={"/men"} className="px-4 py-2 rounded-xl mx-1 hover:bg-muted duration-300">Collection</Link>
        <Link href={"/men"} className="px-4 py-2 rounded-xl mx-1 hover:bg-muted duration-300">Support</Link>
      </div>
      <div className="flex gap-x-2 justify-end place-self-center w-full px-0">
        <Search />
        <User />
        <Cart />
      </div>
    </div>
  );
}

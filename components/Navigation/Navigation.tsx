"use client";
import MobileNavigation from "./Mobile";
import DesktopNavigation from "./Desktop";
import { usePathname } from "next/navigation";


export const Navigation = () => {
  const path = usePathname();

  if (path !== "/login")
    return (
      <header>
        <nav className="sticky top-0 z-20">
          <MobileNavigation />
          <DesktopNavigation />
        </nav>
      </header>
    );
};

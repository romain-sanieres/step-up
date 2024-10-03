import MobileNavigation from "./Mobile";
import DesktopNavigation from "./Desktop";

export const Navigation = async () => {

    return (
      <header>
        <nav className="sticky top-0 z-20">
          <MobileNavigation />
          <DesktopNavigation />
        </nav>
      </header>
    );
};

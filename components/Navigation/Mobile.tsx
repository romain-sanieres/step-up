import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BoxesIcon, BuildingIcon, FootprintsIcon, LayoutDashboardIcon, MenuIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { getUserAction } from "@/app/zsa/user.action";
import User from "./User";

export default async function MobileNavigation() {
  const user = await getUserAction();

  return (
    <div className="md:hidden py-3 flex justify-between items-center">
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Link
                href={"/"}
                className="font-semibold text-xl flex items-center"
              >
                Step
                <FootprintsIcon />p
              </Link>
            </SheetTitle>
            <SheetDescription> </SheetDescription>
          </SheetHeader>
          {user[0]?.userType === "VENDOR" ? (
            <>
              <div className="flex flex-col gap-y-5 mt-5">
                
                  <Link
                    href={"/account/company"}
                    className="flex gap-x-2 items-center"
                  >
                    <BuildingIcon size={20} className="stroke-1" /> My Company
                  </Link>
                
                <Link
                  href={"/account/dashboard"}
                  className="flex gap-x-2 items-center"
                >
                  <LayoutDashboardIcon size={20} className="stroke-1" />{" "}
                  Dashboard
                </Link>
                <Link
                  href={"/account/products"}
                  className="flex gap-x-2 items-center"
                >
                  <BoxesIcon size={20} className="stroke-1" /> Products
                </Link>
                <Link
                  href={"/account/settings"}
                  className="flex gap-x-2 items-center"
                >
                  <SettingsIcon size={20} className="stroke-1" /> Settings
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-y-5 mt-5">
                <Link
                  href={"/account/orders"}
                  className="flex gap-x-2 items-center"
                >
                  <BuildingIcon size={20} className="stroke-1" /> My Orders
                </Link>
                <Link
                  href={"/account/profile"}
                  className="flex gap-x-2 items-center"
                >
                  <LayoutDashboardIcon size={20} className="stroke-1" /> Profile
                </Link>
                <Link
                  href={"/account/addresses"}
                  className="flex gap-x-2 items-center"
                >
                  <BoxesIcon size={20} className="stroke-1" /> Addresses
                </Link>
              </div>
              <div className="flex flex-col gap-y-5 mt-10 pt-10 border-t">
                <Link
                  href={"/men"}
                  className="flex gap-x-2 items-center underline underline-offset-2"
                >
                  Men
                </Link>
                <Link
                  href={"/Women"}
                  className="flex gap-x-2 items-center underline underline-offset-2"
                >
                  Women
                </Link>
                <Link
                  href={"/account/products"}
                  className="flex gap-x-2 items-center underline underline-offset-2"
                >
                  Categories
                </Link>
                <Link
                  href={"/account/products"}
                  className="flex gap-x-2 items-center underline underline-offset-2"
                >
                  Support
                </Link>
              </div>
            </>
          )}

          <div className="flex flex-col gap-y-5 mt-10 pt-10 border-t">
            <Link
              href={"/men"}
              className="flex gap-x-2 items-center underline underline-offset-2"
            >
              Men
            </Link>
            <Link
              href={"/Women"}
              className="flex gap-x-2 items-center underline underline-offset-2"
            >
              Women
            </Link>
            <Link
              href={"/account/products"}
              className="flex gap-x-2 items-center underline underline-offset-2"
            >
              Categories
            </Link>
            <Link
              href={"/account/products"}
              className="flex gap-x-2 items-center underline underline-offset-2"
            >
              Support
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href={"/"} className="font-semibold text-xl flex items-center">
        Step
        <FootprintsIcon />p
      </Link>
      <User />
    </div>
  );
}

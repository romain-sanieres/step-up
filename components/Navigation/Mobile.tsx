import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FootprintsIcon, MenuIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import MobileNavContent from "./_components/MobileNavContent";
import { useEffect, useState } from "react";
import { getUserAction } from "@/app/zsa/user.action";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    const user = async () => {
      const [res] = await getUserAction();
      if (res) setSession(res);
    };
    user();
  }, []);
  return (
    <div className="md:hidden py-3 flex justify-between items-center">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                <FootprintsIcon />
                p
              </Link>
            </SheetTitle>
            <SheetDescription> </SheetDescription>
          </SheetHeader>

          <MobileNavContent open={setIsOpen} />
        </SheetContent>
      </Sheet>
      <Link href={"/"} className="font-semibold text-xl flex items-center">
        Step
        <FootprintsIcon />
        p
      </Link>
      <Link
        href={
          session
            ? session.userType === "CLIENT"
              ? "/account/orders"
              : "/account/company"
            : "/login"
        }
      >
        <User2Icon />
      </Link>
    </div>
  );
}

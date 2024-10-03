import React, { ReactNode } from "react";
import { logout } from "@/actions/authActions";
import BreadcrumbLayout from "../_components/BreadcrumbLayout";
import VendorLink from "../_components/VendorLink";
import { getUserAction } from "@/app/zsa/user.action";

export default async function Layout({ children }: { children: ReactNode }) {
  const [user] = await getUserAction();

  if (user && user.userType === "VENDOR")
    return (
      <main className="flex gap-x-5 min-h-[100dvh]">
        <aside className="flex-col gap-y-10 w-60 hidden md:flex">
          <p className="text-xl">Your Account</p>
          <div className="divide-y flex flex-col gap-y-5">
            <VendorLink vendor={user.vendor_account.length} />
            <div className="pt-5">
              <form
                action={async () => {
                  "use server";
                  await logout();
                }}
              >
                <button className="capitalize ml-2 cursor-pointer hover:text-destructive hover:bg-background w-fit text-md ">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </aside>
        <div className="w-full">
          <BreadcrumbLayout />
          {children}
        </div>
      </main>
    );
}

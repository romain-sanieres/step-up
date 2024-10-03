import React, { ReactNode } from "react";
import { logout } from "@/actions/authActions";
import BreadcrumbLayout from "../_components/BreadcrumbLayout";
import ClientLink from "../_components/ClientLink";
import { getUserAction } from "@/app/zsa/user.action";

export default async function Layout({ children }: { children: ReactNode }) {
  const [user] = await getUserAction();
  if (user && user.userType === "CLIENT")
    return (
      <main className="flex gap-x-5 min-h-[100dvh] ">
        <aside className="flex flex-col gap-y-10 w-60 max-md:hidden">
          <p className="text-xl">Your Account</p>
          <div className="divide-y flex flex-col gap-y-5">
            <ClientLink />
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
        <div>
          <BreadcrumbLayout />
          {children}
        </div>
      </main>
    );
}

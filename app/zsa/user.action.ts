"use server";
import { auth } from "@/auth";
import { db } from "@/db";
import { authedAction } from "@/lib/zsa";

export const getUserAction = authedAction.handler(async () => {
  const session = await auth();
  if (!session) {
    throw new Error("No User");
  }

  const user = await db.user.findUnique({
    where: { email: String(session?.user?.email) },
    include: {
      accounts: true,
      vendor_account: true,
      cart: {
        include: {
          product: true,
        },
      },
    },
  });

  return user || null;
});

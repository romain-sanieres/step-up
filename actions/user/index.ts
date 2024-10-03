"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export const getUser = async () => {
  const session = await auth();
  if (!session?.user?.email) return;

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { accounts: true, vendor_account: true },
  });

  revalidatePath("/");
  return user || null;
};

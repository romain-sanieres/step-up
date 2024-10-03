"use server";

import { db } from "@/db";
import { authedAction, companyAction } from "@/lib/zsa";
import { z } from "zod";
import { getUserAction } from "./user.action";

export const createCompanyAction = authedAction
  .input(
    z.object({
      name: z.string(),
      stripe: z.string(),
      description: z.string(),
    })
  )

  .handler(async ({ input }) => {
    try {
      const [user] = await getUserAction();
      if (!user) {
        throw new Error("User not found");
      }

      const newCompany = await db.vendor.create({
        data: {
          name: input.name,
          description: input.description,
          stripe_account: input.stripe,
          userId: user.id,
        },
      });

      return {
        success: true,
        company: newCompany,
        message: "Company created successfully",
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  });

export const getCompanyAction = companyAction.handler(async () => {
  try {
    const [user] = await getUserAction();
    if (!user) {
      throw new Error("User not found");
    }
    const company = await db.vendor.findFirst({
      where: { userId: user.id },
    });

    if (company) {
      return company;
    } else {
      throw new Error("No company found");
    }
  } catch (err) {
    console.error(err);
  }
});
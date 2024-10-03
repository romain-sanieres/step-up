import { getUser } from "@/actions/user";
import { auth } from "@/auth";
import { createServerAction, createServerActionProcedure } from "zsa";

export const action = createServerAction();

const authedProcedure = createServerActionProcedure().handler(async () => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    return {
      user,
    };
  } catch {
    throw new Error("User not authenticated");
  }
});

const companyProcedure = createServerActionProcedure().handler(async () => {
  try {
    const user = await getUser();
    const session = await auth();
    if (user?.vendor_account[0].userId === session?.user?.id) {
      return user;
    }
  } catch (err) {
    throw new Error("User not authenticated : " + err );
  }
});

export const authedAction = authedProcedure.createServerAction();
export const companyAction = companyProcedure.createServerAction();

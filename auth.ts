import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcryptjs";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";
import { hashPassword } from "./utils/hash";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db), // Using Prisma as the database adapter
  session: { strategy: "jwt" }, // Using JWT for session management
  providers: [
    // Declare your environment variables with the names specified in the documentation to avoid having to enter clientId and client secret in this component
    // exemple google : https://authjs.dev/getting-started/providers/google
    Google({
      // Configuration to force account selection
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Github({
      // Configuration to force account selection
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    // This is the configuration for the Credentials provider, which allows users to log in with their email and password.
    Credentials({
      // The name of the provider, which is displayed on the login page.
      name: "Credentials",
      // The credentials that are required for this provider.
      credentials: {
        email: {},
        password: {},
      },

      // This function is called when a user attempts to log in with their email and password.
      authorize: async (credentials) => {
        // Get the email from the credentials.
        const email = credentials.email as string;
        // Hash the password from the credentials.
        const hash = hashPassword(credentials.password);

        // Try to find a user with the given email.
        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });

        // If no user is found, create a new one.
        if (!user) {
          user = await db.user.create({
            data: {
              name: email,
              email,
              password: hash,
              createdAt: new Date(),
              // Create a new account for the user.
              accounts: {
                create: {
                  type: "credentials",
                  provider: "email",
                  providerAccountId: email,
                },
              },
            },
          });
        } else {
          // If a user is found, check if the provided password is valid.
          const isPasswordValid = compareSync(
            credentials.password as string,
            user.password
          );
          // If the password is not valid, return null.
          if (!isPasswordValid) {
            return null;
          }
        }
        // Return the user.
        return user;
      },
    }),
    // Add more providers
  ],
});

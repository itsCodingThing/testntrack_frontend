import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { adminLogin } from "./api";
import { z, ZodError } from "zod";

declare module "next-auth" {
  interface User {
    token: string;
  }

  interface Session {
    user: {
      token: string;
    } & DefaultSession["user"];
  }
}

const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (cred) => {
        try {
          const validate = await signInSchema.parseAsync(cred);

          const user = await adminLogin({
            email: validate.email,
            password: validate.password,
          });

          return user.data;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      session.user.token = token.token as string;
      session.user.id = token.id as string;

      return session;
    },
  },
});

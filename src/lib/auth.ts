import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { adminLogin } from "./api";
import { z, ZodError } from "zod";
import { ApiError } from "./error";

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
  type: z.union([z.literal("admin"), z.literal("school")]),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
  code: z.string().min(3).optional(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        type: { label: "type" },
        email: { label: "email" },
        password: { label: "password", type: "password" },
        code: { label: "code" },
      },
      authorize: async (cred) => {
        try {
          const validate = await signInSchema.parseAsync(cred);

          const response = await adminLogin({
            type: validate.type,
            email: validate.email,
            password: validate.password,
            code: validate.code,
          });

          if (!response.status) {
            throw new ApiError("login failed");
          }

          return response.data;
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

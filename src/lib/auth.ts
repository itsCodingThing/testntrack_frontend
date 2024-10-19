import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z, ZodError } from "zod";
import { ApiError } from "./error";
import { adminLogin } from "./backend-apis/login";

declare module "next-auth" {
  interface User {
    token: string;
    type: "admin" | "school-admin";
    schoolName?: string;
    schoolId?: string;
  }

  interface Session {
    user: {
      token: string;
      type: "admin" | "school-admin";
      schoolName?: string;
      schoolId?: string;
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
  secret: "ksladfjslakfjaslkfjsalfkajfd",
  providers: [
    Credentials({
      credentials: {
        type: { label: "type" },
        email: { label: "email" },
        password: { label: "password", type: "password" },
        code: { label: "code" },
      },
      // @ts-expect-error next-auth cred typings error
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
        token.type = user.type;
        token.schoolId = user.schoolId;
        token.schoolName = user.schoolName;
      }

      return token;
    },
    session({ session, token }) {
      session.user.token = token.token as string;
      session.user.id = token.id as string;
      session.user.type = token.type as "admin" | "school-admin";
      session.user.schoolId = token.schoolId as string;
      session.user.schoolName = token.schoolName as string;

      return session;
    },
  },
});

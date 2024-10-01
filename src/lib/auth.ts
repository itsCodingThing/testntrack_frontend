import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { adminLogin } from "./api";

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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (cred) => {
        const user = await adminLogin({
          email: cred.email as string,
          password: cred.password as string,
        });

        return user.data;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.token = token.token as string;
      return session;
    },
  },
});

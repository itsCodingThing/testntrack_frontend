import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (cred) => {
        console.log("auth function ", cred);

        let user = null;

        user = await login({
          email: cred.email as string,
          password: cred.password as string,
        });

        return user.data;
      },
    }),
  ],
});

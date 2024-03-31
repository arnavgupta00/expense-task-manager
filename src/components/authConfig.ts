import CredentialsProvider from "next-auth/providers/credentials";
import { prismaConnect } from "@/db/prismaGenerate";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ): Promise<any | null> {
        const prisma = prismaConnect;
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
            password: credentials?.password,
          },
        });

        if (existingUser) {
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            categories: ["asgagage", "asgagh"],
          };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET|| ""
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token, user }: any) => {
      if (token && token.categories) {
        session.user.categories = token.categories;
      }

      return session;
    },
  },
};

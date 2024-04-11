import CredentialsProvider from "next-auth/providers/credentials";
import { prismaConnect } from "@/db/prismaGenerate";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account } : { user: User , account: any}) {
      if (account.provider === "google") {
        console.log("User:", user);   
        const prisma = prismaConnect;
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              name: user.name || "",
              email: user.email || "",
              password: "", 
              categories: "",
            },
          });
          console.log("New user created:", newUser);
        }
      }
      return true;
    },
    session: ({ session, token, user }: any) => {
      if (token && token.categories) {
        session.user.categories = token.categories;
      }

      return session;
    },
  },
};

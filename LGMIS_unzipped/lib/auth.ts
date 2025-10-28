import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getDataSource } from "./db";
import { User } from "@/entities/User";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const ds = await getDataSource();
        const repo = ds.getRepository(User);
        const user = await repo.findOne({ where: { email: credentials.email } });
        if (!user) return null;
        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: String(user.id), name: user.name, email: user.email };
      }
    })
  ],
  pages: { signIn: "/auth/signin" }
};

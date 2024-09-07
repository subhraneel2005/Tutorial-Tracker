import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '@/lib/db';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-posta", type: "email", placeholder: "mail@site.com" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("E-posta ve şifre gereklidir");
        }

        try {
          const { db } = await connectToDatabase();
          const user = await db.collection("users").findOne({ email: credentials.email });
          
          if (!user) {
            throw new Error("Kullanıcı bulunamadı");
          }

          if (!user.isVerified) {
            throw new Error("E-posta adresiniz doğrulanmamış");
          }

          if (!user.hashedPassword) {
            throw new Error("Kullanıcı şifresi bulunamadı");
          }

          const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
          
          if (!isValid) {
            throw new Error("Geçersiz şifre");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/account",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
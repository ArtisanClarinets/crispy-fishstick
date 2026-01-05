import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";

const nextAuthSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      roles: string[];
      tenantId?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    tenantId?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            RoleAssignment: {
              include: {
                Role: true,
              },
            },
          },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        if (user.mfaSecret) {
          if (!credentials.code) {
            throw new Error("MFA_REQUIRED");
          }
          
          try {
            const isValidToken = authenticator.check(credentials.code, user.mfaSecret);
            if (!isValidToken) {
              throw new Error("INVALID_MFA_CODE");
            }
          } catch (error) {
            // Handle malformed token or other errors
             throw new Error("INVALID_MFA_CODE");
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.RoleAssignment.map((r) => r.Role.name),
          tenantId: user.tenantId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.roles = user.roles;
        // @ts-ignore
        token.tenantId = user.tenantId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
  },
};

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import { decryptSecret } from "@/lib/security/mfa";

// Enforce NEXTAUTH_SECRET in production; fail fast if missing
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (process.env.NODE_ENV === "production" && !nextAuthSecret) {
  throw new Error(
    "NEXTAUTH_SECRET is required in production. Please set it in your environment variables."
  );
}

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
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
            // Decrypt the stored secret before verification
            const decryptedSecret = await decryptSecret(user.mfaSecret);
            if (!decryptedSecret) {
                console.error("Failed to decrypt MFA secret for user:", user.id);
                throw new Error("MFA_ERROR");
            }

            const isValidToken = authenticator.check(credentials.code, decryptedSecret);
            if (!isValidToken) {
              throw new Error("INVALID_MFA_CODE");
            }
          } catch (_error) {
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
        token.roles = (user as any).roles || [];
        token.tenantId = (user as any).tenantId;
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

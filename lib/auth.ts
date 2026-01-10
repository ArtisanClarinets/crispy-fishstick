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
      permissions: string[];
      tenantId?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    permissions: string[];
    tenantId?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  useSecureCookies: process.env.NODE_ENV === "production",
  // trustHost: true, // Not supported in NextAuthOptions type for this version, but can be set via env var TRUST_HOST=true
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
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

        try {
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
                  throw new Error("MFA_ERROR");
              }

              const isValidToken = authenticator.check(credentials.code, decryptedSecret);
              if (!isValidToken) {
                throw new Error("INVALID_MFA_CODE");
              }
            } catch (error) {
              if (error instanceof Error && (error.message === "MFA_ERROR" || error.message === "INVALID_MFA_CODE")) {
                 throw error;
              }
              // Handle malformed token or other errors
               throw new Error("INVALID_MFA_CODE");
            }
          }

          // Parse permissions
          const permissions = user.RoleAssignment.flatMap((r) => {
            try {
              return JSON.parse(r.Role.permissions);
            } catch {
              return [];
            }
          });
          const uniquePermissions = Array.from(new Set(permissions));

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.RoleAssignment.map((r) => r.Role.name),
            permissions: uniquePermissions as string[],
            tenantId: user.tenantId,
          };
        } catch (error: any) {
          // Handle Prisma errors (P2021: Table does not exist)
          if (error.code === 'P2021' || error.code === 'P2022') {
            throw new Error("DB_SCHEMA_NOT_READY");
          }
          
          // Re-throw known auth errors
          if (error.message === "MFA_REQUIRED" || error.message === "INVALID_MFA_CODE" || error.message === "MFA_ERROR") {
            throw error;
          }

          throw new Error("AUTH_ERROR");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = (user as any).roles || [];
        token.permissions = (user as any).permissions || [];
        token.tenantId = (user as any).tenantId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.permissions = token.permissions;
        session.user.tenantId = token.tenantId;
      }
      return session;
    },
  },
};

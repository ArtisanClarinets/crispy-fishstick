
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface AuthOptions {
    trustHost?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [],
  trustHost: true,
};

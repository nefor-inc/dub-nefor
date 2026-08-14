import { UserProps } from "@/lib/types";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getUserViaToken(req: NextRequest) {
  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.VERCEL_URL
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
  })) as {
    email?: string;
    user?: UserProps;
  };

  return session?.user;
}

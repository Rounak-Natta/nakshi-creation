import { cookies } from "next/headers";

import { verifyToken } from "@/lib/auth/jwt";

export async function getAuthUser() {
  const token =
    (await cookies())
      .get("token")
      ?.value;

  if (!token) {
    return null;
  }

  const decoded =
    verifyToken(token) as {
      userId: string;
      role: string;
    } | null;

  if (!decoded) {
    return null;
  }

  return {
    id: decoded.userId,
    role: decoded.role,
  };
}
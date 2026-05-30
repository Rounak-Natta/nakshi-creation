import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
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

  return prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}
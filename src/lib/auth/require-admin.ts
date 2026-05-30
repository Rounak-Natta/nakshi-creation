import { redirect } from "next/navigation";

import { getAuthUser } from "./get-user";

export async function requireAdmin() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}
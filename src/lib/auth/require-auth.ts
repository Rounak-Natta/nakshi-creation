import { getAuthUser } from "./get-user";

export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
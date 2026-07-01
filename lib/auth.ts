import { auth, currentUser } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";

export function isAdminEmail(email: string | null | undefined): boolean {
  const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!allowed || !email) return false;
  return email.trim().toLowerCase() === allowed;
}

export async function getSessionUser(): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) return null;
  return currentUser();
}

export async function getAdminUser() {
  const user = await getSessionUser();
  if (!user) return null;

  const email = user.emailAddresses[0]?.emailAddress;
  if (!isAdminEmail(email)) return null;

  return user;
}

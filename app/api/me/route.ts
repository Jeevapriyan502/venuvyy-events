import { NextResponse } from "next/server";
import { getSessionUser, isAdminEmail } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.emailAddresses[0]?.emailAddress ?? null;

  return NextResponse.json({
    email,
    isAdmin: isAdminEmail(email),
  });
}

"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function LogoutButton() {
  return (
    <SignOutButton>
      <button type="button" className="admin-btn admin-btn-secondary w-full">
        Sign out
      </button>
    </SignOutButton>
  );
}

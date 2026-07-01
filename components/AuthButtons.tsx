"use client";

import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function AuthButtons() {
  const { isSignedIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      setIsAdmin(false);
      return;
    }

    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.isAdmin) setIsAdmin(true);
        else setIsAdmin(false);
      })
      .catch(() => setIsAdmin(false));
  }, [isSignedIn]);

  if (isSignedIn) {
    return (
      <div className="flex shrink-0 flex-nowrap items-center gap-2 sm:gap-3">
        <Link
          href="/my-events"
          className="hidden text-sm text-muted transition hover:text-foreground sm:block"
        >
          My Events
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className="hidden text-sm text-muted transition hover:text-foreground sm:block"
          >
            Admin
          </Link>
        )}
        <UserButton
          appearance={{
            ...clerkAppearance,
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
      </div>
    );
  }

  return (
    <SignInButton mode="redirect">
      <button type="button" className="btn-outline navbar-btn">
        Sign in
      </button>
    </SignInButton>
  );
}

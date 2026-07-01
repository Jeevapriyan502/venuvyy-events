"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Logo from "@/components/Logo";

export default function AuthCallbackPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    if (!isLoaded || handled.current) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    handled.current = true;

    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.isAdmin) router.replace("/admin");
        else router.replace("/my-events");
      })
      .catch(() => router.replace("/my-events"));
  }, [isLoaded, isSignedIn, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <Logo size="md" blend />
        <p className="mt-6 text-sm text-muted">Signing you in…</p>
      </div>
    </main>
  );
}

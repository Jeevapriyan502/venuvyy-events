"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f10] px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af3712,_transparent_70%)]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo variant="dark" size="md" />
        </div>
        <div className="rounded-2xl border border-[#d4af37]/20 bg-[#1a1a1b] p-8 shadow-2xl shadow-black/50">
          <h1 className="font-logo text-center text-2xl tracking-wide text-white">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-slate-400">Manage packages and enquiries</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm text-[#d4af37]">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#d4af37]/30 bg-[#0f0f10] px-4 py-3 text-white outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                placeholder="admin@venuvyyevents.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-[#d4af37]">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#d4af37]/30 bg-[#0f0f10] px-4 py-3 text-white outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <p className="rounded-lg bg-red-950/50 px-4 py-3 text-sm text-red-300">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-b from-[#f0d78c] to-[#9a7b2e] py-3.5 font-medium text-[#1a1a1b] transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center">
          <a href="/" className="text-sm text-slate-500 hover:text-[#d4af37]">
            ← Back to website
          </a>
        </p>
      </div>
    </main>
  );
}

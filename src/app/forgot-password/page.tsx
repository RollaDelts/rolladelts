"use client";

import { useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase-browser";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      setError("Supabase is not configured. Check your environment variables.");
      return;
    }

    setStatus("loading");
    try {
      const supabase = getBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setError(error.message);
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setStatus("idle");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-dtd-gold bg-dtd-purple text-xl font-bold text-dtd-gold">
            ΔΤΔ
          </span>
          <h1 className="mt-3 text-2xl font-bold text-dtd-purple">Reset Password</h1>
          <p className="text-sm text-foreground/60">Delta Tau Delta · Epsilon Nu Chapter</p>
        </div>

        {status === "sent" ? (
          <p className="text-center text-sm text-foreground/80">
            If an account exists for <strong>{email}</strong>, we&apos;ve sent a link to reset the
            password. Check the inbox (and spam folder).
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <p className="text-center text-sm text-foreground/70">
              Enter the account email and we&apos;ll send a link to reset the password.
            </p>
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />

            {error && <p className="text-center text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-dtd-purple py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-foreground/60">
          <Link href="/login" className="font-semibold text-dtd-purple hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

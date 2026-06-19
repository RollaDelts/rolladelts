"use client";

import { useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase-browser";

// Glitter particles: deterministic positions/colors/timings so there's no
// hydration mismatch and no Math.random() at render time.
const GLITTER = [
  { left: "8%",  top: "12%", delay: "0.0s", dur: "1.4s", color: "#FF0018", size: 10 },
  { left: "18%", top: "70%", delay: "0.2s", dur: "1.7s", color: "#FFA500", size: 8  },
  { left: "28%", top: "35%", delay: "0.5s", dur: "1.2s", color: "#FFFF00", size: 12 },
  { left: "38%", top: "80%", delay: "0.1s", dur: "1.6s", color: "#00C000", size: 9  },
  { left: "50%", top: "18%", delay: "0.7s", dur: "1.3s", color: "#0000FF", size: 11 },
  { left: "60%", top: "60%", delay: "0.4s", dur: "1.9s", color: "#8B00FF", size: 8  },
  { left: "70%", top: "28%", delay: "0.9s", dur: "1.5s", color: "#FF69B4", size: 13 },
  { left: "80%", top: "75%", delay: "0.3s", dur: "1.1s", color: "#FF0018", size: 7  },
  { left: "88%", top: "45%", delay: "0.6s", dur: "1.8s", color: "#FFA500", size: 10 },
  { left: "12%", top: "50%", delay: "0.8s", dur: "1.4s", color: "#FFFF00", size: 9  },
  { left: "22%", top: "20%", delay: "1.0s", dur: "1.6s", color: "#00C000", size: 11 },
  { left: "45%", top: "88%", delay: "0.2s", dur: "1.3s", color: "#0000FF", size: 8  },
  { left: "55%", top: "40%", delay: "1.1s", dur: "1.7s", color: "#8B00FF", size: 12 },
  { left: "75%", top: "10%", delay: "0.5s", dur: "1.2s", color: "#FF69B4", size: 10 },
  { left: "92%", top: "20%", delay: "0.9s", dur: "1.5s", color: "#FF0018", size: 7  },
  { left: "35%", top: "55%", delay: "1.3s", dur: "1.9s", color: "#FFA500", size: 9  },
  { left: "65%", top: "82%", delay: "0.1s", dur: "1.4s", color: "#FFFF00", size: 11 },
  { left: "5%",  top: "85%", delay: "0.7s", dur: "1.6s", color: "#00C000", size: 8  },
  { left: "48%", top: "5%",  delay: "0.4s", dur: "1.3s", color: "#0000FF", size: 13 },
  { left: "83%", top: "55%", delay: "1.2s", dur: "1.8s", color: "#8B00FF", size: 9  },
];

function PrideSuccess({ firstName }: { firstName: string }) {
  return (
    <>
      <style>{`
        @keyframes rainbow-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glitter-pulse {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          40%, 60% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        @keyframes float-emoji {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50%       { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes dance-in {
          0%   { transform: scale(0.5) rotate(-8deg); opacity: 0; }
          60%  { transform: scale(1.05) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>

      {/* Glitter layer */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {GLITTER.map((g, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: g.left,
              top: g.top,
              width: g.size,
              height: g.size,
              borderRadius: "50%",
              backgroundColor: g.color,
              boxShadow: `0 0 ${g.size * 2}px ${g.color}`,
              animation: `glitter-pulse ${g.dur} ${g.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Main card */}
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-sm text-center"
          style={{ animation: "dance-in 0.7s ease-out both" }}
        >
          {/* Floating rainbow emojis */}
          <div className="mb-2 flex justify-center gap-3 text-3xl">
            {["🌈", "✨", "🦄", "✨", "🌈"].map((e, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `float-emoji ${1.4 + i * 0.2}s ease-in-out ${i * 0.15}s infinite`,
                }}
              >
                {e}
              </span>
            ))}
          </div>

          {/* Rainbow headline */}
          <h1
            className="mt-2 text-4xl font-extrabold"
            style={{
              background:
                "linear-gradient(90deg, #FF0018, #FFA500, #FFFF00, #00C000, #0000FF, #8B00FF, #FF0018)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "rainbow-shift 2s linear infinite",
            }}
          >
            Happy Pride! 🏳️‍🌈
          </h1>

          <p className="mt-1 text-lg font-semibold text-dtd-purple">
            Welcome, {firstName}!
          </p>

          {/* Divider */}
          <div
            className="mx-auto my-4 h-1 w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #FF0018, #FFA500, #FFFF00, #00C000, #0000FF, #8B00FF)",
            }}
          />

          <p className="text-foreground/70">
            Your account is pending approval by a chapter admin.
            You&apos;ll be able to log in once your account is approved.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition"
            style={{
              background:
                "linear-gradient(90deg, #FF0018, #FFA500, #FFFF00, #00C000, #0000FF, #8B00FF)",
              backgroundSize: "200% auto",
              animation: "rainbow-shift 2s linear infinite",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError("Supabase is not configured. Check your environment variables.");
      return;
    }

    setLoading(true);
    try {
      const supabase = getBrowserClient();
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { first_name: form.firstName, last_name: form.lastName },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (success && form.lastName.trim().toLowerCase() === "vogel") {
    return <PrideSuccess firstName={form.firstName} />;
  }

  if (success) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-dtd-gold bg-dtd-purple text-xl font-bold text-dtd-gold">
            ΔΤΔ
          </span>
          <h1 className="mt-4 text-2xl font-bold text-dtd-purple">Registration Submitted!</h1>
          <p className="mt-3 text-foreground/70">
            Thanks, {form.firstName}! Your account is pending approval by a chapter admin.
            You&apos;ll be able to log in once your account is approved.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-dtd-gold bg-dtd-purple text-xl font-bold text-dtd-gold">
            ΔΤΔ
          </span>
          <h1 className="mt-3 text-2xl font-bold text-dtd-purple">Create Account</h1>
          <p className="text-sm text-foreground/60">Delta Tau Delta · Epsilon Nu Chapter</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password (min. 8 characters)"
            autoComplete="new-password"
            required
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
          />

          {error && <p className="text-center text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-dtd-purple py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-dtd-purple hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

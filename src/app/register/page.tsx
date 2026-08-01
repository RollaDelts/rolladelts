"use client";

import { useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase-browser";

// ─── Pride easter egg data ────────────────────────────────────────────────────

const PRIDE_COLORS = [
  "#FF0018","#FF8C00","#FFD700","#00C000",
  "#0000FF","#8B00FF","#FF69B4","#5BCEFA",
  "#F5A9B8","#FFFFFF","#784F17","#000000",
];

const RAINBOW_GRADIENT =
  "linear-gradient(90deg,#FF0018,#FF8C00,#FFD700,#00C000,#0000FF,#8B00FF,#FF69B4,#FF0018)";

// Classic confetti pieces — 60 colored rectangles/circles
const CONFETTI = Array.from({ length: 60 }, (_, i) => ({
  left:   `${(i * 37 + 11) % 100}%`,
  delay:  `${((i * 0.23) % 2.8).toFixed(2)}s`,
  dur:    `${(2.2 + (i * 0.13) % 2.2).toFixed(2)}s`,
  color:  PRIDE_COLORS[i % PRIDE_COLORS.length],
  size:   5 + (i % 9),
  isRect: i % 3 !== 0,
}));

// 80 falling emoji — golden-ratio left positions so they never cluster.
// Rainbows and flags each get their own golden-ratio sequence, offset by 50%
// so the two types interleave evenly across the full width.
// Delays use a different prime (97) so position and timing are decorrelated.
const EMOJI_SIZES = [18, 27, 36, 45, 56];
const EMOJI_FALL = Array.from({ length: 80 }, (_, i) => {
  const isRainbow = i % 2 === 0;
  const idx = Math.floor(i / 2);
  const left = ((idx * 61.8) + (isRainbow ? 2.5 : 52.5)) % 100;
  const delay = ((idx * 97 + (isRainbow ? 0 : 47)) % 380) / 100;
  const dur = 3.0 + ((idx * 73) % 280) / 100;
  return {
    left:  `${left.toFixed(1)}%`,
    delay: `${delay.toFixed(2)}s`,
    dur:   `${dur.toFixed(2)}s`,
    emoji: isRainbow ? "🌈" : "🏳️‍🌈",
    size:  EMOJI_SIZES[i % EMOJI_SIZES.length],
  };
});

// 35 twinkling glitter dots
const GLITTER = Array.from({ length: 35 }, (_, i) => ({
  left:  `${(i * 53 + 7) % 100}%`,
  top:   `${(i * 41 + 17) % 100}%`,
  delay: `${((i * 0.19) % 2).toFixed(2)}s`,
  dur:   `${(1.1 + (i * 0.17) % 1.2).toFixed(2)}s`,
  color: PRIDE_COLORS[i % PRIDE_COLORS.length],
  size:  4 + (i % 10),
}));

const FLOAT_EMOJIS = ["🌈","✨","🦄","💅","👑","🏳️‍🌈","💜","⭐","🌟","🎉","🪩","💎"];

const TOP_EMOJIS    = ["🌈","✨","🦄","👑","🏳️‍🌈","💅","💜","✨","🌈","🎉","🌟","🪩"];
const BOTTOM_EMOJIS = ["🏳️‍🌈","💎","🌈","💜","✨","👑","🌟","💅","🏳️‍🌈","🎉","🌈","💜"];
const EXTRA_EMOJIS  = ["✨","🦄","🌈","💅","🏳️‍🌈","⭐","💎","🌟","👑","🎉","💜","🌈"];

function PrideSuccess({ firstName }: { firstName: string }) {
  return (
    <>
      <style>{`
        @keyframes rainbow-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes page-bg {
          0%,100% { background-position: 0% 50%; }
          33%     { background-position: 50% 100%; }
          66%     { background-position: 100% 50%; }
        }
        @keyframes confetti-fall {
          0%   { transform: translateY(-40px) rotate(0deg) scale(1);    opacity: 1; }
          80%  { opacity: 0.9; }
          100% { transform: translateY(108vh) rotate(900deg) scale(0.6); opacity: 0; }
        }
        @keyframes emoji-fall {
          0%   { transform: translateY(-80px) rotate(-15deg) scale(1); opacity: 1; }
          100% { transform: translateY(108vh) rotate(30deg)  scale(1); opacity: 0.85; }
        }
        @keyframes glitter-pulse {
          0%,100% { transform: scale(0) rotate(0deg);   opacity: 0; }
          45%,55% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        @keyframes float-emoji {
          0%,100% { transform: translateY(0)    rotate(-8deg) scale(1);    }
          50%     { transform: translateY(-22px) rotate(8deg)  scale(1.15); }
        }
        @keyframes dance-in {
          0%   { transform: scale(0.4) rotate(-10deg); opacity: 0; }
          55%  { transform: scale(1.1) rotate(4deg);  opacity: 1; }
          75%  { transform: scale(0.97) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg);    opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-scale {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.12); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-4deg); }
          50%     { transform: rotate(4deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes bounce-up {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-14px); }
        }
      `}</style>

      {/* Page background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg,#ffe4f0,#fff0e4,#fffde4,#e4ffe8,#e4f0ff,#f0e4ff,#ffe4f0)",
          backgroundSize: "400% 400%",
          animation: "page-bg 8s ease infinite",
        }}
      />

      {/* Classic confetti */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 10 }}>
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.left,
              top: "-12px",
              width:  c.isRect ? c.size : c.size + 2,
              height: c.isRect ? c.size * 0.45 : c.size + 2,
              borderRadius: c.isRect ? "2px" : "50%",
              backgroundColor: c.color,
              animation: `confetti-fall ${c.dur} ${c.delay} infinite linear`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Falling emoji rainbows and pride flags */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 11 }}>
        {EMOJI_FALL.map((e, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: e.left,
              top: "-80px",
              fontSize: e.size,
              lineHeight: 1,
              animation: `emoji-fall ${e.dur} ${e.delay} infinite linear`,
              opacity: 0,
              userSelect: "none",
            }}
          >
            {e.emoji}
          </div>
        ))}
      </div>

      {/* Glitter */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 12 }}>
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
              boxShadow: `0 0 ${g.size * 3}px ${g.color}, 0 0 ${g.size * 6}px ${g.color}80`,
              animation: `glitter-pulse ${g.dur} ${g.delay} infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex min-h-[90vh] items-center justify-center px-4 py-16" style={{ zIndex: 20 }}>
        <div
          className="w-full max-w-md text-center"
          style={{ animation: "dance-in 0.8s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >

          {/* Top emoji row — big */}
          <div className="mb-4 flex flex-wrap justify-center gap-2 text-4xl">
            {TOP_EMOJIS.map((e, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `float-emoji ${1.2 + i * 0.16}s ease-in-out ${i * 0.1}s infinite`,
                }}
              >
                {e}
              </span>
            ))}
          </div>

          {/* Second emoji row */}
          <div className="mb-4 flex flex-wrap justify-center gap-2 text-3xl">
            {EXTRA_EMOJIS.map((e, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `bounce-up ${1.4 + i * 0.13}s ease-in-out ${i * 0.11}s infinite`,
                }}
              >
                {e}
              </span>
            ))}
          </div>

          {/* Spinning disco ball */}
          <div
            className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-5xl"
            style={{
              background: RAINBOW_GRADIENT,
              backgroundSize: "200% auto",
              animation: "rainbow-shift 1.5s linear infinite, pulse-scale 2s ease-in-out infinite",
              boxShadow: "0 0 40px #FF69B480, 0 0 80px #8B00FF40, 0 0 120px #FFD70030",
            }}
          >
            <span style={{ animation: "spin-slow 3s linear infinite", display: "inline-block" }}>
              🪩
            </span>
          </div>

          {/* SLAY headline — primary */}
          <h1
            className="text-6xl font-black tracking-tight"
            style={{
              background: "linear-gradient(90deg,#FF69B4,#8B00FF,#5BCEFA,#FF69B4,#FFD700,#FF69B4)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 1.8s linear infinite",
              filter: "drop-shadow(0 3px 12px #FF69B460)",
            }}
          >
            SLAY, {firstName}! 👑
          </h1>

          {/* HAPPY PRIDE — secondary headline */}
          <p
            className="mt-2 text-4xl font-black tracking-tight"
            style={{
              background: RAINBOW_GRADIENT,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "rainbow-shift 1.5s linear infinite",
              filter: "drop-shadow(0 2px 8px #FF000030)",
            }}
          >
            HAPPY PRIDE! 🏳️‍🌈
          </p>

          {/* Rainbow divider */}
          <div
            className="mx-auto my-5 h-2 w-48 rounded-full"
            style={{
              background: RAINBOW_GRADIENT,
              backgroundSize: "200% auto",
              animation: "rainbow-shift 1.5s linear infinite",
              boxShadow: "0 2px 16px #FF69B460",
            }}
          />

          {/* Card with animated rainbow border */}
          <div
            className="rounded-2xl p-0.5"
            style={{
              background: RAINBOW_GRADIENT,
              backgroundSize: "200% auto",
              animation: "rainbow-shift 1.5s linear infinite",
              boxShadow: "0 0 30px #FF69B450, 0 0 60px #8B00FF30",
            }}
          >
            <div className="rounded-2xl bg-white px-6 py-6">
              <p className="text-lg font-bold text-gray-800">
                You are already iconic. 👑
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Your registration has been submitted!
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Your account is pending admin approval. You&apos;ll be able to
                log in once approved. In the meantime — keep being fabulous. 💅
              </p>

              {/* Wiggle emoji row inside card */}
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-2xl">
                {FLOAT_EMOJIS.map((e, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      animation: `wiggle ${1 + i * 0.15}s ease-in-out ${i * 0.1}s infinite`,
                    }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rainbow divider */}
          <div
            className="mx-auto my-5 h-2 w-48 rounded-full"
            style={{
              background: RAINBOW_GRADIENT,
              backgroundSize: "200% auto",
              animation: "rainbow-shift 1.5s linear infinite",
              boxShadow: "0 2px 16px #FF69B460",
            }}
          />

          {/* Pulsing rainbow button */}
          <Link
            href="/"
            className="inline-block rounded-full px-10 py-3 text-sm font-black uppercase tracking-widest text-white transition"
            style={{
              background: RAINBOW_GRADIENT,
              backgroundSize: "200% auto",
              animation: "rainbow-shift 1.5s linear infinite, pulse-scale 2s ease-in-out infinite",
              boxShadow: "0 4px 24px #FF69B470, 0 2px 8px #8B00FF50",
              letterSpacing: "0.15em",
            }}
          >
            🌈 Back to Home 🌈
          </Link>

          {/* Bottom emoji rows */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-3xl">
            {BOTTOM_EMOJIS.map((e, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `float-emoji ${1.5 + i * 0.18}s ease-in-out ${i * 0.12}s infinite`,
                }}
              >
                {e}
              </span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2 text-2xl">
            {TOP_EMOJIS.map((e, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `bounce-up ${1.3 + i * 0.14}s ease-in-out ${i * 0.09}s infinite`,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main register page ───────────────────────────────────────────────────────

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
          <p className="mt-3 text-foreground/80">
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

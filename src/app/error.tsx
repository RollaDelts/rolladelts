"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // Surfaces in Vercel's Logs tab — the primary way errors get noticed for now.
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dtd-gold bg-dtd-purple text-2xl font-bold text-dtd-gold">
        ΔΤΔ
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold uppercase text-dtd-purple sm:text-5xl">
        Something Went Wrong
      </h1>
      <p className="mt-3 max-w-md text-foreground/70">
        Sorry about that — an unexpected error occurred. Try again, or head back home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-full bg-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

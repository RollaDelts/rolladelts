"use client";

import Link from "next/link";
import { useState } from "react";
import { signOutAction } from "@/app/auth/actions";

type UserDisplay = { name: string; role: string } | null;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/recruitment", label: "Recruitment" },
  { href: "/philanthropy", label: "Philanthropy" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ userDisplay }: { userDisplay: UserDisplay }) {
  const [open, setOpen] = useState(false);
  const isAdmin = userDisplay?.role === "admin";

  return (
    <header className="sticky top-0 z-50 border-b border-dtd-gold/40 bg-dtd-purple text-dtd-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center border-2 border-dtd-gold bg-dtd-purple-dark font-display text-lg font-bold text-dtd-gold">
            ΔΤΔ
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold uppercase tracking-wide">Delta Tau Delta</span>
            <span className="block text-xs text-dtd-gold-light">Epsilon Nu Chapter &middot; Missouri S&amp;T</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-dtd-white/90 transition hover:text-dtd-gold"
            >
              {link.label}
            </Link>
          ))}

          {userDisplay ? (
            <>
              <span className="text-sm text-dtd-white/70">
                Hi, <span className="font-semibold text-dtd-white">{userDisplay.name}</span>
              </span>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-full bg-dtd-gold/20 border border-dtd-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-gold transition hover:bg-dtd-gold hover:text-dtd-purple-dark"
                >
                  Admin
                </Link>
              )}
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-dtd-white/40 px-4 py-1.5 text-xs font-semibold text-dtd-white/80 transition hover:border-dtd-white hover:text-dtd-white"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-dtd-white/50 px-5 py-2 text-sm font-semibold text-dtd-white transition hover:border-dtd-white hover:text-dtd-white"
              >
                Login
              </Link>
              <Link
                href="/recruitment"
                className="bg-dtd-gold px-5 py-2 text-sm font-bold uppercase tracking-widest text-dtd-purple-dark transition hover:bg-dtd-gold-light"
              >
                Join Us
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen(!open)}
        >
          <span className="h-0.5 w-6 bg-dtd-white" />
          <span className="h-0.5 w-6 bg-dtd-white" />
          <span className="h-0.5 w-6 bg-dtd-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-dtd-gold/30 bg-dtd-purple-dark px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-sm font-medium uppercase tracking-wide text-dtd-white/90 hover:bg-dtd-purple hover:text-dtd-gold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {userDisplay ? (
            <>
              <p className="mt-2 px-3 text-xs text-dtd-white/60">
                Signed in as <span className="font-semibold text-dtd-white">{userDisplay.name}</span>
              </p>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="mt-1 rounded px-3 py-2 text-sm font-bold text-dtd-gold hover:bg-dtd-purple"
                  onClick={() => setOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <form action={signOutAction} className="mt-1">
                <button
                  type="submit"
                  className="w-full rounded px-3 py-2 text-left text-sm text-dtd-white/80 hover:bg-dtd-purple hover:text-dtd-white"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="mt-2 rounded px-3 py-2 text-sm font-semibold text-dtd-white/90 hover:bg-dtd-purple hover:text-dtd-gold"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/recruitment"
                className="mt-1 rounded-full bg-dtd-gold px-5 py-2 text-center text-sm font-bold uppercase tracking-wide text-dtd-purple-dark"
                onClick={() => setOpen(false)}
              >
                Join Us
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

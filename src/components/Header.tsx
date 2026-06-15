"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/recruitment", label: "Recruitment" },
  { href: "/philanthropy", label: "Philanthropy" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dtd-gold/40 bg-dtd-purple text-dtd-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dtd-gold bg-dtd-purple-dark text-lg font-bold text-dtd-gold">
            ΔΤΔ
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-wide">Epsilon Nu</span>
            <span className="block text-xs text-dtd-gold-light">Delta Tau Delta &middot; Missouri S&amp;T</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-dtd-white/90 transition hover:text-dtd-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/recruitment"
            className="rounded-full bg-dtd-gold px-5 py-2 text-sm font-bold uppercase tracking-wide text-dtd-purple-dark transition hover:bg-dtd-gold-light"
          >
            Join Us
          </Link>
        </nav>

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
          <Link
            href="/recruitment"
            className="mt-2 rounded-full bg-dtd-gold px-5 py-2 text-center text-sm font-bold uppercase tracking-wide text-dtd-purple-dark"
            onClick={() => setOpen(false)}
          >
            Join Us
          </Link>
        </nav>
      )}
    </header>
  );
}

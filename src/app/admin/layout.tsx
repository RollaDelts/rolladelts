import Link from "next/link";
import { logoutAction } from "./login/actions";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/officers", label: "Chapter Leadership" },
  { href: "/admin/events", label: "Rush Events" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-dtd-cream">
      <header className="bg-dtd-purple-dark text-dtd-white shadow">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-dtd-gold bg-dtd-purple text-xs font-bold text-dtd-gold">
              ΔΤΔ
            </span>
            <span className="text-sm font-bold uppercase tracking-wide text-dtd-gold">
              Admin
            </span>
          </div>
          <nav className="hidden items-center gap-4 sm:flex">
            {adminNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-dtd-white/80 transition hover:text-dtd-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-dtd-white/40 px-4 py-1.5 text-xs font-semibold text-dtd-white/80 transition hover:border-dtd-white hover:text-dtd-white"
            >
              Sign Out
            </button>
          </form>
        </div>
        <nav className="flex gap-4 border-t border-dtd-purple/40 px-4 py-2 sm:hidden">
          {adminNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-dtd-white/80 hover:text-dtd-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</div>

      <footer className="py-4 text-center text-xs text-foreground/50">
        Delta Tau Delta · Epsilon Nu Chapter Admin
      </footer>
    </div>
  );
}

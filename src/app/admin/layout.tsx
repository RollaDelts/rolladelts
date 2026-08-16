import Link from "next/link";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads & RSVPs" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/home", label: "Home Page" },
  { href: "/admin/about", label: "About Page" },
  { href: "/admin/recruitment", label: "Recruitment Page" },
  { href: "/admin/cost", label: "Recruitment Costs" },
  { href: "/admin/philanthropy", label: "Philanthropy Page" },
  { href: "/admin/alumni", label: "Alumni Spotlights" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-dtd-cream">
      <div className="border-b border-dtd-gold/30 bg-dtd-purple-dark">
        <nav className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-2">
          {adminNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded px-3 py-2 text-sm font-medium text-dtd-white/80 transition hover:bg-dtd-purple hover:text-dtd-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</div>

      <footer className="py-4 text-center text-xs text-foreground/50">
        Delta Tau Delta · Epsilon Nu Chapter Admin
      </footer>
    </div>
  );
}

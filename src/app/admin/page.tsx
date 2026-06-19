import Link from "next/link";

const sections = [
  {
    href: "/admin/officers",
    title: "Chapter Leadership",
    description: "Update officer names and roles displayed on the About page.",
    icon: "👥",
  },
  {
    href: "/admin/events",
    title: "Rush Events",
    description: "Add, edit, or remove upcoming recruitment events shown on the Recruitment page.",
    icon: "📅",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Admin Dashboard</h1>
      <p className="mt-1 text-foreground/70">
        Manage site content for Delta Tau Delta · Epsilon Nu Chapter.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-start gap-4 rounded-xl border border-dtd-purple/10 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="font-bold text-dtd-purple">{s.title}</p>
              <p className="mt-1 text-sm text-foreground/70">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-dtd-gold/40 bg-dtd-gold/10 p-5">
        <p className="text-sm font-semibold text-dtd-purple">Viewing the live site</p>
        <p className="mt-1 text-sm text-foreground/70">
          Changes saved here are reflected immediately on the public site. Visit{" "}
          <Link href="/" className="font-semibold text-dtd-purple underline" target="_blank">
            rolladelts.org
          </Link>{" "}
          to see updates.
        </p>
      </div>
    </div>
  );
}

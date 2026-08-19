import Link from "next/link";

const topSections = [
  {
    href: "/admin/leads",
    title: "Leads & RSVPs",
    description: "See everyone who's submitted a contact form or RSVP'd to a rush event.",
    icon: "📬",
  },
  {
    href: "/admin/settings",
    title: "Site Settings",
    description: "Contact info and social media links shared across the site.",
    icon: "⚙️",
  },
  {
    href: "/admin/users",
    title: "Users",
    description: "Review pending registrations, approve members, and manage admin access.",
    icon: "🔑",
  },
];

const pageSections = [
  {
    href: "/admin/home",
    title: "Home Page Updates",
    description: "Hero photo, stats bar, \"Why Join\" pillars, and the photo gallery.",
    icon: "🏠",
  },
  {
    href: "/admin/about",
    title: "About Page Updates",
    description: "Chapter history, house photos, and chapter leadership.",
    icon: "👥",
  },
  {
    href: "/admin/recruitment",
    title: "Recruitment Page Updates",
    description: "New member photo, \"How Recruitment Works\" steps, and FAQ.",
    icon: "📋",
  },
  {
    href: "/admin/rush-events",
    title: "Rush Events",
    description: "Upcoming events, RSVP details, and the optional events banner photo.",
    icon: "📅",
  },
  {
    href: "/admin/cost",
    title: "Recruitment Costs",
    description: "Chapter dues and the Missouri S&T housing/meal plan comparison.",
    icon: "💲",
  },
  {
    href: "/admin/philanthropy",
    title: "Philanthropy Page Updates",
    description: "Haunted Maze details and the \"Giving Back Year-Round\" program cards.",
    icon: "🤝",
  },
  {
    href: "/admin/alumni",
    title: "Alumni Spotlights",
    description: "Edit alumni profiles featured on the Alumni page.",
    icon: "🎓",
  },
  {
    href: "/admin/stories",
    title: "Our Stories",
    description: "Add, edit, or remove chapter history and news posts.",
    icon: "📖",
  },
];

function SectionGrid({ sections }: { sections: typeof topSections }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="flex items-start gap-4 rounded-xl border border-dtd-purple/10 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <span className="text-3xl">{s.icon}</span>
          <div>
            <p className="font-bold text-dtd-purple">{s.title}</p>
            <p className="mt-1 text-sm text-foreground/80">{s.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Admin Dashboard</h1>
      <p className="mt-1 text-foreground/80">
        Manage site content for Delta Tau Delta · Epsilon Nu Chapter.
      </p>

      <div className="mt-8">
        <SectionGrid sections={topSections} />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-dtd-purple">Webpage Updates</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Everything shown on each public page, grouped together in one place.
        </p>
        <div className="mt-4">
          <SectionGrid sections={pageSections} />
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-dtd-gold/40 bg-dtd-gold/10 p-5">
        <p className="text-sm font-semibold text-dtd-purple">Viewing the live site</p>
        <p className="mt-1 text-sm text-foreground/80">
          Changes saved here are reflected immediately on the public site. Visit{" "}
          <Link href="/" className="font-semibold text-dtd-purple underline" target="_blank">
            the homepage
          </Link>{" "}
          to see updates.
        </p>
      </div>
    </div>
  );
}

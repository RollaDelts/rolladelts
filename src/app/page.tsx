import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

const stats = [
  { label: "Founded at Missouri S&T", value: "1964" },
  { label: "Active Brothers", value: "60+" },
  { label: "Chapter GPA", value: "3.2" },
  { label: "Raised for Philanthropy", value: "$10K+/yr" },
];

const values = [
  {
    title: "Truth",
    description: "Be honest with yourself and others. Integrity is the foundation of brotherhood.",
  },
  {
    title: "Courage",
    description: "Stand up for what's right, try new things, and lead even when it's hard.",
  },
  {
    title: "Faith",
    description: "Believe in your brothers, your potential, and something greater than yourself.",
  },
  {
    title: "Power",
    description: "Develop the strength of character and capability to make a real impact.",
  },
];

const pillars = [
  {
    title: "Brotherhood for Life",
    description:
      "Build friendships with a diverse group of men that last well beyond your four years at Missouri S&T.",
  },
  {
    title: "Academic Support",
    description:
      "Study tables, tutoring from upperclassmen, and a culture that pushes you to succeed in the classroom.",
  },
  {
    title: "Leadership Development",
    description:
      "Run committees, manage budgets, and plan events — real experience that sets you apart after graduation.",
  },
  {
    title: "Community Impact",
    description:
      "Give back to Rolla through philanthropy events that raise money and awareness for causes that matter.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dtd-purple text-dtd-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-dtd-gold">
              Delta Tau Delta &middot; Epsilon Nu Chapter &middot; Missouri S&amp;T
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Committed to Lives of Excellence
            </h1>
            <p className="mt-4 text-lg text-dtd-white/85">
              Delta Tau Delta is more than a fraternity — it&apos;s a lifelong brotherhood
              dedicated to developing men of character. Join Epsilon Nu at Missouri S&amp;T
              and discover what it means to be a Delt.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/recruitment"
                className="rounded-full bg-dtd-gold px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-purple-dark transition hover:bg-dtd-gold-light"
              >
                Rush Delta Tau Delta
              </Link>
              <Link
                href="/about"
                className="rounded-full border-2 border-dtd-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-white hover:text-dtd-purple"
              >
                Learn About Us
              </Link>
            </div>
          </div>
          <PlaceholderImage
            label="Hero Photo"
            suggestion="Wide group photo of brothers in front of the chapter house, or a candid shot from a recruitment/social event. High-resolution, bright, and welcoming."
            aspect="aspect-[4/3]"
            className="bg-dtd-purple-dark/40 border-dtd-gold/40"
          />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-dtd-gold/30 bg-dtd-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-dtd-purple">{stat.value}</p>
              <p className="mt-1 text-sm text-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission statement */}
      <section className="bg-dtd-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-dtd-gold">Our Mission</p>
          <h2 className="mt-3 text-3xl font-extrabold text-dtd-purple sm:text-4xl">
            Committed to Lives of Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/75">
            Delta Tau Delta exists to develop men who live with purpose, lead with integrity,
            and serve their communities throughout their lives — not just during college.
          </p>
        </div>
      </section>

      {/* Recruitment CTA banner */}
      <section className="bg-dtd-gold">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-dtd-purple-dark sm:flex-row">
          <div>
            <p className="text-lg font-bold">Rush Delta Tau Delta — Fall Recruitment is Open</p>
            <p className="text-sm">No GPA requirement to start the conversation. Come meet the brothers.</p>
          </div>
          <Link
            href="/recruitment"
            className="whitespace-nowrap rounded-full bg-dtd-purple px-6 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-purple-dark"
          >
            See Rush Events
          </Link>
        </div>
      </section>

      {/* Why join */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-dtd-purple">Why Join Delta Tau Delta?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-foreground/70">
            We&apos;re looking for men who want more than a club — who want a home, a family,
            and a launchpad for the rest of their lives.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-lg border border-dtd-purple/10 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-dtd-purple">{pillar.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="bg-dtd-purple-dark text-dtd-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-dtd-gold">Our Founding Principles</h2>
            <p className="mx-auto mt-2 max-w-2xl text-dtd-white/80">
              The mission of &ldquo;Committed to Lives of Excellence&rdquo; is built on four pillars
              established at Delta Tau Delta&apos;s founding.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-dtd-gold/30 p-6 text-center">
                <h3 className="text-xl font-bold text-dtd-gold">{value.title}</h3>
                <p className="mt-2 text-sm text-dtd-white/75">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-dtd-purple">Life at the House</h2>
          <p className="mx-auto mt-2 max-w-2xl text-foreground/70">
            A look at brotherhood, philanthropy, and the moments that define Delta Tau Delta
            at Missouri S&amp;T.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PlaceholderImage label="Chapter House" suggestion="Exterior photo of the chapter house at 2631 Vienna Rd." />
          <PlaceholderImage label="Brotherhood Event" suggestion="Candid group photo from a formal, retreat, or game night." />
          <PlaceholderImage label="Philanthropy Event" suggestion="Photo from the Haunted Maze or another fundraiser in action." />
          <PlaceholderImage label="Recruitment Event" suggestion="Photo of PNMs interacting with brothers during a rush event." />
          <PlaceholderImage label="Campus Life" suggestion="Brothers on Missouri S&T campus — academics, intramurals, or Greek Week." />
          <PlaceholderImage label="Formal/Composite" suggestion="Chapter composite photo or formal group portrait." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-dtd-purple text-dtd-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to Start Your Life of Excellence?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-dtd-white/85">
            Recruitment is open to all Missouri S&amp;T students. Reach out, come to an event,
            and see what makes Delta Tau Delta different.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/recruitment"
              className="rounded-full bg-dtd-gold px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-purple-dark transition hover:bg-dtd-gold-light"
            >
              Rush Delta Tau Delta
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-dtd-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-white hover:text-dtd-purple"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

const stats = [
  { label: "Founded at Missouri S&T", value: "1964" },
  { label: "Active Brothers", value: "60+" },
  { label: "Chapter GPA", value: "3.2" },
  { label: "Raised for Philanthropy", value: "$10K+/yr" },
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

const values = [
  {
    word: "Truth",
    description: "Be honest with yourself and others. Integrity is the foundation of brotherhood.",
  },
  {
    word: "Courage",
    description: "Stand up for what's right, try new things, and lead even when it's hard.",
  },
  {
    word: "Faith",
    description: "Believe in your brothers, your potential, and something greater than yourself.",
  },
  {
    word: "Power",
    description: "Develop the strength of character and capability to make a real impact.",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-dtd-purple pb-24 text-dtd-white"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)" }}
      >
        {/* Subtle decorative ΔΤΔ watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-6 select-none font-display text-[220px] font-bold leading-none text-dtd-white/5"
        >
          ΔΤΔ
        </span>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-16 md:grid-cols-2 md:items-center md:pt-24">
          <div>
            <span className="mb-5 inline-block bg-dtd-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-dtd-purple-dark">
              Epsilon Nu Chapter &middot; Missouri S&amp;T
            </span>
            <h1 className="font-display text-6xl font-bold uppercase leading-none tracking-tight sm:text-7xl md:text-8xl">
              Committed<br />
              to Lives of<br />
              <span className="text-dtd-gold">Excellence</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-dtd-white/80">
              Delta Tau Delta is more than a fraternity — it&apos;s a lifelong brotherhood
              dedicated to developing men of character. Join Epsilon Nu at Missouri S&amp;T
              and discover what it means to be a Delt.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/recruitment"
                className="rounded-none bg-dtd-gold px-8 py-3 text-sm font-bold uppercase tracking-widest text-dtd-purple-dark transition hover:bg-dtd-gold-light"
              >
                Rush Delta Tau Delta
              </Link>
              <Link
                href="/about"
                className="rounded-none border-2 border-dtd-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-dtd-white transition hover:bg-dtd-white hover:text-dtd-purple"
              >
                Learn About Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full border-2 border-dtd-gold/30" aria-hidden />
            <PlaceholderImage
              label="Hero Photo"
              suggestion="Wide group photo of brothers in front of the chapter house, or a candid shot from a recruitment/social event. High-resolution, bright, and welcoming."
              aspect="aspect-[4/3]"
              className="relative bg-dtd-purple-dark/40 border-dtd-gold/40"
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="bg-dtd-gold">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-dtd-purple/20 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-10 text-center">
              <p className="font-display text-5xl font-bold text-dtd-purple sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-dtd-purple/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rush CTA banner ──────────────────────────────────────────────── */}
      <section className="bg-dtd-purple-dark text-dtd-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-dtd-gold sm:text-4xl">
              Rush Delta Tau Delta
            </h2>
            <p className="mt-1 text-dtd-white/70">
              Fall Recruitment is Open &mdash; no GPA requirement to start the conversation.
            </p>
          </div>
          <Link
            href="/recruitment"
            className="shrink-0 bg-dtd-gold px-7 py-3 text-sm font-bold uppercase tracking-widest text-dtd-purple-dark transition hover:bg-dtd-gold-light"
          >
            See Rush Events
          </Link>
        </div>
      </section>

      {/* ── Why Join ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-dtd-gold">
            Why Delta Tau Delta?
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase text-dtd-purple sm:text-5xl">
            More Than a Fraternity
          </h2>
          <p className="mt-3 max-w-2xl text-foreground/70">
            We&apos;re looking for men who want more than a club — who want a home, a family,
            and a launchpad for the rest of their lives.
          </p>
        </div>
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="border-l-4 border-dtd-gold bg-white px-6 py-8 shadow-sm transition hover:bg-dtd-cream"
              style={{ borderTop: i >= 2 ? "1px solid #e5e7eb" : undefined }}
            >
              <span className="font-display text-4xl font-bold text-dtd-gold/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold uppercase text-dtd-purple">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission statement ────────────────────────────────────────────── */}
      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="border-l-4 border-dtd-gold pl-8">
            <p className="text-xs font-bold uppercase tracking-widest text-dtd-gold">Our Mission</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase text-dtd-purple sm:text-5xl">
              Committed to Lives<br />of Excellence
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-foreground/75">
              Delta Tau Delta exists to develop men who live with purpose, lead with integrity,
              and serve their communities throughout their lives — not just during college.
            </p>
          </div>
        </div>
      </section>

      {/* ── Founding Principles ──────────────────────────────────────────── */}
      <section className="bg-dtd-purple-dark text-dtd-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-dtd-gold">
              Since 1858
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase text-dtd-white sm:text-5xl">
              Our Founding Principles
            </h2>
          </div>
          <div className="grid gap-px bg-dtd-gold/20 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.word} className="relative overflow-hidden bg-dtd-purple-dark px-6 py-10">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-8xl font-bold leading-none text-dtd-gold/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-xs font-bold uppercase tracking-widest text-dtd-gold/60">
                  0{i + 1}
                </p>
                <h3 className="mt-1 font-display text-3xl font-bold uppercase text-dtd-gold">
                  {v.word}
                </h3>
                <p className="mt-3 text-sm text-dtd-white/70">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo gallery teaser ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-dtd-gold">
            Chapter Life
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase text-dtd-purple sm:text-5xl">
            Life at the House
          </h2>
          <p className="mt-3 max-w-2xl text-foreground/70">
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

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section
        className="bg-dtd-purple text-dtd-white"
        style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 text-center">
          <span
            aria-hidden
            className="pointer-events-none mx-auto block select-none font-display text-[100px] font-bold leading-none text-dtd-white/5"
          >
            ΔΤΔ
          </span>
          <h2 className="-mt-10 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            Ready to Start Your<br />
            <span className="text-dtd-gold">Life of Excellence?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-dtd-white/80">
            Recruitment is open to all Missouri S&amp;T students. Reach out, come to an event,
            and see what makes Delta Tau Delta different.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/recruitment"
              className="bg-dtd-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-dtd-purple-dark transition hover:bg-dtd-gold-light"
            >
              Rush Delta Tau Delta
            </Link>
            <Link
              href="/contact"
              className="border-2 border-dtd-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-dtd-white transition hover:bg-dtd-white hover:text-dtd-purple"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

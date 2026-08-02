import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";
import SiteImage from "@/components/SiteImage";
import { getOfficers } from "@/lib/db";

export default async function AboutPage() {
  const officers = await getOfficers();

  return (
    <div>
      <PageHero
        title="About Delta Tau Delta at Missouri S&T"
        subtitle="Delta Tau Delta's Epsilon Nu Chapter has called Missouri S&T home since 1964, building generations of brothers committed to lives of excellence."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-dtd-purple">Our History</h2>
          <p className="mt-3 text-foreground/80">
            Founded at Missouri University of Science &amp; Technology, Delta Tau Delta&apos;s
            Epsilon Nu Chapter has built a home on campus since 1964. For decades, our
            chapter house at 2631 Vienna Rd has been a home for engineers, scientists, and
            leaders who also know how to have a good time and give back to the Rolla
            community.
          </p>
          <p className="mt-3 text-foreground/80">
            Replace this section with a longer history of the chapter &mdash; founding date,
            notable milestones, house renovations, and alumni achievements.
          </p>
        </div>
        <SiteImage
          src="/images/site/history-roof.jpg"
          alt="Brothers on the chapter house roof, archival photo"
          aspect="aspect-[4/3]"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </section>

      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Our Mission &amp; Values</h2>
          <p className="mt-2 max-w-3xl text-foreground/80">
            Delta Tau Delta&apos;s mission is to be <strong>&ldquo;Committed to Lives of Excellence.&rdquo;</strong>{" "}
            That mission is grounded in four founding principles &mdash;{" "}
            <strong>Truth</strong>, <strong>Courage</strong>, <strong>Faith</strong>, and{" "}
            <strong>Power</strong> &mdash; that shape how every Delt treats his brothers,
            leads on campus, and represents himself in the community.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-dtd-purple">Chapter Leadership</h2>
        <p className="mt-2 max-w-3xl text-foreground/80">
          Our executive board is elected by the chapter each year and oversees day-to-day
          operations, recruitment, philanthropy, and risk management.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {officers.map((officer) => (
            <div key={officer.role} className="rounded-lg border border-dtd-purple/10 bg-white p-5 shadow-sm">
              <p className="font-bold text-dtd-purple">{officer.role}</p>
              <p className="text-sm text-foreground/80">{officer.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-dtd-purple">The House</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <SiteImage
            src="/images/site/house-exterior.jpg"
            alt="Daytime exterior of the chapter house"
            sizes="(min-width: 640px) 50vw, 100vw"
            fit="contain"
            className="bg-dtd-cream"
          />
          <PlaceholderImage label="Common Areas" suggestion="Interior photo of the living room, dining hall, or study area." />
        </div>
      </section>
    </div>
  );
}

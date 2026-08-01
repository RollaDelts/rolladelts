import PageHero from "@/components/PageHero";
import { getAlumniSpotlights } from "@/lib/db";

export default async function AlumniPage() {
  const spotlights = await getAlumniSpotlights();

  return (
    <div>
      <PageHero
        title="Alumni Spotlights"
        subtitle="Delta Tau Delta is a brotherhood for life. Here's a look at where some of our alumni have gone since Rolla."
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {spotlights.map((alum) => (
            <div
              key={alum.name}
              className="rounded-lg border border-dtd-purple/10 bg-white p-6 shadow-sm"
            >
              <h2 className="font-bold text-dtd-purple">{alum.name}</h2>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-dtd-gold-dark">
                {alum.pledgeClass} &middot; {alum.years}
              </p>
              <p className="mt-3 text-sm text-foreground/80">{alum.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-dtd-purple">Know a Delt We Should Feature?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-foreground/80">
            If you&apos;re an Epsilon Nu alum with a story to share, or want to nominate a
            brother for a future spotlight, reach out.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-purple-dark"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

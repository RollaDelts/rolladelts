import Image from "next/image";
import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";
import SiteImage from "@/components/SiteImage";
import { getOfficers, getAboutSettings } from "@/lib/db";

export default async function AboutPage() {
  const [officers, settings] = await Promise.all([getOfficers(), getAboutSettings()]);
  const historyParagraphs = settings.history.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const hazingParagraphs = settings.hazingPolicy.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div>
      <PageHero
        title="About Delta Tau Delta at Missouri S&T"
        subtitle="Delta Tau Delta's Epsilon Nu Chapter has called Missouri S&T home since 1964, building generations of brothers committed to lives of excellence."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-dtd-purple">Our History</h2>
          {historyParagraphs.map((p, i) => (
            <p key={i} className="mt-3 text-foreground/80">
              {p}
            </p>
          ))}
        </div>
        {settings.historyImageUrl ? (
          <SiteImage
            src={settings.historyImageUrl}
            alt="Chapter history photo"
            aspect="aspect-[4/3]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <PlaceholderImage
            label="Chapter History Photo"
            suggestion="Historic or archival photo of the chapter house, an old composite, or a founders' photo."
            aspect="aspect-[4/3]"
          />
        )}
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

      {hazingParagraphs.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Zero Tolerance for Hazing</h2>
          {hazingParagraphs.map((p, i) => (
            <p key={i} className="mt-3 max-w-3xl text-foreground/80">
              {p}
            </p>
          ))}
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-dtd-purple">Chapter Leadership</h2>
        <p className="mt-2 max-w-3xl text-foreground/80">
          Our executive board is elected by the chapter each year and oversees day-to-day
          operations, recruitment, philanthropy, and risk management.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {officers.map((officer) => (
            <div
              key={officer.role}
              className="flex items-center gap-4 rounded-lg border border-dtd-purple/10 bg-white p-5 shadow-sm"
            >
              {officer.photoUrl ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-dtd-cream">
                  <Image src={officer.photoUrl} alt={officer.name} fill sizes="64px" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-dtd-cream text-xs font-bold uppercase text-dtd-purple/40">
                  {officer.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2) || "?"}
                </div>
              )}
              <div>
                <p className="font-bold text-dtd-purple">{officer.role}</p>
                <p className="text-sm text-foreground/80">{officer.name}</p>
                {officer.email && (
                  <a href={`mailto:${officer.email}`} className="text-xs text-dtd-purple underline">
                    {officer.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-dtd-purple">The House</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {settings.houseExteriorImageUrl ? (
            <SiteImage
              src={settings.houseExteriorImageUrl}
              alt="Daytime exterior of the chapter house"
              sizes="(min-width: 640px) 50vw, 100vw"
              fit="contain"
              className="bg-dtd-cream"
            />
          ) : (
            <PlaceholderImage label="House Exterior" suggestion="Daytime exterior photo of 2631 Vienna Rd, showing the full house and landscaping." />
          )}
          {settings.commonAreasImageUrl ? (
            <SiteImage
              src={settings.commonAreasImageUrl}
              alt="Chapter house common areas"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <PlaceholderImage label="Common Areas" suggestion="Interior photo of the living room, dining hall, or study area." />
          )}
        </div>
      </section>
    </div>
  );
}

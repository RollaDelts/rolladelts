import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";

const officers = [
  { role: "President", name: "TBD" },
  { role: "Vice President", name: "TBD" },
  { role: "Treasurer", name: "TBD" },
  { role: "Recruitment Chair", name: "TBD" },
  { role: "Risk Manager", name: "TBD" },
  { role: "Philanthropy Chair", name: "TBD" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About Epsilon Nu"
        subtitle="The Epsilon Nu chapter of Delta Tau Delta has called Missouri S&T home since 1964, building generations of brothers committed to Truth, Courage, Faith, and Power."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-dtd-purple">Our History</h2>
          <p className="mt-3 text-foreground/80">
            Founded at Missouri University of Science &amp; Technology, the Epsilon Nu chapter
            has grown into one of the most respected fraternities on campus. For decades,
            our chapter house at 2631 Vienna Rd has been a home for engineers, scientists,
            and leaders who also know how to have a good time and give back to the Rolla
            community.
          </p>
          <p className="mt-3 text-foreground/80">
            Replace this section with a longer history of the chapter &mdash; founding date,
            notable milestones, house renovations, and alumni achievements.
          </p>
        </div>
        <PlaceholderImage
          label="Chapter History Photo"
          suggestion="Historic or archival photo of the chapter house, an old composite, or a founders' photo."
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Our Values</h2>
          <p className="mt-2 max-w-3xl text-foreground/80">
            Delta Tau Delta was founded on four core values that guide every brother&apos;s
            personal and chapter life: <strong>Truth</strong>, <strong>Courage</strong>,{" "}
            <strong>Faith</strong>, and <strong>Power</strong>. These aren&apos;t just words on a
            shield &mdash; they shape how we treat each other, how we lead on campus, and how
            we represent ourselves in the community.
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
              <p className="text-sm text-foreground/70">{officer.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-dtd-purple">The House</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PlaceholderImage label="House Exterior" suggestion="Daytime exterior photo of 2631 Vienna Rd, showing the full house and landscaping." />
          <PlaceholderImage label="Common Areas" suggestion="Interior photo of the living room, dining hall, or study area." />
        </div>
      </section>
    </div>
  );
}

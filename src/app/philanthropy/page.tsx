import PageHero from "@/components/PageHero";
import SiteImage from "@/components/SiteImage";

export default function PhilanthropyPage() {
  return (
    <div>
      <PageHero
        title="Philanthropy"
        subtitle="Giving back to the Rolla community is core to who we are as Delts."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-dtd-purple">Annual Haunted Maze</h2>
          <p className="mt-3 text-foreground/80">
            Each fall, Delta Tau Delta&apos;s Epsilon Nu Chapter hosts a haunted maze that brings
            together students, families, and the greater Rolla community for a night of fun
            while raising money for <strong>JDRF</strong>, the leading funder of type 1 diabetes
            research.
          </p>
          <p className="mt-3 text-foreground/80">
            Replace this with details on the current year&apos;s event date and how much has
            been raised historically.
          </p>
        </div>
        <SiteImage
          src="/images/site/haunted-maze-flyer.png"
          alt="Delta Tau Delta Haunted Maze event flyer"
          aspect="aspect-[4/3]"
          className="bg-black"
          fit="contain"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </section>

      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Giving Back Year-Round</h2>
          <p className="mt-2 max-w-3xl text-foreground/80">
            Philanthropy isn&apos;t just one night a year — our brothers show up for the Rolla
            community on an ongoing basis.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-dtd-purple/10 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-dtd-purple">Community Park Cleanup</h3>
              <p className="mt-2 text-sm text-foreground/80">
                Brothers regularly volunteer to clean up local parks around Rolla, keeping
                shared spaces safe and enjoyable for the community.
              </p>
            </div>
            <div className="rounded-lg border border-dtd-purple/10 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-dtd-purple">Vienna Road Monthly Pickups</h3>
              <p className="mt-2 text-sm text-foreground/80">
                Each month, the chapter picks up litter along Vienna Road near the chapter
                house — a small, consistent way of taking care of our neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-dtd-purple">Want to Get Involved?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-foreground/80">
          Whether you want to attend an event, donate, or partner with us on a future
          philanthropy initiative, we&apos;d love to hear from you.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block rounded-full bg-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-purple-dark"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}

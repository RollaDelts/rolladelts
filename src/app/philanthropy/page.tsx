import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";

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
            Each fall, Delta Tau Delta&apos;s Epsilon Nu Chapter hosts a haunted maze that brings together students,
            families, and the greater Rolla community for a night of fun while raising
            money for our chosen philanthropic partner.
          </p>
          <p className="mt-3 text-foreground/80">
            Replace this with details on the current year&apos;s event date, the cause it
            supports, and how much has been raised historically.
          </p>
        </div>
        <PlaceholderImage
          label="Haunted Maze Photo"
          suggestion="Action photo from the Haunted Maze — decorations, volunteers in costume, or attendees."
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Our Partner Causes</h2>
          <p className="mt-2 max-w-3xl text-foreground/80">
            Delta Tau Delta partners with organizations that align with our values of
            service and brotherhood. List the chapter&apos;s current philanthropic
            partner(s) here, with a short description and a link to donate or volunteer.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PlaceholderImage label="Partner Logo / Photo" suggestion="Logo or photo representing the philanthropic partner organization." />
            <PlaceholderImage label="Volunteer Event" suggestion="Photo of brothers volunteering at a community event." />
            <PlaceholderImage label="Fundraiser Results" suggestion="Photo or graphic showing total funds raised, presented to the partner org." />
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

import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";
import LeadFormStatus from "@/components/LeadFormStatus";
import { submitLeadAction } from "@/app/actions/leads";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Questions about recruitment, philanthropy, alumni relations, or anything else? Reach out."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-dtd-purple">Chapter House</h2>
          <ul className="mt-3 space-y-2 text-foreground/80">
            <li>2631 Vienna Rd, Rolla, MO 65401</li>
            <li>Phone: (573) 364-1909</li>
            <li>Email: dtd@umsystem.edu</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-dtd-purple">Follow Us</h2>
          <ul className="mt-3 space-y-2 text-foreground/80">
            <li>Facebook: ENDelts</li>
            <li>Instagram: @epsilonnudelts</li>
            <li>X (Twitter): @ENDelts</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-dtd-purple">Recruitment</h2>
          <p className="mt-3 text-foreground/80">
            For recruitment-specific questions, visit our{" "}
            <a href="/recruitment" className="font-semibold text-dtd-purple underline">
              Recruitment page
            </a>{" "}
            and fill out the interest form.
          </p>
        </div>

        <PlaceholderImage
          label="Map / Location"
          suggestion="Embed a Google Map of 2631 Vienna Rd, Rolla, MO 65401, or use a styled map screenshot."
          aspect="aspect-square"
        />
      </section>

      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold text-dtd-purple">Send a Message</h2>
          <div id="lead-status" className="mt-8 scroll-mt-24">
            <LeadFormStatus sent={sent} />
          </div>
          <form key={sent ?? "form"} action={submitLeadAction} className="grid gap-4">
            <input type="hidden" name="source" value="contact" />
            <input type="hidden" name="redirectTo" value="/contact" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
              />
            </div>
            <input
              type="text"
              name="detail"
              placeholder="Subject"
              className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
            <button
              type="submit"
              className="justify-self-start rounded-full bg-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-purple-dark"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

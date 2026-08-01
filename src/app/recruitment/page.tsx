import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getRushEvents } from "@/lib/db";

const steps = [
  {
    step: "1",
    title: "Reach Out",
    description: "Fill out the interest form below or message us on Instagram/Facebook (@epsilonnudelts). No commitment required.",
  },
  {
    step: "2",
    title: "Come to an Event",
    description: "Attend a rush event — meet & greets, game nights, BBQs, and info sessions are open to all Missouri S&T students.",
  },
  {
    step: "3",
    title: "Get to Know the Brothers",
    description: "Hang out at the house, ask questions, and see if Delta Tau Delta feels like home.",
  },
  {
    step: "4",
    title: "Receive a Bid",
    description: "If it's a great fit for both sides, you'll receive a bid to join and begin new member education.",
  },
];

const faqs = [
  {
    q: "Is there a GPA requirement to join?",
    a: "There's no minimum GPA to start the recruitment process. We do have academic expectations for new and active members, and we provide study tables and tutoring support to help everyone succeed.",
  },
  {
    q: "Do I have to live in the house?",
    a: "Living in is encouraged for the full experience but not always required. Reach out to discuss housing availability and options.",
  },
  {
    q: "I'm a freshman / transfer / non-traditional student — can I still join?",
    a: "Absolutely. We welcome men at any point in their college career, including transfer students and non-traditional students.",
  },
  {
    q: "What does it cost to join?",
    a: "Costs include a one-time new member fee and semesterly dues, which cover housing, meals, national fraternity fees, and chapter operations. Contact our Recruitment Chair for current, detailed pricing — we're happy to discuss payment plans.",
  },
];

export default async function RecruitmentPage() {
  const events = await getRushEvents();

  return (
    <div>
      <PageHero
        title="Rush Delta Tau Delta"
        subtitle="Joining Delta Tau Delta means joining a brotherhood committed to lives of excellence — for life. Here's everything you need to know to get started."
      />

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-dtd-purple">How Recruitment Works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.step} className="rounded-lg border border-dtd-purple/10 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dtd-gold text-lg font-bold text-dtd-purple-dark">
                {s.step}
              </span>
              <h3 className="mt-3 font-bold text-dtd-purple">{s.title}</h3>
              <p className="mt-1 text-sm text-foreground/80">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Upcoming Rush Events</h2>
          <p className="mt-2 max-w-3xl text-foreground/80">
            Dates update each semester &mdash; follow our social media for the latest schedule.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-dtd-purple text-dtd-white">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Location</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-dtd-cream"}>
                    <td className="px-4 py-3 font-medium text-dtd-purple">{event.date}</td>
                    <td className="px-4 py-3">{event.name}</td>
                    <td className="px-4 py-3 text-foreground/80">{event.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Costs */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-dtd-purple">Costs &amp; Transparency</h2>
            <p className="mt-3 text-foreground/80">
              We believe in being upfront about cost. New member fees and semesterly dues
              cover housing, meals, national/international fraternity fees, and chapter
              programming. We offer payment plans and can talk through financial aid,
              scholarships, and work-study options on a case-by-case basis.
            </p>
            <p className="mt-3 text-foreground/80">
              Replace this section with current dues figures, a cost breakdown table, and
              any scholarship information once finalized.
            </p>
          </div>
          <PlaceholderImage
            label="New Member Photo"
            suggestion="Photo of new members at initiation, big/little reveal, or pinning ceremony."
            aspect="aspect-[4/3]"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-lg border border-dtd-purple/10 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-dtd-purple">{faq.q}</summary>
                <p className="mt-2 text-sm text-foreground/80">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Interest form */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-dtd-purple">Get in Touch</h2>
        <p className="mt-2 text-center text-foreground/80">
          Interested in learning more? Send us your info and our Recruitment Chair will reach out.
        </p>
        <form className="mt-8 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Major / Graduation Year"
            className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
          />
          <textarea
            placeholder="Anything you'd like us to know?"
            rows={4}
            className="rounded-md border border-dtd-purple/20 px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
          />
          <button
            type="submit"
            className="justify-self-start rounded-full bg-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-purple-dark"
          >
            Submit Interest Form
          </button>
        </form>
      </section>
    </div>
  );
}

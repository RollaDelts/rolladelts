import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteImage from "@/components/SiteImage";
import LeadFormStatus from "@/components/LeadFormStatus";
import BotTrap from "@/components/BotTrap";
import RichText from "@/components/RichText";
import {
  getRushEvents,
  getCostSummary,
  getCostLineItems,
  getRecruitmentSteps,
  getFaqs,
  getRecruitmentSettings,
} from "@/lib/db";
import { submitLeadAction } from "@/app/actions/leads";

export default async function RecruitmentPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const [events, costSummary, costItems, steps, faqs, settings] = await Promise.all([
    getRushEvents(),
    getCostSummary(),
    getCostLineItems(),
    getRecruitmentSteps(),
    getFaqs(),
    getRecruitmentSettings(),
  ]);
  const monthlyCosts = costItems.filter((i) => i.section === "chapter-monthly");
  const { sent } = await searchParams;

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
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-lg border border-dtd-purple/10 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dtd-gold text-lg font-bold text-dtd-purple-dark">
                {i + 1}
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
            RSVP below so we know to expect you.
          </p>
          <div className="mt-6 divide-y divide-dtd-purple/10 overflow-hidden rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
            {events.map((event, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-dtd-purple">{event.name}</p>
                  <p className="text-sm text-foreground/70">
                    {event.date} &middot; {event.location}
                  </p>
                </div>
                <form
                  key={sent ?? "form"}
                  action={submitLeadAction}
                  className="flex flex-wrap items-center gap-2 sm:justify-end"
                >
                  <input type="hidden" name="source" value="rsvp" />
                  <input type="hidden" name="detail" value={`${event.name} — ${event.date}`} />
                  <input type="hidden" name="redirectTo" value="/recruitment" />
                  <BotTrap />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-28 rounded-md border border-dtd-purple/30 bg-white px-3 py-2 text-sm focus:border-dtd-purple focus:outline-none sm:w-32"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-36 rounded-md border border-dtd-purple/30 bg-white px-3 py-2 text-sm focus:border-dtd-purple focus:outline-none sm:w-44"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-dtd-gold px-5 py-2 text-xs font-bold uppercase tracking-wide text-dtd-purple-dark transition hover:bg-dtd-gold-light"
                  >
                    RSVP
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Costs */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-dtd-purple">Costs &amp; Transparency</h2>
            <p className="mt-3 text-foreground/80">
              We believe in being upfront about cost. Chapter dues cover housing, meals,
              national/international fraternity fees, and chapter programming. We offer
              payment plans and can talk through financial aid, scholarships, and work-study
              options on a case-by-case basis.
            </p>
            <div className="mt-5 divide-y divide-dtd-purple/10 rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
              {monthlyCosts.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <span className="text-foreground/80">
                    {item.label}
                    {item.note && <span className="ml-1 text-xs text-foreground/50">({item.note})</span>}
                  </span>
                  <span className="font-medium text-dtd-purple">{item.amount}</span>
                </div>
              ))}
              <div className="flex items-center justify-between bg-dtd-cream px-4 py-2.5">
                <span className="font-bold text-dtd-purple">Total</span>
                <span className="font-display font-bold text-dtd-purple">
                  {costSummary.monthlyTotal}
                </span>
              </div>
            </div>
            <Link
              href="/recruitment/cost"
              className="mt-4 inline-block text-sm font-bold text-dtd-purple underline underline-offset-2 hover:text-dtd-purple-dark"
            >
              See the full cost breakdown &amp; Missouri S&amp;T housing comparison →
            </Link>
          </div>
          <SiteImage
            src={settings.newMemberImageUrl}
            alt="Delta Tau Delta brothers at a chapter event"
            aspect="aspect-[4/3]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-dtd-purple/10 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-dtd-purple">{faq.question}</summary>
                <p className="mt-2 text-sm text-foreground/80">
                  <RichText text={faq.answer} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Interest form */}
      <section id="interest-form" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-dtd-purple">Get in Touch</h2>
        <p className="mt-2 text-center text-foreground/80">
          Interested in learning more? Send us your info and our Recruitment Chair will reach out.
        </p>
        <div id="lead-status" className="mt-8 scroll-mt-24">
          <LeadFormStatus sent={sent} />
        </div>
        <form key={sent ?? "form"} action={submitLeadAction} className="grid gap-4">
          <input type="hidden" name="source" value="recruitment" />
          <input type="hidden" name="redirectTo" value="/recruitment" />
          <BotTrap />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="rounded-md border border-dtd-purple/30 bg-white px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="rounded-md border border-dtd-purple/30 bg-white px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              className="rounded-md border border-dtd-purple/30 bg-white px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
            <input
              type="text"
              name="detail"
              placeholder="Major / Graduation Year"
              className="rounded-md border border-dtd-purple/30 bg-white px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </div>
          <textarea
            name="message"
            placeholder="Anything you'd like us to know?"
            rows={4}
            className="rounded-md border border-dtd-purple/30 bg-white px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
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

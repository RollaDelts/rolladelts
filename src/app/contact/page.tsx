import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadFormStatus from "@/components/LeadFormStatus";
import BotTrap from "@/components/BotTrap";
import { submitLeadAction } from "@/app/actions/leads";
import { getSiteSettings } from "@/lib/db";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Delta Tau Delta's Epsilon Nu Chapter at Missouri S&T — chapter house address, phone, email, and social media.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const [settings, { sent }] = await Promise.all([getSiteSettings(), searchParams]);

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
            <li>{settings.address}</li>
            <li>Phone: {settings.phone}</li>
            <li>Email: {settings.email}</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-dtd-purple">Follow Us</h2>
          <ul className="mt-3 space-y-2 text-foreground/80">
            <li>
              Facebook:{" "}
              <a href={settings.facebookUrl} className="font-semibold text-dtd-purple underline" target="_blank" rel="noopener noreferrer">
                {settings.facebookUrl.replace(/^https?:\/\/(www\.)?facebook\.com\//, "")}
              </a>
            </li>
            <li>
              Instagram:{" "}
              {settings.instagramUrl ? (
                <a href={settings.instagramUrl} className="font-semibold text-dtd-purple underline" target="_blank" rel="noopener noreferrer">
                  {settings.instagramHandle}
                </a>
              ) : (
                settings.instagramHandle
              )}
            </li>
            <li>
              X (Twitter):{" "}
              {settings.xUrl ? (
                <a href={settings.xUrl} className="font-semibold text-dtd-purple underline" target="_blank" rel="noopener noreferrer">
                  {settings.xHandle}
                </a>
              ) : (
                settings.xHandle
              )}
            </li>
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

        <div className="aspect-square w-full overflow-hidden rounded-lg border border-dtd-purple/10 shadow-sm">
          <iframe
            title="Delta Tau Delta — Epsilon Nu Chapter House Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9673.29556439492!2d-91.77849574616168!3d37.966956366854696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87dbab4982a9e40b%3A0x821543f465c52353!2sDelta%20Tau%20Delta!5e0!3m2!1sen!2sus!4v1787156921821!5m2!1sen!2sus"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
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
            <input
              type="text"
              name="detail"
              placeholder="Subject"
              className="rounded-md border border-dtd-purple/30 bg-white px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="rounded-md border border-dtd-purple/30 bg-white px-4 py-3 text-sm focus:border-dtd-purple focus:outline-none"
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

import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getSiteSettings } from "@/lib/db";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Delta Tau Delta's Epsilon Nu Chapter collects, uses, and protects information submitted through this website.",
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHero
        title="Privacy Policy"
        subtitle="How we handle information submitted through this website."
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-foreground/60">Last updated: August 2026</p>

        <p className="mt-6 text-foreground/80">
          Delta Tau Delta&apos;s Epsilon Nu Chapter (&ldquo;we,&rdquo; &ldquo;us&rdquo;) operates
          this website to share information about our chapter and to connect with prospective
          members, alumni, parents, and the Rolla community. This page explains what information
          we collect through the site and how we use it.
        </p>

        <h2 className="mt-10 text-xl font-bold text-dtd-purple">Information We Collect</h2>
        <p className="mt-3 text-foreground/80">
          When you fill out a form on this site — the recruitment interest form, the contact
          form, a rush event RSVP, or the homepage quick-contact form — we collect the
          information you provide: your name, email address, and optionally your phone number
          and any message or details you include. If you register for a member or admin account,
          we also collect your first and last name.
        </p>
        <p className="mt-3 text-foreground/80">
          We don&apos;t use tracking cookies or sell, rent, or share this information with third
          parties for their own marketing purposes.
        </p>

        <h2 className="mt-10 text-xl font-bold text-dtd-purple">How We Use It</h2>
        <p className="mt-3 text-foreground/80">
          We use the information you submit to respond to your inquiry, follow up on recruitment
          interest, keep track of RSVPs for chapter events, and — if you create an account — to
          manage member and admin access to the site.
        </p>

        <h2 className="mt-10 text-xl font-bold text-dtd-purple">Services We Use</h2>
        <p className="mt-3 text-foreground/80">This site relies on a few third-party services to run:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-foreground/80">
          <li>
            <strong className="text-dtd-purple">Supabase</strong> hosts our database, file
            storage, and member/admin accounts.
          </li>
          <li>
            <strong className="text-dtd-purple">Resend</strong> sends an email to chapter
            officers when a new form is submitted, so nothing gets missed.
          </li>
          <li>
            <strong className="text-dtd-purple">Vercel Analytics</strong>{" "}
            gives us privacy-focused, cookieless page-view statistics — it doesn&apos;t track you
            individually or across other sites.
          </li>
        </ul>
        <p className="mt-3 text-foreground/80">
          Each of these services processes data on our behalf and doesn&apos;t use it for their
          own purposes.
        </p>

        <h2 className="mt-10 text-xl font-bold text-dtd-purple">Cookies</h2>
        <p className="mt-3 text-foreground/80">
          The only cookie this site sets is a login session cookie, used exclusively to keep
          member and admin accounts signed in. It&apos;s not used for tracking or advertising.
        </p>

        <h2 className="mt-10 text-xl font-bold text-dtd-purple">Data Retention &amp; Your Choices</h2>
        <p className="mt-3 text-foreground/80">
          We keep submitted information as long as it&apos;s useful for recruitment or chapter
          purposes. If you&apos;d like us to delete information you&apos;ve submitted or update
          what we have on file, just reach out using the contact info below and we&apos;ll take
          care of it.
        </p>

        <h2 className="mt-10 text-xl font-bold text-dtd-purple">Changes to This Policy</h2>
        <p className="mt-3 text-foreground/80">
          If how we handle information changes meaningfully, we&apos;ll update this page.
        </p>

        <h2 className="mt-10 text-xl font-bold text-dtd-purple">Contact Us</h2>
        <p className="mt-3 text-foreground/80">
          Questions about this policy or your information? Reach out at{" "}
          <a href={`mailto:${settings.email}`} className="font-semibold text-dtd-purple underline">
            {settings.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}

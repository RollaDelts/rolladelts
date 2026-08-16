import { Resend } from "resend";
import { getSiteSettings } from "@/lib/db";

const sourceLabels: Record<string, string> = {
  recruitment: "Recruitment Interest",
  contact: "Contact Form",
  homepage: "Homepage",
  rsvp: "Rush RSVP",
};

/**
 * Emails the chapter's configured notification address when a new lead or
 * RSVP comes in, so submissions don't require checking the admin dashboard.
 * No-ops silently if RESEND_API_KEY or a notification email isn't set — this
 * is a nice-to-have on top of the DB record, never a hard dependency.
 */
export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone: string;
  detail: string;
  message: string;
  source: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const settings = await getSiteSettings();
  if (!settings.notificationEmail) return;

  const resend = new Resend(apiKey);
  const label = sourceLabels[lead.source] ?? lead.source;

  await resend.emails.send({
    from: "Delta Tau Delta Website <onboarding@resend.dev>",
    to: settings.notificationEmail,
    subject: `New ${label} submission — ${lead.name}`,
    text: [
      `Source: ${label}`,
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      lead.phone && `Phone: ${lead.phone}`,
      lead.detail && `Detail: ${lead.detail}`,
      lead.message && `Message: ${lead.message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

"use server";

import { redirect } from "next/navigation";
import { saveLead } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Shared handler for every contact-capture form on the site (recruitment
 * interest form, contact form, homepage quick-contact form, rush-event
 * RSVPs). Each form includes hidden "source" and "redirectTo" inputs so
 * this can route back to the right page with a success/error flag, plus
 * the BotTrap honeypot field.
 */
export async function submitLeadAction(formData: FormData) {
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const phone = ((formData.get("phone") as string | null) ?? "").trim();
  const detail = ((formData.get("detail") as string | null) ?? "").trim();
  const message = ((formData.get("message") as string | null) ?? "").trim();
  const source = ((formData.get("source") as string | null) ?? "unknown").trim();
  const redirectTo = ((formData.get("redirectTo") as string | null) ?? "/").trim() || "/";

  // Honeypot: real visitors never see or fill this field; bots that autofill
  // every input trip it. (A fill-time check used to also gate this, but it
  // was dropping genuine fast/autofilled submissions with no visible error —
  // silent data loss is worse than the marginal spam it prevented.)
  const honeypot = ((formData.get("company") as string | null) ?? "").trim();

  if (honeypot) {
    // Pretend success so bots get no signal their submission was dropped.
    redirect(`${redirectTo}?sent=ok#lead-status`);
  }

  if (!name || !email || !EMAIL_RE.test(email)) {
    redirect(`${redirectTo}?sent=error#lead-status`);
  }

  try {
    await saveLead({ name, email, phone, detail, message, source });
  } catch {
    redirect(`${redirectTo}?sent=error#lead-status`);
  }

  try {
    await sendLeadNotification({ name, email, phone, detail, message, source });
  } catch {
    // Email is a nice-to-have on top of the saved lead — never block the user on it.
  }

  redirect(`${redirectTo}?sent=ok#lead-status`);
}

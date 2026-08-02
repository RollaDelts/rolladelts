"use server";

import { redirect } from "next/navigation";
import { saveLead } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_TIME_MS = 1500;

/**
 * Shared handler for every contact-capture form on the site (recruitment
 * interest form, contact form, homepage quick-contact form, rush-event
 * RSVPs). Each form includes hidden "source" and "redirectTo" inputs so
 * this can route back to the right page with a success/error flag, plus
 * the BotTrap honeypot/timestamp fields.
 */
export async function submitLeadAction(formData: FormData) {
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const phone = ((formData.get("phone") as string | null) ?? "").trim();
  const detail = ((formData.get("detail") as string | null) ?? "").trim();
  const message = ((formData.get("message") as string | null) ?? "").trim();
  const source = ((formData.get("source") as string | null) ?? "unknown").trim();
  const redirectTo = ((formData.get("redirectTo") as string | null) ?? "/").trim() || "/";

  // Honeypot: real visitors never see or fill this field.
  const honeypot = ((formData.get("company") as string | null) ?? "").trim();
  // Timing: submissions faster than a human could plausibly fill the form.
  const renderedAt = Number(formData.get("renderedAt") ?? 0);
  const fillTime = Date.now() - renderedAt;

  if (honeypot || !renderedAt || fillTime < MIN_FILL_TIME_MS) {
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

  redirect(`${redirectTo}?sent=ok#lead-status`);
}

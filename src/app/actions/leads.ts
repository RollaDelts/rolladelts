"use server";

import { redirect } from "next/navigation";
import { saveLead } from "@/lib/db";

/**
 * Shared handler for every contact-capture form on the site (recruitment
 * interest form, contact form, homepage quick-contact form, rush-event
 * RSVPs). Each form includes hidden "source" and "redirectTo" inputs so
 * this can route back to the right page with a success/error flag.
 */
export async function submitLeadAction(formData: FormData) {
  const name = ((formData.get("name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim();
  const detail = ((formData.get("detail") as string | null) ?? "").trim();
  const message = ((formData.get("message") as string | null) ?? "").trim();
  const source = ((formData.get("source") as string | null) ?? "unknown").trim();
  const redirectTo = ((formData.get("redirectTo") as string | null) ?? "/").trim() || "/";

  if (!name || !email) {
    redirect(`${redirectTo}?sent=error#lead-status`);
  }

  try {
    await saveLead({ name, email, detail, message, source });
  } catch {
    redirect(`${redirectTo}?sent=error#lead-status`);
  }

  redirect(`${redirectTo}?sent=ok#lead-status`);
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveSiteSettings } from "@/lib/db";
import { recordAdminEdit } from "@/lib/adminAudit";
import type { SiteSettings } from "@/data/defaults";

function field(formData: FormData, name: string): string {
  return ((formData.get(name) as string | null) ?? "").trim();
}

export async function saveSiteSettingsAction(formData: FormData) {
  const settings: SiteSettings = {
    address: field(formData, "address"),
    phone: field(formData, "phone"),
    email: field(formData, "email"),
    facebookUrl: field(formData, "facebookUrl"),
    instagramHandle: field(formData, "instagramHandle"),
    instagramUrl: field(formData, "instagramUrl"),
    xHandle: field(formData, "xHandle"),
    xUrl: field(formData, "xUrl"),
    notificationEmail: field(formData, "notificationEmail"),
  };

  await saveSiteSettings(settings);
  await recordAdminEdit("settings");

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}

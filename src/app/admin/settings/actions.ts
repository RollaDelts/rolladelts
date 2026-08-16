"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveSiteSettings } from "@/lib/db";
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
    xHandle: field(formData, "xHandle"),
    aboutHistory: field(formData, "aboutHistory"),
    hauntedMazeDates: field(formData, "hauntedMazeDates"),
    hauntedMazeRaised: field(formData, "hauntedMazeRaised"),
    heroImageUrl: field(formData, "heroImageUrl"),
    aboutHistoryImageUrl: field(formData, "aboutHistoryImageUrl"),
    aboutHouseExteriorImageUrl: field(formData, "aboutHouseExteriorImageUrl"),
    aboutCommonAreasImageUrl: field(formData, "aboutCommonAreasImageUrl"),
    recruitmentNewMemberImageUrl: field(formData, "recruitmentNewMemberImageUrl"),
    philanthropyMazeImageUrl: field(formData, "philanthropyMazeImageUrl"),
  };

  await saveSiteSettings(settings);

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/philanthropy");
  revalidatePath("/recruitment");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}

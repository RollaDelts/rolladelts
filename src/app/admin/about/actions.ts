"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveAboutSettings, saveOfficers } from "@/lib/db";
import type { AboutSettings, Officer } from "@/data/defaults";

export async function saveAboutPageAction(formData: FormData) {
  const settings: AboutSettings = {
    history: ((formData.get("history") as string | null) ?? "").trim(),
    historyImageUrl: ((formData.get("historyImageUrl") as string | null) ?? "").trim(),
    houseExteriorImageUrl: ((formData.get("houseExteriorImageUrl") as string | null) ?? "").trim(),
    commonAreasImageUrl: ((formData.get("commonAreasImageUrl") as string | null) ?? "").trim(),
    hazingPolicy: ((formData.get("hazingPolicy") as string | null) ?? "").trim(),
  };

  const roles = formData.getAll("officerRole") as string[];
  const names = formData.getAll("officerName") as string[];
  const emails = formData.getAll("officerEmail") as string[];
  const photoUrls = formData.getAll("officerPhotoUrl") as string[];
  const officers: Officer[] = roles
    .map((role, i) => ({
      role: role.trim(),
      name: (names[i] ?? "").trim(),
      email: (emails[i] ?? "").trim(),
      photoUrl: (photoUrls[i] ?? "").trim(),
    }))
    .filter((o) => o.role.length > 0);

  await saveAboutSettings(settings);
  await saveOfficers(officers);

  revalidatePath("/about");
  revalidatePath("/admin/about");
  redirect("/admin/about?saved=1");
}

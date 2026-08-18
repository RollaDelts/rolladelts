"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveRushEventsSettings, saveRushEvents } from "@/lib/db";
import { recordAdminEdit } from "@/lib/adminAudit";
import type { RushEventsSettings, RushEvent } from "@/data/defaults";

export async function saveRushEventsPageAction(formData: FormData) {
  const bannerImageUrl = ((formData.get("bannerImageUrl") as string | null) ?? "").trim();
  const bannerDisplayUntil = ((formData.get("bannerDisplayUntil") as string | null) ?? "").trim();
  const settings: RushEventsSettings = {
    // Image and date are required together — a banner with no expiration never shows.
    bannerImageUrl: bannerImageUrl && bannerDisplayUntil ? bannerImageUrl : "",
    bannerDisplayUntil: bannerImageUrl && bannerDisplayUntil ? bannerDisplayUntil : "",
  };

  const dates = formData.getAll("eventDate") as string[];
  const names = formData.getAll("eventName") as string[];
  const locations = formData.getAll("eventLocation") as string[];
  const descriptions = formData.getAll("eventDescription") as string[];
  const photos = formData.getAll("eventPhotos") as string[];
  const events: RushEvent[] = dates
    .map((date, i) => ({
      date: date.trim(),
      name: (names[i] ?? "").trim(),
      location: (locations[i] ?? "").trim(),
      description: (descriptions[i] ?? "").trim(),
      photos: (photos[i] ?? "").trim(),
    }))
    .filter((e) => e.name.length > 0);

  await saveRushEventsSettings(settings);
  await saveRushEvents(events);
  await recordAdminEdit("rush-events");

  revalidatePath("/recruitment");
  revalidatePath("/admin/rush-events");
  redirect("/admin/rush-events?saved=1");
}

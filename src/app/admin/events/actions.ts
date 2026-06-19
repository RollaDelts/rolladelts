"use server";

import { revalidatePath } from "next/cache";
import { saveRushEvents } from "@/lib/kv";
import type { RushEvent } from "@/data/defaults";

export async function saveEventsAction(formData: FormData) {
  const dates = formData.getAll("date") as string[];
  const names = formData.getAll("name") as string[];
  const locations = formData.getAll("location") as string[];

  const events: RushEvent[] = dates
    .map((date, i) => ({
      date: date.trim(),
      name: (names[i] ?? "").trim(),
      location: (locations[i] ?? "").trim(),
    }))
    .filter((e) => e.name.length > 0);

  await saveRushEvents(events);
  revalidatePath("/recruitment");
  revalidatePath("/admin/events");
}

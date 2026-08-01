"use server";

import { revalidatePath } from "next/cache";
import { saveAlumniSpotlights } from "@/lib/db";
import type { AlumniSpotlight } from "@/data/defaults";

export async function saveAlumniAction(formData: FormData) {
  const names = formData.getAll("name") as string[];
  const pledgeClasses = formData.getAll("pledgeClass") as string[];
  const years = formData.getAll("years") as string[];
  const photos = formData.getAll("photos") as string[];
  const bios = formData.getAll("bio") as string[];

  const spotlights: AlumniSpotlight[] = names
    .map((name, i) => ({
      name: name.trim(),
      pledgeClass: (pledgeClasses[i] ?? "").trim(),
      years: (years[i] ?? "").trim(),
      photos: (photos[i] ?? "").trim(),
      bio: (bios[i] ?? "").trim(),
    }))
    .filter((s) => s.name.length > 0);

  await saveAlumniSpotlights(spotlights);
  revalidatePath("/alumni");
  revalidatePath("/admin/alumni");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { savePhilanthropyPrograms, savePhilanthropySettings } from "@/lib/db";
import type { PhilanthropyProgram, PhilanthropySettings } from "@/data/defaults";

export async function savePhilanthropyPageAction(formData: FormData) {
  const settings: PhilanthropySettings = {
    hauntedMazeDates: ((formData.get("hauntedMazeDates") as string | null) ?? "").trim(),
    hauntedMazeRaised: ((formData.get("hauntedMazeRaised") as string | null) ?? "").trim(),
    mazeImageUrl: ((formData.get("mazeImageUrl") as string | null) ?? "").trim(),
  };

  const titles = formData.getAll("programTitle") as string[];
  const descriptions = formData.getAll("programDescription") as string[];
  const programs: PhilanthropyProgram[] = titles
    .map((title, i) => ({ title: title.trim(), description: (descriptions[i] ?? "").trim() }))
    .filter((p) => p.title.length > 0);

  await savePhilanthropySettings(settings);
  await savePhilanthropyPrograms(programs);

  revalidatePath("/philanthropy");
  revalidatePath("/admin/philanthropy");
  redirect("/admin/philanthropy?saved=1");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { savePhilanthropyPrograms } from "@/lib/db";
import type { PhilanthropyProgram } from "@/data/defaults";

export async function savePhilanthropyProgramsAction(formData: FormData) {
  const titles = formData.getAll("programTitle") as string[];
  const descriptions = formData.getAll("programDescription") as string[];
  const programs: PhilanthropyProgram[] = titles
    .map((title, i) => ({ title: title.trim(), description: (descriptions[i] ?? "").trim() }))
    .filter((p) => p.title.length > 0);

  await savePhilanthropyPrograms(programs);

  revalidatePath("/philanthropy");
  revalidatePath("/admin/philanthropy");
  redirect("/admin/philanthropy?saved=1");
}

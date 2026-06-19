"use server";

import { revalidatePath } from "next/cache";
import { saveOfficers } from "@/lib/db";
import type { Officer } from "@/data/defaults";

export async function saveOfficersAction(formData: FormData) {
  const roles = formData.getAll("role") as string[];
  const names = formData.getAll("name") as string[];

  const officers: Officer[] = roles
    .map((role, i) => ({ role: role.trim(), name: (names[i] ?? "").trim() }))
    .filter((o) => o.role.length > 0);

  await saveOfficers(officers);
  revalidatePath("/about");
  revalidatePath("/admin/officers");
}

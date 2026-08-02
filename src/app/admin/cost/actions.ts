"use server";

import { revalidatePath } from "next/cache";
import { saveCostSummary, saveCostLineItems } from "@/lib/db";
import type { CostSummary, CostLineItem } from "@/data/defaults";

const VALID_SECTIONS = new Set<CostLineItem["section"]>([
  "chapter-monthly",
  "chapter-fees",
  "university-housing",
  "university-meals",
]);

export async function saveCostAction(formData: FormData) {
  const summary: CostSummary = {
    academicYear: ((formData.get("academicYear") as string | null) ?? "").trim(),
    monthlyTotal: ((formData.get("monthlyTotal") as string | null) ?? "").trim(),
    firstSemesterTotal: ((formData.get("firstSemesterTotal") as string | null) ?? "").trim(),
    firstYearTotal: ((formData.get("firstYearTotal") as string | null) ?? "").trim(),
    disclaimer: ((formData.get("disclaimer") as string | null) ?? "").trim(),
  };

  const sections = formData.getAll("itemSection") as string[];
  const groupLabels = formData.getAll("itemGroupLabel") as string[];
  const labels = formData.getAll("itemLabel") as string[];
  const amounts = formData.getAll("itemAmount") as string[];
  const notes = formData.getAll("itemNote") as string[];

  const items: CostLineItem[] = labels
    .map((label, i) => {
      const section = sections[i] as CostLineItem["section"];
      return {
        section: VALID_SECTIONS.has(section) ? section : "chapter-monthly",
        groupLabel: (groupLabels[i] ?? "").trim(),
        label: label.trim(),
        amount: (amounts[i] ?? "").trim(),
        note: (notes[i] ?? "").trim(),
      };
    })
    .filter((item) => item.label.length > 0);

  await saveCostSummary(summary);
  await saveCostLineItems(items);

  revalidatePath("/recruitment");
  revalidatePath("/recruitment/cost");
  revalidatePath("/admin/cost");
}

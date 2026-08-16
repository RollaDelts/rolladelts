"use server";

import { revalidatePath } from "next/cache";
import { updateLeadStatus, deleteLead } from "@/lib/db";
import type { LeadStatus } from "@/lib/db";

export async function updateLeadStatusAction(id: number, status: LeadStatus) {
  await updateLeadStatus(id, status);
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(id: number) {
  await deleteLead(id);
  revalidatePath("/admin/leads");
}

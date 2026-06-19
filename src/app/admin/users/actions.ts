"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase";

export async function setUserRole(userId: string, role: "pending" | "member" | "admin") {
  await getServerClient()
    .from("profiles")
    .update({ role })
    .eq("id", userId);
  revalidatePath("/admin/users");
}

export async function removeUser(userId: string) {
  // Deleting from profiles cascades to auth.users via the FK,
  // but we also call the Admin API to fully remove the auth record.
  const supabase = getServerClient();
  await supabase.from("profiles").delete().eq("id", userId);
  // The auth.admin API requires the service role key — already in use here.
  await supabase.auth.admin.deleteUser(userId);
  revalidatePath("/admin/users");
}

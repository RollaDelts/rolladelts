"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase-server";

export async function signOutAction() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/");
}

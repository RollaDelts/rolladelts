import { createAuthClient } from "@/lib/supabase-server";
import { getServerClient, supabaseAvailable } from "@/lib/supabase";

async function getCurrentAdminName(): Promise<string> {
  try {
    const authClient = await createAuthClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();
    if (!user) return "Unknown";

    const { data: profile } = await getServerClient()
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("id", user.id)
      .single();

    const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
    return fullName || profile?.email || user.email || "Unknown";
  } catch {
    return "Unknown";
  }
}

/**
 * Lightweight audit trail — not a full version history, just "who last
 * saved this admin page, and when." Call from a save action after the
 * real save succeeds. Never throws: a logging failure should never block
 * or fail the actual save.
 */
export async function recordAdminEdit(page: string): Promise<void> {
  if (!supabaseAvailable()) return;
  try {
    const editedBy = await getCurrentAdminName();
    await getServerClient().from("admin_audit_log").insert({ page, edited_by: editedBy });
  } catch {
    // Swallow — logging is a nice-to-have, not a dependency of the save.
  }
}

export async function getLastAdminEdit(page: string): Promise<{ editedBy: string; editedAt: string } | null> {
  if (!supabaseAvailable()) return null;
  const { data, error } = await getServerClient()
    .from("admin_audit_log")
    .select("edited_by, edited_at")
    .eq("page", page)
    .order("edited_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return { editedBy: data.edited_by, editedAt: data.edited_at };
}

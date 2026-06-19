export const dynamic = "force-dynamic";

import { getServerClient } from "@/lib/supabase";
import { setUserRole, removeUser } from "./actions";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
};

const roleLabel: Record<string, string> = {
  pending: "Pending",
  member: "Member",
  admin: "Admin",
};

const roleBadge: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  member: "bg-green-100 text-green-800",
  admin: "bg-dtd-purple/10 text-dtd-purple font-semibold",
};

export default async function UsersAdminPage() {
  const { data: profiles } = await getServerClient()
    .from("profiles")
    .select("id, first_name, last_name, email, role, created_at")
    .order("created_at", { ascending: false });

  const pending = (profiles ?? []).filter((p: Profile) => p.role === "pending");
  const rest = (profiles ?? []).filter((p: Profile) => p.role !== "pending");

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Users</h1>
      <p className="mt-1 text-foreground/70">
        Approve pending registrations, manage roles, or remove users.
      </p>

      {pending.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-yellow-700">
            Pending Approval ({pending.length})
          </h2>
          <UserTable profiles={pending} highlight />
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-dtd-purple">
          All Users ({(profiles ?? []).length})
        </h2>
        <UserTable profiles={rest} />
      </div>
    </div>
  );
}

function UserTable({
  profiles,
  highlight = false,
}: {
  profiles: Profile[];
  highlight?: boolean;
}) {
  if (profiles.length === 0) {
    return <p className="text-sm text-foreground/50">None.</p>;
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-sm ${highlight ? "border-yellow-300 bg-yellow-50" : "border-dtd-purple/10 bg-white"}`}
    >
      <table className="w-full text-sm">
        <thead className="bg-dtd-purple text-dtd-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Registered</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p: Profile, i: number) => (
            <tr key={p.id} className={i % 2 === 0 ? "bg-white/80" : "bg-dtd-cream/40"}>
              <td className="px-4 py-3 font-medium">
                {p.first_name} {p.last_name}
              </td>
              <td className="px-4 py-3 text-foreground/70">{p.email}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${roleBadge[p.role] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {roleLabel[p.role] ?? p.role}
                </span>
              </td>
              <td className="px-4 py-3 text-foreground/60">
                {new Date(p.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {p.role !== "member" && (
                    <form action={setUserRole.bind(null, p.id, "member")}>
                      <button
                        type="submit"
                        className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white hover:bg-green-700"
                      >
                        Approve
                      </button>
                    </form>
                  )}
                  {p.role !== "admin" && (
                    <form action={setUserRole.bind(null, p.id, "admin")}>
                      <button
                        type="submit"
                        className="rounded bg-dtd-purple px-2 py-1 text-xs font-semibold text-white hover:bg-dtd-purple-dark"
                      >
                        Make Admin
                      </button>
                    </form>
                  )}
                  {p.role !== "pending" && (
                    <form action={setUserRole.bind(null, p.id, "pending")}>
                      <button
                        type="submit"
                        className="rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-white hover:bg-yellow-600"
                      >
                        Revoke
                      </button>
                    </form>
                  )}
                  <form action={removeUser.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

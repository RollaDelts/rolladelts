export const dynamic = "force-dynamic";

import { getOfficers } from "@/lib/kv";
import { saveOfficersAction } from "./actions";

export default async function OfficersAdminPage() {
  const officers = await getOfficers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Chapter Leadership</h1>
      <p className="mt-1 text-foreground/70">
        Edit officer names below and click Save. Changes appear on the About page immediately.
      </p>

      <form action={saveOfficersAction} className="mt-8">
        <div className="overflow-hidden rounded-xl border border-dtd-purple/10 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-dtd-purple text-dtd-white">
              <tr>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {officers.map((officer, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-dtd-cream"}>
                  <td className="px-4 py-2">
                    <input
                      name="role"
                      defaultValue={officer.role}
                      className="w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      name="name"
                      defaultValue={officer.name}
                      placeholder="Name"
                      className="w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button
            type="submit"
            className="rounded-full bg-dtd-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
          >
            Save Changes
          </button>
          <p className="text-xs text-foreground/50">
            Changes are saved to the live site immediately.
          </p>
        </div>
      </form>

      <p className="mt-8 text-xs text-foreground/50">
        To add a new officer row, duplicate an existing row&apos;s inputs. A full add/remove
        UI is coming in a future update.
      </p>
    </div>
  );
}

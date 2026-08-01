export const dynamic = "force-dynamic";

import { getAlumniSpotlights } from "@/lib/db";
import { saveAlumniAction } from "./actions";

export default async function AlumniAdminPage() {
  const spotlights = await getAlumniSpotlights();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Alumni Spotlights</h1>
      <p className="mt-1 text-foreground/80">
        Edit alumni profiles below and click Save. Changes appear on the Alumni page
        immediately.
      </p>

      <form action={saveAlumniAction} className="mt-8 grid gap-4">
        {spotlights.map((alum, i) => (
          <div
            key={i}
            className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                name="name"
                defaultValue={alum.name}
                placeholder="Name"
                className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
              />
              <input
                name="pledgeClass"
                defaultValue={alum.pledgeClass}
                placeholder="Pledge class / badge #"
                className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
              />
              <input
                name="years"
                defaultValue={alum.years}
                placeholder="Years"
                className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
              />
            </div>
            <textarea
              name="summary"
              defaultValue={alum.summary}
              placeholder="Spotlight summary"
              rows={3}
              className="mt-3 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </div>
        ))}

        <div className="mt-2 flex items-center gap-4">
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
        To add or remove alumni, a full editor with add/remove rows is coming in a future
        update.
      </p>
    </div>
  );
}

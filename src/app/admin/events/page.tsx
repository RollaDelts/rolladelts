export const dynamic = "force-dynamic";

import { getRushEvents } from "@/lib/db";
import { saveEventsAction } from "./actions";

export default async function EventsAdminPage() {
  const events = await getRushEvents();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Rush Events</h1>
      <p className="mt-1 text-foreground/70">
        Edit upcoming recruitment events below and click Save. Changes appear on the
        Recruitment page immediately.
      </p>

      <form action={saveEventsAction} className="mt-8">
        <div className="overflow-hidden rounded-xl border border-dtd-purple/10 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-dtd-purple text-dtd-white">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Event Name</th>
                <th className="px-4 py-3 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-dtd-cream"}>
                  <td className="px-4 py-2">
                    <input
                      name="date"
                      defaultValue={event.date}
                      placeholder="e.g. Aug 25"
                      className="w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      name="name"
                      defaultValue={event.name}
                      placeholder="Event name"
                      className="w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      name="location"
                      defaultValue={event.location}
                      placeholder="Location"
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
        To add or remove events, a full editor with add/remove rows is coming in a future
        update.
      </p>
    </div>
  );
}

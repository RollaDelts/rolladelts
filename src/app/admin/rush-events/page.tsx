export const dynamic = "force-dynamic";

import { getRushEventsSettings, getRushEvents } from "@/lib/db";
import { getLastAdminEdit } from "@/lib/adminAudit";
import LastEditedBy from "@/components/admin/LastEditedBy";
import RushEventsEditor from "./RushEventsEditor";

export default async function RushEventsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, events, lastEdit] = await Promise.all([
    getRushEventsSettings(),
    getRushEvents(),
    getLastAdminEdit("rush-events"),
  ]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Rush Events</h1>
      <p className="mt-1 text-foreground/80">
        Upcoming recruitment events shown on the Recruitment page, plus an optional banner photo
        for weeks with several events.
      </p>
      <LastEditedBy info={lastEdit} />

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <RushEventsEditor key={saved ?? "initial"} initialSettings={settings} initialEvents={events} />
    </div>
  );
}

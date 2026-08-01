export const dynamic = "force-dynamic";

import { getRushEvents } from "@/lib/db";
import EventsEditor from "./EventsEditor";

export default async function EventsAdminPage() {
  const events = await getRushEvents();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Rush Events</h1>
      <p className="mt-1 text-foreground/80">
        Edit upcoming recruitment events below, add or remove rows, then click Save. Changes
        appear on the Recruitment page immediately.
      </p>

      <EventsEditor initialEvents={events} />
    </div>
  );
}

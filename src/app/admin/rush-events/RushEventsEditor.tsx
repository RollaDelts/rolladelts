"use client";

import { useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import ImageUploader from "@/components/admin/ImageUploader";
import { saveRushEventsPageAction } from "./actions";
import type { RushEventsSettings, RushEvent } from "@/data/defaults";

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

const inputClass =
  "w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none";

type EventEntry = RushEvent & { id: string };

export default function RushEventsEditor({
  initialSettings,
  initialEvents,
}: {
  initialSettings: RushEventsSettings;
  initialEvents: RushEvent[];
}) {
  const [events, setEvents] = useState<EventEntry[]>(() => initialEvents.map((e) => ({ ...e, id: makeId() })));

  return (
    <form action={saveRushEventsPageAction} className="mt-8 grid gap-10">
      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Events Banner</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Shown to the left of the events list below — handy for weeks with several events.
          Requires both an image and a &ldquo;display until&rdquo; date; the banner disappears
          automatically once that date passes (the image stays saved, so you can just update the
          date to reuse it later).
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="max-w-xs">
            <ImageUploader name="bannerImageUrl" defaultValue={initialSettings.bannerImageUrl} aspect="aspect-[3/4]" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground/70">Display Until</label>
            <input
              type="date"
              name="bannerDisplayUntil"
              defaultValue={initialSettings.bannerDisplayUntil}
              className={`${inputClass} mt-1 max-w-xs`}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-dtd-purple">Upcoming Events</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Description and photos are optional — when set, visitors can click the event on the
          Recruitment page to see them in a sidebar. Photos: one URL per line, optionally{" "}
          <code className="rounded bg-dtd-cream px-1">url|caption</code>.
        </p>
        <div className="mt-4 grid gap-3">
          {events.map((event, i) => (
            <div key={event.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <div className="grid gap-2 sm:grid-cols-3">
                <input name="eventDate" defaultValue={event.date} placeholder="Date (e.g. Aug 25)" className={inputClass} />
                <input
                  name="eventName"
                  defaultValue={event.name}
                  placeholder="Event name"
                  className={`${inputClass} sm:col-span-2`}
                />
              </div>
              <input
                name="eventLocation"
                defaultValue={event.location}
                placeholder="Location"
                className={`${inputClass} mt-2`}
              />
              <textarea
                name="eventDescription"
                defaultValue={event.description}
                placeholder="Additional info (optional)"
                rows={2}
                className={`${inputClass} mt-2`}
              />
              <textarea
                name="eventPhotos"
                defaultValue={event.photos}
                placeholder="Photo URLs, one per line (optional)"
                rows={2}
                className={`${inputClass} mt-2`}
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <ReorderButtons
                  onMoveUp={() => setEvents((prev) => moveItem(prev, i, -1))}
                  onMoveDown={() => setEvents((prev) => moveItem(prev, i, 1))}
                  disableUp={i === 0}
                  disableDown={i === events.length - 1}
                />
                <button
                  type="button"
                  onClick={() => setEvents((prev) => prev.filter((e) => e.id !== event.id))}
                  className="rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                  aria-label={`Remove ${event.name || `row ${i + 1}`}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setEvents((prev) => [
              ...prev,
              { date: "", name: "", location: "", description: "", photos: "", id: makeId() },
            ])
          }
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Event
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-dtd-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
        >
          Save Changes
        </button>
        <p className="text-xs text-foreground/50">Changes are saved to the live site immediately.</p>
      </div>
    </form>
  );
}

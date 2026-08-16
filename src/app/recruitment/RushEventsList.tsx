"use client";

import { useState } from "react";
import Image from "next/image";
import Drawer from "@/components/Drawer";
import BotTrap from "@/components/BotTrap";
import { submitLeadAction } from "@/app/actions/leads";
import { parsePhotoList } from "@/lib/photos";
import type { RushEvent } from "@/data/defaults";

export default function RushEventsList({ events, sent }: { events: RushEvent[]; sent?: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const activeEvent = selected !== null ? events[selected] : null;

  return (
    <>
      <div className="divide-y divide-dtd-purple/10 overflow-hidden rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
        {events.map((event, i) => {
          const hasDetails = Boolean(event.description.trim() || event.photos.trim());
          return (
            <div key={i} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              {hasDetails ? (
                <button type="button" onClick={() => setSelected(i)} className="text-left">
                  <p className="font-bold text-dtd-purple underline decoration-dotted underline-offset-4">
                    {event.name}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {event.date} &middot; {event.location}
                  </p>
                </button>
              ) : (
                <div>
                  <p className="font-bold text-dtd-purple">{event.name}</p>
                  <p className="text-sm text-foreground/70">
                    {event.date} &middot; {event.location}
                  </p>
                </div>
              )}
              <form
                key={sent ?? "form"}
                action={submitLeadAction}
                className="flex flex-wrap items-center gap-2 sm:justify-end"
              >
                <input type="hidden" name="source" value="rsvp" />
                <input type="hidden" name="detail" value={`${event.name} — ${event.date}`} />
                <input type="hidden" name="redirectTo" value="/recruitment" />
                <BotTrap />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-28 rounded-md border border-dtd-purple/30 bg-white px-3 py-2 text-sm focus:border-dtd-purple focus:outline-none sm:w-32"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-36 rounded-md border border-dtd-purple/30 bg-white px-3 py-2 text-sm focus:border-dtd-purple focus:outline-none sm:w-44"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  className="w-32 rounded-md border border-dtd-purple/30 bg-white px-3 py-2 text-sm focus:border-dtd-purple focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-dtd-gold px-5 py-2 text-xs font-bold uppercase tracking-wide text-dtd-purple-dark transition hover:bg-dtd-gold-light"
                >
                  RSVP
                </button>
              </form>
            </div>
          );
        })}
      </div>

      <Drawer open={activeEvent !== null} onClose={() => setSelected(null)}>
        {activeEvent && (
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-dtd-purple">{activeEvent.name}</h3>
            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-dtd-gold-dark">
              {activeEvent.date} &middot; {activeEvent.location}
            </p>
            {activeEvent.description && (
              <p className="mt-4 whitespace-pre-line text-sm text-foreground/80">{activeEvent.description}</p>
            )}
            {parsePhotoList(activeEvent.photos).length > 0 && (
              <div className="mt-6 grid gap-4">
                {parsePhotoList(activeEvent.photos).map((photo, i) => (
                  <figure key={i}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-dtd-purple/10 bg-dtd-cream">
                      <Image
                        src={photo.src}
                        alt={photo.caption ?? activeEvent.name}
                        fill
                        sizes="500px"
                        className="object-cover"
                      />
                    </div>
                    {photo.caption && (
                      <figcaption className="mt-1 text-xs text-foreground/60">{photo.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}
      </Drawer>
    </>
  );
}

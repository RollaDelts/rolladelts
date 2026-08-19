"use client";

import { useState } from "react";
import Image from "next/image";
import Drawer from "@/components/Drawer";
import { parsePhotoList } from "@/lib/photos";
import type { StoryRow } from "@/lib/db";

const PAGE_SIZE = 9;

function parseParagraphs(body: string): string[] {
  return body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, { dateStyle: "long" });
}

export default function StoriesGrid({ stories }: { stories: StoryRow[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<number | null>(null);
  const activeStory = selected !== null ? stories[selected] : null;
  const activePhotos = activeStory ? parsePhotoList(activeStory.photos) : [];

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.slice(0, visible).map((story, i) => {
          const photos = parsePhotoList(story.photos);
          return (
            <button
              key={story.id}
              type="button"
              onClick={() => setSelected(i)}
              className="rounded-lg border border-dtd-purple/10 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-dtd-cream">
                {photos[0] ? (
                  <Image
                    src={photos[0].src}
                    alt={photos[0].caption ?? story.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold uppercase text-dtd-purple/40">
                    No Photo
                  </div>
                )}
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-dtd-gold-dark">
                {formatDate(story.publishedDate)}
              </p>
              <h2 className="mt-1 font-display text-lg font-bold text-dtd-purple">{story.title}</h2>
            </button>
          );
        })}
      </div>

      {visible < stories.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border-2 border-dtd-purple px-8 py-2.5 text-sm font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
          >
            Load More
          </button>
        </div>
      )}

      <Drawer open={activeStory !== null} onClose={() => setSelected(null)}>
        {activeStory && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-dtd-gold-dark">
              {formatDate(activeStory.publishedDate)}
              {activeStory.author && ` · ${activeStory.author}`}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-dtd-purple">{activeStory.title}</h2>
            {activePhotos.length > 0 && (
              <div className="mt-4 grid gap-3">
                {activePhotos.map((photo, i) => (
                  <figure key={i}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-dtd-purple/10 bg-dtd-cream">
                      <Image src={photo.src} alt={photo.caption ?? activeStory.title} fill sizes="500px" className="object-cover" />
                    </div>
                    {photo.caption && <figcaption className="mt-1 text-xs text-foreground/60">{photo.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
            <div className="mt-4 space-y-4 text-sm text-foreground/80">
              {parseParagraphs(activeStory.body).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}

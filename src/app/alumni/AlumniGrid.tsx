"use client";

import { useState } from "react";
import Image from "next/image";
import Drawer from "@/components/Drawer";
import { parsePhotoList } from "@/lib/photos";
import type { AlumniSpotlight } from "@/data/defaults";

const PAGE_SIZE = 9;

function parseBio(bio: string): string[] {
  return bio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default function AlumniGrid({ spotlights }: { spotlights: AlumniSpotlight[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<number | null>(null);
  const activeAlum = selected !== null ? spotlights[selected] : null;
  const activePhotos = activeAlum ? parsePhotoList(activeAlum.photos) : [];

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spotlights.slice(0, visible).map((alum, i) => {
          const photos = parsePhotoList(alum.photos);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className="rounded-lg border border-dtd-purple/10 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-dtd-cream">
                {photos[0] ? (
                  <Image
                    src={photos[0].src}
                    alt={photos[0].caption ?? alum.name}
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
              <h2 className="mt-3 font-display text-lg font-bold uppercase text-dtd-purple">{alum.name}</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-dtd-gold-dark">
                {alum.pledgeClass} &middot; {alum.years}
              </p>
            </button>
          );
        })}
      </div>

      {visible < spotlights.length && (
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

      <Drawer open={activeAlum !== null} onClose={() => setSelected(null)}>
        {activeAlum && (
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-dtd-purple">{activeAlum.name}</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-dtd-gold-dark">
              {activeAlum.pledgeClass} &middot; {activeAlum.years}
            </p>

            {activePhotos.length > 0 && (
              <div className="mt-4 grid gap-3">
                {activePhotos.map((photo, i) => (
                  <figure key={i}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-dtd-purple/10 bg-dtd-cream">
                      <Image
                        src={photo.src}
                        alt={photo.caption ?? activeAlum.name}
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

            <div className="mt-4 space-y-4 text-sm text-foreground/80">
              {parseBio(activeAlum.bio).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}

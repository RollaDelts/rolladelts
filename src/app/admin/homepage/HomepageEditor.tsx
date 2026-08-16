"use client";

import { useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import ImageUploader from "@/components/admin/ImageUploader";
import { saveHomepageAction } from "./actions";
import type { SiteStat, HomePillar, GalleryPhoto } from "@/data/defaults";

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

const inputClass =
  "w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none";

type StatEntry = SiteStat & { id: string };
type PillarEntry = HomePillar & { id: string };
type GalleryEntry = GalleryPhoto & { id: string };

export default function HomepageEditor({
  initialStats,
  initialPillars,
  initialGallery,
}: {
  initialStats: SiteStat[];
  initialPillars: HomePillar[];
  initialGallery: GalleryPhoto[];
}) {
  const [stats, setStats] = useState<StatEntry[]>(() => initialStats.map((s) => ({ ...s, id: makeId() })));
  const [pillars, setPillars] = useState<PillarEntry[]>(() => initialPillars.map((p) => ({ ...p, id: makeId() })));
  const [gallery, setGallery] = useState<GalleryEntry[]>(() => initialGallery.map((g) => ({ ...g, id: makeId() })));

  return (
    <form action={saveHomepageAction} className="mt-8 grid gap-10">
      {/* ── Stats bar ── */}
      <div>
        <h2 className="font-bold text-dtd-purple">Stats Bar</h2>
        <p className="mt-1 text-sm text-foreground/70">The four numbers shown just below the hero.</p>
        <div className="mt-4 grid gap-3">
          {stats.map((stat, i) => (
            <div key={stat.id} className="flex items-center gap-3 rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <input name="statLabel" defaultValue={stat.label} placeholder="Label" className={inputClass} />
                <input name="statValue" defaultValue={stat.value} placeholder="Value" className={inputClass} />
              </div>
              <ReorderButtons
                onMoveUp={() => setStats((prev) => moveItem(prev, i, -1))}
                onMoveDown={() => setStats((prev) => moveItem(prev, i, 1))}
                disableUp={i === 0}
                disableDown={i === stats.length - 1}
              />
              <button
                type="button"
                onClick={() => setStats((prev) => prev.filter((s) => s.id !== stat.id))}
                className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setStats((prev) => [...prev, { label: "", value: "", id: makeId() }])}
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Stat
        </button>
      </div>

      {/* ── Why Join pillars ── */}
      <div>
        <h2 className="font-bold text-dtd-purple">&ldquo;Why Join&rdquo; Pillars</h2>
        <p className="mt-1 text-sm text-foreground/70">The four cards under &ldquo;More Than a Fraternity.&rdquo;</p>
        <div className="mt-4 grid gap-3">
          {pillars.map((pillar, i) => (
            <div key={pillar.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <input name="pillarTitle" defaultValue={pillar.title} placeholder="Title" className={inputClass} />
                  <textarea
                    name="pillarDescription"
                    defaultValue={pillar.description}
                    placeholder="Description"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <ReorderButtons
                  onMoveUp={() => setPillars((prev) => moveItem(prev, i, -1))}
                  onMoveDown={() => setPillars((prev) => moveItem(prev, i, 1))}
                  disableUp={i === 0}
                  disableDown={i === pillars.length - 1}
                />
                <button
                  type="button"
                  onClick={() => setPillars((prev) => prev.filter((p) => p.id !== pillar.id))}
                  className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPillars((prev) => [...prev, { title: "", description: "", id: makeId() }])}
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Pillar
        </button>
      </div>

      {/* ── Gallery ── */}
      <div>
        <h2 className="font-bold text-dtd-purple">&ldquo;Life at the House&rdquo; Gallery</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Upload as many photos as you like; &ldquo;Fit&rdquo; controls whether a photo is cropped to
          fill its tile (Cover) or shown in full (Contain, useful for wide/panoramic shots).
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((photo, i) => (
            <div key={photo.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <ImageUploader name="galleryImageUrl" defaultValue={photo.imageUrl} aspect="aspect-video" />
              <input
                name="galleryAlt"
                defaultValue={photo.alt}
                placeholder="Alt text (describe the photo)"
                className={`${inputClass} mt-2`}
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <select name="galleryFit" defaultValue={photo.fit} className={inputClass}>
                  <option value="cover">Cover (crop to fill)</option>
                  <option value="contain">Contain (show full photo)</option>
                </select>
                <ReorderButtons
                  onMoveUp={() => setGallery((prev) => moveItem(prev, i, -1))}
                  onMoveDown={() => setGallery((prev) => moveItem(prev, i, 1))}
                  disableUp={i === 0}
                  disableDown={i === gallery.length - 1}
                />
              </div>
              <button
                type="button"
                onClick={() => setGallery((prev) => prev.filter((g) => g.id !== photo.id))}
                className="mt-2 w-full rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setGallery((prev) => [...prev, { imageUrl: "", alt: "", fit: "cover", id: makeId() }])}
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Photo
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

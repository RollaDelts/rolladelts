"use client";

import { useMemo, useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import PhotosField from "@/components/admin/PhotosField";
import { saveAlumniAction } from "./actions";
import type { AlumniSpotlight } from "@/data/defaults";

type Entry = AlumniSpotlight & { id: string };

const PAGE_SIZE = 6;

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

function toEntries(spotlights: AlumniSpotlight[]): Entry[] {
  return spotlights.map((s) => ({ ...s, id: makeId() }));
}

const blank: AlumniSpotlight = { name: "", pledgeClass: "", years: "", photos: "", bio: "" };

function matchesSearch(entry: Entry, search: string): boolean {
  if (!search) return true;
  const term = search.toLowerCase();
  return (
    entry.name.toLowerCase().includes(term) ||
    entry.pledgeClass.toLowerCase().includes(term) ||
    entry.years.toLowerCase().includes(term)
  );
}

export default function AlumniEditor({ initialSpotlights }: { initialSpotlights: AlumniSpotlight[] }) {
  const [entries, setEntries] = useState<Entry[]>(() => toEntries(initialSpotlights));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Search/pagination only ever change which cards are *visible* — every
  // entry stays mounted (with its inputs) so the "save everything at once"
  // form still submits the full list, not just the current page.
  const matchingIds = useMemo(
    () => entries.filter((e) => matchesSearch(e, search)).map((e) => e.id),
    [entries, search]
  );
  const totalPages = Math.max(1, Math.ceil(matchingIds.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleIds = useMemo(
    () => new Set(matchingIds.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)),
    [matchingIds, currentPage]
  );

  function addEntry() {
    setEntries((prev) => [...prev, { ...blank, id: makeId() }]);
    setSearch("");
    setPage(Number.MAX_SAFE_INTEGER); // clamped to the real last page above, where the new entry lands
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <form action={saveAlumniAction} className="mt-8 grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name, pledge class, or years…"
          className="w-full max-w-sm rounded-md border border-dtd-purple/20 px-3 py-2 text-sm focus:border-dtd-purple focus:outline-none"
        />
        <p className="text-sm text-foreground/60">
          {matchingIds.length} of {entries.length} shown
        </p>
      </div>

      {matchingIds.length === 0 && (
        <p className="text-sm text-foreground/60">No alumni match &ldquo;{search}&rdquo;.</p>
      )}

      {entries.map((entry, i) => (
        <div
          key={entry.id}
          className={`rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm ${visibleIds.has(entry.id) ? "" : "hidden"}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-3">
              <input
                name="name"
                defaultValue={entry.name}
                placeholder="Name"
                className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
              />
              <input
                name="pledgeClass"
                defaultValue={entry.pledgeClass}
                placeholder="Pledge class / badge #"
                className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
              />
              <input
                name="years"
                defaultValue={entry.years}
                placeholder="Years"
                className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
              />
            </div>
            <ReorderButtons
              onMoveUp={() => setEntries((prev) => moveItem(prev, i, -1))}
              onMoveDown={() => setEntries((prev) => moveItem(prev, i, 1))}
              disableUp={i === 0}
              disableDown={i === entries.length - 1}
            />
            <button
              type="button"
              onClick={() => removeEntry(entry.id)}
              className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
              aria-label={`Remove ${entry.name || `alumnus ${i + 1}`}`}
            >
              Remove
            </button>
          </div>

          <PhotosField defaultValue={entry.photos} />

          <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-foreground/50">
            Bio (paragraphs separated by a blank line)
          </label>
          <textarea
            name="bio"
            defaultValue={entry.bio}
            placeholder="Full spotlight text"
            rows={6}
            className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
          />
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="font-semibold text-dtd-purple underline disabled:pointer-events-none disabled:text-foreground/30 disabled:no-underline"
          >
            ← Previous
          </button>
          <span className="text-foreground/60">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="font-semibold text-dtd-purple underline disabled:pointer-events-none disabled:text-foreground/30 disabled:no-underline"
          >
            Next →
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={addEntry}
        className="justify-self-start rounded-full border-2 border-dtd-purple px-6 py-2 text-sm font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
      >
        + Add Alumnus
      </button>

      <div className="mt-2 flex items-center gap-4">
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

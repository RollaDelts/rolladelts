"use client";

import { useState } from "react";
import { saveAlumniAction } from "./actions";
import type { AlumniSpotlight } from "@/data/defaults";

type Entry = AlumniSpotlight & { id: string };

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

function toEntries(spotlights: AlumniSpotlight[]): Entry[] {
  return spotlights.map((s) => ({ ...s, id: makeId() }));
}

const blank: AlumniSpotlight = { name: "", pledgeClass: "", years: "", photos: "", bio: "" };

export default function AlumniEditor({ initialSpotlights }: { initialSpotlights: AlumniSpotlight[] }) {
  const [entries, setEntries] = useState<Entry[]>(() => toEntries(initialSpotlights));

  function addEntry() {
    setEntries((prev) => [...prev, { ...blank, id: makeId() }]);
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <form action={saveAlumniAction} className="mt-8 grid gap-4">
      {entries.map((entry, i) => (
        <div key={entry.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
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
            <button
              type="button"
              onClick={() => removeEntry(entry.id)}
              className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
              aria-label={`Remove ${entry.name || `alumnus ${i + 1}`}`}
            >
              Remove
            </button>
          </div>

          <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-foreground/50">
            Photos (one per line: url or url|caption)
          </label>
          <textarea
            name="photos"
            defaultValue={entry.photos}
            placeholder={"/images/alumni/example.jpg|Optional caption"}
            rows={2}
            className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 font-mono text-xs focus:border-dtd-purple focus:outline-none"
          />

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

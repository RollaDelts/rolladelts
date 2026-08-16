"use client";

import { useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import ImageUploader from "@/components/admin/ImageUploader";
import { savePhilanthropyPageAction } from "./actions";
import type { PhilanthropyProgram, PhilanthropySettings } from "@/data/defaults";

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

const inputClass =
  "w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none";

type Entry = PhilanthropyProgram & { id: string };

export default function PhilanthropyEditor({
  initialSettings,
  initialPrograms,
}: {
  initialSettings: PhilanthropySettings;
  initialPrograms: PhilanthropyProgram[];
}) {
  const [programs, setPrograms] = useState<Entry[]>(() => initialPrograms.map((p) => ({ ...p, id: makeId() })));

  return (
    <form action={savePhilanthropyPageAction} className="mt-8 grid gap-10">
      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Haunted Maze</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground/70">Dates</label>
            <input
              name="hauntedMazeDates"
              defaultValue={initialSettings.hauntedMazeDates}
              placeholder="e.g. October 24-31"
              className={`${inputClass} mt-1`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground/70">Amount Raised</label>
            <input
              name="hauntedMazeRaised"
              defaultValue={initialSettings.hauntedMazeRaised}
              placeholder="e.g. $10,000+"
              className={`${inputClass} mt-1`}
            />
          </div>
        </div>
        <div className="mt-4 max-w-xs">
          <ImageUploader name="mazeImageUrl" defaultValue={initialSettings.mazeImageUrl} label="Maze Flyer" aspect="aspect-[4/3]" />
        </div>
      </div>

      <div className="grid gap-3">
        <h2 className="font-bold text-dtd-purple">Giving Back Year-Round</h2>
        <p className="text-sm text-foreground/70">Standing volunteer programs shown on the Philanthropy page.</p>
        {programs.map((program, i) => (
        <div key={program.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-2">
              <input name="programTitle" defaultValue={program.title} placeholder="Title" className={inputClass} />
              <textarea
                name="programDescription"
                defaultValue={program.description}
                placeholder="Description"
                rows={2}
                className={inputClass}
              />
            </div>
            <ReorderButtons
              onMoveUp={() => setPrograms((prev) => moveItem(prev, i, -1))}
              onMoveDown={() => setPrograms((prev) => moveItem(prev, i, 1))}
              disableUp={i === 0}
              disableDown={i === programs.length - 1}
            />
            <button
              type="button"
              onClick={() => setPrograms((prev) => prev.filter((p) => p.id !== program.id))}
              className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
        <button
          type="button"
          onClick={() => setPrograms((prev) => [...prev, { title: "", description: "", id: makeId() }])}
          className="justify-self-start rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Program
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

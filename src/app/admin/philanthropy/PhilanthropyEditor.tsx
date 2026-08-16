"use client";

import { useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import { savePhilanthropyProgramsAction } from "./actions";
import type { PhilanthropyProgram } from "@/data/defaults";

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

const inputClass =
  "w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none";

type Entry = PhilanthropyProgram & { id: string };

export default function PhilanthropyEditor({ initialPrograms }: { initialPrograms: PhilanthropyProgram[] }) {
  const [programs, setPrograms] = useState<Entry[]>(() => initialPrograms.map((p) => ({ ...p, id: makeId() })));

  return (
    <form action={savePhilanthropyProgramsAction} className="mt-8 grid gap-3">
      <p className="text-sm text-foreground/70">
        Standing volunteer programs shown under &ldquo;Giving Back Year-Round.&rdquo; (Haunted Maze
        details — dates, amount raised — are edited on the{" "}
        <a href="/admin/settings" className="font-semibold text-dtd-purple underline">
          Site Settings
        </a>{" "}
        page.)
      </p>
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

      <div className="mt-4 flex items-center gap-4">
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

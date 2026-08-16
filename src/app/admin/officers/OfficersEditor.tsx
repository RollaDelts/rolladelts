"use client";

import { useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import { saveOfficersAction } from "./actions";
import type { Officer } from "@/data/defaults";

type Entry = Officer & { id: string };

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

function toEntries(officers: Officer[]): Entry[] {
  return officers.map((o) => ({ ...o, id: makeId() }));
}

const blank: Officer = { role: "", name: "" };

export default function OfficersEditor({ initialOfficers }: { initialOfficers: Officer[] }) {
  const [entries, setEntries] = useState<Entry[]>(() => toEntries(initialOfficers));

  function addEntry() {
    setEntries((prev) => [...prev, { ...blank, id: makeId() }]);
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <form action={saveOfficersAction} className="mt-8">
      <div className="overflow-hidden rounded-xl border border-dtd-purple/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-dtd-purple text-dtd-white">
            <tr>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="w-1 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={entry.id} className={i % 2 === 0 ? "bg-white" : "bg-dtd-cream"}>
                <td className="px-4 py-2">
                  <input
                    name="role"
                    defaultValue={entry.role}
                    className="w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    name="name"
                    defaultValue={entry.name}
                    placeholder="Name"
                    className="w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                  />
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <ReorderButtons
                      onMoveUp={() => setEntries((prev) => moveItem(prev, i, -1))}
                      onMoveDown={() => setEntries((prev) => moveItem(prev, i, 1))}
                      disableUp={i === 0}
                      disableDown={i === entries.length - 1}
                    />
                    <button
                      type="button"
                      onClick={() => removeEntry(entry.id)}
                      className="rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                      aria-label={`Remove ${entry.role || `row ${i + 1}`}`}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addEntry}
        className="mt-4 rounded-full border-2 border-dtd-purple px-6 py-2 text-sm font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
      >
        + Add Officer
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

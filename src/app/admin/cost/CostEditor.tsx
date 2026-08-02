"use client";

import { useState } from "react";
import { saveCostAction } from "./actions";
import type { CostSummary, CostLineItem } from "@/data/defaults";

type Entry = CostLineItem & { id: string };

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

function toEntries(items: CostLineItem[]): Entry[] {
  return items.map((item) => ({ ...item, id: makeId() }));
}

const blank: CostLineItem = { section: "chapter-monthly", groupLabel: "", label: "", amount: "", note: "" };

const sectionLabels: Record<CostLineItem["section"], string> = {
  "chapter-monthly": "Chapter — Monthly Cost",
  "chapter-fees": "Chapter — First-Semester Fee",
  "university-housing": "Missouri S&T — Housing",
  "university-meals": "Missouri S&T — Meal Plan",
};

export default function CostEditor({
  initialSummary,
  initialItems,
}: {
  initialSummary: CostSummary;
  initialItems: CostLineItem[];
}) {
  const [entries, setEntries] = useState<Entry[]>(() => toEntries(initialItems));

  function addEntry() {
    setEntries((prev) => [...prev, { ...blank, id: makeId() }]);
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <form action={saveCostAction} className="mt-8 grid gap-10">
      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Headline Figures</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
              Academic Year
            </span>
            <input
              name="academicYear"
              defaultValue={initialSummary.academicYear}
              placeholder="2026–2027"
              className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
              Monthly Total
            </span>
            <input
              name="monthlyTotal"
              defaultValue={initialSummary.monthlyTotal}
              placeholder="$1,155/month"
              className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
              First-Semester Total
            </span>
            <input
              name="firstSemesterTotal"
              defaultValue={initialSummary.firstSemesterTotal}
              placeholder="$5,128"
              className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
              First-Year Total
            </span>
            <input
              name="firstYearTotal"
              defaultValue={initialSummary.firstYearTotal}
              placeholder="$9,905"
              className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
            />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
            Disclaimer
          </span>
          <textarea
            name="disclaimer"
            defaultValue={initialSummary.disclaimer}
            rows={2}
            className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
          />
        </label>
      </div>

      <div>
        <h2 className="font-bold text-dtd-purple">Line Items</h2>
        <p className="mt-1 text-sm text-foreground/70">
          "Group" is only used for Missouri S&T housing rows, to cluster them under a residence
          hall name (e.g. "Thomas Jefferson").
        </p>

        <div className="mt-4 grid gap-3">
          {entries.map((entry, i) => (
            <div key={entry.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-5">
                <select
                  name="itemSection"
                  defaultValue={entry.section}
                  className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                >
                  {Object.entries(sectionLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  name="itemGroupLabel"
                  defaultValue={entry.groupLabel}
                  placeholder="Group (housing only)"
                  className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                />
                <input
                  name="itemLabel"
                  defaultValue={entry.label}
                  placeholder="Label"
                  className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                />
                <input
                  name="itemAmount"
                  defaultValue={entry.amount}
                  placeholder="Amount"
                  className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                />
                <input
                  name="itemNote"
                  defaultValue={entry.note}
                  placeholder="Note (optional)"
                  className="rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                className="mt-3 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                aria-label={`Remove ${entry.label || `row ${i + 1}`}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addEntry}
          className="mt-4 rounded-full border-2 border-dtd-purple px-6 py-2 text-sm font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Line Item
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

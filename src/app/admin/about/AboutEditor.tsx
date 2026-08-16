"use client";

import { useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import ImageUploader from "@/components/admin/ImageUploader";
import { saveAboutPageAction } from "./actions";
import type { AboutSettings, Officer } from "@/data/defaults";

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

const inputClass =
  "w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none";

type OfficerEntry = Officer & { id: string };

export default function AboutEditor({
  initialSettings,
  initialOfficers,
}: {
  initialSettings: AboutSettings;
  initialOfficers: Officer[];
}) {
  const [officers, setOfficers] = useState<OfficerEntry[]>(() =>
    initialOfficers.map((o) => ({ ...o, id: makeId() }))
  );

  return (
    <form action={saveAboutPageAction} className="mt-8 grid gap-10">
      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Our History</h2>
        <textarea
          name="history"
          defaultValue={initialSettings.history}
          rows={5}
          className={`${inputClass} mt-3`}
        />
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <ImageUploader
            name="historyImageUrl"
            defaultValue={initialSettings.historyImageUrl}
            label="Chapter History Photo"
            aspect="aspect-[4/3]"
          />
          <ImageUploader
            name="houseExteriorImageUrl"
            defaultValue={initialSettings.houseExteriorImageUrl}
            label="House Exterior Photo"
            aspect="aspect-[4/3]"
          />
          <ImageUploader
            name="commonAreasImageUrl"
            defaultValue={initialSettings.commonAreasImageUrl}
            label="Common Areas Photo"
            aspect="aspect-[4/3]"
          />
        </div>
      </div>

      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Anti-Hazing Policy</h2>
        <p className="mt-1 text-sm text-foreground/70">Shown on the About page.</p>
        <textarea
          name="hazingPolicy"
          defaultValue={initialSettings.hazingPolicy}
          rows={5}
          className={`${inputClass} mt-3`}
        />
      </div>

      <div>
        <h2 className="font-bold text-dtd-purple">Chapter Leadership</h2>
        <p className="mt-1 text-sm text-foreground/70">The executive board shown on the About page.</p>
        <div className="mt-4 grid gap-3">
          {officers.map((officer, i) => (
            <div key={officer.id} className="flex items-center gap-3 rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <input name="officerRole" defaultValue={officer.role} placeholder="Role" className={inputClass} />
                <input name="officerName" defaultValue={officer.name} placeholder="Name" className={inputClass} />
              </div>
              <ReorderButtons
                onMoveUp={() => setOfficers((prev) => moveItem(prev, i, -1))}
                onMoveDown={() => setOfficers((prev) => moveItem(prev, i, 1))}
                disableUp={i === 0}
                disableDown={i === officers.length - 1}
              />
              <button
                type="button"
                onClick={() => setOfficers((prev) => prev.filter((o) => o.id !== officer.id))}
                className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOfficers((prev) => [...prev, { role: "", name: "", id: makeId() }])}
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Officer
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

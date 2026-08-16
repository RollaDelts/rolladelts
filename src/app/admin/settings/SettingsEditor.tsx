"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import { saveSiteSettingsAction } from "./actions";
import type { SiteSettings } from "@/data/defaults";

const inputClass =
  "mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none";
const labelClass = "block text-xs font-semibold uppercase tracking-wide text-foreground/50";

function Field({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input name={name} defaultValue={defaultValue} placeholder={placeholder} className={inputClass} />
    </label>
  );
}

export default function SettingsEditor({ initialSettings }: { initialSettings: SiteSettings }) {
  const s = initialSettings;

  return (
    <form action={saveSiteSettingsAction} className="mt-8 grid gap-10">
      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Contact Info</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Address" name="address" defaultValue={s.address} />
          <Field label="Phone" name="phone" defaultValue={s.phone} />
          <Field label="Email" name="email" defaultValue={s.email} />
        </div>
      </div>

      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Social Media</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Facebook URL" name="facebookUrl" defaultValue={s.facebookUrl} placeholder="https://www.facebook.com/..." />
          <Field label="Instagram Handle" name="instagramHandle" defaultValue={s.instagramHandle} placeholder="@handle" />
          <Field label="X Handle" name="xHandle" defaultValue={s.xHandle} placeholder="@handle" />
        </div>
      </div>

      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">About Page</h2>
        <label className="mt-4 block">
          <span className={labelClass}>Our History</span>
          <textarea name="aboutHistory" defaultValue={s.aboutHistory} rows={5} className={inputClass} />
        </label>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <ImageUploader name="aboutHistoryImageUrl" defaultValue={s.aboutHistoryImageUrl} label="Chapter History Photo" aspect="aspect-[4/3]" />
          <ImageUploader name="aboutHouseExteriorImageUrl" defaultValue={s.aboutHouseExteriorImageUrl} label="House Exterior Photo" aspect="aspect-[4/3]" />
          <ImageUploader name="aboutCommonAreasImageUrl" defaultValue={s.aboutCommonAreasImageUrl} label="Common Areas Photo" aspect="aspect-[4/3]" />
        </div>
      </div>

      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Philanthropy — Haunted Maze</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="This Year's Dates" name="hauntedMazeDates" defaultValue={s.hauntedMazeDates} placeholder="e.g. Oct 24, 25, 30, 31 & Nov 1" />
          <Field label="Amount Raised" name="hauntedMazeRaised" defaultValue={s.hauntedMazeRaised} placeholder="e.g. $3,200 raised in 2025" />
        </div>
        <div className="mt-4 max-w-xs">
          <ImageUploader name="philanthropyMazeImageUrl" defaultValue={s.philanthropyMazeImageUrl} label="Haunted Maze Photo/Flyer" aspect="aspect-[4/3]" />
        </div>
      </div>

      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Recruitment</h2>
        <div className="mt-4 max-w-xs">
          <ImageUploader name="recruitmentNewMemberImageUrl" defaultValue={s.recruitmentNewMemberImageUrl} label="New Member Photo" aspect="aspect-[4/3]" />
        </div>
      </div>

      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">Homepage Hero</h2>
        <div className="mt-4 max-w-xs">
          <ImageUploader name="heroImageUrl" defaultValue={s.heroImageUrl} label="Hero Photo" aspect="aspect-[4/3]" />
        </div>
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

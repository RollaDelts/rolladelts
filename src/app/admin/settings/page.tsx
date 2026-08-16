export const dynamic = "force-dynamic";

import { getSiteSettings } from "@/lib/db";
import SettingsEditor from "./SettingsEditor";

export default async function SettingsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSiteSettings();
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Site Settings</h1>
      <p className="mt-1 text-foreground/80">
        Contact info, social handles, and singleton page content that&apos;s otherwise scattered
        across multiple pages — edit once here.
      </p>

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <SettingsEditor key={saved ?? "initial"} initialSettings={settings} />
    </div>
  );
}

export const dynamic = "force-dynamic";

import { getAboutSettings, getOfficers } from "@/lib/db";
import { getLastAdminEdit } from "@/lib/adminAudit";
import LastEditedBy from "@/components/admin/LastEditedBy";
import AboutEditor from "./AboutEditor";

export default async function AboutAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, officers, lastEdit] = await Promise.all([
    getAboutSettings(),
    getOfficers(),
    getLastAdminEdit("about"),
  ]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">About Page Updates</h1>
      <p className="mt-1 text-foreground/80">
        Chapter history, house photos, and chapter leadership shown on the About page.
      </p>
      <LastEditedBy info={lastEdit} />

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <AboutEditor key={saved ?? "initial"} initialSettings={settings} initialOfficers={officers} />
    </div>
  );
}

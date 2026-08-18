export const dynamic = "force-dynamic";

import { getAlumniSpotlights } from "@/lib/db";
import { getLastAdminEdit } from "@/lib/adminAudit";
import LastEditedBy from "@/components/admin/LastEditedBy";
import AlumniEditor from "./AlumniEditor";

export default async function AlumniAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [spotlights, lastEdit] = await Promise.all([getAlumniSpotlights(), getLastAdminEdit("alumni")]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Alumni Spotlights</h1>
      <p className="mt-1 text-foreground/80">
        Edit alumni profiles below, add new ones, or remove old ones, then click Save.
        Changes appear on the Alumni page immediately.
      </p>
      <LastEditedBy info={lastEdit} />

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <AlumniEditor key={saved ?? "initial"} initialSpotlights={spotlights} />
    </div>
  );
}

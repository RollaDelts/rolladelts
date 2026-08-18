export const dynamic = "force-dynamic";

import { getAlumniSpotlights } from "@/lib/db";
import { getLastAdminEdit } from "@/lib/adminAudit";
import LastEditedBy from "@/components/admin/LastEditedBy";
import AlumniEditor from "./AlumniEditor";

export default async function AlumniAdminPage() {
  const [spotlights, lastEdit] = await Promise.all([getAlumniSpotlights(), getLastAdminEdit("alumni")]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Alumni Spotlights</h1>
      <p className="mt-1 text-foreground/80">
        Edit alumni profiles below, add new ones, or remove old ones, then click Save.
        Changes appear on the Alumni page immediately.
      </p>
      <LastEditedBy info={lastEdit} />

      <AlumniEditor initialSpotlights={spotlights} />
    </div>
  );
}

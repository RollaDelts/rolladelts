export const dynamic = "force-dynamic";

import { getOfficers } from "@/lib/db";
import OfficersEditor from "./OfficersEditor";

export default async function OfficersAdminPage() {
  const officers = await getOfficers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Chapter Leadership</h1>
      <p className="mt-1 text-foreground/80">
        Edit officer names below, add or remove rows, then click Save. Changes appear on the
        About page immediately.
      </p>

      <OfficersEditor initialOfficers={officers} />
    </div>
  );
}

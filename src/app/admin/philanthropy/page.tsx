export const dynamic = "force-dynamic";

import { getPhilanthropySettings, getPhilanthropyPrograms } from "@/lib/db";
import { getLastAdminEdit } from "@/lib/adminAudit";
import LastEditedBy from "@/components/admin/LastEditedBy";
import PhilanthropyEditor from "./PhilanthropyEditor";

export default async function PhilanthropyAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, programs, lastEdit] = await Promise.all([
    getPhilanthropySettings(),
    getPhilanthropyPrograms(),
    getLastAdminEdit("philanthropy"),
  ]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Philanthropy Page Updates</h1>
      <p className="mt-1 text-foreground/80">
        The Haunted Maze details and &ldquo;Giving Back Year-Round&rdquo; program cards shown on the
        Philanthropy page.
      </p>
      <LastEditedBy info={lastEdit} />

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <PhilanthropyEditor key={saved ?? "initial"} initialSettings={settings} initialPrograms={programs} />
    </div>
  );
}

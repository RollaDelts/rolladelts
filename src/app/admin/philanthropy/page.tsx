export const dynamic = "force-dynamic";

import { getPhilanthropyPrograms } from "@/lib/db";
import PhilanthropyEditor from "./PhilanthropyEditor";

export default async function PhilanthropyAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const programs = await getPhilanthropyPrograms();
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Philanthropy Content</h1>
      <p className="mt-1 text-foreground/80">
        The &ldquo;Giving Back Year-Round&rdquo; program cards shown on the Philanthropy page.
      </p>

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <PhilanthropyEditor key={saved ?? "initial"} initialPrograms={programs} />
    </div>
  );
}

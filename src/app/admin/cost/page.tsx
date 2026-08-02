export const dynamic = "force-dynamic";

import { getCostSummary, getCostLineItems } from "@/lib/db";
import CostEditor from "./CostEditor";

export default async function CostAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [summary, items] = await Promise.all([getCostSummary(), getCostLineItems()]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Recruitment Costs</h1>
      <p className="mt-1 text-foreground/80">
        Edit the chapter cost breakdown and Missouri S&amp;T housing/meal plan comparison shown
        on the Recruitment page and the detailed cost page. Update this each year when rates
        change.
      </p>

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <CostEditor key={saved ?? "initial"} initialSummary={summary} initialItems={items} />
    </div>
  );
}

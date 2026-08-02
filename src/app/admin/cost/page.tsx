export const dynamic = "force-dynamic";

import { getCostSummary, getCostLineItems } from "@/lib/db";
import CostEditor from "./CostEditor";

export default async function CostAdminPage() {
  const [summary, items] = await Promise.all([getCostSummary(), getCostLineItems()]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Recruitment Costs</h1>
      <p className="mt-1 text-foreground/80">
        Edit the chapter cost breakdown and Missouri S&amp;T housing/meal plan comparison shown
        on the Recruitment page and the detailed cost page. Update this each year when rates
        change.
      </p>

      <CostEditor initialSummary={summary} initialItems={items} />
    </div>
  );
}

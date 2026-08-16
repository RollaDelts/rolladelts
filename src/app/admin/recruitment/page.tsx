export const dynamic = "force-dynamic";

import { getRecruitmentSettings, getRecruitmentSteps, getFaqs, getRushEvents } from "@/lib/db";
import RecruitmentEditor from "./RecruitmentEditor";

export default async function RecruitmentAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, steps, faqs, events] = await Promise.all([
    getRecruitmentSettings(),
    getRecruitmentSteps(),
    getFaqs(),
    getRushEvents(),
  ]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Recruitment Page Updates</h1>
      <p className="mt-1 text-foreground/80">
        The new member photo, &ldquo;How Recruitment Works&rdquo; steps, FAQ, and upcoming rush
        events shown on the Recruitment page.
      </p>

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <RecruitmentEditor
        key={saved ?? "initial"}
        initialSettings={settings}
        initialSteps={steps}
        initialFaqs={faqs}
        initialEvents={events}
      />
    </div>
  );
}

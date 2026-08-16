export const dynamic = "force-dynamic";

import { getRecruitmentSteps, getFaqs } from "@/lib/db";
import RecruitmentContentEditor from "./RecruitmentContentEditor";

export default async function RecruitmentContentAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [steps, faqs] = await Promise.all([getRecruitmentSteps(), getFaqs()]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Recruitment Content</h1>
      <p className="mt-1 text-foreground/80">
        The &ldquo;How Recruitment Works&rdquo; steps and FAQ shown on the Recruitment page.
      </p>

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <RecruitmentContentEditor key={saved ?? "initial"} initialSteps={steps} initialFaqs={faqs} />
    </div>
  );
}

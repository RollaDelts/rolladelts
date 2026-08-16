"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveRecruitmentSettings, saveRecruitmentSteps, saveFaqs } from "@/lib/db";
import type { RecruitmentSettings, RecruitmentStep, Faq } from "@/data/defaults";

export async function saveRecruitmentPageAction(formData: FormData) {
  const settings: RecruitmentSettings = {
    newMemberImageUrl: ((formData.get("newMemberImageUrl") as string | null) ?? "").trim(),
  };

  const stepTitles = formData.getAll("stepTitle") as string[];
  const stepDescriptions = formData.getAll("stepDescription") as string[];
  const steps: RecruitmentStep[] = stepTitles
    .map((title, i) => ({ title: title.trim(), description: (stepDescriptions[i] ?? "").trim() }))
    .filter((s) => s.title.length > 0);

  const questions = formData.getAll("faqQuestion") as string[];
  const answers = formData.getAll("faqAnswer") as string[];
  const faqs: Faq[] = questions
    .map((question, i) => ({ question: question.trim(), answer: (answers[i] ?? "").trim() }))
    .filter((f) => f.question.length > 0);

  await saveRecruitmentSettings(settings);
  await saveRecruitmentSteps(steps);
  await saveFaqs(faqs);

  revalidatePath("/recruitment");
  revalidatePath("/admin/recruitment");
  redirect("/admin/recruitment?saved=1");
}

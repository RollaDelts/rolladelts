import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getCostSummary, getCostLineItems } from "@/lib/db";
import type { CostLineItem } from "@/data/defaults";

export const metadata: Metadata = {
  title: "Cost Breakdown",
  description:
    "A full breakdown of Delta Tau Delta chapter dues compared against Missouri S&T university housing and meal plan costs.",
};

function groupHousing(items: CostLineItem[]) {
  const groups = new Map<string, CostLineItem[]>();
  for (const item of items) {
    const key = item.groupLabel || "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return groups;
}

export default async function CostBreakdownPage() {
  const [summary, items] = await Promise.all([getCostSummary(), getCostLineItems()]);

  const monthly = items.filter((i) => i.section === "chapter-monthly");
  const fees = items.filter((i) => i.section === "chapter-fees");
  const housing = groupHousing(items.filter((i) => i.section === "university-housing"));
  const meals = items.filter((i) => i.section === "university-meals");

  return (
    <div>
      <PageHero
        title="Cost Breakdown"
        subtitle={`${summary.academicYear} rates — exactly what it costs to live at the Delt house, and how that compares to Missouri S&T housing and meal plans.`}
      />

      {/* Chapter costs */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-dtd-purple">Delta Tau Delta</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
            <h3 className="border-b border-dtd-purple/10 px-5 py-3 font-bold text-dtd-purple">
              Monthly Costs
            </h3>
            <dl className="divide-y divide-dtd-purple/10">
              {monthly.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-5 py-3 text-sm">
                  <dt className="text-foreground/80">
                    {item.label}
                    {item.note && <span className="ml-1 text-xs text-foreground/50">({item.note})</span>}
                  </dt>
                  <dd className="font-medium text-dtd-purple">{item.amount}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex items-center justify-between border-t border-dtd-purple/10 bg-dtd-gold/10 px-5 py-3">
              <dt className="font-bold text-dtd-purple">Total</dt>
              <dd className="font-display text-lg font-bold text-dtd-purple">{summary.monthlyTotal}</dd>
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
            <h3 className="border-b border-dtd-purple/10 px-5 py-3 font-bold text-dtd-purple">
              First-Semester Additional Fees
            </h3>
            <dl className="divide-y divide-dtd-purple/10">
              {fees.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-5 py-3 text-sm">
                  <dt className="text-foreground/80">
                    {item.label}
                    {item.note && <span className="ml-1 text-xs text-foreground/50">({item.note})</span>}
                  </dt>
                  <dd className="font-medium text-dtd-purple">{item.amount}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto grid grid-cols-2 divide-x divide-dtd-purple/10 border-t border-dtd-purple/10 bg-dtd-gold/10">
              <div className="px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
                  First Semester
                </p>
                <p className="font-display text-lg font-bold text-dtd-purple">
                  {summary.firstSemesterTotal}
                </p>
              </div>
              <div className="px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
                  First Year
                </p>
                <p className="font-display text-lg font-bold text-dtd-purple">{summary.firstYearTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University housing comparison */}
      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-dtd-purple">Missouri S&amp;T — Residential Life</h2>
          <p className="mt-2 max-w-3xl text-foreground/80">
            For comparison, here&apos;s what university housing costs for the {summary.academicYear}{" "}
            academic year.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from(housing.entries()).map(([hall, rows]) => (
              <div key={hall} className="rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
                <h3 className="border-b border-dtd-purple/10 px-5 py-3 font-bold text-dtd-purple">
                  {hall}
                </h3>
                <dl className="divide-y divide-dtd-purple/10">
                  {rows.map((item) => (
                    <div key={item.label} className="flex items-center justify-between px-5 py-3 text-sm">
                      <dt className="text-foreground/80">{item.label}</dt>
                      <dd className="font-medium text-dtd-purple">{item.amount}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal plans */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-dtd-purple">Missouri S&amp;T — Food Service Fees</h2>
        <p className="mt-2 max-w-3xl text-foreground/80">
          A meal plan is required if living in a residential hall.
        </p>
        <div className="mt-6 overflow-hidden rounded-lg border border-dtd-purple/10 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-dtd-purple text-dtd-white">
              <tr>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Yearly Cost</th>
                <th className="px-4 py-3">Meals / Dining Dollars</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((item, i) => (
                <tr key={item.label} className={i % 2 === 0 ? "bg-white" : "bg-dtd-purple/5"}>
                  <td className="px-4 py-3 font-medium text-dtd-purple">{item.label}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3 text-foreground/70">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {summary.disclaimer && (
          <p className="mt-4 text-xs text-foreground/50">*{summary.disclaimer}</p>
        )}
      </section>

      <section className="bg-dtd-purple text-dtd-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            Questions About Cost?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-dtd-white/80">
            We&apos;re happy to talk through payment plans, financial aid, and scholarships
            case-by-case.
          </p>
          <Link
            href="/recruitment#interest-form"
            className="mt-6 inline-block bg-dtd-gold px-8 py-3 text-sm font-bold uppercase tracking-widest text-dtd-purple-dark transition hover:bg-dtd-gold-light"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";

import Link from "next/link";
import { getLeads } from "@/lib/db";
import LeadRowActions from "./LeadRowActions";

const PAGE_SIZE = 20;

const sourceLabels: Record<string, string> = {
  recruitment: "Recruitment Interest",
  contact: "Contact Form",
  homepage: "Homepage",
  rsvp: "Rush RSVP",
};

const sourceStyles: Record<string, string> = {
  recruitment: "bg-dtd-gold/20 text-dtd-purple-dark",
  contact: "bg-dtd-purple/10 text-dtd-purple",
  homepage: "bg-dtd-purple/10 text-dtd-purple",
  rsvp: "bg-green-100 text-green-800",
};

export default async function LeadsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page: pageParam } = await searchParams;
  const search = q ?? "";
  const page = Math.max(1, Number(pageParam) || 1);

  const { leads, total } = await getLeads({ search, page, pageSize: PAGE_SIZE });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(targetPage: number) {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/admin/leads?${qs}` : "/admin/leads";
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dtd-purple">Leads &amp; RSVPs</h1>
          <p className="mt-1 text-foreground/80">
            Everyone who&apos;s submitted the recruitment interest form, the contact form, the
            homepage quick-contact form, or RSVP&apos;d to a rush event. Newest first.
          </p>
        </div>
        {total > 0 && (
          <a
            href="/admin/leads/export"
            className="shrink-0 rounded-full border-2 border-dtd-purple px-5 py-2 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
          >
            Export CSV
          </a>
        )}
      </div>

      <form method="GET" className="mt-6 flex max-w-sm gap-2">
        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="Search by name or email…"
          className="w-full rounded-md border border-dtd-purple/20 px-3 py-2 text-sm focus:border-dtd-purple focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-dtd-purple px-4 py-2 text-sm font-bold text-white transition hover:bg-dtd-purple-dark"
        >
          Search
        </button>
        {search && (
          <Link
            href="/admin/leads"
            className="shrink-0 self-center text-sm font-semibold text-dtd-purple underline"
          >
            Clear
          </Link>
        )}
      </form>

      {total === 0 ? (
        <p className="mt-8 text-sm text-foreground/60">
          {search ? `No leads match "${search}".` : "No submissions yet."}
        </p>
      ) : (
        <>
          <div className="mt-6 grid gap-3">
            {leads.map((lead) => (
              <div key={lead.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-dtd-purple">{lead.name}</p>
                    <p className="text-xs text-foreground/50">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                      sourceStyles[lead.source] ?? "bg-dtd-purple/10 text-dtd-purple"
                    }`}
                  >
                    {sourceLabels[lead.source] ?? lead.source}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  <a href={`mailto:${lead.email}`} className="text-dtd-purple underline">
                    {lead.email}
                  </a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="text-dtd-purple underline">
                      {lead.phone}
                    </a>
                  )}
                </div>

                {(lead.detail || lead.message) && (
                  <div className="mt-3 space-y-1 text-sm text-foreground/70">
                    {lead.detail && (
                      <p>
                        <span className="font-semibold text-foreground/80">Detail:</span> {lead.detail}
                      </p>
                    )}
                    {lead.message && (
                      <p>
                        <span className="font-semibold text-foreground/80">Message:</span> {lead.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-4 border-t border-dtd-purple/10 pt-3">
                  <LeadRowActions id={lead.id} name={lead.name} initialStatus={lead.status} />
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between text-sm">
              <p className="text-foreground/60">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
              </p>
              <div className="flex items-center gap-3">
                {page > 1 ? (
                  <Link href={pageHref(page - 1)} className="font-semibold text-dtd-purple underline">
                    ← Previous
                  </Link>
                ) : (
                  <span className="text-foreground/30">← Previous</span>
                )}
                <span className="text-foreground/60">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link href={pageHref(page + 1)} className="font-semibold text-dtd-purple underline">
                    Next →
                  </Link>
                ) : (
                  <span className="text-foreground/30">Next →</span>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

import { getLeads } from "@/lib/db";

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

export default async function LeadsAdminPage() {
  const leads = await getLeads();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Leads &amp; RSVPs</h1>
      <p className="mt-1 text-foreground/80">
        Everyone who&apos;s submitted the recruitment interest form, the contact form, the
        homepage quick-contact form, or RSVP&apos;d to a rush event. Newest first.
      </p>

      {leads.length === 0 ? (
        <p className="mt-8 text-sm text-foreground/60">No submissions yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-dtd-purple/10 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-dtd-purple text-dtd-white">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Detail</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead.id} className={i % 2 === 0 ? "bg-white" : "bg-dtd-cream"}>
                  <td className="whitespace-nowrap px-4 py-3 text-foreground/70">
                    {new Date(lead.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                        sourceStyles[lead.source] ?? "bg-dtd-purple/10 text-dtd-purple"
                      }`}
                    >
                      {sourceLabels[lead.source] ?? lead.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-dtd-purple">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${lead.email}`} className="text-dtd-purple underline">
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-foreground/70">{lead.detail || "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-foreground/70">{lead.message || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

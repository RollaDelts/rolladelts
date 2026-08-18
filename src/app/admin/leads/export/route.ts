import { NextResponse } from "next/server";
import { getLeads } from "@/lib/db";

function csvCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  no_response: "No Response",
};

export async function GET() {
  const { leads } = await getLeads();

  const header = ["Date", "Source", "Name", "Email", "Phone", "Status", "Detail", "Message"];
  const rows = leads.map((lead) => [
    new Date(lead.createdAt).toISOString(),
    lead.source,
    lead.name,
    lead.email,
    lead.phone,
    statusLabels[lead.status] ?? lead.status,
    lead.detail,
    lead.message,
  ]);

  const csv = [header, ...rows].map((row) => row.map((cell) => csvCell(cell)).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

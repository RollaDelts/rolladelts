"use client";

import { useState, useTransition } from "react";
import { updateLeadStatusAction, deleteLeadAction } from "./actions";
import type { LeadStatus } from "@/lib/db";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-green-100 text-green-800",
  no_response: "bg-gray-200 text-gray-700",
};

export default function LeadRowActions({
  id,
  name,
  initialStatus,
}: {
  id: number;
  name: string;
  initialStatus: LeadStatus;
}) {
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(next: LeadStatus) {
    setStatus(next);
    startTransition(async () => {
      await updateLeadStatusAction(id, next);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete the lead from ${name || "this person"}? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteLeadAction(id);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
        disabled={isPending}
        className={`rounded-full border-0 px-2.5 py-1 text-xs font-bold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-dtd-purple disabled:opacity-50 ${statusStyles[status]}`}
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="no_response">No Response</option>
      </select>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-full border border-red-300 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}

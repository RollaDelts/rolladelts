export default function LeadFormStatus({ sent }: { sent?: string }) {
  if (sent === "ok") {
    return (
      <div className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
        Thanks — we&apos;ve got your info and will be in touch soon.
      </div>
    );
  }
  if (sent === "error") {
    return (
      <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
        Please fill in your name and email and try again.
      </div>
    );
  }
  return null;
}

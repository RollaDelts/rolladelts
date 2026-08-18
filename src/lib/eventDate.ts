const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * Best-effort parse of the free-text event date field (e.g. "August 17",
 * "August 17-21", "Aug 17, 2026") into a concrete start/end date. Rush
 * event dates are entered as plain text rather than a date picker, so
 * this only handles common single-month formats and returns null for
 * anything it can't confidently parse (e.g. "TBD") — callers should
 * treat null as "no structured date available" rather than guess one.
 */
export function parseEventDateRange(
  dateText: string,
  referenceYear: number = new Date().getFullYear()
): { start: Date; end: Date } | null {
  const match = dateText
    .trim()
    .match(/^([A-Za-z]+)\.?\s+(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?(?:,?\s*(\d{4}))?$/);
  if (!match) return null;

  const [, monthName, startDayStr, endDayStr, yearStr] = match;
  const monthIndex = MONTHS.findIndex((m) => m.startsWith(monthName.toLowerCase()));
  if (monthIndex === -1) return null;

  const year = yearStr ? Number(yearStr) : referenceYear;
  const startDay = Number(startDayStr);
  const endDay = endDayStr ? Number(endDayStr) : startDay;

  const start = new Date(year, monthIndex, startDay);
  const end = new Date(year, monthIndex, endDay);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  // Catches invalid days that JS silently rolls into the next month (e.g. Feb 31).
  if (start.getMonth() !== monthIndex || end.getMonth() !== monthIndex) return null;

  return { start, end };
}

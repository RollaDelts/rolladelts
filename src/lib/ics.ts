function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function escapeIcsText(text: string): string {
  return text.replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
}

/**
 * Builds a downloadable .ics data URL for an all-day (multi-day) event.
 * `end` is the last inclusive day of the event — DTEND in the ICS spec is
 * exclusive, so it's bumped forward one day here.
 */
export function buildIcsDataUrl(event: {
  title: string;
  location: string;
  description: string;
  start: Date;
  end: Date;
}): string {
  const endExclusive = new Date(event.end);
  endExclusive.setDate(endExclusive.getDate() + 1);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Delta Tau Delta Epsilon Nu//Rush Events//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@rolladelts.org`,
    `DTSTAMP:${formatDate(new Date())}T000000Z`,
    `DTSTART;VALUE=DATE:${formatDate(event.start)}`,
    `DTEND;VALUE=DATE:${formatDate(endExclusive)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    event.location && `LOCATION:${escapeIcsText(event.location)}`,
    event.description && `DESCRIPTION:${escapeIcsText(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
}

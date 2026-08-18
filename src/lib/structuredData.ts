import type { SiteSettings, RushEvent } from "@/data/defaults";
import { parseEventDateRange } from "@/lib/eventDate";
import { SITE_URL } from "@/lib/site";

const ORG_NAME = "Delta Tau Delta — Epsilon Nu Chapter";

function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Best-effort split of "2631 Vienna Rd, Rolla, MO 65401" into a structured
 * PostalAddress; falls back to the raw string (still valid schema.org) if
 * the format doesn't match, rather than guessing at a parse. */
function parseAddress(raw: string): object | string {
  const match = raw.match(/^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})(?:-\d{4})?$/);
  if (!match) return raw;
  const [, streetAddress, addressLocality, addressRegion, postalCode] = match;
  return {
    "@type": "PostalAddress",
    streetAddress: streetAddress.trim(),
    addressLocality: addressLocality.trim(),
    addressRegion,
    postalCode,
    addressCountry: "US",
  };
}

export function buildOrganizationJsonLd(settings: SiteSettings) {
  const sameAs = [settings.facebookUrl, settings.instagramUrl, settings.xUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    ...(settings.address && { address: parseAddress(settings.address) }),
    ...(settings.phone && { telephone: settings.phone }),
    ...(settings.email && { email: settings.email }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/** Only emits an entry for events whose free-text date parses cleanly —
 * see parseEventDateRange for why ("TBD", cross-month ranges, etc. are
 * skipped rather than guessed at). */
export function buildEventsJsonLd(events: RushEvent[]) {
  return events
    .map((event) => {
      const range = parseEventDateRange(event.date);
      if (!range) return null;
      const endExclusive = new Date(range.end);
      endExclusive.setDate(endExclusive.getDate() + 1);

      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: isoDate(range.start),
        endDate: isoDate(endExclusive),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: { "@type": "Place", name: event.location },
        ...(event.description && { description: event.description }),
        organizer: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
      };
    })
    .filter((event) => event !== null);
}

/** Safe to inline into a <script type="application/ld+json"> — escapes "<"
 * so a value containing e.g. "</script>" can't break out of the tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

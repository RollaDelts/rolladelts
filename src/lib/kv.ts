/**
 * Data access layer for admin-editable content.
 *
 * Uses Vercel KV (Redis) when KV_REST_API_URL is configured, and falls back
 * to the static defaults when running locally without a KV store.
 */

import { kv } from "@vercel/kv";
import {
  defaultOfficers,
  defaultRushEvents,
  type Officer,
  type RushEvent,
} from "@/data/defaults";

const KV_OFFICERS_KEY = "officers";
const KV_EVENTS_KEY = "rushEvents";

function kvAvailable() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getOfficers(): Promise<Officer[]> {
  if (!kvAvailable()) return defaultOfficers;
  const data = await kv.get<Officer[]>(KV_OFFICERS_KEY);
  return data ?? defaultOfficers;
}

export async function saveOfficers(officers: Officer[]): Promise<void> {
  await kv.set(KV_OFFICERS_KEY, officers);
}

export async function getRushEvents(): Promise<RushEvent[]> {
  if (!kvAvailable()) return defaultRushEvents;
  const data = await kv.get<RushEvent[]>(KV_EVENTS_KEY);
  return data ?? defaultRushEvents;
}

export async function saveRushEvents(events: RushEvent[]): Promise<void> {
  await kv.set(KV_EVENTS_KEY, events);
}

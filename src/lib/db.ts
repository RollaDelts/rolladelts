/**
 * Data access layer — Postgres via @vercel/postgres.
 *
 * Falls back to static defaults when POSTGRES_URL is not configured
 * (e.g. local dev without a database connection).
 *
 * Tables are created by visiting /api/db-setup once after the database
 * is provisioned in the Vercel dashboard.
 */

import { sql } from "@vercel/postgres";
import {
  defaultOfficers,
  defaultRushEvents,
  type Officer,
  type RushEvent,
} from "@/data/defaults";

function dbAvailable() {
  return !!process.env.POSTGRES_URL;
}

// ─── Officers ───────────────────────────────────────────────────────────────

export async function getOfficers(): Promise<Officer[]> {
  if (!dbAvailable()) return defaultOfficers;
  try {
    const { rows } = await sql`
      SELECT role, name FROM officers ORDER BY sort_order ASC, id ASC
    `;
    return rows.length > 0
      ? rows.map((r) => ({ role: r.role as string, name: r.name as string }))
      : defaultOfficers;
  } catch {
    return defaultOfficers;
  }
}

export async function saveOfficers(officers: Officer[]): Promise<void> {
  await sql`DELETE FROM officers`;
  for (let i = 0; i < officers.length; i++) {
    const { role, name } = officers[i];
    await sql`
      INSERT INTO officers (role, name, sort_order)
      VALUES (${role}, ${name}, ${i})
    `;
  }
}

// ─── Rush Events ─────────────────────────────────────────────────────────────

export async function getRushEvents(): Promise<RushEvent[]> {
  if (!dbAvailable()) return defaultRushEvents;
  try {
    const { rows } = await sql`
      SELECT date, name, location FROM rush_events ORDER BY sort_order ASC, id ASC
    `;
    return rows.length > 0
      ? rows.map((r) => ({
          date: r.date as string,
          name: r.name as string,
          location: r.location as string,
        }))
      : defaultRushEvents;
  } catch {
    return defaultRushEvents;
  }
}

export async function saveRushEvents(events: RushEvent[]): Promise<void> {
  await sql`DELETE FROM rush_events`;
  for (let i = 0; i < events.length; i++) {
    const { date, name, location } = events[i];
    await sql`
      INSERT INTO rush_events (date, name, location, sort_order)
      VALUES (${date}, ${name}, ${location}, ${i})
    `;
  }
}

// ─── Schema setup (called once from /api/db-setup) ───────────────────────────

export async function setupSchema(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS officers (
      id         SERIAL PRIMARY KEY,
      role       TEXT    NOT NULL,
      name       TEXT    NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS rush_events (
      id         SERIAL PRIMARY KEY,
      date       TEXT    NOT NULL DEFAULT 'TBD',
      name       TEXT    NOT NULL,
      location   TEXT    NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;
}

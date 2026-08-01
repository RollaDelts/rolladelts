/**
 * Data access layer — Supabase (Postgres).
 *
 * Falls back to static defaults when Supabase env vars are not configured
 * (e.g. local dev without a database connection).
 *
 * Run supabase/schema.sql in the Supabase SQL Editor once to create tables.
 */

import { getServerClient, supabaseAvailable } from "@/lib/supabase";
import {
  defaultOfficers,
  defaultRushEvents,
  defaultAlumniSpotlights,
  type Officer,
  type RushEvent,
  type AlumniSpotlight,
} from "@/data/defaults";

// ─── Officers ────────────────────────────────────────────────────────────────

export async function getOfficers(): Promise<Officer[]> {
  if (!supabaseAvailable()) return defaultOfficers;
  const { data, error } = await getServerClient()
    .from("officers")
    .select("role, name")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultOfficers;
  return data as Officer[];
}

export async function saveOfficers(officers: Officer[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("officers").delete().neq("id", 0);
  if (officers.length === 0) return;
  await supabase.from("officers").insert(
    officers.map((o, i) => ({ role: o.role, name: o.name, sort_order: i }))
  );
}

// ─── Rush Events ─────────────────────────────────────────────────────────────

export async function getRushEvents(): Promise<RushEvent[]> {
  if (!supabaseAvailable()) return defaultRushEvents;
  const { data, error } = await getServerClient()
    .from("rush_events")
    .select("date, name, location")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultRushEvents;
  return data as RushEvent[];
}

export async function saveRushEvents(events: RushEvent[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("rush_events").delete().neq("id", 0);
  if (events.length === 0) return;
  await supabase.from("rush_events").insert(
    events.map((e, i) => ({
      date: e.date,
      name: e.name,
      location: e.location,
      sort_order: i,
    }))
  );
}

// ─── Alumni Spotlights ───────────────────────────────────────────────────────

export async function getAlumniSpotlights(): Promise<AlumniSpotlight[]> {
  if (!supabaseAvailable()) return defaultAlumniSpotlights;
  const { data, error } = await getServerClient()
    .from("alumni_spotlights")
    .select("name, pledge_class, years, photos, bio")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultAlumniSpotlights;
  return data.map((row) => ({
    name: row.name,
    pledgeClass: row.pledge_class,
    years: row.years,
    photos: row.photos,
    bio: row.bio,
  })) as AlumniSpotlight[];
}

export async function saveAlumniSpotlights(spotlights: AlumniSpotlight[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("alumni_spotlights").delete().neq("id", 0);
  if (spotlights.length === 0) return;
  await supabase.from("alumni_spotlights").insert(
    spotlights.map((s, i) => ({
      name: s.name,
      pledge_class: s.pledgeClass,
      years: s.years,
      photos: s.photos,
      bio: s.bio,
      sort_order: i,
    }))
  );
}

// ─── Leads (contact-capture submissions) ────────────────────────────────────
// Covers the recruitment interest form, contact form, homepage quick-contact
// form, and rush-event RSVPs (source: "rsvp", detail: the event identifier).

export type Lead = {
  name: string;
  email: string;
  detail: string;
  message: string;
  source: string;
};

export type SavedLead = Lead & { id: number; createdAt: string };

export async function saveLead(lead: Lead): Promise<void> {
  if (!supabaseAvailable()) {
    throw new Error("Supabase is not configured — form submissions can't be saved right now.");
  }
  const { error } = await getServerClient().from("leads").insert({
    name: lead.name,
    email: lead.email,
    detail: lead.detail,
    message: lead.message,
    source: lead.source,
  });
  if (error) throw new Error(error.message);
}

export async function getLeads(): Promise<SavedLead[]> {
  if (!supabaseAvailable()) return [];
  const { data, error } = await getServerClient()
    .from("leads")
    .select("id, name, email, detail, message, source, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    detail: row.detail,
    message: row.message,
    source: row.source,
    createdAt: row.created_at,
  }));
}

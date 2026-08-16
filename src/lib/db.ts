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
  defaultRushEventsSettings,
  defaultAlumniSpotlights,
  defaultCostSummary,
  defaultCostLineItems,
  defaultSiteSettings,
  defaultHomeSettings,
  defaultAboutSettings,
  defaultRecruitmentSettings,
  defaultPhilanthropySettings,
  defaultSiteStats,
  defaultHomePillars,
  defaultGalleryPhotos,
  defaultPillarPhotos,
  defaultRecruitmentSteps,
  defaultFaqs,
  defaultPhilanthropyPrograms,
  type Officer,
  type RushEvent,
  type RushEventsSettings,
  type AlumniSpotlight,
  type CostSummary,
  type CostLineItem,
  type SiteSettings,
  type HomeSettings,
  type AboutSettings,
  type RecruitmentSettings,
  type PhilanthropySettings,
  type SiteStat,
  type HomePillar,
  type GalleryPhoto,
  type PillarPhoto,
  type RecruitmentStep,
  type Faq,
  type PhilanthropyProgram,
} from "@/data/defaults";

// ─── Officers ────────────────────────────────────────────────────────────────

export async function getOfficers(): Promise<Officer[]> {
  if (!supabaseAvailable()) return defaultOfficers;
  const { data, error } = await getServerClient()
    .from("officers")
    .select("role, name, email, photo_url")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultOfficers;
  return data.map((row) => ({
    role: row.role,
    name: row.name,
    email: row.email,
    photoUrl: row.photo_url,
  })) as Officer[];
}

export async function saveOfficers(officers: Officer[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("officers").delete().neq("id", 0);
  if (officers.length === 0) return;
  await supabase.from("officers").insert(
    officers.map((o, i) => ({
      role: o.role,
      name: o.name,
      email: o.email,
      photo_url: o.photoUrl,
      sort_order: (i + 1) * 10,
    }))
  );
}

// ─── Rush Events ─────────────────────────────────────────────────────────────

export async function getRushEvents(): Promise<RushEvent[]> {
  if (!supabaseAvailable()) return defaultRushEvents;
  const { data, error } = await getServerClient()
    .from("rush_events")
    .select("date, name, location, description, photos")
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
      description: e.description,
      photos: e.photos,
      sort_order: (i + 1) * 10,
    }))
  );
}

// ─── Rush Events Settings (banner) ───────────────────────────────────────────

export async function getRushEventsSettings(): Promise<RushEventsSettings> {
  if (!supabaseAvailable()) return defaultRushEventsSettings;
  const { data, error } = await getServerClient()
    .from("rush_events_settings")
    .select("banner_image_url, banner_display_until")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return defaultRushEventsSettings;
  return {
    bannerImageUrl: data.banner_image_url,
    bannerDisplayUntil: data.banner_display_until ?? "",
  };
}

export async function saveRushEventsSettings(settings: RushEventsSettings): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("rush_events_settings").delete().neq("id", 0);
  await supabase.from("rush_events_settings").insert({
    banner_image_url: settings.bannerImageUrl,
    banner_display_until: settings.bannerDisplayUntil || null,
  });
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
      sort_order: (i + 1) * 10,
    }))
  );
}

// ─── Leads (contact-capture submissions) ────────────────────────────────────
// Covers the recruitment interest form, contact form, homepage quick-contact
// form, and rush-event RSVPs (source: "rsvp", detail: the event identifier).

export type Lead = {
  name: string;
  email: string;
  phone: string;
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
    phone: lead.phone,
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
    .select("id, name, email, phone, detail, message, source, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    detail: row.detail,
    message: row.message,
    source: row.source,
    createdAt: row.created_at,
  }));
}

// ─── Recruitment Costs ───────────────────────────────────────────────────────
// Backs the detailed /recruitment/cost page — chapter costs vs. Missouri
// S&T housing/meal plans. Changes every academic year.

export async function getCostSummary(): Promise<CostSummary> {
  if (!supabaseAvailable()) return defaultCostSummary;
  const { data, error } = await getServerClient()
    .from("cost_summary")
    .select("academic_year, monthly_total, first_semester_total, first_year_total, disclaimer")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return defaultCostSummary;
  return {
    academicYear: data.academic_year,
    monthlyTotal: data.monthly_total,
    firstSemesterTotal: data.first_semester_total,
    firstYearTotal: data.first_year_total,
    disclaimer: data.disclaimer,
  };
}

export async function saveCostSummary(summary: CostSummary): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("cost_summary").delete().neq("id", 0);
  await supabase.from("cost_summary").insert({
    academic_year: summary.academicYear,
    monthly_total: summary.monthlyTotal,
    first_semester_total: summary.firstSemesterTotal,
    first_year_total: summary.firstYearTotal,
    disclaimer: summary.disclaimer,
  });
}

export async function getCostLineItems(): Promise<CostLineItem[]> {
  if (!supabaseAvailable()) return defaultCostLineItems;
  const { data, error } = await getServerClient()
    .from("cost_line_items")
    .select("section, group_label, label, amount, note")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultCostLineItems;
  return data.map((row) => ({
    section: row.section,
    groupLabel: row.group_label,
    label: row.label,
    amount: row.amount,
    note: row.note,
  })) as CostLineItem[];
}

export async function saveCostLineItems(items: CostLineItem[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("cost_line_items").delete().neq("id", 0);
  if (items.length === 0) return;
  await supabase.from("cost_line_items").insert(
    items.map((item, i) => ({
      section: item.section,
      group_label: item.groupLabel,
      label: item.label,
      amount: item.amount,
      note: item.note,
      sort_order: (i + 1) * 10,
    }))
  );
}

// ─── Site Settings (singleton) ───────────────────────────────────────────────
// Contact info, social handles, and a handful of singleton text/photo slots
// previously hardcoded and duplicated across Footer/Contact/About/Philanthropy.

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!supabaseAvailable()) return defaultSiteSettings;
  const { data, error } = await getServerClient()
    .from("site_settings")
    .select(
      "address, phone, email, facebook_url, instagram_handle, instagram_url, x_handle, x_url, notification_email"
    )
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return defaultSiteSettings;
  return {
    address: data.address,
    phone: data.phone,
    email: data.email,
    facebookUrl: data.facebook_url,
    instagramHandle: data.instagram_handle,
    instagramUrl: data.instagram_url,
    xHandle: data.x_handle,
    xUrl: data.x_url,
    notificationEmail: data.notification_email,
  };
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("site_settings").delete().neq("id", 0);
  await supabase.from("site_settings").insert({
    address: settings.address,
    phone: settings.phone,
    email: settings.email,
    facebook_url: settings.facebookUrl,
    instagram_handle: settings.instagramHandle,
    instagram_url: settings.instagramUrl,
    x_handle: settings.xHandle,
    x_url: settings.xUrl,
    notification_email: settings.notificationEmail,
  });
}

// ─── Home Page Settings ──────────────────────────────────────────────────────

export async function getHomeSettings(): Promise<HomeSettings> {
  if (!supabaseAvailable()) return defaultHomeSettings;
  const { data, error } = await getServerClient()
    .from("home_settings")
    .select("hero_image_url")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return defaultHomeSettings;
  return { heroImageUrl: data.hero_image_url };
}

export async function saveHomeSettings(settings: HomeSettings): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("home_settings").delete().neq("id", 0);
  await supabase.from("home_settings").insert({ hero_image_url: settings.heroImageUrl });
}

// ─── About Page Settings ─────────────────────────────────────────────────────

export async function getAboutSettings(): Promise<AboutSettings> {
  if (!supabaseAvailable()) return defaultAboutSettings;
  const { data, error } = await getServerClient()
    .from("about_settings")
    .select("history, history_image_url, house_exterior_image_url, common_areas_image_url, hazing_policy")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return defaultAboutSettings;
  return {
    history: data.history,
    historyImageUrl: data.history_image_url,
    houseExteriorImageUrl: data.house_exterior_image_url,
    commonAreasImageUrl: data.common_areas_image_url,
    hazingPolicy: data.hazing_policy,
  };
}

export async function saveAboutSettings(settings: AboutSettings): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("about_settings").delete().neq("id", 0);
  await supabase.from("about_settings").insert({
    history: settings.history,
    history_image_url: settings.historyImageUrl,
    house_exterior_image_url: settings.houseExteriorImageUrl,
    common_areas_image_url: settings.commonAreasImageUrl,
    hazing_policy: settings.hazingPolicy,
  });
}

// ─── Recruitment Page Settings ───────────────────────────────────────────────

export async function getRecruitmentSettings(): Promise<RecruitmentSettings> {
  if (!supabaseAvailable()) return defaultRecruitmentSettings;
  const { data, error } = await getServerClient()
    .from("recruitment_settings")
    .select("new_member_image_url")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return defaultRecruitmentSettings;
  return { newMemberImageUrl: data.new_member_image_url };
}

export async function saveRecruitmentSettings(settings: RecruitmentSettings): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("recruitment_settings").delete().neq("id", 0);
  await supabase.from("recruitment_settings").insert({ new_member_image_url: settings.newMemberImageUrl });
}

// ─── Philanthropy Page Settings ──────────────────────────────────────────────

export async function getPhilanthropySettings(): Promise<PhilanthropySettings> {
  if (!supabaseAvailable()) return defaultPhilanthropySettings;
  const { data, error } = await getServerClient()
    .from("philanthropy_settings")
    .select("maze_dates, maze_raised, maze_image_url")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data) return defaultPhilanthropySettings;
  return {
    hauntedMazeDates: data.maze_dates,
    hauntedMazeRaised: data.maze_raised,
    mazeImageUrl: data.maze_image_url,
  };
}

export async function savePhilanthropySettings(settings: PhilanthropySettings): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("philanthropy_settings").delete().neq("id", 0);
  await supabase.from("philanthropy_settings").insert({
    maze_dates: settings.hauntedMazeDates,
    maze_raised: settings.hauntedMazeRaised,
    maze_image_url: settings.mazeImageUrl,
  });
}

// ─── Homepage Stats ──────────────────────────────────────────────────────────

export async function getSiteStats(): Promise<SiteStat[]> {
  if (!supabaseAvailable()) return defaultSiteStats;
  const { data, error } = await getServerClient()
    .from("site_stats")
    .select("label, value")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultSiteStats;
  return data as SiteStat[];
}

export async function saveSiteStats(stats: SiteStat[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("site_stats").delete().neq("id", 0);
  if (stats.length === 0) return;
  await supabase.from("site_stats").insert(
    stats.map((s, i) => ({ label: s.label, value: s.value, sort_order: (i + 1) * 10 }))
  );
}

// ─── Homepage "Why Join" Pillars ─────────────────────────────────────────────

export async function getHomePillars(): Promise<HomePillar[]> {
  if (!supabaseAvailable()) return defaultHomePillars;
  const { data, error } = await getServerClient()
    .from("home_pillars")
    .select("title, description")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultHomePillars;
  return data as HomePillar[];
}

export async function saveHomePillars(pillars: HomePillar[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("home_pillars").delete().neq("id", 0);
  if (pillars.length === 0) return;
  await supabase.from("home_pillars").insert(
    pillars.map((p, i) => ({ title: p.title, description: p.description, sort_order: (i + 1) * 10 }))
  );
}

// ─── Homepage Gallery ────────────────────────────────────────────────────────

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!supabaseAvailable()) return defaultGalleryPhotos;
  const { data, error } = await getServerClient()
    .from("gallery_photos")
    .select("image_url, alt, fit")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultGalleryPhotos;
  return data.map((row) => ({ imageUrl: row.image_url, alt: row.alt, fit: row.fit })) as GalleryPhoto[];
}

export async function saveGalleryPhotos(photos: GalleryPhoto[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("gallery_photos").delete().neq("id", 0);
  if (photos.length === 0) return;
  await supabase.from("gallery_photos").insert(
    photos.map((p, i) => ({
      image_url: p.imageUrl,
      alt: p.alt,
      fit: p.fit,
      sort_order: (i + 1) * 10,
    }))
  );
}

// ─── Homepage "Brotherhood in Action" Pillar Photos ─────────────────────────

export async function getPillarPhotos(): Promise<PillarPhoto[]> {
  if (!supabaseAvailable()) return defaultPillarPhotos;
  const { data, error } = await getServerClient()
    .from("pillar_photos")
    .select("image_url, caption")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultPillarPhotos;
  return data.map((row) => ({ imageUrl: row.image_url, caption: row.caption })) as PillarPhoto[];
}

export async function savePillarPhotos(photos: PillarPhoto[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("pillar_photos").delete().neq("id", 0);
  if (photos.length === 0) return;
  await supabase.from("pillar_photos").insert(
    photos.map((p, i) => ({ image_url: p.imageUrl, caption: p.caption, sort_order: (i + 1) * 10 }))
  );
}

// ─── Recruitment "How It Works" Steps ────────────────────────────────────────

export async function getRecruitmentSteps(): Promise<RecruitmentStep[]> {
  if (!supabaseAvailable()) return defaultRecruitmentSteps;
  const { data, error } = await getServerClient()
    .from("recruitment_steps")
    .select("title, description")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultRecruitmentSteps;
  return data as RecruitmentStep[];
}

export async function saveRecruitmentSteps(steps: RecruitmentStep[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("recruitment_steps").delete().neq("id", 0);
  if (steps.length === 0) return;
  await supabase.from("recruitment_steps").insert(
    steps.map((s, i) => ({ title: s.title, description: s.description, sort_order: (i + 1) * 10 }))
  );
}

// ─── Recruitment FAQ ─────────────────────────────────────────────────────────

export async function getFaqs(): Promise<Faq[]> {
  if (!supabaseAvailable()) return defaultFaqs;
  const { data, error } = await getServerClient()
    .from("faqs")
    .select("question, answer")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultFaqs;
  return data as Faq[];
}

export async function saveFaqs(faqs: Faq[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("faqs").delete().neq("id", 0);
  if (faqs.length === 0) return;
  await supabase.from("faqs").insert(
    faqs.map((f, i) => ({ question: f.question, answer: f.answer, sort_order: (i + 1) * 10 }))
  );
}

// ─── Philanthropy Programs ───────────────────────────────────────────────────

export async function getPhilanthropyPrograms(): Promise<PhilanthropyProgram[]> {
  if (!supabaseAvailable()) return defaultPhilanthropyPrograms;
  const { data, error } = await getServerClient()
    .from("philanthropy_programs")
    .select("title, description, image_url")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error || !data || data.length === 0) return defaultPhilanthropyPrograms;
  return data.map((row) => ({
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
  })) as PhilanthropyProgram[];
}

export async function savePhilanthropyPrograms(programs: PhilanthropyProgram[]): Promise<void> {
  const supabase = getServerClient();
  await supabase.from("philanthropy_programs").delete().neq("id", 0);
  if (programs.length === 0) return;
  await supabase.from("philanthropy_programs").insert(
    programs.map((p, i) => ({
      title: p.title,
      description: p.description,
      image_url: p.imageUrl,
      sort_order: (i + 1) * 10,
    }))
  );
}

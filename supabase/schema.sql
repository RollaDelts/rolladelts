-- Delta Tau Delta · Epsilon Nu Chapter — Supabase schema
-- Paste this into your Supabase project's SQL Editor and click Run.
-- Supabase Dashboard → SQL Editor → New Query

-- Chapter leadership shown on the About page
CREATE TABLE IF NOT EXISTS officers (
  id         BIGSERIAL PRIMARY KEY,
  role       TEXT      NOT NULL,
  name       TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

-- Upcoming rush events shown on the Recruitment page
CREATE TABLE IF NOT EXISTS rush_events (
  id         BIGSERIAL PRIMARY KEY,
  date       TEXT      NOT NULL DEFAULT 'TBD',
  name       TEXT      NOT NULL,
  location   TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

-- RLS is enabled (Supabase default and recommended).
-- The app accesses these tables exclusively via the server-side service role
-- key, which bypasses RLS — so no policies are needed. Direct anon/browser
-- access to these tables is blocked by default.

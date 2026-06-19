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

-- Disable Row Level Security — all access goes through the server-side
-- service role key, so RLS is not needed for these tables.
ALTER TABLE officers    DISABLE ROW LEVEL SECURITY;
ALTER TABLE rush_events DISABLE ROW LEVEL SECURITY;

-- Migration: Per-page settings tables + trim site_settings
-- Paste into the Supabase SQL Editor and run once, after migration 0007
-- has already been applied.
--
-- Reorganizes admin content around "one box per page" instead of one
-- big Site Settings page: site_settings now holds only contact info
-- and social handles (shared across the whole site), and each page's
-- own singleton text/photo fields move into a dedicated table.

CREATE TABLE IF NOT EXISTS home_settings (
  id             BIGSERIAL PRIMARY KEY,
  hero_image_url TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS about_settings (
  id                             BIGSERIAL PRIMARY KEY,
  history                        TEXT NOT NULL DEFAULT '',
  history_image_url              TEXT NOT NULL DEFAULT '',
  house_exterior_image_url       TEXT NOT NULL DEFAULT '',
  common_areas_image_url         TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS recruitment_settings (
  id                    BIGSERIAL PRIMARY KEY,
  new_member_image_url  TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS philanthropy_settings (
  id               BIGSERIAL PRIMARY KEY,
  maze_dates       TEXT NOT NULL DEFAULT '',
  maze_raised      TEXT NOT NULL DEFAULT '',
  maze_image_url   TEXT NOT NULL DEFAULT ''
);

ALTER TABLE home_settings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_settings         ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE philanthropy_settings  ENABLE ROW LEVEL SECURITY;

-- site_settings: add Instagram/X profile URLs (Facebook already has one),
-- then drop the fields that moved to the page-specific tables above.
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS instagram_url TEXT NOT NULL DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS x_url         TEXT NOT NULL DEFAULT '';

ALTER TABLE site_settings DROP COLUMN IF EXISTS about_history;
ALTER TABLE site_settings DROP COLUMN IF EXISTS haunted_maze_dates;
ALTER TABLE site_settings DROP COLUMN IF EXISTS haunted_maze_raised;
ALTER TABLE site_settings DROP COLUMN IF EXISTS hero_image_url;
ALTER TABLE site_settings DROP COLUMN IF EXISTS about_history_image_url;
ALTER TABLE site_settings DROP COLUMN IF EXISTS about_house_exterior_image_url;
ALTER TABLE site_settings DROP COLUMN IF EXISTS about_common_areas_image_url;
ALTER TABLE site_settings DROP COLUMN IF EXISTS recruitment_new_member_image_url;
ALTER TABLE site_settings DROP COLUMN IF EXISTS philanthropy_maze_image_url;

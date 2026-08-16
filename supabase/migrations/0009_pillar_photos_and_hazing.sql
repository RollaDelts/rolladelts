-- Migration: "Brotherhood in Action" photo strip + anti-hazing policy text
-- Paste into the Supabase SQL Editor and run once, after migration 0008
-- has already been applied.
--
-- pillar_photos: real photos of actives carrying out the "Why Join"
-- pillars (academic support, leadership, community impact, etc.), shown
-- as a strip under the pillars on the homepage.
--
-- about_settings.hazing_policy: admin-editable anti-hazing statement
-- shown on the About page.

CREATE TABLE IF NOT EXISTS pillar_photos (
  id         BIGSERIAL PRIMARY KEY,
  image_url  TEXT      NOT NULL,
  caption    TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

ALTER TABLE pillar_photos ENABLE ROW LEVEL SECURITY;

ALTER TABLE about_settings ADD COLUMN IF NOT EXISTS hazing_policy TEXT NOT NULL DEFAULT '';

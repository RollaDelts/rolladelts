-- Migration: Chapter leadership profiles + richer rush events
-- Paste into the Supabase SQL Editor and run once, after migration 0009
-- has already been applied.
--
-- officers: add email + photo so Chapter Leadership cards on the About
-- page can show a face and a way to reach each officer directly.
--
-- rush_events: add an optional description and a photo list (same
-- "one URL per line, optional |caption" format as alumni_spotlights.photos)
-- shown in a click-to-open sidebar on the Recruitment page.
--
-- rush_events_settings: a singleton holding an optional banner image shown
-- to the left of the upcoming events table, with a "display until" date —
-- image and date are set together via the admin and the site simply stops
-- showing the image once the date has passed.

ALTER TABLE officers ADD COLUMN IF NOT EXISTS email     TEXT NOT NULL DEFAULT '';
ALTER TABLE officers ADD COLUMN IF NOT EXISTS photo_url TEXT NOT NULL DEFAULT '';

ALTER TABLE rush_events ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';
ALTER TABLE rush_events ADD COLUMN IF NOT EXISTS photos      TEXT NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS rush_events_settings (
  id                    BIGSERIAL PRIMARY KEY,
  banner_image_url      TEXT NOT NULL DEFAULT '',
  banner_display_until  DATE
);

ALTER TABLE rush_events_settings ENABLE ROW LEVEL SECURITY;

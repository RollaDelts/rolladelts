-- Migration: Expand alumni_spotlights for full bios + photos
-- Paste into the Supabase SQL Editor and run once, after
-- 0001_alumni_spotlights.sql has already been applied.
--
-- The Alumni page originally showed a short summary; it now carries the
-- full migrated article text plus photo(s) for each spotlight.

ALTER TABLE alumni_spotlights RENAME COLUMN summary TO bio;
ALTER TABLE alumni_spotlights ADD COLUMN IF NOT EXISTS photos TEXT NOT NULL DEFAULT '';

-- Migration: Site settings (singleton)
-- Paste into the Supabase SQL Editor and run once, after migrations
-- 0001-0005 have already been applied.
--
-- One row holding contact info, social handles, and a handful of
-- singleton content/photo slots that were previously hardcoded and
-- duplicated across Footer, Contact, About, and Philanthropy pages.

CREATE TABLE IF NOT EXISTS site_settings (
  id                                BIGSERIAL PRIMARY KEY,
  address                           TEXT NOT NULL DEFAULT '',
  phone                             TEXT NOT NULL DEFAULT '',
  email                             TEXT NOT NULL DEFAULT '',
  facebook_url                      TEXT NOT NULL DEFAULT '',
  instagram_handle                  TEXT NOT NULL DEFAULT '',
  x_handle                          TEXT NOT NULL DEFAULT '',
  about_history                     TEXT NOT NULL DEFAULT '',
  haunted_maze_dates                TEXT NOT NULL DEFAULT '',
  haunted_maze_raised                TEXT NOT NULL DEFAULT '',
  hero_image_url                    TEXT NOT NULL DEFAULT '',
  about_history_image_url           TEXT NOT NULL DEFAULT '',
  about_house_exterior_image_url    TEXT NOT NULL DEFAULT '',
  about_common_areas_image_url      TEXT NOT NULL DEFAULT '',
  recruitment_new_member_image_url  TEXT NOT NULL DEFAULT '',
  philanthropy_maze_image_url       TEXT NOT NULL DEFAULT ''
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

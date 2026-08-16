-- Migration: Homepage / recruitment / philanthropy content tables
-- Paste into the Supabase SQL Editor and run once, after migration 0006
-- has already been applied.
--
-- Moves previously-hardcoded lists into the database: the homepage stats
-- bar, "Why Join" pillars, and photo gallery; the recruitment "How It
-- Works" steps and FAQ; and the philanthropy "Giving Back Year-Round"
-- program cards.
--
-- sort_order values are saved in steps of 10 (10, 20, 30...) by the app
-- so a row can be manually reordered via direct SQL later without
-- renumbering everything else, if ever needed outside the admin UI.

CREATE TABLE IF NOT EXISTS site_stats (
  id         BIGSERIAL PRIMARY KEY,
  label      TEXT      NOT NULL,
  value      TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS home_pillars (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT      NOT NULL,
  description TEXT      NOT NULL DEFAULT '',
  sort_order  INTEGER   NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery_photos (
  id         BIGSERIAL PRIMARY KEY,
  image_url  TEXT      NOT NULL,
  alt        TEXT      NOT NULL DEFAULT '',
  fit        TEXT      NOT NULL DEFAULT 'cover',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS recruitment_steps (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT      NOT NULL,
  description TEXT      NOT NULL DEFAULT '',
  sort_order  INTEGER   NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id         BIGSERIAL PRIMARY KEY,
  question   TEXT      NOT NULL,
  answer     TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS philanthropy_programs (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT      NOT NULL,
  description TEXT      NOT NULL DEFAULT '',
  sort_order  INTEGER   NOT NULL DEFAULT 0
);

ALTER TABLE site_stats           ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_pillars         ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_steps    ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE philanthropy_programs ENABLE ROW LEVEL SECURITY;

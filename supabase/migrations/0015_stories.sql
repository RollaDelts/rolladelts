-- Migration: Our Stories
-- Paste into the Supabase SQL Editor and run once, after migration 0014
-- has already been applied.
--
-- A chapter history/blog section, replacing the old WordPress site's "Our
-- Stories" archive. Unlike most other content tables, this one is edited
-- per-record (create/edit/delete one story at a time) rather than as a
-- whole-list form, since it's expected to keep growing indefinitely.

CREATE TABLE IF NOT EXISTS stories (
  id             BIGSERIAL PRIMARY KEY,
  slug           TEXT        NOT NULL UNIQUE,
  title          TEXT        NOT NULL DEFAULT '',
  published_date DATE        NOT NULL DEFAULT CURRENT_DATE,
  author         TEXT        NOT NULL DEFAULT '',
  body           TEXT        NOT NULL DEFAULT '',
  photos         TEXT        NOT NULL DEFAULT '',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS stories_published_date_idx
  ON stories (published_date DESC);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

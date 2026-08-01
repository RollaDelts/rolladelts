-- Migration: Leads (contact-capture submissions)
-- Paste into the Supabase SQL Editor and run once, after schema.sql and
-- migrations 0001-0002 have already been applied.
--
-- Captures submissions from the recruitment interest form, the contact
-- page form, and the homepage quick-contact form. `detail` holds whichever
-- secondary field a given form collects (major/grad year on the
-- recruitment form, subject line on the contact form). `source` records
-- which form/page it came from for the admin view.

CREATE TABLE IF NOT EXISTS leads (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  detail     TEXT        NOT NULL DEFAULT '',
  message    TEXT        NOT NULL DEFAULT '',
  source     TEXT        NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

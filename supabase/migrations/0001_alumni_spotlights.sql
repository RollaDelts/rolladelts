-- Migration: Alumni Spotlights
-- Paste into the Supabase SQL Editor and run once, after schema.sql has
-- already been applied.

-- Alumni profiles shown on the Alumni page
CREATE TABLE IF NOT EXISTS alumni_spotlights (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT      NOT NULL,
  pledge_class TEXT      NOT NULL DEFAULT '',
  years        TEXT      NOT NULL DEFAULT '',
  summary      TEXT      NOT NULL DEFAULT '',
  sort_order   INTEGER   NOT NULL DEFAULT 0
);

ALTER TABLE alumni_spotlights ENABLE ROW LEVEL SECURITY;

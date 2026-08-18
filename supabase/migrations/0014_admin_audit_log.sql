-- Migration: Lightweight admin audit trail
-- Paste into the Supabase SQL Editor and run once, after migration 0013
-- has already been applied.
--
-- Not a full version history — just "who last saved this admin page, and
-- when," so an accidental bad edit can be traced back to someone as more
-- people get admin access over time. One row per save; `page` is a short
-- slug ("home", "about", "recruitment", etc.) matching each admin section.

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id         BIGSERIAL PRIMARY KEY,
  page       TEXT        NOT NULL,
  edited_by  TEXT        NOT NULL,
  edited_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_audit_log_page_edited_at_idx
  ON admin_audit_log (page, edited_at DESC);

ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Migration: Recruitment cost breakdown
-- Paste into the Supabase SQL Editor and run once, after migrations
-- 0001-0003 have already been applied.
--
-- Backs the detailed cost-comparison page (chapter costs vs. Missouri
-- S&T housing/meal plans), which changes every academic year and
-- previously would have needed a code deploy to update.

-- Single-row headline figures + disclaimer for the cost page.
CREATE TABLE IF NOT EXISTS cost_summary (
  id                   BIGSERIAL PRIMARY KEY,
  academic_year        TEXT      NOT NULL DEFAULT '',
  monthly_total        TEXT      NOT NULL DEFAULT '',
  first_semester_total TEXT      NOT NULL DEFAULT '',
  first_year_total     TEXT      NOT NULL DEFAULT '',
  disclaimer           TEXT      NOT NULL DEFAULT ''
);

-- Itemized line rows. `section` groups rows onto the page:
--   chapter-monthly, chapter-fees, university-housing, university-meals
-- `group_label` is an optional sub-heading, used by university-housing
-- to cluster rows under a residence hall name (e.g. "Thomas Jefferson").
CREATE TABLE IF NOT EXISTS cost_line_items (
  id         BIGSERIAL PRIMARY KEY,
  section    TEXT      NOT NULL,
  group_label TEXT     NOT NULL DEFAULT '',
  label      TEXT      NOT NULL,
  amount     TEXT      NOT NULL DEFAULT '',
  note       TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

ALTER TABLE cost_summary    ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_line_items ENABLE ROW LEVEL SECURITY;

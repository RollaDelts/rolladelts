-- Migration: Editable Haunted Maze title + description
-- Paste into the Supabase SQL Editor and run once, after migration 0012
-- has already been applied.
--
-- The "Annual Haunted Maze" heading and its description paragraph on the
-- Philanthropy page were hardcoded — this makes both admin-editable
-- alongside the dates/amount-raised/photo fields that already were.

ALTER TABLE philanthropy_settings ADD COLUMN IF NOT EXISTS maze_title       TEXT NOT NULL DEFAULT '';
ALTER TABLE philanthropy_settings ADD COLUMN IF NOT EXISTS maze_description TEXT NOT NULL DEFAULT '';

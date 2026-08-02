-- Migration: Add optional phone number to leads
-- Paste into the Supabase SQL Editor and run once, after migrations
-- 0001-0004 have already been applied.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '';

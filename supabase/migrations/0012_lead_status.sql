-- Migration: Lead status tracking
-- Paste into the Supabase SQL Editor and run once, after migration 0011
-- has already been applied.
--
-- Lets the admin Leads & RSVPs view track follow-up state per submission
-- (new / contacted / no_response) instead of being a flat, unstatused log.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

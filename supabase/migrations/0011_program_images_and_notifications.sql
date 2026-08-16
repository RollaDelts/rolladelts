-- Migration: Philanthropy program images + lead notification email
-- Paste into the Supabase SQL Editor and run once, after migration 0010
-- has already been applied.
--
-- philanthropy_programs.image_url: optional photo per "Giving Back
-- Year-Round" program card.
--
-- site_settings.notification_email: where new lead/RSVP submissions get
-- emailed — kept separate from the public-facing contact `email` since
-- the alert inbox may differ from the address shown on the site.

ALTER TABLE philanthropy_programs ADD COLUMN IF NOT EXISTS image_url TEXT NOT NULL DEFAULT '';

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS notification_email TEXT NOT NULL DEFAULT '';

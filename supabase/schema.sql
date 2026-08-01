-- Delta Tau Delta · Epsilon Nu Chapter — Supabase schema
-- Paste this into your Supabase project's SQL Editor and click Run.
-- Supabase Dashboard → SQL Editor → New Query

-- ─── Chapter content tables ──────────────────────────────────────────────────

-- Chapter leadership shown on the About page
CREATE TABLE IF NOT EXISTS officers (
  id         BIGSERIAL PRIMARY KEY,
  role       TEXT      NOT NULL,
  name       TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

-- Upcoming rush events shown on the Recruitment page
CREATE TABLE IF NOT EXISTS rush_events (
  id         BIGSERIAL PRIMARY KEY,
  date       TEXT      NOT NULL DEFAULT 'TBD',
  name       TEXT      NOT NULL,
  location   TEXT      NOT NULL DEFAULT '',
  sort_order INTEGER   NOT NULL DEFAULT 0
);

-- Alumni profiles shown on the Alumni page
CREATE TABLE IF NOT EXISTS alumni_spotlights (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT      NOT NULL,
  pledge_class TEXT      NOT NULL DEFAULT '',
  years        TEXT      NOT NULL DEFAULT '',
  summary      TEXT      NOT NULL DEFAULT '',
  sort_order   INTEGER   NOT NULL DEFAULT 0
);

-- ─── User profiles ───────────────────────────────────────────────────────────
-- Extends Supabase Auth users with display name and role.
-- role values: 'pending' | 'member' | 'admin'

CREATE TABLE IF NOT EXISTS profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT        NOT NULL,
  last_name  TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  role       TEXT        NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
-- Content tables: RLS enabled, no policies needed — only accessed server-side
-- via the service role key which bypasses RLS.
-- Profiles: users can read their own row; service role handles all admin writes.

ALTER TABLE officers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE rush_events       ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_spotlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- ─── Auto-create profile on sign-up ──────────────────────────────────────────
-- Reads first_name and last_name from the metadata passed during signUp().

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    'pending'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Guide subscribers table
-- Stores emails that unlocked a guide via the email gate.
-- source_guide_slug: which guide page triggered the signup (e.g. "never-lose-a-lead")
-- Each email can unlock multiple guides; each unlock gets its own row.
-- consent is always true at insert time (enforced by API route before insert).

CREATE TABLE IF NOT EXISTS guide_subscribers (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL,
  source_guide_slug text NOT NULL,
  consented_at  timestamptz NOT NULL DEFAULT now(),
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Index for looking up by email (dedup check) and by slug (list building)
CREATE INDEX IF NOT EXISTS guide_subscribers_email_idx
  ON guide_subscribers (email);

CREATE INDEX IF NOT EXISTS guide_subscribers_slug_idx
  ON guide_subscribers (source_guide_slug);

-- Unique constraint: one row per (email, guide) — prevents duplicate unlocks
ALTER TABLE guide_subscribers
  ADD CONSTRAINT guide_subscribers_email_slug_unique
  UNIQUE (email, source_guide_slug);

-- Row-level security: no public SELECT — only service role reads this
ALTER TABLE guide_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow the service role (API routes) to insert
CREATE POLICY "service_role_insert"
  ON guide_subscribers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow the service role to select (for dedup / admin)
CREATE POLICY "service_role_select"
  ON guide_subscribers
  FOR SELECT
  TO service_role
  USING (true);

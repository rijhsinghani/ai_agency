-- =============================================================================
-- Migration: 003_analytics.sql
-- Purpose:   Analytics tables and views for engagement tracking and cost monitoring
-- Extends:   002_content_bank.sql (content_bank, brands tables must exist)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table: platform_analytics
-- Purpose: Per-post engagement metrics from all publishing platforms
-- One row per (content_bank_id, platform, metric_date) — collected nightly
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS platform_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_bank_id UUID REFERENCES content_bank(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'twitter', 'instagram', 'threads', 'substack')),
  post_id TEXT NOT NULL,           -- Platform-native post ID (YouTube video ID, tweet ID, etc.)
  metric_date DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Universal engagement metrics
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,

  -- Platform-specific metrics
  impressions INTEGER DEFAULT 0,   -- Twitter/YouTube impressions
  retention_rate DECIMAL(5,2),     -- YouTube audience retention (0.00 to 100.00)
  ctr DECIMAL(5,2),                -- YouTube click-through rate
  reach INTEGER DEFAULT 0,         -- Instagram/Threads reach (unique accounts)

  -- Metadata
  collected_at TIMESTAMPTZ DEFAULT NOW(),
  raw_response JSONB,              -- Full platform API response for debugging/auditing
  brand TEXT CHECK (brand IN ('sameer_automations', 'raj_photo_video')),

  -- Prevent duplicate metric collection for the same post on the same day
  UNIQUE(content_bank_id, platform, metric_date)
);

-- Index for common query patterns
CREATE INDEX IF NOT EXISTS idx_platform_analytics_brand ON platform_analytics(brand);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_platform ON platform_analytics(platform);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_metric_date ON platform_analytics(metric_date);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_content_bank_id ON platform_analytics(content_bank_id);

-- -----------------------------------------------------------------------------
-- Table: ai_usage
-- Purpose: Track API calls and costs for all AI operations in the pipeline
-- Reused by content-engine backend for Claude API calls (create if not exists)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model TEXT NOT NULL,             -- e.g., 'gemini-2.5-pro', 'claude-3-5-sonnet', 'whisper-1'
  operation TEXT NOT NULL,         -- e.g., 'clip_analysis', 'content_generation', 'thumbnail_generation', 'transcription'
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  estimated_cost_usd DECIMAL(10,6) DEFAULT 0,
  content_bank_id UUID REFERENCES content_bank(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for cost aggregation queries
CREATE INDEX IF NOT EXISTS idx_ai_usage_model ON ai_usage(model);
CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON ai_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_usage_content_bank_id ON ai_usage(content_bank_id);

-- -----------------------------------------------------------------------------
-- View: ai_cost_tracking
-- Purpose: Monthly cost breakdown by model and operation for budget monitoring
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW ai_cost_tracking AS
SELECT
  DATE_TRUNC('month', created_at) AS month,
  model,
  operation,
  COUNT(*) AS api_calls,
  SUM(input_tokens) AS total_input_tokens,
  SUM(output_tokens) AS total_output_tokens,
  SUM(estimated_cost_usd) AS total_cost_usd,
  ROUND(SUM(estimated_cost_usd)::numeric, 2) AS total_cost_rounded
FROM ai_usage
GROUP BY 1, 2, 3
ORDER BY 1 DESC, total_cost_usd DESC;

-- -----------------------------------------------------------------------------
-- View: monthly_cost_summary
-- Purpose: High-level monthly cost with budget status alert thresholds
-- Budget target: stay under $15/month total (all AI API costs combined)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW monthly_cost_summary AS
SELECT
  DATE_TRUNC('month', created_at) AS month,
  SUM(estimated_cost_usd) AS total_ai_cost_usd,
  ROUND(SUM(estimated_cost_usd)::numeric, 2) AS total_ai_cost_rounded,
  COUNT(DISTINCT content_bank_id) AS videos_processed,
  COUNT(*) AS total_api_calls,
  CASE
    WHEN SUM(estimated_cost_usd) > 15 THEN 'OVER BUDGET'
    WHEN SUM(estimated_cost_usd) > 12 THEN 'WARNING'
    ELSE 'OK'
  END AS budget_status
FROM ai_usage
GROUP BY 1
ORDER BY 1 DESC;

-- -----------------------------------------------------------------------------
-- MULTI-BRAND ROUTING PATTERN
-- -----------------------------------------------------------------------------
-- The brands table (created in 002_content_bank.sql) stores platform_credentials as JSONB.
-- At publish time, n8n reads content_bank.brand, looks up brands.platform_credentials,
-- and selects the appropriate credential set for the API calls.
--
-- Example brands.platform_credentials structure:
-- {
--   "twitter_api_key": "encrypted_ref:projects/PROJECT/secrets/sameer-twitter-key/versions/latest",
--   "meta_access_token": "encrypted_ref:projects/PROJECT/secrets/sameer-meta-token/versions/latest",
--   "youtube_oauth_token": "encrypted_ref:projects/PROJECT/secrets/sameer-youtube-token/versions/latest"
-- }
--
-- Credentials are stored as references to GCP Secret Manager (not raw values).
-- The n8n HTTP Request node retrieves the actual secret value from GCP at runtime.
--
-- Brand routing query pattern used by n8n publisher workflows:
-- SELECT platform_credentials FROM brands WHERE name = '{{ $json.brand }}'
-- → Returns credential set specific to sameer_automations or raj_photo_video
--
-- Voice profile routing:
-- brands.voice_profile_id → content_engine_brand_voice(id)
-- SELECT * FROM content_engine_brand_voice WHERE id = brands.voice_profile_id
--
-- Visual style routing:
-- brands.visual_style_guide → path to brand style markdown (e.g., 'brand/brand-voice.md')
--
-- content_bank.brand CHECK constraint (from 002_content_bank.sql):
-- brand IN ('sameer_automations', 'raj_photo_video')
-- Enforced at DB level — invalid brand values are rejected before reaching publisher logic.
-- -----------------------------------------------------------------------------

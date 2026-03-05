---
phase: 10-automated-content-preparation-distribution-pipeline
plan: 07
subsystem: database
tags:
  [
    supabase,
    postgresql,
    n8n,
    analytics,
    multi-brand,
    youtube-api,
    meta-graph-api,
    threads-api,
  ]

# Dependency graph
requires:
  - phase: 10-01
    provides: brands table + content_bank table with visual_assets JSONB (platform post IDs)
  - phase: 10-05
    provides: platform publisher workflows (youtube, twitter) that produce post IDs stored in visual_assets
  - phase: 10-06
    provides: platform publisher workflows (instagram, substack, threads) that produce post IDs

provides:
  - platform_analytics table: per-post engagement metrics from all 5 platforms, indexed by brand/platform/date
  - ai_usage table: API call tracking for Claude/Gemini with cost per operation
  - ai_cost_tracking view: monthly cost breakdown grouped by model and operation
  - monthly_cost_summary view: OVER BUDGET / WARNING / OK thresholds at $15/$12
  - analytics-nightly.json: n8n nightly workflow (2 AM cron) collecting metrics from YouTube/Instagram/Threads
  - README.md: complete workflow inventory, activation order, credential checklist, cost table, known limitations

affects:
  - Any future phase that adds AI API calls (update ai_usage tracking)
  - Any future phase that adds new publishing platforms (add branch to analytics-nightly.json)
  - Cost monitoring: monthly_cost_summary view is the budget health check for all AI operations

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Upsert pattern on (content_bank_id, platform, metric_date) prevents duplicate nightly metric rows
    - Placeholder row pattern for Twitter analytics gap: zeros + raw_response error JSON for absent-API platforms
    - IF-branch-per-platform pattern in n8n: each platform is a conditional branch guarded by visual_assets field check

key-files:
  created:
    - content-engine/supabase/migrations/003_analytics.sql
    - content-engine/supabase/migrations/test_003_analytics.sh
    - content-engine/n8n-workflows/analytics-nightly.json
    - content-engine/n8n-workflows/README.md
  modified: []

key-decisions:
  - "Twitter analytics use placeholder rows with free_tier_no_read_access error — free tier has no read access, $100/month Basic tier contradicts zero-subscriptions goal"
  - "Substack Notes excluded from nightly analytics entirely — no public API for Note engagement metrics"
  - "UNIQUE(content_bank_id, platform, metric_date) constraint makes upsert pattern idempotent — safe to run analytics-nightly multiple times per day"
  - "ai_usage table created with IF NOT EXISTS — content-engine backend may already use it; migration is additive"
  - "Monthly budget thresholds: OVER BUDGET at $15, WARNING at $12 — gives 3-dollar warning buffer before hard limit"

patterns-established:
  - "Nightly analytics upsert: ON CONFLICT (content_bank_id, platform, metric_date) — safe re-runs"
  - "Platform branch IF guard: check visual_assets.{platform}_post_id before attempting API call"
  - "Budget monitoring view pattern: CASE WHEN > threshold THEN 'STATUS' in SQL view, checked nightly by n8n"

requirements-completed: [SC-8, SC-9, SC-11]

# Metrics
duration: 4min
completed: 2026-03-05
---

# Phase 10 Plan 07: Analytics Feedback Loop and Multi-Brand Routing Summary

**Supabase 003_analytics.sql migration with platform_analytics table + ai_cost_tracking view, plus n8n nightly cron collecting YouTube/Instagram/Threads engagement metrics with Twitter read-access gap documented**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-05T01:25:55Z
- **Completed:** 2026-03-05T01:29:47Z
- **Tasks:** 2
- **Files created:** 4

## Accomplishments

- Created `003_analytics.sql` migration: platform_analytics table with platform CHECK constraint, ai_usage table, ai_cost_tracking view grouped by month/model/operation, monthly_cost_summary view with OVER BUDGET/WARNING/OK thresholds
- Created `analytics-nightly.json`: n8n nightly workflow at 2 AM (0 2 \* \* \*) with parallel branches for YouTube, Instagram, Threads, and Twitter (placeholder), plus budget check triggering Slack alert and Google Sheets Analytics tab update
- Created `README.md`: complete Phase 10 n8n workflow documentation with 8-workflow inventory, activation order, credential checklist, monthly cost estimate (~$5-12/month, under $15 target), and known limitations

## Task Commits

Each task was committed atomically:

1. **TDD RED: Migration test** - `ca11d5f` (test)
2. **Task 1: 003_analytics.sql migration** - `f223d14` (feat)
3. **Task 2: analytics-nightly.json + README.md** - `9d8a2a4` (feat)

## Files Created/Modified

- `content-engine/supabase/migrations/003_analytics.sql` — platform_analytics table, ai_usage table, ai_cost_tracking view, monthly_cost_summary view, multi-brand routing documentation
- `content-engine/supabase/migrations/test_003_analytics.sh` — TDD test script verifying all 11 structural requirements (runs clean, all pass)
- `content-engine/n8n-workflows/analytics-nightly.json` — Nightly n8n workflow: cron trigger, Supabase fetch of published rows, 4 platform branches (YouTube/Instagram/Threads/Twitter), budget check, Slack alert, Google Sheets Analytics tab update
- `content-engine/n8n-workflows/README.md` — Phase 10 complete workflow documentation

## Decisions Made

- **Twitter analytics: placeholder rows** — Twitter/X free API has no read access for engagement metrics. POST /2/tweets (publishing) works free, but GET tweet metrics cost $100/month (Basic tier). Decision: log placeholder rows with `{"error": "free_tier_no_read_access"}`, track manually at analytics.twitter.com.
- **Substack excluded** — No public API for Substack Note metrics. Entirely omitted from analytics workflow.
- **UNIQUE constraint makes upsert idempotent** — Running analytics-nightly twice in one day safely overwrites with latest values rather than creating duplicate rows.
- **ai_usage table uses CREATE IF NOT EXISTS** — Additive migration, safe to apply even if content-engine backend already created the table in a different migration run.
- **Budget thresholds at $12/$15** — $12 is WARNING (3-dollar buffer), $15 is OVER BUDGET. Monthly cost estimate at 2 videos/week cadence is ~$5-12/month.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

Before activating `analytics-nightly.json`:

1. Apply `003_analytics.sql` migration to Supabase (run in Supabase SQL editor)
2. Configure n8n credentials (see README.md credential checklist)
3. Create `Analytics` tab in the Content Bank Google Sheet with columns: Date | Topic | Brand | Platform | Views | Likes | Comments | Shares | Reach
4. Set Google Sheet ID in the `Update Google Sheets Analytics Tab` node
5. Activate LAST in the workflow activation order (after first content is published)

## Next Phase Readiness

Phase 10 is now complete. All 7 plans delivered:

- 10-01: Content bank Supabase schema + Google Sheets sync (content-bank-sync.json)
- 10-02: Cloud Run video post-production pipeline (Flask app, ffmpeg, Whisper)
- 10-03: AI content generation (Gemini 2.5 Pro clip analysis + Claude brand voice)
- 10-04: Slack approval workflow (slack-approval.json)
- 10-05: YouTube + Twitter publishers (platform-publishers/youtube.json, twitter.json)
- 10-06: Instagram + Substack + Threads publishers (platform-publishers/instagram.json, substack.json, threads.json)
- 10-07: Analytics feedback loop + multi-brand routing (003_analytics.sql, analytics-nightly.json, README.md)

The complete automated content pipeline is documented and ready for credential configuration + activation.

## Self-Check: PASSED

- `content-engine/supabase/migrations/003_analytics.sql` — FOUND
- `content-engine/n8n-workflows/analytics-nightly.json` — FOUND
- `content-engine/n8n-workflows/README.md` — FOUND
- `.planning/phases/10-automated-content-preparation-distribution-pipeline/10-07-SUMMARY.md` — FOUND
- Commit `ca11d5f` (TDD RED test) — FOUND
- Commit `f223d14` (003_analytics.sql migration) — FOUND
- Commit `9d8a2a4` (analytics-nightly + README) — FOUND

---

_Phase: 10-automated-content-preparation-distribution-pipeline_
_Completed: 2026-03-05_

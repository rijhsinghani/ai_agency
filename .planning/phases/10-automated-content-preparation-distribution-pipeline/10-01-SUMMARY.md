---
phase: 10-automated-content-preparation-distribution-pipeline
plan: 01
subsystem: database
tags:
  [supabase, postgresql, n8n, google-sheets, bidirectional-sync, content-bank]

# Dependency graph
requires:
  - phase: 08-content-production-repurposing
    provides: research/output/topic-bank.md with 12 ranked topics and Reddit evidence
  - phase: 07-case-studies-content-tooling
    provides: content/case-studies/ and ops/packages/ source material for seed rows

provides:
  - content_bank Supabase table with CHECK constraints, FK to content_engine_videos, updated_at trigger
  - brands Supabase table with unique constraint and credential routing columns
  - 20 seeded content_bank rows (12 Reddit topics + 5 case studies + 3 Raj Photo Video)
  - n8n workflow JSON for bidirectional Supabase <-> Google Sheets sync with anti-loop guard
  - Directory structure: content-engine/supabase/migrations/ and content-engine/n8n-workflows/

affects:
  - 10-02 (video post-production) — reads content_bank rows to find recorded content
  - 10-03 (AI content generation) — writes generated drafts to content_bank
  - 10-04 (Slack approval) — reads content_bank rows in pending_review status
  - 10-05 (multi-platform publishing) — reads content_bank rows in approved status
  - 10-06 (multi-brand support) — uses brands table for credential routing

# Tech tracking
tech-stack:
  added:
    - Supabase Realtime (via n8n supabaseTrigger node)
    - n8n Google Sheets bidirectional sync pattern
    - content_bank status state machine (idea → draft → ready → recorded → processing → pending_review → approved → published → archived → rejected)
  patterns:
    - sync_source field as anti-loop guard for bidirectional sync (supabase vs sheets values)
    - sheets_row_id as row address written back on first append, used for subsequent updates
    - Brand CHECK constraint limiting to allowed values at DB level
    - platform_angles JSONB with 6 standardized keys (youtube_long, youtube_short, twitter, instagram, substack, threads)

key-files:
  created:
    - content-engine/supabase/migrations/002_content_bank.sql
    - content-engine/n8n-workflows/content-bank-sync.json
  modified: []

key-decisions:
  - "sync_source anti-loop pattern: Direction A only processes sync_source='supabase' rows; Direction B sets sync_source='supabase' immediately after writing to Supabase, preventing bounce-back"
  - "sheets_row_id write-back: Direction A captures the Google Sheets row number after append and writes it back to content_bank — enables targeted row updates without full-sheet scans"
  - "20 seeded rows from real research data: 12 from Reddit topic bank, 5 from content-plan.md case study angles, 3 Raj Photo Video cross-pollination — no invented topics"
  - "platform_angles: 6 standardized platform keys across all rows — youtube_long, youtube_short, twitter, instagram, substack, threads"
  - "content-engine/n8n-workflows/platform-publishers/ directory pre-created for Phase 10 later plans"

patterns-established:
  - "content_bank status machine: all status transitions must use the CHECK constraint enum values"
  - "brand enum: sameer_automations and raj_photo_video — all new brand-specific content must add to brands table first"
  - "sync_source guard: any workflow writing to content_bank must set sync_source='supabase' to prevent Direction B from re-syncing the write"

requirements-completed: [SC-1, SC-8]

# Metrics
duration: 6min
completed: 2026-03-04
---

# Phase 10 Plan 01: Content Bank and Google Sheets Sync Summary

**Supabase content_bank schema with 20 seeded topics and n8n bidirectional Google Sheets sync using sync_source anti-loop guard**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-04T23:14:20Z
- **Completed:** 2026-03-04T23:20:38Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- content_bank and brands tables created with CHECK constraints, FK references, and updated_at trigger
- 20 content bank rows seeded from real research data: 12 Reddit topic bank topics (sameer_automations/idea), 5 case study angles (sameer_automations/draft), 3 Raj Photo Video cross-pollination topics (raj_photo_video/idea)
- n8n workflow JSON with Direction A (Supabase trigger → Google Sheets append/update) and Direction B (Google Sheets 5-min polling → Supabase update) with sync_source anti-loop guard and sheets_row_id write-back

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Supabase migration for content_bank and brands tables** - `519cd49` (feat)
2. **Task 2: Create n8n bidirectional Supabase <-> Google Sheets sync workflow** - `71d4143` (feat)

## Files Created/Modified

- `content-engine/supabase/migrations/002_content_bank.sql` — content_bank DDL, brands DDL, updated_at trigger, 2 brands + 20 content_bank seed rows with full platform_angles and talking_points
- `content-engine/n8n-workflows/content-bank-sync.json` — n8n workflow with 8 nodes (2 triggers, 2 IF filters, 2 Sheets nodes, 1 Supabase update, 1 sheets_row_id write-back), connection graph, setup notes

## Decisions Made

- sync_source anti-loop: Direction A filters on sync_source='supabase' — Direction B sets sync_source='supabase' immediately after Supabase write. This prevents the Supabase trigger from re-triggering Direction A for Direction B writes, breaking the loop.
- sheets_row_id write-back on first append: captures the Google Sheets row number so all future updates target the correct row rather than scanning or appending a duplicate
- All 20 seed rows use real topic data from research/output/topic-bank.md and content/youtube/content-plan.md — no synthetic topic titles or invented hooks
- platform_angles standardized to 6 keys across all rows: youtube_long, youtube_short, twitter, instagram, substack, threads

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

The n8n workflow requires manual configuration before activation. See `content-engine/n8n-workflows/content-bank-sync.json` notes field for full steps. Required manual actions:

1. Create Google Sheet named "Content Bank" with the 12 columns in order
2. Configure Supabase API credential in n8n (URL + service role key)
3. Configure Google Sheets OAuth2 credential in n8n
4. Paste Sheet ID into the 3 Document ID fields in the workflow nodes
5. Toggle workflow to Active

Supabase migration must be run against the content-engine Supabase project (`supabase db push` or paste into SQL editor).

## Self-Check

**Files exist:**

- `content-engine/supabase/migrations/002_content_bank.sql` — FOUND
- `content-engine/n8n-workflows/content-bank-sync.json` — FOUND

**Commits exist:**

- `519cd49` feat(10-01): create content_bank and brands Supabase migration — FOUND
- `71d4143` feat(10-01): create n8n bidirectional Supabase <-> Google Sheets sync workflow — FOUND

**Verification checks passed:**

- INSERT count: 20 (meets >= 20 requirement)
- Both tables referenced in migration: confirmed (35 lines)
- JSON valid: confirmed (python3 json.load passes)
- sync_source anti-loop guard present: confirmed (17 occurrences)
- Credential placeholders present: confirmed (6 occurrences)
- Both trigger directions present: confirmed (2 trigger node types)

## Self-Check: PASSED

## Next Phase Readiness

- content_bank table is ready to receive data from Phase 10 Plan 02 (video post-production pipeline)
- brands table credential routing columns are ready for Phase 10 Plan 06 (multi-brand support)
- n8n workflow requires credential setup and activation before bidirectional sync is live
- 20 seed rows in idea/draft status provide immediate content backlog for content generation workflow

---

_Phase: 10-automated-content-preparation-distribution-pipeline_
_Completed: 2026-03-04_

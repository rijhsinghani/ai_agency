---
phase: 10-automated-content-preparation-distribution-pipeline
plan: "06"
subsystem: api
tags:
  [
    n8n,
    instagram,
    reels,
    threads,
    substack,
    meta-graph-api,
    n8n-nodes-substack,
    publisher,
    two-step-upload,
  ]

# Dependency graph
requires:
  - phase: 10-04
    provides: content_bank status lifecycle (pending_review → approved), Supabase trigger pattern, credential placeholder conventions
  - phase: 10-01
    provides: content_bank schema, platform_angles JSONB keys (instagram, threads, substack), visual_assets JSONB structure (clips, thumbnails)
  - phase: 10-03
    provides: AI-generated platform_angles fields populated in content_bank

provides:
  - n8n workflow JSON (instagram.json): Instagram Reels two-step upload via Meta Graph API v22.0
  - n8n workflow JSON (substack.json): Substack Notes publishing via n8n-nodes-substack community node
  - n8n workflow JSON (threads.json): Threads text + image post via Meta Graph API v22.0
  - GCS signed URL pattern (3600s expiry) for Instagram video hosting
  - Polling retry loop (10 retries, 15s interval) for Instagram FINISHED status
  - Session cookie auth pattern with Slack error alert for Substack cookie expiry
  - Threads organic video limitation documented with monitor note

affects:
  - n8n import and activation (all 3 workflows ready to import)
  - Meta Graph API credential setup (shared between instagram.json and threads.json)
  - Substack community node install requirement

# Tech tracking
tech-stack:
  added:
    - n8n-nodes-base.supabaseTrigger (status=approved filter, same pattern as slack-approval.json)
    - n8n-nodes-base.wait (30s initial + 15s retry intervals for Instagram polling)
    - n8n-nodes-base.code (GCS signed URL generation with 3600s expiry)
    - n8n-nodes-substack.substack (community node for Substack Notes, onError:continueErrorOutput)
    - Meta Graph API v22.0 (Instagram Reels two-step, Threads two-step)
  patterns:
    - Instagram Reels two-step: POST /media (REELS + video_url) → poll /status_code until FINISHED → POST /media_publish
    - Threads two-step: POST /threads (IMAGE or TEXT) → POST /threads_publish (no polling needed)
    - GCS signed URL 3600s expiry: prevents 403 during Instagram's 30-120s download phase
    - Retry cap (max 10): graceful skip on timeout without workflow failure, logs container_id for debugging
    - onError:continueErrorOutput on Substack node: routes auth failures to Slack alert instead of workflow crash
    - JSONB merge pattern: spreads existing content_bank JSONB field before adding new keys (preserves other platform data)

key-files:
  created:
    - content-engine/n8n-workflows/platform-publishers/instagram.json
    - content-engine/n8n-workflows/platform-publishers/substack.json
    - content-engine/n8n-workflows/platform-publishers/threads.json
  modified: []

key-decisions:
  - "GCS signed URL 3600s minimum: Instagram takes 30-120s to process after container creation; short-lived URLs (< 60s) return 403 during download phase"
  - "Threads video not supported organically (early 2026): posts text + thumbnail image instead; VIDEO media_type requires Threads Ads; documented with monitor note"
  - "Substack Notes only (not long-form): community node publishes Notes (short-form); long-form newsletter posts require manual Substack editor — intentional v1 scope"
  - "onError:continueErrorOutput on Substack node: auth failures route to Slack alert with fix instructions instead of crashing workflow"
  - "Retry cap at 10 (max 3 min total): graceful skip on polling timeout, logs container_id for investigation in Meta API Dashboard"
  - "Same META_ACCESS_TOKEN env var for Instagram and Threads: shared Meta Developer App; both workflows read from same env var"
  - "SUBSTACK_CRED_ID_PLACEHOLDER with monthly rotation reminder: session cookie expires, Slack alert triggers on expiry"

patterns-established:
  - "Supabase JSONB merge on update: JSON.stringify({ ...existingField, newKey: newValue }) preserves all existing platform data when updating content_bank"
  - "Meta Graph API two-step publish: container creation → publish is consistent between Instagram Reels and Threads; Threads skips polling (immediate publish)"
  - "Graceful skip pattern: no-clips and no-content branches use Set node with skipped_reason log instead of error node"

requirements-completed: [SC-6, SC-7]

# Metrics
duration: 5min
completed: "2026-03-05"
---

# Phase 10 Plan 06: Instagram, Substack, and Threads Publisher Workflows Summary

**Three n8n publisher workflows completing the multi-platform distribution layer: Instagram Reels two-step Meta Graph API upload with GCS signed URL and polling retry, Substack Notes via community node with session cookie auth and Slack error alert, and Threads text+image post with documented organic video limitation**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-05T01:18:08Z
- **Completed:** 2026-03-05T01:23:03Z
- **Tasks:** 2 of 2 complete
- **Files modified:** 3 (all created)

## Accomplishments

- Complete Instagram Reels publisher: Supabase trigger → filter approved + has clips → best clip selection (highest strength_score) → GCS signed URL (3600s) → create REELS container → 30s initial wait → poll until FINISHED (10 retries, 15s each) → publish → update content_bank with instagram_post_id
- Complete Substack Notes publisher: Supabase trigger → filter approved + has substack content → prepare note body with booking CTA → publish via n8n-nodes-substack community node → error handler with Slack alert for cookie expiry → update content_bank
- Complete Threads publisher: Supabase trigger → filter approved + has threads content → check thumbnail availability → IMAGE (text + thumbnail) or TEXT-only branch → two-step create+publish → update content_bank with threads_post_id; video limitation thoroughly documented

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Instagram Reels publisher n8n workflow** - `bb24611` (feat)
2. **Task 2: Build Substack Notes and Threads publisher n8n workflows** - `4f61e5c` (feat)

**Plan metadata:** (committed with this summary)

## Files Created/Modified

- `content-engine/n8n-workflows/platform-publishers/instagram.json` — Instagram Reels publisher: two-step Meta Graph API upload (create container → poll FINISHED → publish), GCS signed URL with 3600s expiry, up to 10 polling retries, credential placeholder for META_ACCESS_TOKEN, setup guide with Business account and Facebook Page requirements
- `content-engine/n8n-workflows/platform-publishers/substack.json` — Substack Notes publisher: n8n-nodes-substack community node with session cookie auth, error handler routing to Slack alert on cookie expiry, long-form posts explicitly excluded (manual per v1 roadmap), monthly rotation reminder
- `content-engine/n8n-workflows/platform-publishers/threads.json` — Threads publisher: IMAGE type with thumbnail + TEXT fallback, two-step create+publish (no polling), same META_ACCESS_TOKEN as instagram.json, organic video limitation documented with monitor note (@threadsapi.changelog)

## Decisions Made

- **GCS signed URL 3600s minimum**: Instagram takes 30-120s to process video after container creation. URLs shorter than 60s will 403 during Instagram's download phase. 3600s enforced as minimum; public GCS URLs are the production recommendation for published clips.
- **Threads organic video not supported**: Threads API as of early 2026 does not support organic video — only Threads Ads. Workflow posts text + thumbnail image with clear documentation of the limitation and a monitor note.
- **Substack Notes only**: The community node targets Notes (short-form, conversational) not long-form newsletter posts. Long-form requires Substack editor — intentional v1 scope boundary.
- **onError:continueErrorOutput on Substack**: Auth failures (expired session cookie) route to a Slack alert node instead of crashing the workflow. Alert message includes plain-English fix instructions.
- **Same Meta app for Instagram + Threads**: Both workflows share META_ACCESS_TOKEN. The Meta Developer App needs both Instagram Graph API and Threads API products added, and both scopes in the access token.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**External services require manual configuration. Three workflows need credentials before activation:**

### Instagram Publisher

1. Create Meta Developer App (developers.facebook.com → Create App → Business type)
2. Add Instagram Graph API product
3. Instagram account must be Business or Creator type with connected Facebook Page
4. Generate long-lived access token with scopes: `instagram_basic, instagram_content_publish, pages_read_engagement`
5. Set environment variables: `META_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`
6. Import `instagram.json` into n8n → toggle Active

### Threads Publisher

1. Same Meta app as Instagram
2. Add Threads API product in App Dashboard
3. Add scopes: `threads_basic, threads_content_publish`
4. Set environment variable: `THREADS_USER_ID` (same as or linked to Instagram user ID)
5. Import `threads.json` into n8n → toggle Active

### Substack Publisher

1. n8n → Settings → Community Nodes → Install → search `n8n-nodes-substack`
2. Restart n8n if prompted
3. Log into Substack in browser → DevTools → Application → Cookies → copy `substack.sid` value
4. n8n → Credentials → Add → Substack → paste cookie value → name: "Substack Sameer"
5. Import `substack.json` into n8n → toggle Active
6. Set monthly reminder to rotate session cookie (cookie expires periodically)

## Next Phase Readiness

- All three platform publisher workflows are importable n8n JSONs with credential placeholders
- Multi-platform distribution layer is complete: Twitter (Phase 10-05), YouTube (Phase 10-05), Instagram, Substack, Threads (this plan)
- Phase 10 publishing pipeline is architecturally complete — all 5 platforms covered
- Remaining: activate workflows after credential setup (user action required per User Setup above)

---

_Phase: 10-automated-content-preparation-distribution-pipeline_
_Completed: 2026-03-05_

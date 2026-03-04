---
phase: 10-automated-content-preparation-distribution-pipeline
plan: "03"
subsystem: api
tags:
  [
    gemini,
    claude,
    anthropic,
    ffmpeg,
    gcs,
    supabase,
    content-generation,
    video-clips,
    thumbnails,
  ]

requires:
  - phase: 10-02
    provides: run_pipeline Flask endpoint with 9-step ffmpeg video processing pipeline
  - phase: 10-01
    provides: content_bank Supabase table with platform_angles and visual_assets JSONB columns

provides:
  - Gemini 3.1 Pro video analysis returning 5-8 clip timestamps as structured JSON
  - ffmpeg 9:16 clip extraction (1080x1920) with burned-in captions from SRT
  - Claude API content generation for 6 platforms with 19-phrase anti-slop banlist
  - GCS thumbnail trigger JSON for claude-thumbnails skill
  - main.py Steps 10-12 as non-fatal post-processing after video encode

affects:
  - 10-04 (Slack approval workflow reads content_bank rows with status=pending_review)
  - 10-05 (multi-platform publishing reads platform_angles JSONB)
  - claude-thumbnails skill (reads thumbnails-pending/ GCS prefix)

tech-stack:
  added:
    - google-generativeai (Gemini 3.1 Pro via genai.GenerativeModel)
    - anthropic (Claude API via anthropic.Anthropic)
  patterns:
    - patch.object(module, "genai", mock) for mocking pre-imported third-party modules in tests
    - Non-fatal try/except blocks for AI post-processing steps (pipeline never fails due to AI)
    - Anti-slop BANLIST injected into Claude system prompt on every generation call
    - Markdown code fence stripping for both Gemini and Claude JSON responses

key-files:
  created:
    - content-engine/video-pipeline/services/clip_extraction.py
    - content-engine/video-pipeline/services/content_generator.py
    - content-engine/video-pipeline/services/thumbnail_trigger.py
    - content-engine/video-pipeline/tests/test_clip_extraction.py
    - content-engine/video-pipeline/tests/test_content_generator.py
  modified:
    - content-engine/video-pipeline/main.py

key-decisions:
  - "patch.object(ce, 'genai', mock_genai) used instead of sys.modules patch — google.generativeai is already imported at module load time; patching the module attribute is the correct approach"
  - "SLOP_BANLIST has 19 phrases, not 8 — expanded beyond plan minimum for complete brand voice protection"
  - "store_drafts_in_supabase uses zip(clip_paths, clip_metadata) to pair paths with metadata — clean one-pass approach"
  - "thumbnail_trigger uses content_bank_id[:8] in filename — short enough to avoid GCS key length issues while remaining traceable"

patterns-established:
  - "Anti-slop BANLIST: inject full banlist as prompt context on every Claude generation call; log warnings on detection but never fail (human reviews before publishing)"
  - "Non-fatal AI steps: wrap Steps 10-12 in try/except with logger.warning; pipeline success depends only on video encode, not AI generation"
  - "GCS trigger pattern: write JSON trigger files to named prefixes (thumbnails-pending/) for async skill processing"

requirements-completed:
  - SC-3
  - SC-4
  - SC-10

duration: 4min
completed: "2026-03-04"
---

# Phase 10 Plan 03: AI Content Generation Layer Summary

**Gemini 3.1 Pro clip extraction + Claude 6-platform content drafts with 19-phrase anti-slop banlist, GCS thumbnail trigger, wired into pipeline as non-fatal Steps 10-12**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-04T23:23:22Z
- **Completed:** 2026-03-04T23:27:55Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Gemini 3.1 Pro video analysis service identifies 5-8 clip moments with structured JSON (start/end time, hook, type, strength_score); ffmpeg extracts each at 9:16 (1080x1920) with SRT caption burn-in
- Claude content generator produces all 6 platform formats from transcript; 19-phrase slop banlist injected into every prompt; youtube_title auto-truncated to 60 chars
- GCS thumbnail trigger writes JSON to thumbnails-pending/ prefix for claude-thumbnails skill; main.py Steps 10-12 are fully non-fatal — pipeline never fails due to AI generation issues

## Task Commits

Each task was committed atomically:

1. **Task 1: Build clip extraction service (Gemini 3.1 Pro + ffmpeg 9:16 cuts)** - `ad0f982` (feat)
2. **Task 2: Build content generator, thumbnail trigger, wire into main.py** - `78f96ed` (feat)

TDD RED commits (test first):

- `839726e` - test: add failing tests for clip_extraction service
- `ddbb666` - test: add failing tests for content_generator, thumbnail_trigger, main.py wiring

## Files Created/Modified

- `content-engine/video-pipeline/services/clip_extraction.py` - Gemini 3.1 Pro video analysis + ffmpeg 9:16 clip extraction
- `content-engine/video-pipeline/services/content_generator.py` - Claude API content generation with anti-slop banlist + Supabase storage
- `content-engine/video-pipeline/services/thumbnail_trigger.py` - GCS trigger file writer for claude-thumbnails skill
- `content-engine/video-pipeline/main.py` - Added Steps 10-12 (clip extraction, content generation, thumbnail trigger)
- `content-engine/video-pipeline/tests/test_clip_extraction.py` - 16 tests covering \_parse_mm_ss, Gemini mock, ffmpeg behavior
- `content-engine/video-pipeline/tests/test_content_generator.py` - 21 tests covering all 6 platforms, slop banlist, Supabase, thumbnail trigger, main.py wiring

## Decisions Made

- Used `patch.object(module, "genai", mock)` instead of `sys.modules` patching — `google.generativeai` is already imported at module load time; patching the module attribute is the correct approach for already-imported dependencies
- Expanded SLOP_BANLIST to 19 phrases (plan required 8 minimum) — comprehensive brand voice protection
- All three AI steps are wrapped in non-fatal `try/except` with `logger.warning` — this is deliberate: the video is already processed and uploaded by the time AI runs; AI generation is best-effort

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed test mocking strategy for already-imported google.generativeai**

- **Found during:** Task 1 GREEN phase
- **Issue:** `patch.dict("sys.modules", {"google.generativeai": mock})` failed to intercept calls because `google.generativeai` was already imported and bound as `genai` in the module
- **Fix:** Switched all Gemini API tests to use `patch.object(ce, "genai", mock_genai)` — patches the module-level reference directly
- **Files modified:** tests/test_clip_extraction.py
- **Verification:** All 16 clip_extraction tests pass
- **Committed in:** ad0f982 (part of Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Test infrastructure fix only. No scope change. All 57 tests passing.

## Issues Encountered

None beyond the auto-fixed test mocking issue above.

## User Setup Required

External services require manual configuration before the AI generation steps activate in production:

**GEMINI_API_KEY**

- Source: Google AI Studio → Get API key at aistudio.google.com
- Required for: analyze_video_for_clips (Gemini 3.1 Pro video analysis)

**ANTHROPIC_API_KEY**

- Source: Anthropic Console → API Keys at console.anthropic.com
- Required for: generate_platform_content (Claude content drafts)

Both keys must be set as environment variables (or Cloud Run secrets). The pipeline runs successfully without them — Steps 10-12 fail gracefully with warning logs.

## Next Phase Readiness

- content_bank rows will have status=pending_review after AI generation runs
- platform_angles JSONB populated with all 6 platform drafts
- visual_assets.clips populated with clip paths and metadata
- thumbnails-pending/ GCS prefix populated with trigger files for claude-thumbnails skill
- Ready for Phase 10-04: Slack approval workflow to present pending_review rows for human review

---

_Phase: 10-automated-content-preparation-distribution-pipeline_
_Completed: 2026-03-04_

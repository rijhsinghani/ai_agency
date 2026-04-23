---
phase: 08-content-production-repurposing
plan: 02
subsystem: tooling
tags:
  [
    nodejs,
    cli,
    commander,
    jest,
    supadata,
    anthropic,
    youtube,
    transcript,
    content-generation,
  ]

# Dependency graph
requires:
  - phase: 07-case-studies-content-tooling
    provides: content-idea-cli pattern (Commander.js, Jest, CommonJS, package.json structure)
provides:
  - Node.js CLI at research/tools/repurposing-script/ that extracts YouTube transcripts via Supadata and generates 3 platform drafts via Claude API
  - 4 lib modules: transcript.js, formatter.js, generator.js, queue.js
  - 26 passing Jest tests with mocked external APIs
  - review/.gitkeep directory placeholder tracked in git
  - BANNED_PHRASES list enforced in generation system prompt
affects:
  - 08-content-production-repurposing (phase 8 plan 03 if any)
  - 10-content-automation-pipeline (will build on this foundation)

# Tech tracking
tech-stack:
  added:
    ["@supadata/js", "@anthropic-ai/sdk", "commander@^14.0.3", "jest@^29.0.0"]
  patterns:
    [
      "TDD with mocked external SDKs via jest.mock()",
      "Async polling pattern for 202/jobId responses",
      "Platform-specific prompt builder with BANNED_PHRASES injection",
      "Review queue with slug-based file naming",
      "Transcript caching to avoid redundant API credits",
    ]

key-files:
  created:
    - research/tools/repurposing-script/index.js
    - research/tools/repurposing-script/lib/transcript.js
    - research/tools/repurposing-script/lib/formatter.js
    - research/tools/repurposing-script/lib/generator.js
    - research/tools/repurposing-script/lib/queue.js
    - research/tools/repurposing-script/package.json
    - research/tools/repurposing-script/__tests__/transcript.test.js
    - research/tools/repurposing-script/__tests__/generator.test.js
    - research/tools/repurposing-script/__tests__/queue.test.js
    - research/tools/repurposing-script/__tests__/formatter.test.js
    - review/.gitkeep
  modified:
    - .gitignore

key-decisions:
  - "Booking URL (calendar.app.google/psycao3CrXjGnmk48) hardcoded in every twitter and instagram prompt — no variation permitted"
  - "BANNED_PHRASES injected into Claude system prompt on every generation call — brand voice enforced at API level, not post-processing"
  - "Transcript cached as plain text to review/[slug]-transcript.txt — --from-cache flag skips Supadata credit on reruns"
  - "Async polling uses 3s interval with 60-attempt max (3-minute timeout) for long-form video transcripts"
  - "review/*.md excluded from git — drafts are working files, not project artifacts; review/.gitkeep tracked to preserve directory"

patterns-established:
  - "Platform prompt builder pattern: specs map → platform key lookup → transcript slice to 8000 chars"
  - "Slug-based file naming: title → regex normalize → lowercase → leading/trailing dash strip"
  - "Mock-first TDD: jest.mock() at module level, mockImplementation() per test for precise control"

requirements-completed: [TOOL-03]

# Metrics
duration: 3min
completed: 2026-03-02
---

# Phase 8 Plan 02: Repurposing Script CLI Summary

**Node.js CLI (sameer-repurpose) that extracts YouTube transcripts via Supadata and generates Twitter, Instagram, and clip-script drafts via Claude claude-opus-4-6 with BANNED_PHRASES-enforced brand voice — 26 tests, no API keys hardcoded**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-02T22:44:21Z
- **Completed:** 2026-03-02T22:47:25Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- Built complete repurposing CLI with 4 lib modules and Commander.js entry point — `sameer-repurpose --url <youtube-url>` produces 3 platform drafts in review/ folder
- 26 Jest tests passing with fully mocked @supadata/js and @anthropic-ai/sdk — no real API calls in tests, full behavior coverage including async polling and error paths
- BANNED_PHRASES from brand-voice.md injected into every Claude API system prompt — ensures brand voice compliance at the generation layer

## Task Commits

Each task was committed atomically:

1. **Task 1: Write failing tests for all 4 lib modules** - `e8c5da0` (test)
2. **Task 2: Implement lib modules + index.js** - `dcb1882` (feat)

**Plan metadata:** (docs commit follows)

_Note: TDD tasks committed in RED then GREEN phases_

## Files Created/Modified

- `research/tools/repurposing-script/index.js` - CLI entry point with --url, --from-cache, --title flags
- `research/tools/repurposing-script/lib/transcript.js` - Supadata wrapper with sync/async jobId polling
- `research/tools/repurposing-script/lib/formatter.js` - BANNED_PHRASES export + buildPrompt per platform
- `research/tools/repurposing-script/lib/generator.js` - Claude claude-opus-4-6 API generation with brand-voice system prompt
- `research/tools/repurposing-script/lib/queue.js` - review folder file writes, transcript caching, cache loading
- `research/tools/repurposing-script/package.json` - dependencies + bin entry (sameer-repurpose)
- `research/tools/repurposing-script/__tests__/transcript.test.js` - sync, polling, error, timestamped tests
- `research/tools/repurposing-script/__tests__/generator.test.js` - 3 platform returns, system prompt check, transcript in user message
- `research/tools/repurposing-script/__tests__/queue.test.js` - file creation, header check, CTA URL, caching, loading
- `research/tools/repurposing-script/__tests__/formatter.test.js` - BANNED_PHRASES array, buildPrompt per platform
- `review/.gitkeep` - directory placeholder tracked in git
- `.gitignore` - review/\*.md, transcript files excluded

## Decisions Made

- Booking URL hardcoded in every Twitter and Instagram prompt string in formatter.js — no dynamic injection needed; the URL is a permanent brand asset
- BANNED_PHRASES injected as comma-joined string in system prompt — enforcement at Claude API level, not post-processing validation
- Transcript cached as plain .txt file — simpler than JSON for re-reading, identical format to what Claude receives
- Async polling uses `jest.useFakeTimers()` with `runAllTimersAsync()` — test for 3-second polling without real delays
- review/\*.md gitignored — draft files are working artifacts, not codebase artifacts; .gitkeep tracked to preserve directory in fresh clones

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed async error handling in transcript polling test**

- **Found during:** Task 2 (TDD GREEN, running tests)
- **Issue:** `expect(promise).rejects.toThrow()` after `jest.runAllTimersAsync()` caused a "PromiseRejectionHandledWarning" — rejection was thrown before the `await expect()` was reached, marking it as unhandled
- **Fix:** Restructured test to wrap `expect(...).rejects.toThrow()` in a variable before running timers, then await the assertion after; standard pattern for fake-timer rejection tests
- **Files modified:** `research/tools/repurposing-script/__tests__/transcript.test.js`
- **Verification:** Test passes, no unhandled rejection warning, `npm test` shows 26/26 passing
- **Committed in:** `dcb1882` (Task 2 feat commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug in test structure)
**Impact on plan:** Minor test fix, no behavior change. All 26 tests pass cleanly.

## Issues Encountered

None beyond the auto-fixed test structure issue above.

## User Setup Required

**External services require manual configuration before running the CLI against real YouTube videos:**

- `SUPADATA_API_KEY` — sign up at https://supadata.ai, go to API Keys in dashboard. 100 free credits/month, 1 credit per transcript.
- `ANTHROPIC_API_KEY` — get from https://console.anthropic.com — API Keys section. Standard Claude API pricing.

Both keys are read from `process.env` — add them to your shell profile or `.env` file (not committed to git).

**Verification:** `node research/tools/repurposing-script/index.js --url https://youtube.com/watch?v=YOUR_VIDEO_ID --title "My Video Title"`

## Next Phase Readiness

- CLI is complete and tested — ready for use in content production workflow
- `sameer-repurpose` binary entry registered in package.json — can be installed globally with `npm link`
- Phase 10 (Content Automation Pipeline) can use these lib modules as the generation layer
- No blockers for continued content production

## Self-Check: PASSED

All 12 created files verified to exist. Both task commits (e8c5da0, dcb1882) verified in git log.

---

_Phase: 08-content-production-repurposing_
_Completed: 2026-03-02_

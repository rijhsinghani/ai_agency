---
phase: 07-case-studies-content-tooling
plan: "02"
subsystem: content-tooling
tags:
  - cli
  - nodejs
  - content-planning
  - commander
  - tdd
dependency_graph:
  requires:
    - "research/output/topic-bank.md (Phase 05 output)"
    - "content/youtube/content-plan.md (Phase 06 output)"
    - "ops/packages/*.md (existing package definitions)"
  provides:
    - "research/tools/content-idea-cli/ (executable CLI tool)"
    - "research/content-calendar-draft.md (updated with ramp model)"
  affects:
    - "Phase 08 video production (calendar is the filming schedule)"
    - "Content planning sessions (CLI replaces 20-30 min manual review)"
tech_stack:
  added:
    - "Node.js CLI with Commander.js v14.0.3"
    - "Jest v29 for unit testing"
  patterns:
    - "State machine parser for Markdown files"
    - "Soft de-duplication with score penalty (not exclusion)"
    - "Ramp cadence model for social media posting"
    - "80/20 hub model (YouTube-derived vs platform-original content)"
key_files:
  created:
    - "research/tools/content-idea-cli/index.js"
    - "research/tools/content-idea-cli/lib/loader.js"
    - "research/tools/content-idea-cli/lib/parser.js"
    - "research/tools/content-idea-cli/lib/dedup.js"
    - "research/tools/content-idea-cli/lib/scorer.js"
    - "research/tools/content-idea-cli/lib/formatter.js"
    - "research/tools/content-idea-cli/package.json"
    - "research/tools/content-idea-cli/README.md"
    - "research/tools/content-idea-cli/__tests__/parser.test.js"
    - "research/tools/content-idea-cli/__tests__/scorer.test.js"
    - "research/tools/content-idea-cli/__tests__/dedup.test.js"
    - "research/tools/content-idea-cli/__tests__/formatter.test.js"
  modified:
    - "research/content-calendar-draft.md"
decisions:
  - "[07-02] Ramp cadence locked: Weeks 1-2 lighter (1 YouTube + 1 Twitter + 1 Instagram), Weeks 3-4 full (1 YouTube + 3 Twitter + 2 Instagram)"
  - "[07-02] De-duplication is soft penalty (-30%), not hard exclusion — all 12 topics accessible via --count 12"
  - "[07-02] COVERED_THEMES keyword list is the de-dup signal — 5 themes matching existing YouTube content plan"
  - "[07-02] Deferred calendar posts kept as explicit rows marked Deferred to Week 3-4 (not deleted)"
metrics:
  duration: "8 minutes"
  completed: "2026-03-02"
  tasks_completed: 2
  tests_written: 32
  tests_passing: 32
  files_created: 12
  files_modified: 1
---

# Phase 07 Plan 02: Content Tooling — CLI and Calendar Summary

**One-liner:** Node.js content idea CLI (`npx ./research/tools/content-idea-cli`) with state machine parser, soft de-dup penalty scoring, and --count/--focus/--format/--verbose flags; plus updated 4-week content calendar with ramp cadence (Weeks 1-2 lighter), hub model (80% YouTube-derived), and CSV export.

---

## Tasks Completed

| Task | Name                                                           | Commit                          | Files                              |
| ---- | -------------------------------------------------------------- | ------------------------------- | ---------------------------------- |
| 1    | Update content calendar with ramp cadence model and CSV export | bff97e1                         | research/content-calendar-draft.md |
| 2    | Build content idea CLI tool (TDD)                              | 48ca737 (tests), 24acd8a (impl) | 12 files                           |

---

## What Was Built

### Task 1 — Content Calendar Update

Updated `research/content-calendar-draft.md` from full-cadence Week 1 to a ramp model:

- **Weeks 1-2 (lighter):** 1 YouTube + 1 Twitter + 1 Instagram per week. Excess posts deferred (not deleted).
- **Weeks 3-4 (full):** 1 YouTube + 3 Twitter + 2 Instagram per week.
- **Hub model rule added:** 80% of Twitter/Instagram content derives from YouTube videos. Up to 20% can be platform-original.
- **Week 2 decision note:** Explicit decision gate — add second YouTube video only if Week 1 production was smooth.
- **CSV export section:** Full calendar data in importable CSV format for Buffer/Google Sheets.
- **Deferred posts preserved:** All excess Week 1-2 posts are in explicit "Deferred to Week 3-4" tables, not deleted.

### Task 2 — Content Idea CLI Tool

Built a complete Node.js CLI at `research/tools/content-idea-cli/` using TDD (32 unit tests, all passing):

**Architecture:**

- `index.js` — Commander.js entry point with `--count`, `--focus`, `--format`, `--verbose` flags
- `lib/loader.js` — `resolveRoot()` (CONSULTANCY_ROOT env or script-relative), `loadSources()` (topic-bank required, others optional with warning)
- `lib/parser.js` — State machine parser for topic-bank.md. Reads `### N. Title` headings, extracts Score, Package, Status, Content angle, Subreddits, Evidence quotes.
- `lib/dedup.js` — Soft de-duplication using 5 COVERED_THEMES keyword lists. Marks topics `alreadyCovered: true` but does NOT exclude them.
- `lib/scorer.js` — Applies scoring modifiers (package +15%, de-dup -30%, format +5%), filters by --focus, sorts descending, slices to --count.
- `lib/formatter.js` — Markdown output. Default: title + hook + package. Verbose: adds score breakdown, subreddit list, evidence post count.

**Verified behaviors:**

- `npx ./research/tools/content-idea-cli` — returns 5 topics with hooks
- `npx ./research/tools/content-idea-cli --verbose` — shows score breakdowns with de-dup reasons
- `npx ./research/tools/content-idea-cli --count 12` — returns all 12 topics (de-dup is penalty, not exclusion)
- `npx ./research/tools/content-idea-cli --focus hvac` — filters to HVAC-relevant topics
- `npx ./research/tools/content-idea-cli --format twitter` — applies Twitter scoring adjustment

---

## Deviations from Plan

None — plan executed exactly as written. The parser was adapted to handle the actual `### N. Title` numbered heading format in topic-bank.md (the spec mentioned this as an implementation decision to make during build).

---

## Self-Check

### Files Exist

- research/tools/content-idea-cli/index.js: FOUND
- research/tools/content-idea-cli/lib/parser.js: FOUND
- research/tools/content-idea-cli/lib/loader.js: FOUND
- research/tools/content-idea-cli/lib/scorer.js: FOUND
- research/tools/content-idea-cli/lib/dedup.js: FOUND
- research/tools/content-idea-cli/lib/formatter.js: FOUND
- research/content-calendar-draft.md: FOUND

### Commits Exist

- bff97e1 (Task 1: calendar update): FOUND
- 48ca737 (TDD RED: failing tests): FOUND
- 24acd8a (TDD GREEN: implementation): FOUND

### Verification Checks

- CLI produces 5 topics by default: PASS
- --verbose shows Score breakdown: PASS
- --count 12 returns 12 topics: PASS
- --focus hvac returns HVAC topics: PASS
- Calendar has ramp/hub model/CSV export: PASS
- package.json has sameer-ideas bin field: PASS
- All 32 unit tests pass: PASS

## Self-Check: PASSED

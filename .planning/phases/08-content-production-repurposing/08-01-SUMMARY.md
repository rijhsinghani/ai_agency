---
phase: 08-content-production-repurposing
plan: 01
subsystem: content
tags: [youtube, sop, production, checklist, content-workflow]

# Dependency graph
requires:
  - phase: 07-case-studies-content-tooling
    provides: content-plan.md with 6-section video structure and content calendar
  - phase: 06-platform-foundation
    provides: brand-voice.md with locked CTA wording and booking URL
provides:
  - ops/sop/outline-template.md — fill-in video outline for 6-section YouTube structure
  - ops/sop/recording-checklist.md — pre-shoot, during-shoot, and wrap checklists
  - ops/sop/editing-checklist.md — tool-agnostic editing workflow with two CTA placements
  - ops/sop/publish-checklist.md — upload metadata, description template, scheduling, post-publish
affects: [08-02-video-1-production, content/videos]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SOP checklists are tool-agnostic and outcome-based — describes the result to achieve, not the software menu to click"
    - "Two-CTA model — mid-video at ~60% mark and end screen at final 15 seconds — documented in editing checklist"
    - "Description template with chapters, booking link, and hashtags embedded in publish checklist"

key-files:
  created:
    - ops/sop/outline-template.md
    - ops/sop/recording-checklist.md
    - ops/sop/editing-checklist.md
    - ops/sop/publish-checklist.md
  modified: []

key-decisions:
  - "[08-01] Pre-film verification checklist embedded in outline template — ensures filming does not start before outline is complete"
  - "[08-01] Tool-agnostic editing checklist — outcome-based items only, no software-specific menu references"
  - "[08-01] Two-CTA rule documented in editing checklist — mid-video at 60% mark + end screen at 15 seconds"
  - "[08-01] Description template hardcoded in publish checklist — booking URL, hashtags, and chapter structure locked"

patterns-established:
  - "SOP version tracking: every checklist ends with version note and validation instruction after Video 1 production cycle"
  - "File naming convention for video production: content/videos/raw/[video-slug]/ and content/videos/edited/[video-slug]/"

requirements-completed: [PROD-02]

# Metrics
duration: 2min
completed: 2026-03-02
---

# Phase 8 Plan 01: Production SOP Checklists Summary

**Four production SOP checklists covering the full YouTube video workflow: outline-template (6-section fill-in), recording-checklist (pre/during/wrap), editing-checklist (tool-agnostic, two CTAs), and publish-checklist (description template, scheduling, post-publish)**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-02T22:44:22Z
- **Completed:** 2026-03-02T22:46:56Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Four Markdown SOP checklists in ops/sop/ covering the complete YouTube video production workflow
- outline-template.md has all 6 sections (Hook/Context/Demo/Results/Framework/CTA) with actionable fill-in fields and pre-film verification
- editing-checklist.md is fully tool-agnostic with 28 outcome-based checkbox items and explicit documentation of the two-CTA rule (mid-video at ~60% mark, end screen at final 15 seconds)
- publish-checklist.md embeds the complete description template with chapters, locked booking URL, and hashtags — 24 checkbox items covering pre-upload through post-publish steps

## Task Commits

Each task was committed atomically:

1. **Task 1: Create outline-template.md + recording-checklist.md** - `bc6fcc1` (feat)
2. **Task 2: Create editing-checklist.md + publish-checklist.md** - `6d3a79e` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `ops/sop/outline-template.md` — 6-section fill-in video outline template with pre-film verification checklist; includes booking URL in CTA section
- `ops/sop/recording-checklist.md` — Pre-shoot, during-shoot, and wrap checklists; 33 checkbox items across 3 sections
- `ops/sop/editing-checklist.md` — Tool-agnostic editing workflow from assembly cut through export; 28 checkbox items; two CTAs documented
- `ops/sop/publish-checklist.md` — Upload metadata, description template with chapters and hashtags, scheduling, and post-publish social sharing; 24 checkbox items

## Decisions Made

- Pre-film verification checklist embedded directly in outline-template.md so the outline and pre-flight check are in the same file — no separate document to track
- Tool-agnostic approach for editing checklist: every item describes the outcome to achieve (e.g., "normalize audio levels") rather than software menu paths (e.g., "Effects > Audio > Normalize") — makes it durable across Final Cut, Premiere, DaVinci, or any future tool
- Two-CTA rule (mid-video ~60% + end screen) from STATE.md research finding is surfaced in both outline-template (Section 3 CTA placement) and editing checklist (Final Check section) — two touch points to ensure both CTAs survive editing
- Description template is hardcoded inside publish-checklist.md so it is always adjacent to the publishing steps — reduces switching cost

## Deviations from Plan

None — plan executed exactly as written. All content matches the plan's specified structure and content exactly.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All four SOP checklists are ready to use for Video 1 (origin story — missed call story)
- outline-template.md is ready to fill in for Video 1 spec: Hook = missed call story, Portfolio piece = rajphotovideo-email-automation, Results = 3 jobs recovered in first month
- No blockers — ready for Phase 8 Plan 02 (filming Video 1)

---

_Phase: 08-content-production-repurposing_
_Completed: 2026-03-02_

## Self-Check: PASSED

All files verified:

- FOUND: ops/sop/outline-template.md
- FOUND: ops/sop/recording-checklist.md
- FOUND: ops/sop/editing-checklist.md
- FOUND: ops/sop/publish-checklist.md
- FOUND: .planning/phases/08-content-production-repurposing/08-01-SUMMARY.md

All commits verified:

- FOUND: bc6fcc1 (Task 1 — outline-template.md + recording-checklist.md)
- FOUND: 6d3a79e (Task 2 — editing-checklist.md + publish-checklist.md)

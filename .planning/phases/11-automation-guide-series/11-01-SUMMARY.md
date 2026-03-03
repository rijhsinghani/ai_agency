---
phase: 11-automation-guide-series
plan: "01"
subsystem: content
tags:
  [
    puppeteer,
    marked,
    commander,
    n8n,
    twilio,
    claude-api,
    pdf-generation,
    markdown,
  ]

requires:
  - phase: brand
    provides: brand-voice.md, banned-phrases.json, visual identity (colors, fonts, logo SVG)
  - phase: ops/packages
    provides: ROI data and dollar math for all 5 automation packages
provides:
  - guide-generator Node.js CLI (research/tools/guide-generator/)
  - 5 automation guide markdown files with brand voice, dollar math, and industry rotation
  - PDF build pipeline (Markdown → styled HTML → puppeteer PDF)
  - Preview image generation (816x400 PNG per guide)
affects: [11-02-landing-pages, 11-03-social-posts]

tech-stack:
  added: [puppeteer@24, marked@15, commander@14]
  patterns:
    - CommonJS + Commander.js CLI pattern (matches repurposing-script)
    - marked custom renderer replaces --- with .page-break div for PDF pagination
    - printBackground:true in puppeteer.page.pdf() for dark-theme PDF fidelity
    - Inline CSS with -webkit-print-color-adjust: exact for dark PDF color enforcement

key-files:
  created:
    - research/tools/guide-generator/package.json
    - research/tools/guide-generator/index.js
    - research/tools/guide-generator/lib/generator.js
    - research/tools/guide-generator/lib/template.js
    - research/tools/guide-generator/lib/renderer.js
    - research/tools/guide-generator/guides/missed-call-textback.md
    - research/tools/guide-generator/guides/review-automation.md
    - research/tools/guide-generator/guides/monday-pipeline.md
    - research/tools/guide-generator/guides/quote-writer.md
    - research/tools/guide-generator/guides/no-show-killer.md
  modified: []

key-decisions:
  - "marked custom renderer (not post-processing) converts --- to .page-break div — cleaner than regex substitution and handles nested markdown correctly"
  - "renderPDF and renderPreview both close their browser in a finally block — prevents hanging processes if render fails"
  - "Reddit community quotes included in 2 of 5 guides (salon missed-call, gym no-show) where they strengthen the hook; omitted in dental, cleaning, and law firm where dollar math alone is compelling"
  - "Guide industries: salon (missed-call), dental (review), cleaning service (monday pipeline), law firm (quote-writer), gym (no-show) — all non-trades as required by Phase 9 UAT fix"

patterns-established:
  - "Guide format: H1 title, H2 hook section, ---, H2 how-it-works, ---, H2 DIY map, footer line"
  - "Before/after table columns: blank label, Before, After — rows: metric name, before value, after value"
  - "DIY map structure: bold What you need paragraph, bold numbered steps list, bold Gotchas list with 2-3 items"
  - "Footer CTA: _Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_"

requirements-completed: [GUIDE-CONTENT, GUIDE-MATH, GUIDE-VOICE, GUIDE-FORMAT]

duration: 8min
completed: 2026-03-03
---

# Phase 11 Plan 01: Automation Guide Series — CLI + Content Summary

**guide-generator Node.js CLI with puppeteer PDF pipeline and 5 industry-rotated automation guides (salon, dental, cleaning, law firm, gym) using sourced dollar math and brand voice**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-03T18:56:34Z
- **Completed:** 2026-03-03T19:04:14Z
- **Tasks:** 2 of 2
- **Files modified:** 10

## Accomplishments

- guide-generator CLI scaffolded with --guide, --all, --output, --preview flags matching repurposing-script patterns
- 5 guide markdown files written with 3-section format (hook / how-it-works / DIY map), brand voice, no banned phrases
- Dollar math sourced directly from ops/packages/ docs: $20,800/yr (salon), $1,600-2,000/mo (dental), $5,400/yr (cleaning), 20 hrs/mo saved (law firm), $12,480/yr (gym)
- PDF pipeline: marked custom renderer converts --- to page-break divs, puppeteer renders with printBackground:true for dark-theme fidelity
- Preview image renderer captures 816x400 PNG of page 1 for landing page use in Plan 02

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold guide-generator CLI** - `6656fb8` (feat)
2. **Task 2: Write all 5 guide markdown files** - `7dd291d` (feat)

## Files Created/Modified

- `research/tools/guide-generator/package.json` - Node.js project with puppeteer, marked, commander
- `research/tools/guide-generator/index.js` - CLI entry point with --guide, --all, --output, --preview flags
- `research/tools/guide-generator/lib/generator.js` - GUIDES registry with 5 entries, getGuide() lookup
- `research/tools/guide-generator/lib/template.js` - buildHTML() with brand-styled dark HTML, marked custom renderer
- `research/tools/guide-generator/lib/renderer.js` - renderPDF() and renderPreview() using puppeteer
- `research/tools/guide-generator/guides/missed-call-textback.md` - Salon, $20,800/yr ROI, 30-second save
- `research/tools/guide-generator/guides/review-automation.md` - Dental, 8 to 90 reviews, 25-30% more clicks
- `research/tools/guide-generator/guides/monday-pipeline.md` - Cleaning service, 45-min scramble to 2-min inbox
- `research/tools/guide-generator/guides/quote-writer.md` - Law firm, 2-hour proposals to 10-min voice memo
- `research/tools/guide-generator/guides/no-show-killer.md` - Gym, 3 no-shows/week x $80 = $12,480/yr

## Decisions Made

- Reddit community quotes: included in missed-call-textback (r/femalehairadvice) and no-show-killer (r/personaltraining) where community voice strengthens the hook; omitted in review-automation, monday-pipeline, and quote-writer where dollar math alone is compelling — this is per CONTEXT.md "Claude's discretion"
- marked custom renderer for --- → page-break div rather than post-processing regex — cleaner, handles all markdown edge cases correctly
- renderPDF and renderPreview use try/finally to guarantee browser.close() even on render failure — prevents hanging puppeteer processes

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required. npm install is handled during execution. PDF rendering requires Chromium (bundled with puppeteer package).

## Next Phase Readiness

- Plan 02 (PDF rendering + landing pages): guide markdown files are ready; guide-generator CLI can be invoked directly with `node index.js --all --preview`; output goes to website/guides/ by default
- Plan 03 (social post generation): guide markdown files in research/tools/guide-generator/guides/ are the source input for the --from-file flag to be added to the repurposing script

---

## Self-Check: PASSED

All 10 created files confirmed on disk. Commits 6656fb8 and 7dd291d verified in git log.

_Phase: 11-automation-guide-series_
_Completed: 2026-03-03_

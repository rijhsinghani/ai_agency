---
phase: quick-6
plan: 01
subsystem: website/guides + guide-generator
tags: [design, pdf, landing-pages, cta, social-proof]
key-files:
  modified:
    - research/tools/guide-generator/lib/template.js
    - website/guides/missed-call-textback.html
    - website/guides/review-automation.html
    - website/guides/monday-pipeline.html
    - website/guides/quote-writer.html
    - website/guides/no-show-killer.html
decisions:
  - Used `bg-cyan hover:bg-cyan/80 text-base` for CTA buttons — `text-base` gives dark #0E0E0E text for contrast on light cyan background
  - Gotcha callout wraps both the `<p><strong>Gotchas:</strong></p>` label and the following `<ul>` in a single div using regex post-processing on rendered bodyHTML
  - Calendar URL anchor replace uses a specific URL path match to avoid false positives
metrics:
  duration: "~10 minutes"
  completed: "2026-03-05"
  tasks: 2
  files: 6
---

# Quick Task 6: Gemini Design Feedback — PDF Template + Landing Pages

Implemented 5 design improvements from Gemini feedback across the PDF template generator and 5 landing page HTML files.

## What Changed

### Task 1: PDF Template (template.js)

**1. Body font-size 15px → 16px**

Line 319 in the `body` CSS rule. Improves readability in Puppeteer-rendered PDFs.

**2. Gotcha warning callout styling**

Added `.gotcha-callout` CSS block with amber left-border styling:

- `background: rgba(245, 166, 35, 0.08)` — subtle amber wash
- `border-left: 3px solid #f5a623` — amber left border
- `.gotcha-callout p strong:first-child { color: #f5a623 }` — amber label text

Added regex post-process replace in `buildHTML` after the page-break injection:

```js
.replace(
  /<p><strong>Gotchas:<\/strong><\/p>\s*(<ul>[\s\S]*?<\/ul>)/g,
  '<div class="gotcha-callout"><p><strong>Gotchas:</strong></p>$1</div>'
)
```

**3. Calendar URL as clickable anchor**

Added second regex post-process replace:

```js
.replace(
  /calendar\.app\.google\/psycao3CrXjGnmk48/g,
  '<a href="https://calendar.app.google/psycao3CrXjGnmk48" style="color: #4DD9E8; text-decoration: underline;">calendar.app.google/psycao3CrXjGnmk48</a>'
)
```

Puppeteer will render this as a clickable link in the PDF footer.

### Task 2: Landing Pages (5 HTML files)

**CTA button: purple → cyan**

Changed on all 5 files:

- Before: `bg-purple hover:bg-purple-soft text-cream`
- After: `bg-cyan hover:bg-cyan/80 text-base`

`text-base` = `#0E0E0E` (near-black) per Tailwind config, providing readable dark-on-cyan contrast.

**Results card added on all 5 pages**

Inserted between the solution flow diagram `</div>` and `</main>`. Each card uses the same structure with industry-specific ROI copy:

| File                 | Result text summary                                  |
| -------------------- | ---------------------------------------------------- |
| missed-call-textback | Salon: 3 bookings recovered, $240 value, $0.60 cost  |
| review-automation    | Dental: 2 → 11 reviews/month, page 3 → page 1 Google |
| monday-pipeline      | Cleaning: 4 hours reclaimed, 2 recurring clients     |
| quote-writer         | Law firm: 2hr → 18min proposals, 3x more sent        |
| no-show-killer       | Gym: 22% → 8% no-show, +$700/month recovered         |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

### Files exist

- `/Users/sameerrijhsinghani/automation_consulting/research/tools/guide-generator/lib/template.js` — FOUND
- `/Users/sameerrijhsinghani/automation_consulting/website/guides/missed-call-textback.html` — FOUND
- `/Users/sameerrijhsinghani/automation_consulting/website/guides/review-automation.html` — FOUND
- `/Users/sameerrijhsinghani/automation_consulting/website/guides/monday-pipeline.html` — FOUND
- `/Users/sameerrijhsinghani/automation_consulting/website/guides/quote-writer.html` — FOUND
- `/Users/sameerrijhsinghani/automation_consulting/website/guides/no-show-killer.html` — FOUND

### Commits exist

- Task 1: `227fdd5` — feat(quick-6): update PDF template
- Task 2: `7b94cb9` — feat(quick-6): update 5 landing pages

## Self-Check: PASSED

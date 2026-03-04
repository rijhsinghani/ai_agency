---
status: diagnosed
phase: 08-content-production-repurposing
source:
  - .planning/phases/08-content-production-repurposing/08-01-SUMMARY.md
  - .planning/phases/08-content-production-repurposing/08-02-SUMMARY.md
  - .planning/phases/08-content-production-repurposing/08-03-SUMMARY.md
started: 2026-03-03T15:50:00.000Z
updated: 2026-03-04T18:50:00.000Z
---

## Current Test

[testing complete]

## Tests

### 1. Brand voice enforces value-driven tone

expected: Content generation prompts prioritize outcomes over technology, use peer-level voice, and avoid marketing jargon
result: pass

### 2. Banned phrases filtered from generated content

expected: 30 banned marketing phrases (cutting-edge, game-changer, seamless, etc.) are loaded from brand/banned-phrases.json and enforced in AI prompts
result: pass

### 3. Production SOPs enforce quality gates

expected: Outline template, recording checklist, editing checklist, and publish checklist all exist with actionable items
result: issue
reported: "I don't need a recording checklist. I need key talking points in my brand voice that I can reference while filming, and branded diagrams using Excalidraw as visual aids for the video. The recording checklist is the wrong deliverable."
severity: major

### 4. Video clipper produces vertical content

expected: sameer-clip extracts 9:16 clips with caption burn-in from SRT files
result: pass

### 5. Social content CTA approach is value-driven, not salesy

expected: Generated social content leads with value. Not every post ends with a booking link. CTA varies between value-only posts, soft engagement (DM me, reply), and occasional booking link.
result: issue
reported: "Every single social post (Twitter thread, Instagram caption) is hardcoded to end with the exact same booking CTA. It should be value-first — not every post needs a CTA, and when there is one it should feel like encouragement to reach out, not a sales pitch."
severity: major

## Summary

total: 5
passed: 3
issues: 2
pending: 0
skipped: 0

## Gaps

- truth: "Generated social content leads with value. Not every post ends with a booking link. CTA varies between value-only posts, soft engagement, and occasional booking link."
  status: failed
  reason: "User reported: Every single social post is hardcoded to end with the exact same booking CTA. Should be value-first with varied engagement approaches."
  severity: major
  test: 5
  artifacts:
  - research/tools/repurposing-script/lib/formatter.js (hardcoded CTA in buildPrompt for twitter and instagram)
  - research/tools/repurposing-script/lib/generator.js (system prompt is value-driven but prompt specs override with forced CTA)
  - ops/sop/outline-template.md (video template has booking CTA at both 60% mark and end — double CTA)
    missing:
  - CTA mode parameter (value-only, soft, booking) in repurposing script
  - Prompt variants that generate pure-value posts without any CTA
  - Soft CTA options ("DM me", "reply if this is happening in your business")
    root_cause: "formatter.js buildPrompt() hardcodes 'End with exactly: Book a free 15-min discovery call: [link]' for both twitter and instagram platforms. No mechanism to vary CTA type. Video outline template also places booking CTA twice (Section 3 mid-video and Section 6 end)."

- truth: "Production prep includes brand-voice talking points and branded Excalidraw diagrams as visual aids for filming, not a generic recording checklist"
  status: failed
  reason: "User reported: I don't need a recording checklist. I need key talking points in my brand voice that I can reference while filming, and branded diagrams using Excalidraw as visual aids for the video."
  severity: major
  test: 3
  artifacts:
  - ops/sop/recording-checklist.md (wrong deliverable — generic checklist instead of brand-voice talking points)
    missing:
  - Brand-voice talking points document derived from Video-1-outline.md (key phrases, transitions, branded language to reference while filming)
  - Excalidraw diagrams (.excalidraw files) showing the automation workflow visually — branded with #1A1A1A background, white text, Sameer Automations style
    root_cause: "Plan 08-01 created a generic recording checklist (pre-shoot/during/wrap items) when the founder actually needs two different deliverables: (1) condensed talking points in brand voice extracted from the video outline, and (2) branded Excalidraw diagrams of the automation workflow to use as B-roll or screen share during filming."

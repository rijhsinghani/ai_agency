---
phase: quick-6
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - research/tools/guide-generator/lib/template.js
  - website/guides/missed-call-textback.html
  - website/guides/review-automation.html
  - website/guides/monday-pipeline.html
  - website/guides/quote-writer.html
  - website/guides/no-show-killer.html
autonomous: true
requirements: []
must_haves:
  truths:
    - "PDF body text renders at 16px (not 15px)"
    - "Gotchas sections in PDFs render with amber warning callout styling"
    - "PDF footer calendar URL is a clickable anchor tag in Puppeteer output"
    - "All 5 landing page download buttons are cyan (not purple)"
    - "All 5 landing pages show a Results card between the diagrams and footer"
  artifacts:
    - path: "research/tools/guide-generator/lib/template.js"
      provides: "Updated PDF template with font-size, gotcha styles, calendar link anchor, footer"
    - path: "website/guides/missed-call-textback.html"
      provides: "Cyan CTA + Results card"
    - path: "website/guides/review-automation.html"
      provides: "Cyan CTA + Results card"
    - path: "website/guides/monday-pipeline.html"
      provides: "Cyan CTA + Results card"
    - path: "website/guides/quote-writer.html"
      provides: "Cyan CTA + Results card"
    - path: "website/guides/no-show-killer.html"
      provides: "Cyan CTA + Results card"
  key_links:
    - from: "template.js bodyHTML"
      to: "gotcha-callout div"
      via: "post-process replace on <p><strong>Gotchas:</strong></p>"
      pattern: "replace.*Gotchas"
    - from: "template.js footer markdown"
      to: "calendar.app.google anchor tag"
      via: "marked custom renderer or post-process replace on calendar URL text"
      pattern: "calendar\\.app\\.google"
---

<objective>
Implement 5 Gemini design feedback changes across the PDF template and 5 landing page HTML files.

Purpose: Improve visual quality — better readability, clearer warning callouts, clickable PDF links, higher-contrast CTAs, and social proof with real ROI numbers.
Output: Updated template.js (regenerates PDFs) and 5 updated landing page HTML files.
</objective>

<execution_context>
@./.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/STATE.md
@research/tools/guide-generator/lib/template.js
@website/guides/missed-call-textback.html
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update template.js — font size, gotcha callout, calendar anchor</name>
  <files>research/tools/guide-generator/lib/template.js</files>
  <action>
Make 3 targeted changes in template.js:

**Change 1 — Body font size 15px → 16px:**
In the `body` CSS rule (around line 311), change `font-size: 15px;` to `font-size: 16px;`.

**Change 2 — Gotcha warning callout CSS:**
After the existing `blockquote` CSS rule (around line 496-506), add a new CSS rule for `.gotcha-callout`:

```css
/* Gotcha warning callout — amber border, subtle amber background */
.gotcha-callout {
  margin: 16px 0 20px 0;
  padding: 14px 20px;
  background: rgba(245, 166, 35, 0.08);
  border-left: 3px solid #f5a623;
  border-radius: 0 6px 6px 0;
}

.gotcha-callout p strong:first-child {
  color: #f5a623;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.gotcha-callout ul {
  margin: 8px 0 0 0;
  color: rgba(237, 233, 227, 0.85);
}
```

Then, in the `buildHTML` function body (after `marked.parse(markdownContent)` produces `bodyHTML`), post-process the HTML to wrap Gotchas sections in `.gotcha-callout` divs. The pattern in the rendered HTML is: `<p><strong>Gotchas:</strong></p>\n<ul>...</ul>`. Replace it by wrapping both elements in a `<div class="gotcha-callout">...</div>`.

Use a regex replace on bodyHTML after the `.replace(/<div class="page-break">...` call:

```js
.replace(
  /<p><strong>Gotchas:<\/strong><\/p>\s*(<ul>[\s\S]*?<\/ul>)/g,
  '<div class="gotcha-callout"><p><strong>Gotchas:</strong></p>$1</div>'
)
```

**Change 3 — PDF footer calendar URL as anchor tag:**
The footer text in the guide markdown files is: `_Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_`

When marked renders this, the calendar URL is plain text inside an `<em>` tag. Add another post-process replace on bodyHTML to convert the plain URL to a clickable `<a>` tag:

```js
.replace(
  /calendar\.app\.google\/psycao3CrXjGnmk48/g,
  '<a href="https://calendar.app.google/psycao3CrXjGnmk48" style="color: #4DD9E8; text-decoration: underline;">calendar.app.google/psycao3CrXjGnmk48</a>'
)
```

Apply all three bodyHTML transforms in sequence (existing page-break replace, then gotcha replace, then calendar replace) before the `return` in `buildHTML`.
</action>
<verify>
Open /Users/sameerrijhsinghani/automation_consulting/research/tools/guide-generator/lib/template.js and confirm:

1. `font-size: 16px` in body rule
2. `.gotcha-callout` CSS block exists
3. Regex replace for Gotchas wrapping exists in buildHTML
4. Regex replace for calendar URL anchor exists in buildHTML
   </verify>
   <done>template.js has all 3 changes; running `node index.js --guide missed-call-textback` from the guide-generator dir produces a PDF without errors</done>
   </task>

<task type="auto">
  <name>Task 2: Update 5 landing pages — cyan CTA button + Results card</name>
  <files>
    website/guides/missed-call-textback.html,
    website/guides/review-automation.html,
    website/guides/monday-pipeline.html,
    website/guides/quote-writer.html,
    website/guides/no-show-killer.html
  </files>
  <action>
For each of the 5 landing page HTML files, make 2 changes:

**Change 1 — CTA button purple → cyan:**
Find the download button `<a>` tag. It currently has Tailwind classes `bg-purple hover:bg-purple-soft`. Change to `bg-cyan hover:bg-cyan/80 text-base` (cyan bg, slightly dimmed hover, dark text for contrast since cyan is light on dark). The full class change:

- Remove: `bg-purple hover:bg-purple-soft text-cream`
- Add: `bg-cyan hover:bg-cyan/80 text-base`

The `base` color is `#0E0E0E` (defined in tailwind.config). This gives white-on-cyan contrast which pops on the dark page.

**Change 2 — Add Results card:**
Insert a Results card block immediately after the closing `</div>` of the solution flow diagram section (`<!-- How the automation fixes it -->` block ends with `</div>`) and before the `</main>` closing tag.

The Results card HTML (insert before `</main>`):

```html
<!-- Results card — social proof ROI example -->
<div class="bg-surface-raised rounded-xl p-6 mb-16 border border-cream/10">
  <p
    class="text-xs font-body tracking-widest uppercase mb-3"
    style="color: #4DD9E8;"
  >
    Real result
  </p>
  <p class="text-cream text-base leading-relaxed mb-0">{RESULT_TEXT}</p>
</div>
```

Use these result texts per file:

**missed-call-textback.html:**
One salon recovered 3 bookings in their first week after setup. Total value: $240. System cost: $0.60 in SMS credits.

**review-automation.html:**
One dental practice went from 2 reviews per month to 11 in their first 30 days. No staff time added. Google ranking moved from page 3 to page 1 for their city.

**monday-pipeline.html:**
One cleaning service owner reclaimed 4 hours of Monday scramble. Hot leads that used to go cold by Wednesday were contacted by 7:15 AM. Two converted to recurring clients in the first month.

**quote-writer.html:**
One law firm cut proposal time from 2 hours to 18 minutes per matter. In the first month, they sent 3x more proposals with the same staff. Close rate held steady.

**no-show-killer.html:**
One gym cut no-shows from 22% to 8% in 30 days. At $60 per session, recovering 3 slots per week added over $700/month in recovered revenue. System cost: $20/month.

Make sure the Results card is inserted AFTER the solution flow diagram closing `</div>` and BEFORE `</main>`. In the current HTML structure, the solution flow diagram block ends with the closing `</div>` of `<div class="mb-16">`. Insert the Results card after that `</div>` and before `</main>`.
</action>
<verify>
Open each HTML file in a browser (file:// URL) or inspect the HTML source and confirm:

1. Download button has `bg-cyan` class (not `bg-purple`)
2. A Results card div with `Real result` label is present between the diagrams and the footer
3. No broken HTML (all tags closed properly)
   </verify>
   <done>All 5 landing pages show cyan download buttons and Results cards with industry-specific ROI copy</done>
   </task>

</tasks>

<verification>
After both tasks:
1. `grep -n "font-size: 16px" research/tools/guide-generator/lib/template.js` returns a match in the body rule
2. `grep -n "gotcha-callout" research/tools/guide-generator/lib/template.js` returns 2+ matches (CSS + replace)
3. `grep -n "calendar\.app\.google" research/tools/guide-generator/lib/template.js` shows the anchor tag replace
4. `grep -n "bg-cyan" website/guides/missed-call-textback.html` returns a match on the download button
5. `grep -n "Real result" website/guides/missed-call-textback.html` returns a match
6. All 5 HTML files have both changes (spot-check remaining 4 with same greps)
</verification>

<success_criteria>

- PDF template body font is 16px
- Gotchas sections in rendered PDFs have amber left-border callout box styling
- Calendar URL in PDF footer is a clickable hyperlink (Puppeteer will render it)
- All 5 landing page download buttons are cyan (visible contrast on dark bg)
- All 5 landing pages have a Results card with specific ROI numbers between diagrams and footer
  </success_criteria>

<output>
After completion, create `.planning/quick/6-implement-gemini-design-feedback-on-phas/6-SUMMARY.md` with what was changed and any notes for future reference.
</output>

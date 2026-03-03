# Phase 11: Automation Guide Series - Research

**Researched:** 2026-03-03
**Domain:** Markdown-to-PDF pipeline, HTML landing pages, repurposing script extension, branded content generation
**Confidence:** HIGH

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**DIY walkthrough depth:**

- "Show the map, not the road" approach — name the tools, show the high-level flow, list 5-7 steps at headline level, then call out 2-3 gotchas that make it complex
- DIY walkthrough is inline as Page 3 of the same PDF — one document, three sections, no separate linked pages
- Reference the actual stack: n8n, Twilio, Claude API — authentic, matches the service offering
- Gotchas section names the complexity without explicitly saying "hire me" — reader draws the conclusion themselves
- No step-by-step code snippets or screenshots — this is a map, not a tutorial

**Landing pages and hosting:**

- Same repo (website/), same dark-theme design system as index.html
- Each guide gets an HTML landing page: hook paragraph, PDF preview image (first page), prominent download button, soft CTA footer
- /guides/index.html as a grid hub listing all 5 guides — social bio link points here
- URL structure: descriptive slugs (/guides/missed-call-textback.html, /guides/review-automation.html, etc.)
- PDFs stored alongside HTML in website/guides/ directory

**Social post generation:**

- Add --from-file flag to existing repurposing script (research/tools/repurposing-script/) — accepts markdown file instead of YouTube URL, reuses existing formatter, banned phrase injection, Claude API call, and --cta soft mode
- 1 Twitter thread (3-4 tweets) + 1 Instagram caption per guide — 10 total social assets
- Twitter thread delivers the full Page 1 hook natively in-feed; link to guide landing page comes in final tweet only
- Each social post treats the guide independently — no series branding ("3 of 5"), no "follow for more"
- Value-first: the thread stands alone as useful content even without clicking through

**Math and industry examples:**

- Rotate industries across guides: each guide uses a different primary industry to reinforce "any business" positioning (e.g., salon, dental, cleaning, law firm, gym)
- ROI math sourced from ops/packages/ docs + Reddit research evidence — blended for credibility
- Before/after tables use specific dollar amounts ("5 missed calls/week x $80 = $400/week lost"), not percentages or ranges
- All numerals, per brand voice — no writing out numbers

### Claude's Discretion

- Reddit community quotes ("from r/HVAC, 445 upvotes") — include where they strengthen the hook, omit where the math alone is compelling
- Exact industry-to-guide mapping (which industry pairs with which guide)
- PDF preview image generation approach (screenshot of page 1 vs. designed thumbnail)
- Exact landing page layout details (spacing, grid styling for index page)
- Puppeteer configuration and HTML-to-PDF rendering details

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

## Summary

Phase 11 builds 5 branded PDF guides ("5 Automations You Can Steal") from a fully terminal-based pipeline: Claude Code writes guide content as markdown, a build script converts each to styled HTML with inline brand CSS, Puppeteer renders HTML to PDF, and landing pages are generated and committed to website/guides/ for GitHub Pages deployment. The repurposing script gains a --from-file flag to generate social assets from each guide's markdown content instead of a YouTube transcript.

All infrastructure is Node.js (matching the existing repurposing-script and video-clipper tools in this repo). No new cloud services, no new design tools. The entire phase is reproducible from the terminal. The five guides cover the five existing automation packages already documented in ops/packages/, with industry examples rotated across guides and ROI math pulled directly from those docs.

The hardest technical problems are (1) reliably rendering dark-background PDFs via Puppeteer without color stripping, (2) adding --from-file to index.js without breaking the existing --url path, and (3) generating usable PDF preview images for landing pages. All three have verified solutions.

**Primary recommendation:** Use puppeteer (npm install puppeteer) with printBackground: true and html { -webkit-print-color-adjust: exact; print-color-adjust: exact; } in the HTML template. Use marked (npm install marked) to parse guide markdown into HTML. Keep everything in a single new tool at research/tools/guide-generator/ matching the pattern of repurposing-script.

---

## Standard Stack

### Core

| Library           | Version        | Purpose                                 | Why Standard                                                                                                                 |
| ----------------- | -------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| puppeteer         | ^24.x (latest) | HTML-to-PDF via headless Chrome         | Only Node.js PDF tool that reliably renders dark backgrounds with exact colors; bundles its own Chrome, no system dependency |
| marked            | ^15.x (latest) | Markdown-to-HTML parsing                | Fastest, zero-config markdown parser for Node.js; same parse pattern used in md-to-pdf ecosystem                             |
| commander         | ^14.0.3        | CLI flag parsing                        | Already locked in this repo (repurposing-script uses this version); no version drift                                         |
| @anthropic-ai/sdk | latest         | Claude API calls for content generation | Already installed in repurposing-script; same version                                                                        |

### Supporting

| Library         | Version       | Purpose                                    | When to Use           |
| --------------- | ------------- | ------------------------------------------ | --------------------- |
| fs (built-in)   | Node built-in | Read markdown files, write HTML/PDF output | All file I/O          |
| path (built-in) | Node built-in | Cross-platform path resolution             | All path construction |

### Alternatives Considered

| Instead of | Could Use   | Tradeoff                                                                                                      |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| puppeteer  | wkhtmltopdf | wkhtmltopdf is unmaintained, uses outdated WebKit, poor CSS3 support; puppeteer uses current Chrome           |
| puppeteer  | pdfkit      | pdfkit requires programmatic layout (no HTML/CSS); would require rebuilding the brand design system in code   |
| puppeteer  | playwright  | playwright works identically for PDF; puppeteer is already the established choice and has less install weight |
| marked     | remark      | remark has a plugin-heavy API; marked.parse() is one line with no config needed for this use case             |

**Installation:**

```bash
# New guide-generator tool
cd research/tools/guide-generator
npm install puppeteer marked commander

# Repurposing script — no new deps, only code changes
```

---

## Architecture Patterns

### Recommended Project Structure

```
research/tools/guide-generator/
├── index.js                    # CLI entry: --guide <slug> --all
├── package.json
├── lib/
│   ├── template.js             # buildHTML(markdownContent) -> styled HTML string
│   ├── renderer.js             # renderPDF(htmlString, outputPath) -> puppeteer
│   └── generator.js            # generateGuideContent(guideSlug) -> Claude API -> markdown
├── guides/                     # Source markdown for each guide
│   ├── missed-call-textback.md
│   ├── review-automation.md
│   ├── monday-pipeline.md
│   ├── quote-writer.md
│   └── no-show-killer.md
└── review/                     # .gitignored — generated PDFs for review before commit

website/guides/                 # Output — committed to repo, deployed to GitHub Pages
├── index.html                  # Grid hub — all 5 guides
├── missed-call-textback.html   # Guide landing page
├── missed-call-textback.pdf    # Guide PDF
├── review-automation.html
├── review-automation.pdf
├── monday-pipeline.html
├── monday-pipeline.pdf
├── quote-writer.html
├── quote-writer.pdf
├── no-show-killer.html
└── no-show-killer.pdf

research/tools/repurposing-script/
├── index.js                    # ADD --from-file flag (new branch alongside --url)
└── lib/
    ├── formatter.js            # No changes — reuse existing buildPrompt()
    ├── generator.js            # No changes — reuse existing generateDraft()
    ├── queue.js                # No changes — reuse existing writeToReviewQueue()
    └── transcript.js           # No changes — YouTube-only, bypassed with --from-file
```

### Pattern 1: Dark PDF Rendering

**What:** Puppeteer strips background colors by default when rendering to PDF (Chrome's "print" media type removes backgrounds for ink savings). Two CSS declarations must appear in the HTML template to force exact color preservation.

**When to use:** Every PDF generated in this phase (all have dark #1A1A1A backgrounds).

**Example:**

```javascript
// Source: https://pptr.dev/api/puppeteer.pdfoptions + https://pptr.dev/api/puppeteer.page.pdf
// lib/renderer.js

const puppeteer = require("puppeteer");
const path = require("path");

async function renderPDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set content directly — avoids network round-trip for local HTML
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  await page.pdf({
    path: outputPath,
    format: "Letter", // 8.5" x 11" — standard US PDF
    printBackground: true, // REQUIRED: preserves dark #1A1A1A background
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
    preferCSSPageSize: true, // Honors @page CSS declarations for page breaks
  });

  await browser.close();
  return outputPath;
}

module.exports = { renderPDF };
```

**CRITICAL CSS in every HTML template:**

```css
/* Must appear in <style> block — tells Chrome to preserve exact colors in print */
html,
body,
* {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Force page breaks between the 3 guide sections */
.page-break {
  page-break-after: always;
  break-after: page;
}

/* Prevent tables from splitting across pages */
table {
  break-inside: avoid;
  page-break-inside: avoid;
}
```

### Pattern 2: Markdown → HTML Template

**What:** Use marked.parse() to convert guide markdown to HTML body content, then wrap in a complete brand-styled HTML document with inline CSS.

**When to use:** All 5 guides — same template, different content.

**Example:**

```javascript
// Source: https://marked.js.org/ + existing brand identity in brand/brand-voice.md
// lib/template.js

const { marked } = require("marked");

function buildHTML(markdownContent, guideMeta) {
  const bodyHTML = marked.parse(markdownContent);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    html, body, * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @page {
      size: Letter;
      margin: 0;
    }
    body {
      background-color: #1A1A1A;
      color: #EDE9E3;
      font-family: 'Gilroy', 'DM Sans', system-ui, sans-serif;
      margin: 0;
      padding: 0;
    }
    .page {
      width: 816px;           /* Letter width at 96dpi */
      min-height: 1056px;     /* Letter height at 96dpi */
      padding: 64px;
      box-sizing: border-box;
      position: relative;
    }
    .page-break {
      page-break-after: always;
      break-after: page;
    }
    h1, h2, h3 {
      font-family: 'Roc Grotesk', 'Outfit', system-ui, sans-serif;
      font-weight: 700;
      color: #EDE9E3;
    }
    .accent-line {
      height: 2px;
      background: linear-gradient(90deg, #7B2FBE, #4DD9E8);
      border: none;
      margin: 24px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #1E1E1E;
      border: 1px solid rgba(237, 233, 227, 0.15);
      break-inside: avoid;
      page-break-inside: avoid;
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid rgba(237, 233, 227, 0.1);
    }
    th { color: #4DD9E8; font-weight: 700; }
    .logo-area {
      position: absolute;
      top: 24px;
      right: 32px;
    }
    .footer-cta {
      font-size: 13px;
      color: rgba(237, 233, 227, 0.6);
      border-top: 1px solid rgba(237, 233, 227, 0.1);
      padding-top: 16px;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="page">
    ${bodyHTML}
  </div>
</body>
</html>`;
}

module.exports = { buildHTML };
```

### Pattern 3: --from-file Flag in Repurposing Script

**What:** Add a mutually exclusive --from-file flag to index.js that reads a local markdown file as the "transcript" input. All downstream processing (formatter.js, generator.js, queue.js) is unchanged — they receive a text string regardless of source.

**When to use:** When generating social posts from guide markdown instead of a YouTube video.

**Example:**

```javascript
// Source: existing research/tools/repurposing-script/index.js + commander docs
// Modified section of index.js — add alongside existing --url option

program
  .name("sameer-repurpose")
  .description(
    "Generate platform-specific content drafts from a YouTube video URL or markdown file",
  )
  .option("--url <youtubeUrl>", "YouTube video URL to repurpose")
  .option(
    "--from-file <markdownPath>",
    "Path to a markdown file to repurpose (skips transcript fetch)",
  )
  .option(
    "--from-cache",
    "Load cached transcript (skips Supadata API call)",
    false,
  )
  .option("--title <title>", "Override title for file naming")
  .option("--cta <mode>", "CTA mode: value | soft | booking", "value")
  .parse(process.argv);

const opts = program.opts();

// Validate: exactly one input source required
if (!opts.url && !opts.fromFile) {
  console.error("Error: provide either --url or --from-file");
  process.exit(1);
}
if (opts.url && opts.fromFile) {
  console.error("Error: --url and --from-file are mutually exclusive");
  process.exit(1);
}

(async () => {
  let transcript;
  let videoTitle = opts.title || `content-${Date.now()}`;

  if (opts.fromFile) {
    // Read markdown file — treat its full text as the "transcript"
    transcript = require("fs").readFileSync(
      require("path").resolve(opts.fromFile),
      "utf-8",
    );
    console.log(`Loaded content from ${opts.fromFile}`);
  } else {
    // Existing --url path unchanged
    if (opts.fromCache) {
      transcript = loadCachedTranscript(videoTitle);
      // ... existing logic
    } else {
      transcript = await getTranscript(opts.url);
      cacheTranscript(videoTitle, transcript);
    }
  }

  // Platforms for guide content: twitter + instagram only (no clip_script needed)
  const platforms = opts.fromFile
    ? ["twitter", "instagram"]
    : ["twitter", "instagram", "clip_script"];
  for (const platform of platforms) {
    const draft = await generateDraft(transcript, platform, opts.cta);
    const filepath = writeToReviewQueue(videoTitle, platform, draft);
    console.log(`  -> ${filepath}`);
  }
})();
```

### Pattern 4: Content Generation via Claude API

**What:** For each of the 5 guides, use the Claude API (same client as generator.js) to write the guide content as markdown, respecting brand voice, banned phrases, and the 3-section format.

**When to use:** Guide content generation step, before HTML templating.

**Example:**

```javascript
// Source: existing research/tools/repurposing-script/lib/generator.js pattern
// lib/generator.js in guide-generator tool

const Anthropic = require("@anthropic-ai/sdk");
const { BANNED_PHRASES } = require("../../../repurposing-script/lib/formatter");

async function generateGuideContent(guideMeta) {
  const client = new Anthropic();

  const systemPrompt = `You are writing a PDF guide for Sameer Automations.
Voice rules: Direct, peer-level, confident, practical, transparent.
Never use these words or phrases: ${BANNED_PHRASES.join(", ")}.
No emojis. Use contractions. All numerals for metrics. Sentence case headings.
Audience = small business owners, not builders. Outcomes before technology.
Format: 3 sections separated by --- page break markers.
Section 1 (Page 1 — hook): One paragraph naming the pain with specific dollar math. Max 150 words.
Section 2 (Page 2 — how it works): Plain English explanation + before/after table in markdown. Max 150 words.
Section 3 (Page 3 — DIY map): Name the tools (n8n, Twilio, Claude API). List 5-7 steps at headline level. Call out 2-3 gotchas. No code. No screenshots. Max 200 words.
Footer on every page: "Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48"`;

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 2048,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Write the "${guideMeta.title}" guide. Industry: ${guideMeta.industry}. ${guideMeta.prompt}`,
      },
    ],
  });

  return message.content[0].text;
}

module.exports = { generateGuideContent };
```

### Anti-Patterns to Avoid

- **Using page.emulateMediaType('screen') for dark themes:** Switching to screen media type makes backgrounds visible in browser preview but causes other print-layout issues. Instead: keep print media type (default), use printBackground: true + -webkit-print-color-adjust: exact in CSS.
- **Linking to Google Fonts in PDF HTML:** Puppeteer with waitUntil: 'networkidle0' will wait for font loads, but external font CDNs introduce network flakiness and latency. Instead: use system font fallbacks (Roc Grotesk is loaded locally from system fonts in index.html; the same src: local() pattern works in Puppeteer HTML).
- **Using --from-file with clip_script platform:** The clip_script formatter prompt references timestamps and video moments that don't exist in markdown content. Limit --from-file to twitter and instagram platforms only.
- **Storing PDFs in research/tools/ instead of website/guides/:** PDFs must live in website/guides/ to deploy via GitHub Pages alongside HTML. The build tool writes directly there.
- **Making --url required in repurposing script:** The existing code uses .requiredOption("--url"). Changing to .option() makes it optional — validate manually in the async body to provide clear error messages.

---

## Don't Hand-Roll

| Problem                            | Don't Build                             | Use Instead                                        | Why                                                                                                  |
| ---------------------------------- | --------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| HTML-to-PDF with dark backgrounds  | Custom PDF layout engine or wkhtmltopdf | puppeteer + printBackground: true                  | The "color stripping" problem is Chrome-specific and well-understood; puppeteer solves it in 2 lines |
| Markdown parsing                   | Custom regex/split parser               | marked.parse()                                     | Table rendering, nested lists, and heading IDs have many edge cases; marked handles all of them      |
| CLI flag parsing                   | Manual process.argv slicing             | commander (already installed)                      | Already in this codebase; consistent pattern with repurposing-script                                 |
| Brand voice enforcement in content | Post-processing filter                  | Inject BANNED_PHRASES into Claude system prompt    | Existing pattern from generator.js; works at generation time, not after                              |
| Font rendering in PDFs             | font-face declarations with CDN URLs    | src: local() for system fonts + web-safe fallbacks | PDFs are generated locally; local() works for fonts installed on macOS/the machine running Puppeteer |

**Key insight:** All five "don't hand-roll" items have established solutions already visible in this codebase or directly available in npm. The phase is about composition, not invention.

---

## Common Pitfalls

### Pitfall 1: Background color stripped in generated PDF

**What goes wrong:** Dark #1A1A1A background appears white in the output PDF. Everything else renders correctly.
**Why it happens:** Chrome's print media type strips background colors by default to save ink. Puppeteer's page.pdf() uses print media type.
**How to avoid:** Two things BOTH required: (1) printBackground: true in page.pdf() options, (2) -webkit-print-color-adjust: exact AND print-color-adjust: exact on html/body in CSS.
**Warning signs:** Run a quick test with a single-color background div before building the full template.

### Pitfall 2: Page breaks cutting tables in half

**What goes wrong:** The before/after table in Page 2 of each guide gets split across pages, with column headers on one page and data rows on the next.
**Why it happens:** Chrome's implementation of CSS page breaks within tables is inconsistent. break-inside: avoid alone is sometimes insufficient.
**How to avoid:** Wrap each table in a container div with break-inside: avoid. Verify with actual content during build. If still breaking, add explicit .page-break dividers at section boundaries instead of relying on automatic pagination.
**Warning signs:** Check rendered PDFs visually for every guide — don't assume they all paginate correctly because one did.

### Pitfall 3: Roc Grotesk / Gilroy not rendering in PDF

**What goes wrong:** Headings fall back to Outfit or system-ui in the PDF, losing the brand feel.
**Why it happens:** src: local("Roc Grotesk") works on machines where the font is installed. CI machines or other machines don't have it.
**How to avoid:** The guides are generated locally (Claude Code terminal), so local() is fine for this phase. Document this as a local-only build requirement. Fallback chain is Outfit (Google Fonts bundled) → system-ui.
**Warning signs:** Font looks different from the website; check that both fonts are installed on macOS.

### Pitfall 4: --from-file breaks existing --url tests

**What goes wrong:** Making --url optional in the repurposing script breaks the existing test suite (formatter.test.js, generator.test.js, queue.test.js) if they test the CLI directly.
**Why it happens:** The existing tests import lib/ modules directly, not the CLI — so formatter/generator/queue tests are unaffected. But index.js changes need care.
**How to avoid:** The existing tests import lib/ files directly (verified in **tests**/). Adding --from-file only changes index.js. Run jest after the change to confirm all existing tests still pass.
**Warning signs:** Any test failure after index.js change — check that --url is still functional, just now optional.

### Pitfall 5: PDF preview image approach for landing pages

**What goes wrong:** Generating a "screenshot of page 1" preview image is a separate Puppeteer call and can be inconsistent between runs.
**Why it happens:** page.screenshot() with clip coordinates is fragile if content height varies between guides.
**How to avoid:** Use a simpler approach — page.screenshot({ fullPage: false, clip: { x: 0, y: 0, width: 816, height: 400 } }) captures just the top portion as a PNG. Store as guide-slug-preview.png. Alternatively, a static designed thumbnail image per guide avoids this complexity entirely (Claude's discretion item).
**Warning signs:** Preview images with content cut off or extra whitespace — adjust clip dimensions.

---

## Code Examples

### Guide content markdown structure (source format)

```markdown
<!-- guides/missed-call-textback.md -->

# The 30-second save

A salon owner misses 5 calls a week. At $80 per appointment, that's $400 a week walking out the door — $1,600 a month. Not because they don't care. Because they're with a client when the phone rings.

---

## How it works

The moment a call goes unanswered, a text fires to the caller within 30 seconds...

|                        | Before                 | After      |
| ---------------------- | ---------------------- | ---------- |
| Time to first response | 2-6 hours              | 30 seconds |
| Leads recovered        | Most gone cold         | ~50% reply |
| Monthly cost           | $0 (paid in lost jobs) | $200       |

---

## The DIY map

**Tools:** n8n (workflow engine), Twilio (SMS), your existing phone system

**Steps:**

1. Set up Twilio number alongside your business line
2. Configure missed call webhook in your phone system...

**Where it gets complicated:**

- Your phone carrier determines whether missed call webhooks are available...

---

_Built by Sameer Automations — if you'd rather skip the setup: calendar.app.google/psycao3CrXjGnmk48_
```

### Landing page HTML structure (per guide)

```html
<!-- website/guides/missed-call-textback.html -->
<!-- Inherits same CSS as website/index.html (dark theme, Tailwind config) -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>The 30-second save — Sameer Automations</title>
    <!-- Same <script> Tailwind config and font setup as index.html -->
  </head>
  <body class="bg-base text-cream">
    <!-- Navigation: link back to /guides/ hub -->
    <!-- Hero: guide title + 1-line hook -->
    <!-- Preview: first-page screenshot image -->
    <!-- Download button: href="./missed-call-textback.pdf" -->
    <!-- Soft CTA footer: "if you'd rather skip the setup, here's my calendar" -->
  </body>
</html>
```

### Hub index page grid (website/guides/index.html)

```html
<!-- website/guides/index.html — social bio link destination -->
<!-- Grid of 5 guide cards, each linking to guide landing page -->
<!-- Same dark theme, same Tailwind config as index.html -->
<!-- Card: guide title + 1-line hook + "Download free guide" link -->
```

---

## The 5 Guides — Content Map

Each guide maps to an existing ops/packages/ doc for ROI sourcing. Industry assignment is Claude's discretion; these are recommendations based on existing Reddit evidence.

| Guide | Title                          | Ops Package Source       | Recommended Industry | ROI Anchor                                       |
| ----- | ------------------------------ | ------------------------ | -------------------- | ------------------------------------------------ |
| 1     | "The 30-second save"           | missed-call-text-back.md | Salon (hair/nails)   | 5 calls/week x $80 = $400/week                   |
| 2     | "The review machine"           | review-reputation.md     | Dental practice      | 30 -> 90 reviews = 25-30% more clicks            |
| 3     | "The Monday morning pipeline"  | lead-follow-up.md        | Cleaning service     | No source doc — manual lead log + weekly summary |
| 4     | "The quote that writes itself" | quote-follow-up.md       | Law firm             | Sunday night = 2 hrs; automation = 10 min        |
| 5     | "The no-show killer"           | appointment-reminders.md | Gym                  | 3 no-shows/week x $80 = $12,480/year             |

**Note on Guide 3 (Monday pipeline):** The lead-follow-up package describes real-time automation; Guide 3 is a weekly summary report. The ROI story is different: "no more Monday morning scramble to remember where every lead stands." Sourced from general knowledge about CRM chaos, not the ops doc's ROI math.

---

## State of the Art

| Old Approach                    | Current Approach                                       | When Changed                  | Impact                                                               |
| ------------------------------- | ------------------------------------------------------ | ----------------------------- | -------------------------------------------------------------------- |
| wkhtmltopdf for HTML-to-PDF     | puppeteer (headless Chrome)                            | 2018-2020                     | Accurate CSS3 rendering, gradients, flexbox, custom fonts — all work |
| External CSS files in PDF HTML  | Inline styles in template                              | Always best practice for PDFs | No network dependency during PDF generation                          |
| -webkit-print-color-adjust only | Both -webkit-print-color-adjust AND print-color-adjust | ~2023 (CSS Color Adjust spec) | Modern Chrome respects both; older syntax still required as fallback |
| page-break-inside (deprecated)  | break-inside (CSS spec) + fallback                     | CSS Fragmentation Module L3   | Use both: page-break-inside: avoid AND break-inside: avoid           |

**Deprecated/outdated:**

- `page-break-inside`, `page-break-after`: Still works but the modern spec uses `break-inside`, `break-after`. Use both in template for maximum compatibility.
- wkhtmltopdf: Last release 2020, uses QtWebKit. Do not use.

---

## Open Questions

1. **PDF preview image generation approach**
   - What we know: page.screenshot() with clip works; static designed thumbnail is simpler
   - What's unclear: Whether auto-screenshot from Puppeteer (same run as PDF) produces good-looking 400px preview images
   - Recommendation: Generate screenshot previews in the same Puppeteer session as PDF (one browser launch); if quality is poor after review, replace with static designed thumbnails (Claude's discretion)

2. **GitHub Pages base URL for /guides/**
   - What we know: website/ is the repo root for GitHub Pages; website/guides/ directory will be created
   - What's unclear: Whether sameerautomations.com is currently pointing to the GitHub Pages deployment (STATE.md notes "Deploy landing page to GitHub Pages" as still pending)
   - Recommendation: The phase creates files in website/guides/ ready for deployment; the GitHub Pages setup is a prerequisite that may need to happen first or in parallel

3. **Commander.js .option() vs .requiredOption() change**
   - What we know: Existing repurposing-script tests import lib/ directly, not index.js — so tests won't break
   - What's unclear: Whether any external usage or documentation references --url as required
   - Recommendation: Change to .option(), add manual validation in async body, update package.json description — simple and safe

---

## Sources

### Primary (HIGH confidence)

- https://pptr.dev/api/puppeteer.pdfoptions — confirmed PDFOptions: printBackground, format, margin, preferCSSPageSize, waitForFonts
- https://pptr.dev/api/puppeteer.page.pdf — confirmed -webkit-print-color-adjust: exact for color preservation
- Existing codebase: research/tools/repurposing-script/lib/formatter.js — BANNED_PHRASES load pattern, buildPrompt() interface
- Existing codebase: research/tools/repurposing-script/lib/generator.js — Claude API call pattern, model claude-opus-4-6
- Existing codebase: research/tools/repurposing-script/index.js — commander.js usage, --from-cache flag pattern
- Existing codebase: ops/packages/\*.md — ROI math sourced directly for guide content
- Existing codebase: brand/brand-voice.md — typography, colors, tone rules (HIGH confidence, first-party)
- Existing codebase: website/index.html — CSS patterns, Tailwind config, font declarations

### Secondary (MEDIUM confidence)

- https://latenode.com/blog/web-automation-scraping/puppeteer-fundamentals-setup/complete-guide-to-pdf-generation-with-puppeteer-from-simple-documents-to-complex-reports — page break patterns, -webkit-print-color-adjust usage
- https://marked.js.org/ — marked.parse() API for markdown-to-HTML
- https://github.com/simonhaenisch/md-to-pdf — confirms marked + puppeteer is the established Node.js pattern for markdown-to-PDF

### Tertiary (LOW confidence)

- WebSearch results on puppeteer dark theme — confirmed by official docs, elevated to MEDIUM/HIGH

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — puppeteer and marked are confirmed via official docs; commander already in use
- Architecture: HIGH — all patterns verified against existing codebase structure and Puppeteer API docs
- Pitfalls: HIGH — dark background issue is documented in official puppeteer issues and API reference; page break issues verified in puppeteer GitHub issues
- Content map: HIGH — sourced directly from ops/packages/\*.md (first-party)

**Research date:** 2026-03-03
**Valid until:** 2026-06-01 (puppeteer API is stable; color-adjust CSS is settled)

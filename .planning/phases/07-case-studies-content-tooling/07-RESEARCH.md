# Phase 7: Case Studies + Content Tooling - Research

**Researched:** 2026-03-02
**Domain:** Node.js CLI development, content strategy documentation, Markdown-based tooling
**Confidence:** HIGH — all five deliverables have detailed pre-existing specs, drafts, or source data already in the repo; implementation is primarily execution against defined artifacts, not discovery.

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Content idea CLI behavior:**

- Parser strategy for topic-bank.md: Claude's discretion — choose between line-by-line state machine or lightweight Markdown parser (marked) based on the actual file structure. Prioritize defensive parsing that fails clearly on format changes.
- De-duplication against YouTube content plan: Claude's discretion — choose between keyword matching or category-based matching. The spec's "closely overlaps" definition needs a concrete rule before writing code.
- Installation: use npx local execution (`npx ./research/tools/content-idea-cli`) — zero setup friction, works from repo root, no global install needed.
- Output style: clean by default, verbose with `--verbose` flag. Default output shows topics + hooks only. Verbose mode adds scores, penalties, de-dup reasons.
- Tech stack locked: Node.js, Commander.js v14.0.3, CommonJS modules, local-only (no network), Markdown to stdout.
- Spec already exists at `research/tools/content-idea-cli-spec.md` — implementation should follow it closely.

**Demo capability library (CASE-03):**

- Format: capability briefs — one-page documents per use case (problem, solution overview, expected ROI, real evidence). Sales-focused, not technical. Fastest to produce.
- Industry targeting: follow the package lineup — one demo per existing package (missed call text-back, lead follow-up, quote follow-up, review automation, appointment reminders). Maps to 5 demos, each tied to a sellable product.
- Depth: tiered approach — top 2 use cases get full case-study depth (~130 lines with narrative and before/after). Remaining 3 get condensed briefs (~50 lines). Balances quality and production speed.
- ROI sourcing: combine package ROI calculations with real Reddit evidence. Package files have exact pricing/ROI examples. Reddit posts have real business owner numbers (e.g., "close rate went from 23% to 41%"). Use both.
- Location: `research/case-studies/` directory alongside the Raj Photo Video case study and template.

**Case study depth and tone:**

- Client identity: follow the template's existing confidentiality rules — industry + size descriptors by default, client names only with written approval.
- Financial detail: depends on the engagement — exact numbers for Sameer's own business (Raj Photo Video), ranges for client businesses unless they approve exact figures.
- Template structure: keep the 7-section format (profile, before, problem, solution, results, what made it work, what others should know). Add a TL;DR block at the top with 3 key numbers (revenue recovered, time saved, system cost) for scanners.
- Timeline section: add as optional field in the template — include build duration, onboarding time, time to first results when data is available.
- Raj Photo Video case study (CASE-01) is already drafted at `research/case-studies/01-raj-photo-video.md` — needs review against the updated template (TL;DR + optional timeline), then finalize.
- Case study template exists at `research/case-studies/TEMPLATE.md` — needs updating with TL;DR and timeline sections.

**Content calendar finalization (TOOL-02):**

- Posting cadence: start slower, ramp up — Weeks 1-2 lighter load (YouTube + 1 Twitter + 1 Instagram), Weeks 3-4 full cadence (YouTube + 3 Twitter + 2 Instagram). Build production momentum without burnout.
- Week 2 double YouTube: decide after Week 1 analytics — keep the plan flexible. If Week 1 production was smooth, do 2 uploads in Week 2. If rough, spread Video 2 into Week 3.
- Calendar format: Markdown is the source of truth (version-controlled, repo-native). Generate CSV export for spreadsheet/scheduling tool import when needed.
- Hub model: YouTube is primary hub, but allow ~20% platform-original content (timely reactions, quick tips on Twitter/Instagram that don't derive from a YouTube video). 80% derived from YouTube.
- Draft calendar already exists at `research/content-calendar-draft.md` — needs updating with the cadence, flexibility, and hub model decisions captured here.
- Brand voice rules from `brand/brand-voice.md` apply to all calendar entries.

### Claude's Discretion

- CLI parser implementation approach (state machine vs. marked library)
- De-duplication matching algorithm details
- Which 2 of the 5 demo use cases get full depth vs. condensed briefs (pick based on topic bank scores and package strength)
- Exact TL;DR format for case study template
- CSV export format and generation method for calendar

### Deferred Ideas (OUT OF SCOPE)

- Content repurposing script (TOOL-03) and video clipping tool (TOOL-04) — Phase 8 territory
- Live sandbox demo environments — too high maintenance for Phase 7, revisit when client base grows
- Notion/Airtable content calendar sync — Phase 8+ after production workflow is established
- Competitor gap score integration into CLI — depends on Phase 5 RSCH-03 completion, CLI handles absent data gracefully
  </user_constraints>

---

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                                                             | Research Support                                                                                                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TOOL-01 | Content idea CLI tool generates 5-10 topic suggestions from competitor research and trending automation topics for small business       | Full spec exists at `research/tools/content-idea-cli-spec.md` (403 lines). All input data exists: topic-bank.md (12 topics), content-plan.md (5 videos), 6 package files. Commander.js v14.0.3 locked. Implementation is spec execution. |
| TOOL-02 | Content calendar exists with first 4 weeks of topics, formats, and target platforms planned                                             | Draft calendar exists at `research/content-calendar-draft.md` (155 lines, complete 4-week table). Needs cadence update (ramp model) and hub model clarification. CSV export method needs implementation decision.                        |
| CASE-01 | Case study #1 documents Raj Photo Video automation experience with before/after metrics in problem → stakes → solution → results format | Draft exists at `research/case-studies/01-raj-photo-video.md` (135 lines). Already in correct format. Needs TL;DR block added (3 key numbers) and optional timeline section. Template update required first.                             |
| CASE-02 | Reusable case study template exists that any future automation can follow (buyer-focused, non-technical language, quantified outcomes)  | Template exists at `research/case-studies/TEMPLATE.md` (187 lines, 7 sections with HTML authoring instructions). Needs TL;DR block and optional timeline section added per decisions.                                                    |
| CASE-03 | Research identifies top 3-5 automation use cases proven to sell to small business owners and demo builds are created showing capability | 5 use cases identified (maps directly to 5 packages). ROI data exists in package files. Reddit evidence in topic-bank.md. Top 2 (missed call text-back, quote follow-up) get full depth; remaining 3 get condensed briefs.               |

</phase_requirements>

---

## Summary

Phase 7 is an execution phase, not a discovery phase. Every deliverable has substantial pre-existing work: the CLI has a 403-line spec with complete command interface, data model, scoring algorithm, and example output defined; the content calendar has a complete 4-week draft ready for cadence updates; the Raj Photo Video case study is drafted at 135 lines in the correct format; the template exists at 187 lines; and all 5 demo capability use cases have source data (package files + Reddit evidence). No new research inputs are needed — this phase converts existing artifacts into finished deliverables.

The CLI is the only piece requiring code. Everything else is document authoring: update the template, finalize the case study, write 5 capability briefs, update the calendar. The most important decision the planner must make is sequencing — the template (CASE-02) must be updated before the case study (CASE-01) is finalized against it, and the CLI directory structure must be created before the entry point is wired up.

The primary risk is scope drift on the capability briefs. The 5-brief format is already decided (top 2 full depth, remaining 3 condensed), and all source data exists. The planner should treat these as document-writing tasks against a defined template, not open-ended research tasks.

**Primary recommendation:** Sequence tasks as: (1) CASE-02 template update, (2) CASE-01 finalization, (3) CASE-03 capability briefs, (4) TOOL-02 calendar update, (5) TOOL-01 CLI build. The CLI is the most complex task and benefits from the content context established by steps 1-4.

---

## Standard Stack

### Core

| Library                           | Version              | Purpose              | Why Standard                                   |
| --------------------------------- | -------------------- | -------------------- | ---------------------------------------------- |
| Node.js                           | v22.17.0 (installed) | CLI runtime          | Already installed, locked by project decisions |
| Commander.js                      | v14.0.3              | CLI argument parsing | Locked by Phase 5 decision — do not change     |
| CommonJS (require/module.exports) | —                    | Module system        | Locked by project convention — do not use ESM  |

### Supporting

| Library         | Version | Purpose                     | When to Use                                                                   |
| --------------- | ------- | --------------------------- | ----------------------------------------------------------------------------- |
| fs (built-in)   | —       | File reading                | Read all 4 data source files at startup                                       |
| path (built-in) | —       | Path resolution             | Resolve `CONSULTANCY_ROOT` env var or fallback to script directory            |
| marked          | v13+    | Markdown parsing (optional) | Only if state machine approach proves too fragile for topic-bank.md structure |

### Alternatives Considered

| Instead of           | Could Use          | Tradeoff                                                                                                                                    |
| -------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| State machine parser | marked library     | Marked adds a dependency but handles malformed Markdown more gracefully; state machine is zero-dependency but breaks if file format changes |
| Commander.js         | minimist, yargs    | Commander is locked — do not substitute                                                                                                     |
| npx local execution  | npm link / npm run | npx local is simpler, zero global install, chosen by user                                                                                   |

**Installation:**

```bash
# No npm install required for the CLI itself at runtime.
# If marked is chosen as the parser approach:
npm install marked --prefix research/tools/content-idea-cli
```

---

## Architecture Patterns

### Recommended Project Structure

```
research/tools/content-idea-cli/
├── index.js          # CLI entry point — Commander setup, flag parsing, main()
├── package.json      # bin field: { "sameer-ideas": "./index.js" }, CommonJS type: "commonjs"
├── lib/
│   ├── loader.js     # Data loading — reads all 4 source files, returns raw strings
│   ├── parser.js     # Markdown parsing — converts raw strings to topic data model
│   ├── scorer.js     # Scoring — applies package bonus, de-dup penalty, format adjustments
│   ├── formatter.js  # Output — renders topic objects to Markdown sections per platform
│   └── dedup.js      # De-duplication — keyword or category matching against content-plan.md
└── README.md         # Minimal usage docs
```

### Pattern 1: Load-once, score-all

**What:** All data sources (topic-bank.md, content-plan.md, packages/\*.md) are read at startup synchronously using `fs.readFileSync`. Data is loaded into memory once. Scoring runs over the full in-memory dataset. No streaming, no lazy loading.

**When to use:** Always — total data footprint is under 30KB (topic bank ~6KB, packages ~15KB, content plan ~8KB). The spec explicitly calls for this approach.

**Example:**

```javascript
// lib/loader.js
const fs = require("fs");
const path = require("path");

function resolveRoot() {
  return process.env.CONSULTANCY_ROOT || path.resolve(__dirname, "../../../..");
}

function loadSources(root) {
  const topicBank = fs.readFileSync(
    path.join(root, "research/output/topic-bank.md"),
    "utf8",
  );

  let contentPlan = null;
  try {
    contentPlan = fs.readFileSync(
      path.join(root, "content/youtube/content-plan.md"),
      "utf8",
    );
  } catch (e) {
    console.warn("[warn] content-plan.md not found — skipping de-duplication");
  }

  const packageDir = path.join(root, "ops/packages");
  let packages = [];
  try {
    const files = fs
      .readdirSync(packageDir)
      .filter((f) => f.endsWith(".md") && f !== "CLAUDE.md");
    packages = files.map((f) =>
      fs.readFileSync(path.join(packageDir, f), "utf8"),
    );
  } catch (e) {
    console.warn(
      "[warn] ops/packages/ not found — skipping package enrichment",
    );
  }

  return { topicBank, contentPlan, packages };
}

module.exports = { loadSources, resolveRoot };
```

### Pattern 2: State machine parser for topic-bank.md

**What:** Parse the topic bank line-by-line using a simple state machine with states: `SCANNING`, `IN_RANKED_TABLE`, `IN_TOPIC_SECTION`. When a line starts with `### ` and follows a topic-detail section, transition state. When a `**Score:**` line is detected, extract the value. Exit cleanly if expected format is not found.

**When to use:** The topic-bank.md file has a consistent, repo-generated structure. The state machine handles it with zero dependencies. Use `marked` only if the file structure proves inconsistent across re-runs.

**Why state machine over marked:** The topic-bank.md is machine-generated by `reddit-scraper.py` and has a predictable format. The spec notes "a simple line-by-line state machine parser is sufficient." Marked adds a dependency for no real gain given the file's regularity.

**Example:**

```javascript
// lib/parser.js — simplified state machine
function parseTopicBank(raw) {
  const topics = [];
  let current = null;
  let state = "SCANNING";

  for (const line of raw.split("\n")) {
    if (line.startsWith("### ") && state !== "IN_RANKED_TABLE") {
      if (current) topics.push(current);
      current = {
        title: line.slice(4).trim(),
        subreddits: [],
        evidenceQuotes: [],
      };
      state = "IN_TOPIC_SECTION";
    } else if (state === "IN_TOPIC_SECTION" && line.startsWith("**Score:**")) {
      current.baseScore = parseFloat(line.match(/[\d.]+/)?.[0] ?? "0");
    } else if (
      state === "IN_TOPIC_SECTION" &&
      line.startsWith("**Subreddits:**")
    ) {
      current.subreddits = line
        .replace("**Subreddits:**", "")
        .trim()
        .split(",")
        .map((s) => s.trim());
    } else if (
      state === "IN_TOPIC_SECTION" &&
      line.startsWith("**Package:**")
    ) {
      current.packageMatch = line.replace("**Package:**", "").trim();
    } else if (state === "IN_TOPIC_SECTION" && line.startsWith('> "')) {
      current.evidenceQuotes.push(
        line.replace(/^> "/, "").replace(/"$/, "").trim(),
      );
    }
  }
  if (current) topics.push(current);

  if (topics.length === 0) {
    throw new Error(
      "Topic bank parser failed — no topics found. Check file format at research/output/topic-bank.md",
    );
  }
  return topics;
}
```

### Pattern 3: De-duplication by core pain point category

**What:** Extract the core pain category from each YouTube content-plan.md video (bookkeeping, missed call, employee replacement, automation framework, content engine). Check each topic bank topic against these categories using keyword matching on the topic title and content angle. If a topic's title contains any category keyword, mark `alreadyCovered: true` and apply the -30% penalty.

**When to use:** Always, when content-plan.md is available.

**Concrete rule to resolve spec's ambiguity:** Match on the core business problem, not the industry. "Missed calls" matches any topic whose title or angle mentions "missed," "call," "unanswered." "Bookkeeping" matches topics mentioning "bookkeeping," "invoice," "accounting." This prevents false positives (a missed-call topic for HVAC vs. the existing missed-call video for photography — these overlap on the core problem even if the industry differs).

**Keywords to extract from content-plan.md:**

```javascript
const COVERED_THEMES = [
  {
    theme: "bookkeeping",
    keywords: ["bookkeeping", "invoice", "accounting", "financial"],
  },
  {
    theme: "missed-call",
    keywords: ["missed call", "missed calls", "unanswered", "text-back"],
  },
  {
    theme: "employee-replacement",
    keywords: ["employee", "staff", "hire", "operations"],
  },
  {
    theme: "automation-framework",
    keywords: ["worth automating", "what to automate", "framework"],
  },
  {
    theme: "content-engine",
    keywords: ["content engine", "content pipeline", "social posts"],
  },
];
```

### Pattern 4: Commander.js v14 setup

**What:** Commander v14 uses the standard `.command()` / `.option()` / `.action()` pattern. The CLI has no subcommands — all behavior is flags on the root command.

**Example:**

```javascript
// index.js
#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const { loadSources, resolveRoot } = require('./lib/loader');
const { parseTopicBank } = require('./lib/parser');
const { scoreTopics } = require('./lib/scorer');
const { formatOutput } = require('./lib/formatter');

const program = new Command();

program
  .name('sameer-ideas')
  .description('Generate content topic suggestions from local research data')
  .option('-c, --count <n>', 'number of topics to return', '5')
  .option('-f, --focus <vertical>', 'filter by vertical or keyword')
  .option('-m, --format <platform>', 'output format: youtube, twitter, carousel', 'youtube')
  .option('--verbose', 'show scores, penalties, and de-dup reasons')
  .action((options) => {
    const root = resolveRoot();
    const sources = loadSources(root);
    const topics = parseTopicBank(sources.topicBank);
    const scored = scoreTopics(topics, sources, options);
    const output = formatOutput(scored, options);
    process.stdout.write(output);
  });

program.parse(process.argv);
```

### Pattern 5: TL;DR block for case study template

**What:** A 3-line summary block at the top of every case study (after the title/metadata, before the Client Profile section). Contains exactly 3 metrics in bold: revenue recovered, time saved, system cost. Format is a blockquote or bold list — scannable without reading the full document.

**Recommended format (Claude's discretion resolved here):**

```markdown
> **Revenue recovered:** $4,200/month
> **Time saved:** 5-7 hours/week
> **System cost:** $200/month
```

This format works in Markdown renders, terminals, and copy-paste into social posts. Three lines, three numbers, done.

### Pattern 6: Capability brief structure (CASE-03)

**What:** Each of the 5 capability briefs follows a 5-section structure: (1) The problem in one sentence, (2) Who it affects (industry + trigger), (3) What the system does in plain English, (4) Expected ROI (from package file), (5) Real evidence (from topic-bank.md Reddit quotes).

**Full depth briefs (~130 lines):** Add a 6th section with before/after comparison table and a "what made it work" narrative. These are the top 2 by topic bank score and package strength.

**Condensed briefs (~50 lines):** Five sections only, no narrative section, tighter prose.

**Which 2 get full depth (Claude's discretion resolved here):** Missed Call Text-Back (rank #4, score 2218.5, highest-validated with 4 posts across 3 subreddits, universal pain for all trades) and Quote Follow-Up (rank #5, score 2076.5, highest individual evidence upvote count at 1,243 on r/entrepreneur, direct close-rate improvement metric). These two have the strongest ROI evidence and broadest applicability to the target audience.

### Anti-Patterns to Avoid

- **Technical language in case studies:** Never explain Twilio, webhooks, n8n, or automation platforms by name in external-facing documents. Explain what the system does, not how it works under the hood.
- **Global npm install:** The spec explicitly requires `npx ./research/tools/content-idea-cli` — no global install. The `package.json` `bin` field is for npx execution, not `npm link`.
- **Hard-coded paths:** Always resolve from `CONSULTANCY_ROOT` env var or script-relative path. Never assume the working directory.
- **Silent failures:** Every data source failure must produce a clear error or warning. The topic bank is required (exit on failure). The content plan and packages are optional (warn and continue).
- **ESM modules:** The project uses CommonJS. Do not use `import`/`export` or `"type": "module"` in package.json.

---

## Don't Hand-Roll

| Problem                      | Don't Build                 | Use Instead               | Why                                                                                                                              |
| ---------------------------- | --------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| CLI argument parsing         | Custom argv parser          | Commander.js v14.0.3      | Already locked; handles --verbose, -c, -f, -m cleanly with automatic help generation                                             |
| Markdown parsing (if needed) | Custom regex parser         | marked library            | Handles edge cases in Markdown formatting that a hand-rolled regex won't catch                                                   |
| CSV generation               | Custom string concatenation | Simple join with escaping | For the calendar CSV export, a 1-function approach with proper comma-escaping is sufficient — no library needed for a flat table |

**Key insight:** The CLI data sources are small, local, and machine-generated with consistent formatting. Don't over-engineer the parser. A 50-line state machine handles the topic bank reliably. Only reach for `marked` if the state machine produces wrong results on the actual file.

---

## Common Pitfalls

### Pitfall 1: Parser assumes file structure won't change

**What goes wrong:** The topic bank is generated by `reddit-scraper.py`. If the scraper is re-run with real Reddit credentials (replacing the current sample data), the output format could differ slightly — different section ordering, different evidence quote formatting.

**Why it happens:** The spec was written against a specific file snapshot. Real data may have edge cases the sample data doesn't.

**How to avoid:** The parser must check its own output. After parsing, verify that `topics.length > 0` and that each topic has a non-zero `baseScore`. Throw a descriptive error if validation fails: "Parser produced 0 topics — check topic-bank.md format at [section name]."

**Warning signs:** The CLI returns empty output or shows 0 topics without an error message.

### Pitfall 2: De-duplication is too aggressive

**What goes wrong:** The de-duplication marks too many topics as "already covered" because keyword matching is too broad. Result: the CLI returns only 2-3 topics even when 12 exist.

**Why it happens:** The "missed calls" theme matches not just the exact missed call topic, but any topic that mentions calls, phone, or response time — which is many of them.

**How to avoid:** Test the de-duplication against all 12 topics before finalizing. The penalty is -30% (soft), not exclusion. Topics should still appear in output unless their adjusted score drops below all non-penalized topics. The `--verbose` flag should show which penalty was applied and why.

**Warning signs:** Running `sameer-ideas --count 12` returns fewer than 12 topics without a "bank exhausted" message.

### Pitfall 3: Case study violates confidentiality rules

**What goes wrong:** A capability brief or case study references the client by name, references Sameer's employer, or mentions a specific financial institution.

**Why it happens:** The ROI examples in package files sometimes reference specific client scenarios that could be traced to real people or employers.

**How to avoid:** Every external document (case study, brief) must describe clients as "a solo wedding photographer," "a mid-size HVAC company," "a plumbing contractor" — never by name. The brand-voice.md confidentiality rules (section 8) are a hard constraint, not a stylistic preference. Review every document against these rules before marking as complete.

**Warning signs:** Any document contains a company name, a person's surname, or any reference to financial services, banking, or related domains.

### Pitfall 4: Calendar ramp model conflicts with existing draft

**What goes wrong:** The existing `content-calendar-draft.md` uses full cadence (3 Twitter + 2 Instagram) from Week 1. The decided ramp model starts lighter (1 Twitter + 1 Instagram Weeks 1-2, full in Weeks 3-4). Simply updating the cadence table without updating the per-week content plan creates inconsistency.

**Why it happens:** The draft was generated before the ramp decision was made.

**How to avoid:** When updating the calendar, update both the posting cadence table AND review each week's content rows to remove/defer posts that exceed the Week 1-2 lighter load. A Week 1 with 5 Twitter posts in the draft needs to be reduced to 1.

**Warning signs:** The cadence table says "1 Twitter" but the Week 1 table has 3 Twitter entries.

### Pitfall 5: npx execution requires correct package.json bin field

**What goes wrong:** Running `npx ./research/tools/content-idea-cli` fails with "no bin field" or "command not found."

**Why it happens:** npx looks for the `bin` field in package.json when given a directory path. If the field is missing or uses the wrong key, npx cannot find the entry point.

**How to avoid:** The `package.json` must include:

```json
{
  "name": "content-idea-cli",
  "version": "1.0.0",
  "bin": {
    "sameer-ideas": "./index.js"
  }
}
```

And `index.js` must have `#!/usr/bin/env node` as line 1. Test with `npx ./research/tools/content-idea-cli` from the repo root before marking TOOL-01 complete.

---

## Code Examples

Verified patterns from existing project code and spec:

### Topic data model (from spec)

```javascript
// Internal data model per topic — from content-idea-cli-spec.md
{
  rank: 4,
  title: 'Missed Calls Losing Customers to Competitors',
  baseScore: 2218.5,
  adjustedScore: 2551.3,     // baseScore × 1.15 (package match bonus)
  contentAngle: 'How a missed call text-back made one HVAC tech $4,200 last month without picking up the phone',
  subreddits: ['r/HVAC', 'r/nocode', 'r/smallbusiness'],
  evidencePosts: 4,
  subredditSpread: 3,
  evidenceQuotes: [
    "Missed 3 calls today while on a roof — I know I lost at least 2 jobs to a competitor",
    "Missed calls are costing me real money — HVAC owner rant + question"
  ],
  packageMatch: 'missed-call-text-back',
  packageStatus: 'Ready to sell',
  packageDetails: {
    name: 'Missed Call Text-Back',
    buildPrice: 1500,
    monthlyRetainer: 200,
    roiExcerpt: '2 recovered leads/month × $600 average job = $1,200/month in recovered revenue'
  },
  alreadyCovered: false,
  competitorGapScore: 0
}
```

### Scoring algorithm (from spec)

```javascript
// lib/scorer.js
function scoreTopics(topics, sources, options) {
  return topics
    .map((topic) => {
      let score = topic.baseScore;

      // Package match bonus: +15%
      if (topic.packageStatus === "Ready to sell") {
        score *= 1.15;
      }

      // Already-covered penalty: -30%
      if (topic.alreadyCovered) {
        score *= 0.7;
      }

      // Format adjustments: +5%
      if (options.format === "twitter" && hasShortQuotes(topic)) {
        score *= 1.05;
      }
      if (options.format === "carousel" && hasMultiStepProcess(topic)) {
        score *= 1.05;
      }

      return { ...topic, adjustedScore: score };
    })
    .filter((topic) => {
      if (!options.focus) return true;
      const focus = options.focus.toLowerCase();
      return (
        topic.subreddits.some((s) => s.toLowerCase().includes(focus)) ||
        topic.evidenceQuotes.some((q) => q.toLowerCase().includes(focus))
      );
    })
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    .slice(0, parseInt(options.count) || 5);
}
```

### TL;DR block format (resolved Claude's discretion)

```markdown
<!-- Case study header — before Client Profile section -->

> **Revenue recovered:** $4,200/month
> **Time saved:** 5-7 hours/week
> **System cost:** $200/month
```

### CSV export for content calendar (simple implementation)

```javascript
// Simple CSV export — no library needed for flat table
function calendarToCSV(calendarRows) {
  const headers = [
    "Week",
    "Day",
    "Topic",
    "Format",
    "Platforms",
    "Hook",
    "Package",
  ];
  const escape = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const rows = calendarRows.map((row) =>
    headers.map((h) => escape(row[h] ?? "")).join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}
```

---

## State of the Art

| Old Approach                         | Current Approach                     | When Changed                   | Impact                                                                        |
| ------------------------------------ | ------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------- |
| Manual topic bank review (20-30 min) | CLI generates in seconds             | Phase 7 (this phase)           | Eliminates content planning friction                                          |
| Full-cadence calendar from week 1    | Ramp model (lighter start)           | CONTEXT.md decision 2026-03-02 | Reduces burnout risk, aligns with production learning curve                   |
| Case studies without TL;DR           | TL;DR block (3 numbers) for scanners | CONTEXT.md decision 2026-03-02 | Makes social proof scannable for busy prospects                               |
| Calendar only in Markdown            | Markdown + CSV export                | CONTEXT.md decision 2026-03-02 | Enables spreadsheet/Buffer import without leaving Markdown as source of truth |

**Note on topic bank status:** The current `research/output/topic-bank.md` carries a PRELIMINARY flag — it was generated from sample data. The CLI should work correctly with both sample and real data. The PRELIMINARY warning in the file does not affect Phase 7 deliverables (the CLI's output is clearly labeled with the data generation date).

---

## Open Questions

1. **Competitor gap score availability (from spec open question #1)**
   - What we know: The scoring model has a `competitorGapScore` field defaulting to 0. The competitor audit data (RSCH-03) is in `research/output/competitor-audit.md` but may not be in the format the CLI expects.
   - What's unclear: Does `competitor-audit.md` have a per-topic gap score the CLI can parse, or does it need post-processing?
   - Recommendation: Read `competitor-audit.md` during Wave 0. If it has per-topic scores, wire them in. If not, leave `competitorGapScore: 0` and add a `// TODO: wire in when audit format is finalized` comment. Do not block CLI completion on this.

2. **npx execution on Windows**
   - What we know: The spec targets local execution via `npx ./research/tools/content-idea-cli`. This works on macOS/Linux.
   - What's unclear: Whether Sameer uses this on Windows. The shebang line (`#!/usr/bin/env node`) does not execute on Windows CMD without special handling.
   - Recommendation: No action needed — the project is run on macOS (Node v22.17.0 installed on darwin). Document macOS assumption in README.

3. **Calendar Weeks 1-2 content reduction**
   - What we know: The draft calendar has full cadence from Week 1. The decision is lighter (1 Twitter + 1 Instagram) for Weeks 1-2.
   - What's unclear: Which specific posts to defer vs. keep — some Week 1 posts (origin story Twitter thread, origin story YouTube) are essential regardless of cadence.
   - Recommendation: Planner should create a specific task to review each Week 1-2 row and mark which posts move to Week 3-4 vs. stay. The YouTube video and 1 core Twitter thread per week should be preserved. Secondary platform posts (Instagram Reels clips, additional Twitter threads) are candidates for deferral.

---

## Deliverable Inventory

This section gives the planner a clear picture of what exists vs. what needs to be built.

### What exists (modify only)

| File                                          | Current State                 | What's Needed                                                                                                                      |
| --------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `research/case-studies/TEMPLATE.md`           | 187 lines, 7-section template | Add TL;DR block section + optional timeline section                                                                                |
| `research/case-studies/01-raj-photo-video.md` | 135 lines, complete draft     | Add TL;DR block (3 numbers from existing Results section), verify against updated template                                         |
| `research/content-calendar-draft.md`          | 155 lines, 4-week table       | Update cadence table (ramp model), add flexibility note for Week 2 double YouTube, add hub model rule (80/20), generate CSV export |

### What needs to be created (new files)

| File                                                | Size Target             | Source Material                                                      |
| --------------------------------------------------- | ----------------------- | -------------------------------------------------------------------- |
| `research/case-studies/02-missed-call-text-back.md` | ~130 lines (full depth) | `ops/packages/missed-call-text-back.md` + topic-bank.md #4 evidence  |
| `research/case-studies/03-quote-follow-up.md`       | ~130 lines (full depth) | `ops/packages/quote-follow-up.md` + topic-bank.md #5 evidence        |
| `research/case-studies/04-lead-follow-up.md`        | ~50 lines (condensed)   | `ops/packages/lead-follow-up.md` + topic-bank.md #9 evidence         |
| `research/case-studies/05-review-reputation.md`     | ~50 lines (condensed)   | `ops/packages/review-reputation.md` + topic-bank.md #6 evidence      |
| `research/case-studies/06-appointment-reminders.md` | ~50 lines (condensed)   | `ops/packages/appointment-reminders.md` + topic-bank.md #11 evidence |
| `research/tools/content-idea-cli/index.js`          | ~50 lines               | CLI spec entry point                                                 |
| `research/tools/content-idea-cli/lib/loader.js`     | ~40 lines               | CLI spec data loading                                                |
| `research/tools/content-idea-cli/lib/parser.js`     | ~80 lines               | CLI spec parser                                                      |
| `research/tools/content-idea-cli/lib/scorer.js`     | ~60 lines               | CLI spec scoring algorithm                                           |
| `research/tools/content-idea-cli/lib/formatter.js`  | ~80 lines               | CLI spec output format                                               |
| `research/tools/content-idea-cli/lib/dedup.js`      | ~40 lines               | De-duplication logic                                                 |
| `research/tools/content-idea-cli/package.json`      | ~15 lines               | bin field, name, version                                             |

---

## Sources

### Primary (HIGH confidence)

- `research/tools/content-idea-cli-spec.md` — complete CLI specification (403 lines), written by project owner, authoritative for TOOL-01
- `research/case-studies/01-raj-photo-video.md` — existing case study draft (135 lines), authoritative for CASE-01 current state
- `research/case-studies/TEMPLATE.md` — existing template (187 lines), authoritative for CASE-02 current state
- `research/content-calendar-draft.md` — existing calendar draft (155 lines), authoritative for TOOL-02 current state
- `research/output/topic-bank.md` — 12 ranked topics with scores and evidence, authoritative for CASE-03 use case selection
- `ops/packages/*.md` — 6 package files with ROI examples and descriptions, authoritative for CASE-03 content
- `.planning/phases/07-case-studies-content-tooling/07-CONTEXT.md` — user decisions, authoritative for all locked choices
- `brand/brand-voice.md` — brand constraints, authoritative for all written deliverables

### Secondary (MEDIUM confidence)

- Node.js v22.17.0 installed on system — verified via `node --version`
- Commander.js v14 behavior — documented in Phase 5 decision records, consistent with npm package documentation

### Tertiary (LOW confidence)

- None — all research findings are grounded in project files or installed software, not external searches.

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Commander.js v14.0.3 and Node.js v22 are locked by prior decisions and verified as installed
- Architecture: HIGH — all patterns derived directly from the existing CLI spec written by the project owner
- Pitfalls: HIGH — all pitfalls are grounded in the actual files and decisions in this repo, not general speculation
- Content deliverables: HIGH — template, case study, and calendar drafts all exist; changes are additive/editorial, not from scratch

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (30 days; stable project — no fast-moving external dependencies)

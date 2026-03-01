# Phase 5: Market Research + Pain Point Discovery - Context

**Gathered:** 2026-03-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Research real small business automation pain points using Reddit API and social listening. Produce a ranked topic bank of 10-15 automation problems that require custom solutions (not off-the-shelf software), plus a competitor content audit identifying gaps. Deliverables are reusable CLI tools and structured output files.

</domain>

<decisions>
## Implementation Decisions

### Reddit Research Scope

- Scrape three categories of subreddits: trade-focused (r/HVAC, r/plumbing, r/electricians, r/RealEstate, r/smallbusiness, r/entrepreneur), broader service businesses (r/lawncare, r/AutoDetailing, r/HomeImprovement, r/photography, r/personaltraining), and SaaS complaint subs (r/SaaS, r/nocode, r/zapier)
- Search terms seeded from existing ops/packages (missed-call-text-back, lead-follow-up, appointment-reminders, quote-follow-up, review-reputation, custom-build-intake) AND pain-point language patterns ("manually doing", "wasting time on", "wish there was a way to", "anyone automate", "tried X but")
- 12-month time range to capture seasonal patterns (tax season, holiday rush, etc.)
- Use Reddit's official API (free script app, 100 requests/min) — not scraping
- Build as reusable CLI script, not one-time analysis
- Include comment threads, not just top-level posts — real pain surfaces in replies
- Filter for posts with 5+ upvotes to focus on validated problems

### Topic Ranking Criteria

- Rank by frequency of pain point across subreddits, filtered to custom-automation-only topics
- A topic qualifies as "custom automation" when: posts mention trying off-the-shelf tools and hitting limits ("tried Zapier but...") OR the workflow involves 3+ systems, conditional logic, or industry-specific rules
- Final list: 10-15 ranked topics
- Each topic includes 2-3 actual Reddit quotes as evidence — usable directly in video scripts and content
- Each topic entry includes: pain point title, frequency score, evidence quotes, mapping to existing packages (if any), and a content angle suggestion
- Flag topics that map to existing ops/packages as "ready to sell" vs topics needing new service development

### Competitor Audit Method

- Audit YouTube only — richest automation content with visible engagement data. Twitter skipped (limited free access, surface-level content)
- Cover three competitor types: direct small biz automation agencies, automation educators/influencers, and no-code/low-code builders
- 5-8 competitors total — mix of direct and educators
- Output includes both gap analysis (what's NOT covered) and engagement data (what performs)
- Categorize competitor content by topic (lead gen, scheduling, invoicing, etc.) to spot saturated vs underserved topics
- Note production quality levels for benchmarking
- Flag competitors targeting the same industries (HVAC, plumbing, photo/video)

### Output Format & Deliverables

- Top-level `research/` directory alongside ops/, brand/, website/
- CLI tools in `research/scripts/` (reddit-scraper, competitor-audit)
- JSON raw data in `research/data/` (gitignored for large dumps)
- Human-readable output in `research/output/`:
  - `topic-bank.md` — ranked topics with scores, quotes, package mappings, content angles
  - `competitor-audit.md` — competitor analysis with gaps and engagement data
- Separate files for topic bank vs competitor audit (different purposes, different consumers)
- Reddit API key stored in `.env` with setup instructions in `research/README.md`

### Claude's Discretion

- Exact Reddit API pagination and rate limiting strategy
- NLP/analysis approach for extracting and clustering pain points from raw posts
- Competitor discovery method (manual curation vs search-based)
- JSON schema design for raw data storage
- CLI argument design (flags, options, defaults)

</decisions>

<specifics>
## Specific Ideas

- People frustrated with off-the-shelf tools (Zapier/HubSpot hitting limits) are the warmest leads — prioritize these signals
- Seasonal patterns matter (12-month window chosen specifically for this)
- Topic bank should be a content goldmine — Reddit quotes usable directly as video hooks ("A real HVAC business owner said...")
- Existing ops/packages/ definitions should seed the research — validates that your service offerings match real market demand

</specifics>

<code_context>

## Existing Code Insights

### Reusable Assets

- `ops/packages/` — 6 automation package definitions (missed-call-text-back, lead-follow-up, appointment-reminders, quote-follow-up, review-reputation, custom-build-intake) that seed search terms and provide package-mapping targets
- `ops/outreach/` — Outreach sequences and prospecting criteria that could inform which pain points are most sellable

### Established Patterns

- Project uses markdown for documentation (brand-voice.md, outreach templates)
- No existing Node.js/Python tooling in the project — this will be the first CLI script
- `.env` pattern not yet established — will need to set up for Reddit API credentials

### Integration Points

- Topic bank feeds Phase 7 (Content Tooling) — content idea CLI will reference these topics
- Competitor audit feeds Phase 6 (Platform Foundation) — platform bio copy and content direction
- Pain point evidence feeds Phase 7 (Case Studies) — proof that market needs custom automation

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 05-market-research-pain-point-discovery_
_Context gathered: 2026-03-01_

# Phase 9: Giveaway + Social Proof - Research

**Researched:** 2026-03-02
**Domain:** Lead magnet creation, landing page social proof, content marketing for service businesses
**Confidence:** HIGH

---

## Summary

Phase 9 has two distinct deliverables that serve a single strategic purpose: converting cold website visitors into booked discovery calls faster by giving them proof before they ask for it. The giveaway (GIVE-01) is a downloadable asset that qualifies buyers — its entire design goal is to make a plumber or HVAC owner think "I need someone to build this for me," not "I can build this myself." The social proof update (GIVE-02) replaces or supplements the six mock testimonials and placeholder case study section in `website/index.html` with real numbers already documented in `research/case-studies/01-raj-photo-video.md`.

The giveaway requires no new infrastructure. It is a PDF or Google Doc distributed via a direct download link — no email capture tool, no landing page funnel, no automation. The project principles explicitly defer automated posting and complex tooling to v2.1+. The giveaway's primary distribution channel at this stage is the YouTube video from Phase 8 and social bios, not an email list.

The landing page update is a targeted HTML edit to `website/index.html`. The file is large (3,300+ lines) but the relevant sections are well-commented: the `<!-- CASE STUDY -->` section at line 2267 contains clear `<!-- REPLACE WITH POC DATA -->` placeholders, and the `<!-- TESTIMONIALS -->` section starting at line 2762 contains six hard-coded mock testimonials attributed to fictional business owners. Both sections have precise insertion points for real data.

**Primary recommendation:** Create a single vertically-specific giveaway document (PDF/Google Doc) for HVAC or plumbing — "The Missed Call Problem: What It's Costing You and How Contractors Are Fixing It" — and update the landing page case study and testimonials sections with the Raj Photo Video numbers already documented in Phase 7.

---

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                                                                       | Research Support                                                                                                                                                                                                                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GIVE-01 | One vertical-specific giveaway created that qualifies buyers (e.g. "Lead Recovery Audit for Plumbers") — not a generic guide that attracts DIYers | Research confirms: giveaway must be framed around a specific business pain, written in outcome language (not how-to language), and hosted as a direct downloadable file. No email capture infrastructure needed at this stage.                                                                                                       |
| GIVE-02 | Landing page updated to include real case study metrics and demo automation results, replacing or supplementing mock testimonials                 | Research confirms: `website/index.html` contains clearly-marked placeholder sections at lines 2267–2355 (case study) and 2762–3300+ (testimonials). Real data from `research/case-studies/01-raj-photo-video.md` is ready to use — $4,200/month recovered, 4+ hours → 60 seconds response time, 5–7 hours/week admin → under 1 hour. |

</phase_requirements>

---

## Standard Stack

### Core

| Artifact          | Format                                              | Purpose                      | Why Standard                                                                         |
| ----------------- | --------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| Giveaway document | Google Doc (exported PDF)                           | Downloadable lead magnet     | Zero-cost, sharable via direct Google Drive link, printable. No platform dependency. |
| Landing page      | Static HTML (`website/index.html`)                  | Social proof display         | File already exists. Edit in place — no framework, no build step.                    |
| Case study source | `research/case-studies/01-raj-photo-video.md`       | Real metrics for GIVE-02     | Already written. Numbers verified: $4,200/mo, 60 sec response, 5–7h → <1h/week.      |
| Capability briefs | `research/case-studies/02-missed-call-text-back.md` | Secondary proof for giveaway | HVAC-focused brief with before/after table and Reddit evidence quotes.               |

### Supporting

| Asset                     | Format                                              | Purpose                              | When to Use                                                                        |
| ------------------------- | --------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| Brand voice guide         | `brand/brand-voice.md`                              | Writing rules for giveaway copy      | Required — no emojis, no buzzwords, contractions allowed, numbers always numerals  |
| Package file              | `ops/packages/missed-call-text-back.md`             | ROI numbers and pricing for giveaway | Use for "what this costs and what it returns" section in giveaway                  |
| Existing capability brief | `research/case-studies/02-missed-call-text-back.md` | Model for giveaway structure         | Giveaway should echo this structure but be positioned as discovery, not as a pitch |

### Alternatives Considered

| Instead of              | Could Use                                 | Tradeoff                                                                                             |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Google Doc (PDF export) | Canva PDF                                 | Canva is faster visually but adds a subscription dependency; Google Doc is instant and free          |
| Google Doc (PDF export) | ConvertKit / Mailchimp lead magnet funnel | Email capture adds infrastructure complexity deferred to v2.1; direct link is sufficient now         |
| Edit HTML directly      | Rebuild landing page in Next.js           | Rebuild is out of scope; targeted HTML edit is the right call given no deployment infrastructure yet |

**No npm packages or new tools are needed for this phase.** All deliverables are documents and HTML edits.

---

## Architecture Patterns

### Recommended Project Structure

```
website/
├── index.html              # GIVE-02: edit case study + testimonials sections
content/
└── giveaways/
    └── 01-missed-call-audit-hvac-plumbing.md   # GIVE-01: source document
```

The giveaway source lives in `content/giveaways/` as a Markdown file (mirrors how case studies are authored in `research/case-studies/`). The Google Doc is created from this source. Direct link to the published Google Doc is what gets shared on social and in YouTube descriptions.

### Pattern 1: Buyer-Qualifying Giveaway Structure

**What:** A downloadable document structured to make the reader conclude they need professional help, not that they can DIY.

**When to use:** Always — this is the core requirement of GIVE-01.

**The framing rule:** Every how-to section in the giveaway must end with a friction point that a solo operator cannot resolve without a professional build. Example: explaining "you need to detect a missed call and fire an SMS within 30 seconds" is fine — but the reader must understand that the integration between their phone system, an SMS provider (Twilio), and a trigger workflow is not a 30-minute project.

**Document structure (recommended):**

```
Title: The Missed Call Problem: What It's Costing HVAC Owners and What to Do About It

Section 1: The math you're not tracking
  - Average jobs missed per week at $[X] average = $[Y] per month
  - The 2-hour window: industry data on lead drop-off rate
  - "Most trade owners I talk to have no idea how much this is"

Section 2: Why the manual fix doesn't work
  - Call-back fatigue: what happens when you try to do this yourself
  - The callback window closes before you're off the job
  - A receptionist costs $1,500–$2,500/month and still misses after-hours calls

Section 3: How the automated version works
  - Trigger: missed call detected on your business line
  - Action: personalized text sent within 30 seconds (before they scroll to the next name)
  - The message reads like you wrote it
  - You're notified when they reply; you take it from there
  - What this looks like when it's running (show the real message from the Raj PV case study or the HVAC brief)

Section 4: Before and after
  - Table: pull directly from research/case-studies/02-missed-call-text-back.md
  - Conservative numbers: 2 leads/month recovered at $600/job = $1,200/month
  - Build cost: $1,500 (pays back in under 2 jobs)
  - Monthly retainer: $200

Section 5: Is this right for your business?
  - Checklist: 5 questions that indicate a missed-call problem worth solving
  - CTA: "Book a free 15-min audit — I'll tell you honestly whether this is worth it for your situation"
  - Booking link: https://calendar.app.google/psycao3CrXjGnmk48
```

**Title framing rules (GIVE-01 specific):**

- Title must name the pain, not the solution. "Lead Recovery Audit for Plumbers" works because plumbers know they have a lead problem.
- Avoid "The Ultimate Guide to..." — implies comprehensive how-to, attracts DIYers.
- Avoid "How to Build a Missed Call Text-Back System" — directly signals self-service.
- Good: "The Missed Call Problem: What It's Costing HVAC Owners and What to Do About It"
- Good: "Lead Recovery Audit for Plumbers: How Many Jobs Are You Losing to Voicemail?"
- Bad: "A Complete Guide to SMS Automation for Small Businesses"

### Pattern 2: Landing Page Social Proof Update

**What:** Replace or supplement the mock testimonials and placeholder case study data in `website/index.html` with real numbers from Phase 7 case studies.

**The two target sections:**

**Section A: Case Study (line 2267)** — Contains a placeholder video embed and a before/after metrics card with `<!-- REPLACE WITH POC DATA -->` comments. Since Phase 8 (first YouTube video) is a dependency not yet complete, the video embed stays as a placeholder. Only the metrics card needs updating with real Raj Photo Video numbers.

Real numbers available now:

- Time to first response: 4+ hours → 60 seconds
- Bookings lost to response time: ~3/month → ~0/month
- Weekly admin time: 6–8 hours → under 1 hour
- Revenue recovered: $4,200/month ($1,400/booking × 3 recovered jobs)
- Monthly system cost: $200

**Section B: Testimonials (line 2762)** — Six mock testimonials with fictional names (Mike Ramirez, etc.) and invented quotes. These are the primary credibility risk — visitors who recognize them as generated will distrust the entire page. Options, in order of preference:

1. **Replace with one real proof block:** Show the Raj Photo Video case study as a single, detailed proof section. Named by industry ("wedding + event photography studio"), not by business name. Pull-quote from the case study document. Before/after table. Link to full case study if hosted separately.

2. **Replace with capability brief proof blocks:** Use the Reddit evidence quotes already in the capability briefs (e.g., the HVAC post with 445 upvotes: "Missed 3 calls today while on a roof — I know I lost at least 2 jobs to a competitor"). Attribute to Reddit with the upvote count. These are real social proof that is not fabricated.

3. **Hybrid:** Replace mock testimonials 1–2 with one real case study proof block (Raj Photo Video numbers), and replace mocks 3–6 with Reddit evidence quotes attributed clearly as "community voices, not clients." This is honest and still persuasive.

**Anti-pattern to avoid:** Keeping any of the fictional named testimonials (Mike Ramirez / Ramirez HVAC, etc.). If a visitor googles "Mike Ramirez Ramirez HVAC Phoenix AZ" and finds nothing, trust collapses permanently. Remove or replace.

### Anti-Patterns to Avoid

- **DIY-enabling giveaway:** Writing the giveaway as a tutorial teaches the reader to self-serve. Every section that explains "how it works" must pair with "why this is harder to build than it looks" or "what goes wrong when people try this manually."
- **Generic vertical:** "A guide to automation for small businesses" fails GIVE-01. The title and content must name a specific business type and specific pain point.
- **Keeping mock testimonials:** Any invented testimonial with a specific name, business, and location is a trust liability, not an asset. Remove before adding real proof.
- **Over-engineering giveaway distribution:** No email capture, no ConvertKit, no autoresponder sequence. A direct Google Drive link is the entire distribution mechanism at this stage.
- **Updating the case study video embed before Phase 8 is complete:** The video placeholder is correct to leave until Phase 8 delivers the YouTube video. Don't put the YouTube embed URL in until the video exists.

---

## Don't Hand-Roll

| Problem                  | Don't Build                              | Use Instead                                               | Why                                                                              |
| ------------------------ | ---------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Giveaway hosting         | Custom download page with form           | Google Drive direct link                                  | No infrastructure needed; Drive handles CDN, access, PDF rendering               |
| Lead capture on giveaway | Build email opt-in form + CRM connection | Defer to v2.1; use direct booking link as CTA             | Email list infrastructure is explicitly deferred in project strategy             |
| Testimonials             | Invent new fictional testimonials        | Use real Raj PV case study data + Reddit community quotes | Fabricated social proof is a trust liability                                     |
| Landing page framework   | Rebuild in Next.js or React              | Edit the existing HTML file                               | The file is static HTML; a targeted edit is faster and lower risk than a rebuild |

**Key insight:** This phase is entirely about assembling and placing existing assets. The case study data already exists in Phase 7. The landing page HTML structure already exists. The giveaway content is drawn from the capability briefs already written. This phase is editing and positioning, not new creation.

---

## Common Pitfalls

### Pitfall 1: Giveaway that teaches instead of qualifies

**What goes wrong:** The giveaway explains how the automation works step-by-step, the reader feels equipped to Google "how to set up Twilio SMS" and DIY it, and they never book a call.

**Why it happens:** The impulse is to add value by being comprehensive. Comprehensive = tutorial = attracts builders.

**How to avoid:** Every technical detail must land on a friction sentence. "The trigger fires when a call goes unanswered — but integrating that trigger with your phone carrier, Twilio, and a CRM takes configuration that varies by carrier and region. That's where people get stuck." Inform without enabling.

**Warning signs:** If a reader could follow the giveaway as a step-by-step build guide, rewrite it.

### Pitfall 2: Wrong vertical selection

**What goes wrong:** The giveaway targets "small business owners" generically. HVAC owners don't see themselves in it. Plumbers don't open it.

**Why it happens:** Broader feels more inclusive. It's actually less effective.

**How to avoid:** Pick one vertical — HVAC or plumbing, the top two from Phase 5 research (highest-density pain point subreddits). The title and first paragraph must say their name. A plumber should read the title and think "this is about me."

**Warning signs:** If the title could apply to a dentist, a restaurant, or a real estate agent, it's too broad.

### Pitfall 3: Leaving mock testimonials live

**What goes wrong:** The six fictional testimonials (Mike Ramirez / Ramirez HVAC Phoenix AZ, etc.) remain on the page. A visitor searches one. Nothing found. Trust lost permanently.

**Why it happens:** HTML edits feel daunting, or the plan is to "replace later." Later doesn't come.

**How to avoid:** Removing the testimonials section is better than keeping invented ones. Replacing with one real proof block (Raj Photo Video case study) is better still. Do this in Wave 1 before any giveaway distribution sends traffic.

**Warning signs:** Any testimonial with a full name + business name + city is detectable as fabricated if nothing appears in public search results.

### Pitfall 4: Matching metrics too precisely between sections

**What goes wrong:** The case study section's metrics card shows "4.2 hrs → 47 sec" (current placeholders) but the actual Raj Photo Video case study shows "4+ hours → 60 seconds." These are not in conflict but minor discrepancies look sloppy.

**Why it happens:** The placeholder data was illustrative; the real data is slightly different.

**How to avoid:** Use the exact numbers from `research/case-studies/01-raj-photo-video.md` in all placements. Do not round or adjust for aesthetics. "4+ hours" and "60 seconds" are the real numbers — use them as-is.

### Pitfall 5: Giveaway titled as an "audit" without delivering an audit

**What goes wrong:** The title says "Lead Recovery Audit for Plumbers" but the content is a generic explainer. The word "audit" implies the reader will assess their own situation and get a score or output. If the content doesn't deliver that, it feels like bait-and-switch.

**How to avoid:** Either (a) include a real self-assessment checklist ("Answer these 5 questions to estimate how much you're losing") that gives the reader an actual output, or (b) title it differently ("The Missed Call Problem: What It's Costing Plumbers"). The checklist approach is better for GIVE-01 because it naturally ends with "if you answered yes to 3+, you have a problem worth solving — book a call."

---

## Code Examples

### Landing Page: Case Study Metrics Update

The existing metrics card (lines 2368–2465) uses `<!-- REPLACE WITH POC DATA -->` comments. Replace with:

```html
<!-- Real data: Raj Photo Video case study — Phase 7, CASE-01 -->
<div
  class="flex justify-between items-center py-3 border-b border-cream/[0.06]"
>
  <span class="text-cream/60 text-[14px]">Avg lead response time</span>
  <div class="flex items-center gap-3">
    <span class="font-display font-semibold text-red-400 text-sm line-through"
      >4+ hrs</span
    >
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7B2FBE"
      stroke-width="2.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
    <span class="font-display font-bold text-purple">60 sec</span>
  </div>
</div>
<div
  class="flex justify-between items-center py-3 border-b border-cream/[0.06]"
>
  <span class="text-cream/60 text-[14px]">Weekly admin hours</span>
  <div class="flex items-center gap-3">
    <span class="font-display font-semibold text-red-400 text-sm line-through"
      >6–8 hrs</span
    >
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7B2FBE"
      stroke-width="2.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
    <span class="font-display font-bold text-purple">Under 1 hr</span>
  </div>
</div>
<div
  class="flex justify-between items-center py-3 border-b border-cream/[0.06]"
>
  <span class="text-cream/60 text-[14px]">Bookings lost to response time</span>
  <div class="flex items-center gap-3">
    <span class="font-display font-semibold text-red-400 text-sm line-through"
      >~3/month</span
    >
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7B2FBE"
      stroke-width="2.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
    <span class="font-display font-bold text-purple">~0/month</span>
  </div>
</div>
<div class="flex justify-between items-center py-3">
  <span class="text-cream/60 text-[14px]">Revenue recovered / month</span>
  <div class="flex items-center gap-3">
    <span class="font-display font-semibold text-red-400 text-sm line-through"
      >$0</span
    >
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7B2FBE"
      stroke-width="2.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
    <span class="font-display font-bold text-purple">$4,200</span>
  </div>
</div>
```

### Landing Page: Testimonials Replacement — Real Proof Block

Replace the mock testimonials grid (6 cards) with a single, credible proof block using real case study data:

```html
<!-- Real case study: wedding + event photography studio — Raj Photo Video -->
<div
  class="bg-surface-raised border border-purple/20 rounded-2xl p-8 lg:p-10 reveal"
>
  <p class="text-xs font-semibold tracking-[0.2em] uppercase text-purple mb-6">
    Real result — wedding + event photography studio
  </p>
  <blockquote class="text-cream text-lg leading-relaxed mb-6 italic">
    "The moment a call goes unanswered, the caller gets a text within 30
    seconds. Most people reply. The lead stays warm — and 3 jobs per month that
    would have been lost to response time now get booked."
  </blockquote>
  <div class="grid sm:grid-cols-3 gap-4 mt-8">
    <div class="text-center">
      <p class="font-display font-bold text-3xl text-purple">$4,200</p>
      <p class="text-cream-dim text-sm mt-1">recovered per month</p>
    </div>
    <div class="text-center">
      <p class="font-display font-bold text-3xl text-cyan">5–7 hrs</p>
      <p class="text-cream-dim text-sm mt-1">saved per week</p>
    </div>
    <div class="text-center">
      <p class="font-display font-bold text-3xl text-cream">$200/mo</p>
      <p class="text-cream-dim text-sm mt-1">system cost</p>
    </div>
  </div>
</div>
```

Additionally, up to 3 Reddit community voice cards can supplement with real community quotes attributed clearly (not as clients):

```html
<!-- Community voice: attributed to Reddit, not invented -->
<div
  class="bg-surface-raised border border-cream/[0.06] rounded-2xl p-7 card-premium reveal"
>
  <p class="text-cream text-[15px] leading-relaxed mb-6 italic">
    "Missed 3 calls today while on a roof — I know I lost at least 2 jobs to a
    competitor."
  </p>
  <div class="flex items-center gap-3">
    <div
      class="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center"
    >
      <span class="font-display font-bold text-sm text-cream-dim">r/</span>
    </div>
    <div>
      <p class="font-semibold text-sm text-cream">HVAC business owner</p>
      <p class="text-cream-dim text-xs">r/HVAC — 445 upvotes</p>
    </div>
  </div>
</div>
```

### Giveaway Document: Self-Qualifying Checklist (key component)

The checklist is what makes the title "Lead Recovery Audit" honest. Each question must have an obvious answer for any trade business owner with this problem:

```
Is this the right system for your business?

Answer honestly:

1. Do you miss 5 or more calls per week while on a job?
2. Is your average job worth $500 or more?
3. Do you have no way to know how many missed callers went to a competitor?
4. Has a customer ever told you they called but didn't leave a voicemail?
5. Have you tried calling back and found the lead had already booked someone else?

If you said yes to 3 or more: you have a missed-call problem that is costing you real money right now.
The next step is a 15-minute call where I'll look at your current setup and tell you honestly
whether automation is the right fix — and roughly what it would take.

Book here: https://calendar.app.google/psycao3CrXjGnmk48
```

---

## State of the Art

| Old Approach                                                      | Current Approach                                                                   | When Changed                                                | Impact                                                                  |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| Generic lead magnet ("The Ultimate Guide to Business Automation") | Vertical-specific, buyer-qualifying document with friction at every how-to section | Established best practice in B2B services content marketing | Attracts buyers, repels DIYers                                          |
| Mock testimonials as placeholder social proof                     | Real case study data + attributed community quotes                                 | Now — Phase 7 completed the real data                       | Removes trust liability; adds credibility                               |
| Email capture → autoresponder funnel for lead magnet              | Direct download link → book a call CTA                                             | Deferred to v2.1 per project strategy                       | Eliminates infrastructure overhead; simpler but effective at this stage |

**Deprecated/outdated in this context:**

- Fictional testimonial placeholders (Mike Ramirez, Ramirez HVAC Phoenix AZ, etc.): retire in this phase.
- `<!-- REPLACE WITH POC DATA -->` comments in index.html: replace with real data in this phase.
- Generic giveaway titles ("automation guide," "digital transformation checklist"): not appropriate for buyer qualification.

---

## Open Questions

1. **Which single vertical to target for the giveaway (HVAC vs. plumbing vs. both)?**
   - What we know: Phase 5 research identified HVAC and plumbing as the highest-density pain point subreddits; missed-call-text-back is the top-scoring package by Reddit evidence
   - What's unclear: whether to pick one (tighter title, cleaner reader identification) or serve both (broader distribution but less specific)
   - Recommendation: HVAC and plumbing share enough in common (solo operator, hands-occupied during business hours, same missed call pattern) that a single document can address both in the opening paragraph without diluting. Title it for HVAC or plumbing specifically — not "home services" generically. HVAC is slightly larger market signal from Phase 5.

2. **What to do with the 6 mock testimonials: remove or replace?**
   - What we know: all 6 are fictional (Mike Ramirez / Ramirez HVAC, other invented names); they are a trust liability if discovered
   - What's unclear: user preference between (a) one large proof block replacing all 6, (b) hybrid with Reddit quotes filling 2–3 slots, or (c) simply removing the section until real client testimonials are available
   - Recommendation: Option (a) or (b). Option (a) is cleaner and requires less HTML work. Option (b) adds authentic community voice. Both are better than leaving the current invented content. Planner should present both options and let the task choose the simpler path first.

3. **Where does the giveaway PDF live?**
   - What we know: project has no email capture infrastructure; GitHub Pages hosts the landing page; there is no S3/GCS bucket set up for file hosting at v2.0
   - What's unclear: whether a Google Drive link is acceptable as the permanent download URL
   - Recommendation: Google Drive with "Anyone with the link can view" is the correct v2.0 solution. The link goes in YouTube descriptions, social bios, and can be updated later. No infrastructure required.

4. **Does Phase 8 (first YouTube video) need to be complete before Phase 9 can ship?**
   - What we know: Phase 9 depends on Phase 8 per the roadmap; GIVE-02 notes "first video from Phase 8 provides real performance data for social proof"
   - What's unclear: whether video performance data (views, CTR) is actually needed for GIVE-02, or whether Phase 7 case study data is sufficient
   - Recommendation: The Raj Photo Video case study data (from Phase 7) is sufficient for GIVE-02 without Phase 8 video performance data. The dependency is about sequencing trust signals, not data dependency. GIVE-02 can be executed with Phase 7 data; any video performance data from Phase 8 would be a bonus addition, not a blocker.

---

## Sources

### Primary (HIGH confidence)

- `/Users/sameerrijhsinghani/automation_consultancy/website/index.html` — Confirmed presence of mock testimonials (6 cards, fictional names starting at line 2762) and placeholder case study section (lines 2267–2355) with explicit `<!-- REPLACE WITH POC DATA -->` comments
- `/Users/sameerrijhsinghani/automation_consultancy/research/case-studies/01-raj-photo-video.md` — Real case study with verified metrics: $4,200/month recovered, 4+ hours → 60 seconds response, 6–8 hours → under 1 hour admin, $200/month system cost
- `/Users/sameerrijhsinghani/automation_consultancy/research/case-studies/02-missed-call-text-back.md` — HVAC-focused capability brief with before/after table and Reddit evidence quote (445 upvotes)
- `/Users/sameerrijhsinghani/automation_consultancy/brand/brand-voice.md` — Voice constraints confirmed: no emojis, no buzzwords, numerals for all metrics, sentence case headings, Oxford comma, 2–4 sentence paragraphs max
- `/Users/sameerrijhsinghani/automation_consultancy/.planning/STATE.md` — Key decisions confirmed: no email infrastructure in v2.0, human-in-the-loop publishing, YouTube is hub
- `/Users/sameerrijhsinghani/automation_consultancy/ops/packages/missed-call-text-back.md` — Pricing confirmed: $1,500 build / $200/month retainer; ROI calculation basis

### Secondary (MEDIUM confidence)

- REQUIREMENTS.md — GIVE-01 and GIVE-02 requirements confirmed verbatim; Traceability table shows both mapped to Phase 8 (renumbered Phase 9 in roadmap)
- ROADMAP.md Phase 9 section — Goal and success criteria confirmed; no plans yet (TBD)

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all tools and files confirmed to exist and be accessible
- Architecture patterns: HIGH — giveaway structure drawn from existing capability brief model; HTML edit patterns drawn from the actual file
- Pitfalls: HIGH — mock testimonial risk confirmed by reading actual file content; giveaway framing risk is established B2B content marketing principle
- Open questions: MEDIUM — vertical choice and testimonial replacement strategy require a user decision; both options are well-defined

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (stable domain; re-check if Phase 8 YouTube video ships before planning begins, as video URL becomes available for the case study embed)

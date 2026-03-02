# Phase 6: Platform Foundation - Research

**Researched:** 2026-03-02
**Domain:** Social media platform setup (Twitter/X, Instagram) + cross-platform funnel verification
**Confidence:** HIGH

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Twitter profile & pinned tweet:**

- Bio copy is pain-first: lead with the problem (slow follow-up, lost leads), then the CTA. Match brand voice (direct, peer-level, practical)
- Pinned tweet is a 3-5 tweet intro thread: who Sameer is, what he builds, proof it works, CTA to book. Thread format for maximum first-visitor impressions
- Header image adapts the existing YouTube banner (system architecture design, dot grids, arch-nodes, purple/cyan gradient) to Twitter's 1500x500 dimensions
- Profile pic is a personal headshot (profile-pic-headshot.png or profile-pic-tight.png), not the branded logo icon

**Instagram 3-post grid:**

- All 3 initial posts are carousels (multi-slide format for highest engagement)
- Topic sequence follows Pain → Proof → Offer funnel:
  - Post 1: Pain point carousel (e.g., "X leads lost every month to slow follow-up") — drawn from Phase 5 Reddit research
  - Post 2: Case study result carousel (e.g., missed-call text-back recovered $4,200 from a $200/mo system)
  - Post 3: "Here's what I build" services overview with CTA to book
- Visual style uses brand system architecture design language: dark backgrounds (#1A1A1A), purple (#7B2FBE) and cyan (#4DD9E8) accents, dot grids, arch-nodes, bold Roc Grotesk headlines
- Profile pic is personal headshot, matching Twitter for cross-platform consistency

**Link-in-bio & CTA unification:**

- Instagram bio link points directly to the landing page (website/index.html), not a link-in-bio tool or direct booking link
- Twitter bio link also points to the landing page — same destination across all platforms
- Instagram and Twitter bio copy both use pain-first approach, matching brand voice
- YouTube video descriptions and channel about section updated to use the same landing page link as primary CTA
- All 3 platforms use identical CTA wording: "Book a free 15-min discovery call"
- No variation in CTA phrasing or destination link across platforms

**Mobile funnel testing:**

- All 3 platform entry paths tested:
  1. YouTube video → description link → landing page → booking page → calendar confirmation
  2. Twitter bio link → landing page → booking page → calendar confirmation
  3. Instagram bio link → landing page → booking page → calendar confirmation
  4. Pinned tweet link → landing page → booking page → calendar confirmation
- Step-by-step pass/fail criteria: each step must (1) render fully on mobile without horizontal scroll, (2) have tappable CTA button/link that navigates correctly, (3) reach Google Calendar confirmation at final step. Any broken link, layout issue, or dead end = fail
- Test on personal phone (real device) + Chrome DevTools mobile emulation for the other OS
- Results documented as a markdown checklist in the phase directory with pass/fail per step

### Claude's Discretion

- Exact Twitter bio wording within the 150-character limit (pain-first structure is locked)
- Exact Instagram bio wording within the 150-character limit (pain-first structure is locked)
- Intro thread tweet-by-tweet content (structure of who/what/proof/CTA is locked)
- Number of slides per carousel (Pain → Proof → Offer sequence is locked)
- Instagram highlights and story setup (not discussed — Claude can include if beneficial)

### Deferred Ideas (OUT OF SCOPE)

- Instagram highlights and stories strategy — could enhance the profile but not required for initial 3-post grid launch
- UTM tracking on social bio links — deferred to future analytics phase (v2.1 DIST-03)
- Twitter content cadence post-launch — belongs in Phase 8 (Content Production)
- Landing page mobile responsiveness fixes (if any found during testing) — may need a separate task
  </user_constraints>

---

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                                                        | Research Support                                                                                   |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| PLAT-01 | Twitter account @SameerAutomates has complete profile, pinned CTA tweet, and booking link in bio                                   | Twitter spec sheet, bio character limits, header image dimensions, thread structure best practices |
| PLAT-02 | Instagram account @SameerAutomates has complete profile, link-in-bio to booking page, and initial 3-post grid                      | Instagram carousel specs, bio character limits, direct-URL-in-bio approach, design tool workflow   |
| PLAT-03 | Every platform (YouTube, Twitter, Instagram) has consistent CTA — "Book a free 15-min discovery call" with direct booking link     | CTA unification checklist, YouTube about section copy, Google Calendar booking link confirmed      |
| PLAT-04 | Full funnel path tested end-to-end on mobile: content → description/bio link → landing page → booking page → calendar confirmation | Chrome DevTools mobile emulation, real device testing protocol, pass/fail checklist structure      |

</phase_requirements>

---

## Summary

Phase 6 is primarily an operations and content creation phase, not a software development phase. The work falls into four distinct streams: (1) Twitter/X profile setup including header image adaptation, bio writing, and publishing a pinned intro thread; (2) Instagram profile setup including bio writing, posting three carousel graphics that follow a Pain → Proof → Offer funnel sequence; (3) CTA audit across all three platforms to ensure identical wording and destination; (4) end-to-end mobile funnel testing across all 4 entry paths.

The technical constraints are well-defined and stable. Twitter's header is 1500x500px; Instagram carousels perform best at 1080x1350px (portrait, 4:5 ratio). Both platform bios allow 150-160 characters. The existing YouTube banner SVG (`brand/youtube/banner-v1-system-architecture.svg`) provides the source for the Twitter header adaptation — it needs to be resized rather than redesigned. All carousel slides should be created in the brand's design system using a tool that can export PNG at 1080px width (Canva is the most accessible; Figma is an alternative if SVG-to-design conversion is preferred given the existing SVGs).

The funnel endpoint is confirmed working: `https://calendar.app.google/psycao3CrXjGnmk48` is the Google Calendar appointment scheduling link. Google Calendar appointment scheduling is mobile-friendly out of the box — no custom development needed. The landing page (`website/index.html`) already contains the booking CTA. The primary risk area is mobile rendering of the landing page itself; if the page has horizontal scroll or unresponsive tap targets on mobile, that becomes a blocker discovered during PLAT-04 testing. However, landing page fixes are explicitly deferred to a separate task if found.

**Primary recommendation:** Plan this phase as 4 tasks in sequence — Twitter setup → Instagram setup → CTA audit → Mobile funnel test. All deliverables are content/copy/graphic assets documented in the phase directory; no code is written unless landing page fixes are required.

---

## Standard Stack

### Core

| Tool                                            | Version/Tier   | Purpose                                             | Why Standard                                                                                                             |
| ----------------------------------------------- | -------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Canva                                           | Free           | Twitter header resize + Instagram carousel creation | Handles 1500x500 and 1080x1350 templates natively, exports PNG/JPG, no coding required for solo operator                 |
| Chrome DevTools Device Mode                     | Built-in       | Mobile emulation for funnel testing                 | Official tooling, supports iPhone/Android viewports, handles responsive breakpoints                                      |
| Real device (personal phone)                    | iOS or Android | Actual mobile funnel verification                   | DevTools simulates viewport only — real device catches touch behavior, app-to-browser handoff, actual network conditions |
| brand/youtube/banner-v1-system-architecture.svg | Existing asset | Source file for Twitter header                      | Already designed in brand system; adapt rather than redesign                                                             |
| brand/youtube/profile-pic-headshot.png          | Existing asset | Profile pic for Twitter and Instagram               | Locked decision — headshots on social platforms                                                                          |
| website/index.html                              | Existing       | Funnel landing page                                 | All bio links point here — serves as CTA hub                                                                             |

### Supporting

| Tool                                          | Purpose                               | When to Use                                                                 |
| --------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| Figma (community Twitter/Instagram templates) | Alternative to Canva for designers    | If Canva lacks design fidelity needed to match the SVG brand system exactly |
| research/output/topic-bank.md                 | Content source for carousel Pain post | Phase 5 output — use highest-scoring pain points for Post 1 copy            |
| brand/brand-voice.md                          | Copy guardrails                       | Reference every time bio or caption copy is written                         |
| about-section.md                              | YouTube CTA copy reference            | Adapt this pattern for Twitter/Instagram bio pain-first structure           |

### Alternatives Considered

| Instead of                     | Could Use                            | Tradeoff                                                                                                                                                                   |
| ------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Direct landing page URL in bio | Linktree or link-in-bio tool         | Decision locked: direct URL chosen to eliminate tool dependency, avoid branding dilution, keep one fewer subscription                                                      |
| Canva for carousel design      | Adobe Express, Figma, hand-coded SVG | Canva is fastest for non-dev solo operators; existing brand SVG assets can be imported; Figma has steeper learning curve but better fidelity to existing SVG design system |
| Real device only testing       | DevTools only                        | DevTools misses app-to-browser handoffs, actual tap target sizes; locked decision requires both                                                                            |

**Installation:** No npm/pip installs needed. This phase is entirely manual operations + content creation. The only tooling is browser-based (Canva, Chrome DevTools) and existing project files.

---

## Architecture Patterns

### Recommended Deliverable Structure

```
.planning/phases/06-platform-foundation/
├── assets/
│   ├── twitter-header-1500x500.png     # Adapted from YouTube banner SVG
│   ├── ig-post-01-pain-carousel/       # PNG slides for Pain post
│   ├── ig-post-02-proof-carousel/      # PNG slides for Proof post
│   └── ig-post-03-offer-carousel/      # PNG slides for Offer post
├── copy/
│   ├── twitter-bio.md                  # 160-char bio + rationale
│   ├── twitter-thread.md               # Full pinned thread, tweet by tweet
│   ├── instagram-bio.md                # 150-char bio + rationale
│   ├── ig-post-01-captions.md          # Caption + slide text for Pain post
│   ├── ig-post-02-captions.md          # Caption + slide text for Proof post
│   └── ig-post-03-captions.md          # Caption + slide text for Offer post
├── 06-FUNNEL-TEST.md                   # Pass/fail checklist per step per path
└── 06-RESEARCH.md                      # This file
```

### Pattern 1: Pain-First Bio Structure (Twitter and Instagram)

**What:** Both bios open with the specific business problem before naming Sameer or the CTA. Follows the brand voice principle of "acknowledge the pain before offering the solution."

**When to use:** Twitter bio (160 chars), Instagram bio (150 chars).

**Structural template:**

```
[Problem signal — specific, measurable]
[Who Sameer is / what he builds]
[CTA: Book a free 15-min discovery call → [URL]]
```

**Twitter example (within 160 chars):**

```
You're losing leads to voicemail while you're on a job.
I build the automations that follow up for you.
Book a free 15-min call → [landing-page-URL]
```

Note: 160-char limit is tight. Bio may need to compress to 2 lines. "Book a free 15-min discovery call" is 36 chars. The URL will consume roughly 23 chars. Remaining budget: ~101 chars for pain + identity signal.

**Instagram bio (150 chars):**
Same structure, slightly shorter budget. Instagram also supports line breaks in bio — use them for visual clarity.

### Pattern 2: Intro Thread Structure (Pinned Tweet)

**What:** A 3-5 tweet thread pinned to the Twitter profile. First tweet is the hook — it must function as a standalone post that stops the scroll. Subsequent tweets layer in identity → proof → CTA.

**Locked structure:**

```
Tweet 1 (Hook): Pain signal with specific number. Stops scroll.
Tweet 2 (Identity): Who Sameer is, the origin story (Raj Photo Video —
                    built automations for own business first).
Tweet 3 (What he builds): Services in plain English, one per line.
Tweet 4 (Proof): The $4,200 from $200/mo result or equivalent metric.
Tweet 5 (CTA): "Book a free 15-min discovery call" + landing page URL.
```

**Tweet 1 examples (drawn from topic-bank.md evidence):**

- "Missed 3 calls today while on a roof. That plumber lost 2 jobs to a competitor — probably $3,000+. This happens to thousands of small business owners every week. Here's what the fix looks like..."
- "40% of inbound leads go cold because nobody follows up fast enough. Not a sales problem. A systems problem. I fix the system."

**Confidence:** MEDIUM — thread structure is best practice, but exact phrasing is Claude's discretion.

### Pattern 3: Instagram Carousel Design Specs

**What:** Multi-slide posts at 1080x1350px (portrait, 4:5). All slides same aspect ratio. Text kept 50px from all edges. Dark background (#1A1A1A). Brand accent colors (purple #7B2FBE, cyan #4DD9E8).

**Slide count guidance (per post):**

- Pain post: 5-7 slides. Hook slide → 3-4 data/pain slides → CTA slide.
- Proof post: 5-6 slides. Hook (the result) → before state → the system → after state → CTA.
- Offer post: 6-8 slides. Hook → each service line → pricing signal → CTA.

**Design elements (brand system — locked):**

- Dot grid background pattern (low opacity)
- Arch-node accent circles at compositional anchors
- Roc Grotesk Bold for headlines (Canva has this font)
- Gradient accent bar (purple → cyan) as slide divider
- Logo icon in consistent corner (bottom-right preferred)
- File format: PNG for slides with text (higher fidelity than JPG for graphics)

**Carousel engagement note:** Portrait (4:5) carousels occupy more screen real estate in the feed than square or landscape. Per 2026 Instagram specs, this is the highest-engagement aspect ratio for carousel posts. (Source: HeyOrca, Overvisual — MEDIUM confidence)

### Pattern 4: Mobile Funnel Test Checklist Structure

**What:** A pass/fail markdown table that documents each step of each funnel path. Enables objective verification that PLAT-04 is satisfied.

**Structure:**

```markdown
# Mobile Funnel Test — Phase 6

**Tested:** [date]
**Real device:** [iPhone X / Android Y]
**DevTools emulation:** [Chrome — iPhone 14 viewport]

## Path 1: YouTube → landing page → booking → confirmation

| Step | URL/Action                                     | Pass/Fail | Notes |
| ---- | ---------------------------------------------- | --------- | ----- |
| 1    | Open YouTube video on mobile                   |           |       |
| 2    | Tap description link (landing page URL)        |           |       |
| 3    | Landing page loads — no horizontal scroll      |           |       |
| 4    | Tap "Book a free 15-min discovery call" button |           |       |
| 5    | Booking page loads (calendar.app.google)       |           |       |
| 6    | Calendar renders, time slots visible           |           |       |
| 7    | Select time slot, complete booking form        |           |       |
| 8    | Confirmation email / calendar invite received  |           |       |

## Path 2: Twitter bio link → ...

[same structure]

## Path 3: Instagram bio link → ...

[same structure]

## Path 4: Pinned tweet link → ...

[same structure]

## Result

All paths: PASS / FAIL — [date]
```

### Anti-Patterns to Avoid

- **Linktree or link-in-bio aggregator in Instagram bio:** Decision locked. Direct landing page URL only. Linktree adds a redirect step, adds a platform dependency, and introduces brand dilution.
- **Emoji in any copy:** Brand voice rule — no emojis anywhere, including social captions and thread tweets.
- **CTA wording variation:** Any deviation from "Book a free 15-min discovery call" breaks PLAT-03. No "Schedule a call," "Get a consultation," or "Learn more."
- **Logo icon as profile pic on Twitter/Instagram:** Headshot is locked. "People follow people" on social platforms.
- **Designing carousel slides in landscape or square:** Portrait (1080x1350) is the standard. Instagram will crop all subsequent slides to match the first if mixed aspect ratios are uploaded.
- **Documenting test results without specific pass/fail per step:** PLAT-04 requires verifiable evidence. A summary "funnel works" is not sufficient — checklist with per-step status is required.

---

## Don't Hand-Roll

| Problem                       | Don't Build                            | Use Instead                                 | Why                                                                                               |
| ----------------------------- | -------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Twitter header image          | Design from scratch in code/SVG        | Resize existing YouTube banner SVG in Canva | Banner already designed and brand-approved; resizing 2560x1440 → 1500x500 preserves design system |
| Instagram carousel slides     | Custom SVG or HTML/CSS export pipeline | Canva (or Figma) with brand colors imported | No infrastructure needed for 3 posts; Phase 10 automation pipeline handles bulk production later  |
| Link-in-bio page              | Build a custom HTML intermediate page  | Direct URL to website/index.html            | Landing page already exists and is the single funnel destination                                  |
| Mobile testing infrastructure | Puppeteer/Playwright automated tests   | Manual real-device + Chrome DevTools        | 4 funnel paths, one-time verification — automation overhead far exceeds manual cost               |
| Bio character counter         | Build a tool                           | Use lettercounter.org or any online tool    | Platform limits are simple constraints, not a software problem                                    |

**Key insight:** This phase's "standard stack" is humans + design tools, not code. The trap is over-engineering — building Canva automation, custom testing scripts, or intermediate link pages when the problem is simply: set up profiles correctly and walk the funnel on a phone.

---

## Common Pitfalls

### Pitfall 1: Twitter Header Safe Zone Ignored

**What goes wrong:** Header image looks correct in the Canva preview but gets cropped on mobile — profile picture (400x400 circle) overlaps the bottom-left corner of the header, obscuring text or key design elements.

**Why it happens:** Twitter places the profile picture in the bottom-left of the header. The safe zone for content is roughly the central 1500x360px strip, with the bottom-left ~200x200px area masked by the profile photo.

**How to avoid:** Keep all text and important design elements in the top-right and center of the header. Leave the bottom-left quadrant empty or use only background elements (dot grid, gradient). No text in the bottom 140px of the 500px height.

**Warning signs:** Text or logo appears near the bottom-left in the design tool. Check by uploading to a test account or using Twitter's header preview.

### Pitfall 2: Instagram Bio Link Not Clickable Until Confirmed

**What goes wrong:** Bio link is typed correctly but not saved — the link doesn't appear as a tappable hyperlink to visitors.

**Why it happens:** Instagram bio changes require explicit save. The link must be entered in the dedicated "Website" or "Links" field (not the bio text field) to be clickable.

**How to avoid:** After entering the URL, tap Save and then view the profile from another account to confirm the link is tappable and navigates to the correct destination.

**Warning signs:** Link appears as plain text in bio rather than a highlighted/tappable URL.

### Pitfall 3: YouTube About Section Has Placeholder Booking URL

**What goes wrong:** YouTube about section (`brand/youtube/about-section.md`) still contains `[PLACEHOLDER]` in the booking link — not the actual `calendar.app.google/psycao3CrXjGnmk48` URL.

**Why it happens:** The about-section.md file was created before the live booking link was confirmed. The placeholder was intentionally marked for replacement.

**How to avoid:** PLAT-03 task must explicitly update the YouTube channel About section with the real booking URL. Verify by opening YouTube Studio → Customization → Basic info → Description.

**Warning signs:** The string `[PLACEHOLDER]` appears in the about section copy when pasted into YouTube Studio.

### Pitfall 4: Carousel Slides Have Mixed Aspect Ratios

**What goes wrong:** The carousel renders the first slide correctly but subsequent slides are auto-cropped by Instagram, cutting off text or design elements.

**Why it happens:** Instagram forces all slides to the aspect ratio of the first slide. If slide 1 is 1080x1350 and slide 3 is 1080x1080, Instagram crops slide 3 to 1080x1350, potentially cropping out bottom content.

**How to avoid:** Create all slides from the same Canva template (1080x1350px). Do not mix square and portrait slides in the same carousel.

**Warning signs:** Canva template was duplicated with resizing, or slides imported from different sources.

### Pitfall 5: Mobile Funnel Fails at Landing Page (Not Caught Until End)

**What goes wrong:** The landing page (`website/index.html`) has horizontal scroll or unresponsive CTA buttons on mobile — discovered only at the end when running PLAT-04 testing.

**Why it happens:** The landing page was designed and tested on desktop. Tailwind CSS responsive classes may not cover all mobile breakpoints. The booking CTA button may be too small for mobile tap targets (minimum 44x44px recommended).

**How to avoid:** Test PLAT-04 (mobile funnel) early in the phase execution — before completing all profile setup — so any landing page issues surface immediately. Note: landing page fixes are explicitly deferred to a separate task per CONTEXT.md, so the correct response is to document the failure in the funnel test checklist and proceed, not to fix inline.

**Warning signs:** Landing page has a fixed-width container that doesn't collapse on mobile. The booking button is a text link rather than a large tap target.

### Pitfall 6: Twitter Thread Posted as Single Tweets (Not a Thread)

**What goes wrong:** Intro thread tweets are posted individually instead of as a connected thread — they can't be pinned as a unit, and the narrative flow is lost.

**Why it happens:** On X/Twitter, threads must be composed together in the thread composer (click "+" to add tweets before posting). Posting individually and replying to yourself after the fact creates a thread but can feel disconnected.

**How to avoid:** Compose all 3-5 tweets in the thread composer before posting. Review the full thread preview before publishing. Then pin the first tweet of the thread to the profile.

**Warning signs:** Thread was drafted tweet-by-tweet and posted separately.

---

## Code Examples

Verified patterns from official sources:

### Twitter Bio Character Limit Calculation

```
Total budget: 160 characters (verified: help.x.com, 2026)

Example allocation:
"Businesses lose 40% of leads to slow follow-up." = 49 chars
"I build the automations that fix it." = 37 chars
"Book a free 15-min discovery call →" = 36 chars
URL (auto-shortened by Twitter, not in bio char count) = 0 chars
Bio total: 122 chars — within limit

Note: URLs placed in the dedicated "Website" field (not bio text) are NOT counted against the 160-char bio limit.
```

### Instagram Bio Character Limit Calculation

```
Total budget: 150 characters (verified: lettercounter.org, metricool.com, 2026)

Bio text: 150 chars (NOT including the website link field)
Website field: separate field, separate from char count
Line breaks: Instagram bio supports line breaks — use for visual chunking

Example allocation:
"Lost 3 leads this week to slow follow-up?" = 42 chars
"I build automations that respond in 60 sec." = 44 chars
"Book a free 15-min discovery call below." = 41 chars
Bio total: 127 chars — within limit

Note: "below" points to the website link field, which Instagram shows below the bio.
```

### Twitter Header Safe Zone

```
Full dimensions: 1500 x 500 px
File size limit: under 2MB (JPG recommended for headers)
Safe content zone: ~1500 x 360 px (center strip)
Profile pic mask: bottom-left corner, ~200 x 200 px circle

Danger zones to keep empty:
- Bottom 140 px of the 500 px height (profile pic overlaps)
- Far left edge on mobile (platform UI chrome)

Recommended: Keep text in top-right quadrant and center.
Logo or wordmark in center-right. Bottom area: background elements only.
```

### Instagram Carousel Dimensions

```
Aspect ratio: 4:5 portrait (highest feed real estate, highest engagement)
Dimensions: 1080 x 1350 px (verified: overvisual.com, heyorca.com, 2026)
Max slides: 20 (limit increased from 10 in 2024)
Recommended slides for launch: 5-7 per carousel
File format: PNG for text-heavy slides (sharper than JPG at compression)
Safe zone: Keep content 50px from all edges

All slides MUST use the same aspect ratio.
Instagram crops subsequent slides to match slide 1.
```

### Google Calendar Booking Link — Confirmed Working

```
Booking URL: https://calendar.app.google/psycao3CrXjGnmk48
Behavior on mobile: Opens Google Calendar appointment scheduling page
                    Mobile-optimized out of the box
                    Works for visitors without Google accounts
Confirmation: Automated email to both booker and calendar owner
              Calendar invite added to both parties

This is the confirmed live link from CONTEXT.md. No modifications needed.
Landing page already links here via "Book a free 15-min discovery call" CTA.
```

---

## State of the Art

| Old Approach                        | Current Approach                                             | When Changed         | Impact                                                                              |
| ----------------------------------- | ------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------- |
| Instagram: 10-slide carousel max    | 20-slide carousel max                                        | 2024                 | More content per post; no need to split long carousels                              |
| Instagram: 1 link in bio only       | Up to 5 native links (or 1 link field for standard accounts) | 2023                 | Direct URL in bio is sufficient for single-destination funnel; Linktree unnecessary |
| Twitter: image optimization unclear | 1500x500px header, under 2MB, JPG recommended                | 2026 verified        | Clear spec; no guessing needed                                                      |
| Twitter bio: 140 chars (old limit)  | 160 characters                                               | ~2015, still current | Confirmed 160 in 2026 documentation                                                 |
| Google Calendar "appointment slots" | Google Calendar "appointment schedules" (modern name)        | 2023                 | New terminology in docs; same functionality, better UX                              |

**Deprecated/outdated:**

- The YouTube about section copy in `brand/youtube/about-section.md` still contains `[PLACEHOLDER]` for the booking URL — this must be replaced with the live URL `https://calendar.app.google/psycao3CrXjGnmk48` as part of PLAT-03.
- Old appointment slot URLs (calendar.google.com/calendar/appointments/schedules/...) vs the new calendar.app.google short format — the existing link uses the modern format, which is correct.

---

## Open Questions

1. **Landing page mobile responsiveness**
   - What we know: `website/index.html` uses Tailwind CSS with responsive class conventions. The booking CTA links to the confirmed booking URL.
   - What's unclear: Whether the current mobile rendering passes PLAT-04's "no horizontal scroll, tappable CTA" criteria. This has not been verified on mobile.
   - Recommendation: Make PLAT-04 mobile testing the first task executed (or at minimum, test the landing page on mobile before producing all carousel graphics). If the page fails, document it in the funnel checklist per CONTEXT.md and raise as a separate fix — do not block the rest of Phase 6.

2. **YouTube about section update mechanism**
   - What we know: The about section copy exists in `brand/youtube/about-section.md` with a placeholder booking URL.
   - What's unclear: Whether YouTube Studio update (uploading revised about section) has already been completed as part of Phase 1 (CONT-01, CONT-02 marked complete) or is still pending.
   - Recommendation: PLAT-03 task should include a verification step: open YouTube Studio → Customization → Basic info, confirm the real booking URL appears. If the old placeholder is present, update it.

3. **Canva availability and brand font access**
   - What we know: Canva supports 1080x1350 and 1500x500 templates. Roc Grotesk Bold (brand headline font) may or may not be available in Canva's free font library.
   - What's unclear: Whether Roc Grotesk is available in Canva Free, or whether Canva Pro is required, or whether Outfit (the brand's declared fallback) would be used instead.
   - Recommendation: Check Canva font library at design time. If Roc Grotesk is unavailable, Outfit Bold is the approved fallback per `brand-voice.md`. For perfect fidelity, Figma with Google Fonts (which has Outfit but not Roc Grotesk commercially) or importing a licensed Roc Grotesk file is the alternative.

---

## Sources

### Primary (HIGH confidence)

- `brand/brand-voice.md` — brand voice rules, design language, color system, typography, confidentiality rules
- `brand/youtube/about-section.md` — existing CTA copy pattern, placeholder booking URL identified
- `brand/youtube/banner-v1-system-architecture.svg` — source asset for Twitter header adaptation
- `website/index.html` — confirmed landing page with booking CTA and Tailwind CSS implementation
- `research/output/topic-bank.md` — Phase 5 pain point data for carousel Post 1 content
- `.planning/phases/06-platform-foundation/06-CONTEXT.md` — all locked decisions
- help.x.com (Twitter official) — bio 160 chars, header 1500x500, profile pic 400x400 (2026)
- support.google.com/calendar — appointment schedules, mobile experience, confirmation behavior (official, 2026)

### Secondary (MEDIUM confidence)

- heyorca.com, overvisual.com — Instagram carousel 1080x1350 (4:5 portrait), 20-slide max (corroborated by multiple sources)
- metricool.com, lettercounter.org — Instagram bio 150-character limit (multiple sources agree)
- developer.chrome.com/docs/devtools/device-mode — Chrome DevTools mobile emulation capabilities and limitations (official Google developer docs)
- recurpost.com — Twitter thread best practices for consultants, 5-12 tweet range, first-tweet hook importance
- figma.com/resource-library/twitter-banner-size — Twitter banner safe zone guidance

### Tertiary (LOW confidence)

- aifreeforever.com — "27 Twitter thread ideas for consultants" — content inspiration only, not authoritative for specs

---

## Metadata

**Confidence breakdown:**

- Platform specs (dimensions, char limits): HIGH — verified against official platform help docs and multiple corroborating sources
- Design tool workflow (Canva): HIGH for capabilities, MEDIUM for font availability (Roc Grotesk)
- Carousel engagement data (portrait > square): MEDIUM — multiple industry sources agree, but platform algorithms change
- Thread engagement patterns: MEDIUM — based on multiple marketing sources, not official X data
- Google Calendar mobile behavior: HIGH — confirmed via official Google Workspace docs

**Research date:** 2026-03-02
**Valid until:** 2026-06-02 (platform specs are stable; re-verify if Instagram or Twitter announce major profile changes)

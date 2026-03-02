# Phase 6: Platform Foundation - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Twitter and Instagram accounts (@SameerAutomates) are fully set up with consistent branding and CTAs. Every platform (YouTube, Twitter, Instagram) uses the identical CTA — "Book a free 15-min discovery call" — pointing to the landing page. The full funnel from content to booked discovery call is verified end-to-end on mobile.

</domain>

<decisions>
## Implementation Decisions

### Twitter profile & pinned tweet

- Bio copy is pain-first: lead with the problem (slow follow-up, lost leads), then the CTA. Match brand voice (direct, peer-level, practical)
- Pinned tweet is a 3-5 tweet intro thread: who Sameer is, what he builds, proof it works, CTA to book. Thread format for maximum first-visitor impressions
- Header image adapts the existing YouTube banner (system architecture design, dot grids, arch-nodes, purple/cyan gradient) to Twitter's 1500x500 dimensions
- Profile pic is a personal headshot (profile-pic-headshot.png or profile-pic-tight.png), not the branded logo icon

### Instagram 3-post grid

- All 3 initial posts are carousels (multi-slide format for highest engagement)
- Topic sequence follows Pain → Proof → Offer funnel:
  - Post 1: Pain point carousel (e.g., "X leads lost every month to slow follow-up") — drawn from Phase 5 Reddit research
  - Post 2: Case study result carousel (e.g., missed-call text-back recovered $4,200 from a $200/mo system)
  - Post 3: "Here's what I build" services overview with CTA to book
- Visual style uses brand system architecture design language: dark backgrounds (#1A1A1A), purple (#7B2FBE) and cyan (#4DD9E8) accents, dot grids, arch-nodes, bold Roc Grotesk headlines
- Profile pic is personal headshot, matching Twitter for cross-platform consistency

### Link-in-bio & CTA unification

- Instagram bio link points directly to the landing page (website/index.html), not a link-in-bio tool or direct booking link
- Twitter bio link also points to the landing page — same destination across all platforms
- Instagram and Twitter bio copy both use pain-first approach, matching brand voice
- YouTube video descriptions and channel about section updated to use the same landing page link as primary CTA
- All 3 platforms use identical CTA wording: "Book a free 15-min discovery call"
- No variation in CTA phrasing or destination link across platforms

### Mobile funnel testing

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

</decisions>

<specifics>
## Specific Ideas

- Headshot on Twitter and Instagram, branded logo icon stays on YouTube — "people follow people" on social platforms
- YouTube banner adapted (not recreated) for Twitter header — maintains visual recognition across platforms
- Carousel slides use the same design system as website and YouTube thumbnails: dot grids, arch-nodes, connectors, dark moody backgrounds
- The 3-post grid functions as a mini sales funnel: visitor sees pain → proof → offer in sequence

</specifics>

<code_context>

## Existing Code Insights

### Reusable Assets

- brand-voice.md: Complete voice guide with social media tone ("practical, punchy, metrics up front"), style rules (no emojis, contractions, no jargon), and terminology table
- Logo variants: logo-full-dark.svg, logo-full-light.svg, logo-icon-dark.svg, logo-icon-light.svg, logo-icon-white.svg, logo-wordmark variants
- YouTube branding: banner-v1-system-architecture.svg, banner.svg, banner.png, profile-pic-branded.png, profile-pic-headshot.png, profile-pic-tight.png, thumbnail-template.svg, about-section.md, channel-keywords.md
- Landing page: website/index.html with booking CTA linking to https://calendar.app.google/psycao3CrXjGnmk48
- Email signature: brand/email-signature.html
- Color system: #7B2FBE (primary purple), #9B4FDE (light purple), #4DD9E8 (cyan), #1A1A1A (dark base)

### Established Patterns

- Design language: System Architecture visual motif (dot grids, arch-nodes, connectors, mesh gradients, grain texture) — documented in brand-voice.md section 9
- Typography: Roc Grotesk (headings), Gilroy (body), JetBrains Mono (code/data)
- YouTube channel: Already has updated branding per Phase 1 work (CONT-01, CONT-02 marked complete)

### Integration Points

- Landing page is the single funnel destination — all platforms link here
- Google Calendar booking link: calendar.app.google/psycao3CrXjGnmk48
- Phase 5 Reddit topic bank provides content for Instagram carousel topics
- content/youtube/content-plan.md may inform carousel content angles

</code_context>

<deferred>
## Deferred Ideas

- Instagram highlights and stories strategy — could enhance the profile but not required for initial 3-post grid launch
- UTM tracking on social bio links — deferred to future analytics phase (v2.1 DIST-03)
- Twitter content cadence post-launch — belongs in Phase 8 (Content Production)
- Landing page mobile responsiveness fixes (if any found during testing) — may need a separate task

</deferred>

---

_Phase: 06-platform-foundation_
_Context gathered: 2026-03-02_

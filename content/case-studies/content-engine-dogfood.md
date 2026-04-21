# AI Agents Shipped 3 Instagram Reels in 24 Hours. Here's What That Means for Your Business.

**Category:** Content automation (internal proof)
**Result:** A brand-agnostic content pipeline built from scratch in ~24 hours by AI agents, producing 3 publish-ready Reels for Sameer Automations. Adding a new brand is now a YAML file, not new code.

## The problem

Before I can sell a content automation system to another business, I have to run one inside my own. I was recording videos and trimming them by hand, paying for a third-party caption service, and I had no way to separate "Sameer Automations" content from "Raj Photo Video" content without duplicating the pipeline.

I also had a standing ask from a prospect: build me an openclaw agent that does the kind of work your agents already do. Before I sold that, I needed proof my agents could actually build production software end-to-end, not just assist. Eating my own dog food.

## What I built

I rebased the content-engine from scratch as a multi-brand pipeline. Every brand (Sameer Automations, Raj Photo Video, and any future brand) is configured with a single YAML file. The pipeline reads the brand slug and delegates every decision, voice rules, banned phrases, caption colors, hashtag strategy, platform formatting, to that YAML. The core code is brand-agnostic.

The one-line command: `content new --brand <slug> --platform <ig|yt> --input <file>`. Vertical Reels for Instagram get burned-in captions. Horizontal YouTube uploads get an SRT sidecar plus a rule-based title and description.

Everything runs on tools I already pay for. No new SaaS bills.

## The stack

- **openclaw** as the agent gateway (routes work to Atlas, Ranveer, Nisha, and the rest of the roster)
- **gstack** slash commands for the build loop (Garry Tan's AI software factory pattern, Think then Plan then Build then Review then Test then Ship)
- **Opus 4.7** for architecture and plan review
- **Whisper** for transcription with word-level timestamps
- **ffmpeg** for silence removal and ASS subtitle burn-in
- **Brand YAMLs** as the source of truth for voice, visuals, and platform rules

No ZapCap. No Descript. No per-minute caption fees. Open-source where it exists, existing subscriptions where it doesn't.

## The architecture that generalizes

The pattern is simple enough to explain in one diagram and powerful enough to reuse for any brand:

1. `brands/<slug>.yaml` holds voice, tone, CTAs, hashtags, caption styling, visual palette, platform rules, and banned phrases
2. `core/` modules (ingest, transcribe, score, trim, caption, publish) never hardcode brand-specific strings. They accept a brand slug and load the YAML.
3. `skills/` and `mcps/` are brand-aware adapters. They read the brand YAML at invocation, not at import time.
4. `db/` migrations add `brand_slug` to every content-scoped table so one database cleanly serves every brand.

Adding a new brand is a new YAML. Not a code change. Not a fork. Not a configuration menu with 40 checkboxes. A single file that reads like a brief.

## The four-layer adversarial proof

This is the meat. No single review catches everything. Four independent layers are why the output is production-grade, not hackathon-grade.

**Layer 1: Self-review against execution rules.** Every commit was checked against surgical-change, goal-driven, surface-your-assumptions discipline before going in. Caught the obvious stuff: scoped changes, no adjacent refactors, assumptions flagged in the commit message.

**Layer 2: /codex challenge.** I ran an adversarial model against the highest-risk commits (caption burn and CLI). Codex challenge surfaced three real issues in the caption module that self-review had missed:

- Issue #1: tier-aware caption styling was silently broken (the config existed but the code path never read it)
- Issue #2: caption font fallback was dead code, unreachable
- Issue #3: brand config fields were being consumed in one place and ignored in another

Every one of them would have shipped if only self-review gated the commit.

**Layer 3: /codex verification pass.** After fixing the issues above, I ran codex again over the fix. It caught two regressions the fix itself had introduced: `stroke_width=0` was collapsing to the library default instead of respecting the explicit zero, and the determinism contract on caption rendering had loosened. The fix of the fix is where most shipping breaks. Verification caught it before it landed.

**Layer 4: Visual validation.** After all three code reviews passed, I rendered a real Reel and watched it. The captions were stacking on top of each other. Unreadable. The karaoke-style phrase plus word highlight logic was competing, both were firing at the same time. Every unit test had passed. Every review had passed. It would have shipped broken without someone actually watching the output.

Phrase-level and word-level captions now run as a single synchronized pass. Fixed in commit `phase-3.5`. That commit only exists because visual validation is a mandatory layer.

## Timeline

33 commits, every one phase-prefixed, from scaffold to shipping 3 Reels. All inside a 24-hour window.

- 2026-04-20 17:40: scaffold the multi-brand repo structure
- 2026-04-20 17:44: port brand-voice, GCP region, execution contract into CLAUDE.md
- 2026-04-20 17:46: first brand YAML (Sameer Automations) extracted from authoritative sources
- 2026-04-20 (evening): dual-tier RajPhotoVideo YAML, schema work, Phase 2 complete
- 2026-04-21 (morning): Phase 3 build, 11 modules, ingest through publish
- 2026-04-21 12:34-12:37: Phase 3.4, Instagram and YouTube platform pipelines split
- 2026-04-21 13:54-13:56: 3 Reels rendered and verified
- 2026-04-21 13:56: final visual-validation fix, karaoke-style caption stacking bug

Every commit has a phase tag, a single responsibility, and passes its tests.

## The output

3 publish-ready Reels for Sameer Automations:

- **Welcome Video** (42 seconds)
- **Get Started** (44 seconds)
- **Netflix Demo** (47 seconds)

Each one:

- Transcribed with Whisper word-level timestamps
- Silence-trimmed via ffmpeg
- Caption-burned in brand colors (cyan highlights on Roc Grotesk Bold over Gilroy Regular), styled from the brand YAML
- Rendered at Instagram's vertical aspect ratio

The pipeline CLI is one command. Adding a new brand is one YAML file.

## What this means for you, Peter

Your ask maps cleanly to the pattern I just proved.

1. **Your brand YAML.** Voice, tone, CTAs, platform rules, visual palette, banned phrases. One file. You write the brief, I codify it.
2. **Your content pipeline.** The same open-source stack, pointed at your recordings, producing your platforms. No per-minute caption fees, no third-party lock-in.
3. **Your openclaw agent.** Routes tasks against your YAML, runs the build loop, publishes where you want it.

This is a ~1-week build for your brand specifically, because the shared infrastructure (pipeline core, caption burn, platform adapters, agent gateway) already exists and is already proven. We are configuring, not rebuilding.

**Pricing for this specific build:** $1,500 to $3,000 setup plus $200 to $500 per month for hosting, model costs, and ongoing maintenance. The setup buys you your brand YAML, your agent instance, and your publish-ready pipeline. The retainer covers keeping it running and updated as your needs evolve.

If you want to see the artifact the Reels, the commits, the brand YAML before committing, say the word and I'll ship a walkthrough.

## Honest flags

What this pipeline does NOT do yet:

- **LLM-drafted captions from a transcript** (Phase 5 and beyond). Right now captions are burned from the transcript verbatim; writing punchier captions is a separate phase.
- **Meta Graph API authentication for Instagram auto-publish** (deferred). The Reels render as drafts. Final publish is still a manual upload for now.
- **Vimeo footage integration for RajPhotoVideo's long-form workflow** (pending). The vertical Reels pipeline works; the full wedding-edit pipeline is next.

These are flagged because overclaiming now costs trust later. When you see the pipeline, what you see is what it does.

## Proof artifacts

- Git branch: `rebase/multi-brand-dogfood` on the content-engine repo, 33 phase-prefixed commits
- Brand YAMLs: `brands/sameer-automations.yaml` and `brands/rajphotovideo.yaml`
- Rendered Reels: 3 captioned MP4s in the content-engine staging directory (hosted URLs replace local paths when this document is sent)
- Architecture contract: `CLAUDE.md` in the content-engine repo documents the multi-brand contract as the source of truth

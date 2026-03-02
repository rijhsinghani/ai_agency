# Phase 8 to Phase 10 Integration Gaps

Critical findings from integration analysis. These must be resolved before the automated pipeline is production-ready.

## Status: 10 gaps identified, 1 blocking

---

## Blocking Issue

### Gap 9: content_bank_id never persisted in main.py

Phase 10's `main.py` Step 11 has a TODO where `store_drafts_in_supabase()` is never called. Generated content is logged but not written to the `content_bank` table. This means:

- The Slack approval workflow (Plan 10-04) will never receive content to review
- The publishing workflows (10-05, 10-06) will never have content to publish
- The entire Phase 10 pipeline generates output that disappears

**Fix required:** Wire `content_bank_id` through the pipeline trigger metadata and call `store_drafts_in_supabase()` in Step 11.

---

## Architecture Gap

### Gap 1: Phase 10 rebuilt Phase 8 tools from scratch

Phase 10's Python Cloud Run pipeline does not call the Phase 8 Node.js CLIs (`sameer-repurpose`, `sameer-clip`). Both systems exist independently:

|                | Phase 8 (Node.js CLIs)              | Phase 10 (Python Cloud Run)     |
| -------------- | ----------------------------------- | ------------------------------- |
| Trigger        | Manual CLI invocation               | GCS Eventarc                    |
| Transcript     | Supadata API (from YouTube URL)     | Whisper (from raw audio)        |
| Content model  | claude-opus-4-6                     | claude-sonnet-4-6               |
| Clip selection | Manual (user provides timestamps)   | AI-driven (Gemini 3.1 Pro)      |
| Output         | Local Markdown files                | Supabase JSONB                  |
| Platforms      | 3 (twitter, instagram, clip_script) | 6 (+youtube, substack, threads) |

**Decision needed:** Are Phase 8 CLIs retired, or do they serve as manual/retroactive tools alongside the automated pipeline?

---

## Quality and Consistency Gaps

### Gap 4: Caption font — Arial vs Roc Grotesk

- Phase 8 `video-clipper/lib/formatter.js`: hardcodes `Fontname=Arial`
- Phase 10 `clip_extraction.py` + `config.py`: uses `FontName=Roc Grotesk`
- Brand font is Roc Grotesk

**Fix:** Update Phase 8 formatter.js to use Roc Grotesk.

### Gap 3: Model mismatch

- Phase 8: claude-opus-4-6 (higher quality, higher cost)
- Phase 10: claude-sonnet-4-6 (faster, cheaper)

**Decision needed:** Is Sonnet sufficient for automated pipeline content? Or should both use the same model?

### Gap 10: Anti-slop banlist divergence

Phase 8 bans 17 phrases. Phase 10 bans 18 phrases. Several are unique to each:

- Only in Phase 8: "innovative", "utilize", "facilitate", "empower", "unleash", "disrupt", "ecosystem", "platform suite"
- Only in Phase 10: "in today's fast-paced world", "let's dive in", "let me dive in", "scalable solution", "holistic approach", "paradigm shift", "unlock", "revolutionize"

**Fix:** Centralize banlist to a single shared file both systems reference.

---

## Format and Interface Gaps

### Gap 5: Platform coverage

Phase 8 generates 3 platforms. Phase 10 generates 6. Missing from Phase 8: youtube_title, youtube_description, substack_intro, threads_post.

### Gap 6: Output format incompatibility

Phase 8 writes Markdown to local `review/` folder. Phase 10 writes JSONB to Supabase `content_bank`. No bridge exists.

### Gap 7: Twitter thread format

Phase 8 produces a flat text string. Phase 10 expects a JSON array of individual tweets. Phase 10's n8n `twitter.json` workflow uses `splitInBatches` over the array. Importing Phase 8 output would break the publisher.

### Gap 8: clip_script vs actual clips

Phase 8's `clip_script` output is a text recommendation, not timestamps. The user must manually interpret it and run `sameer-clip`. Phase 10 extracts clips automatically with Gemini-selected timestamps.

---

## Recommended Resolution Path

1. **Fix Gap 9 immediately** — wire content_bank_id in Phase 10 main.py
2. **Centralize banlist** — create `brand/banned-phrases.json` referenced by both systems
3. **Update Phase 8 caption font** — Arial to Roc Grotesk
4. **Document the dual-system design** — Phase 8 CLIs for manual/retroactive use, Phase 10 for automated pipeline
5. **Defer format bridging** — unless retroactive repurposing of old videos is a priority

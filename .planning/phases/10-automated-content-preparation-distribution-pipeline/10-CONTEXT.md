---
phase: 10
type: context
created: "2026-03-02"
---

# Phase 10: Automated Content Pipeline — Implementation Context

Decisions made during discuss-phase session. Downstream agents (researcher, planner) use this to know what to investigate and what choices are locked.

---

## Decision 1: Build in content-engine repo

**Choice:** Phase 10 extends the existing `~/content-engine` repo (GitHub: rijhsinghani/content-engine).

**What exists there already:**

- **Backend API** (FastAPI, 21 endpoints): content generation, transcription (Whisper.cpp), voice learning, analytics, cost tracking, WordPress publishing, email sending, GitHub webhook monitoring
- **Video Pipeline** (Flask, Cloud Run): 12 Python service modules — noise_reduction, silence_removal, audio_normalize, transcription, caption_burnin, color_correct, intro_outro, encode, clip_extraction, content_generator, thumbnail_trigger + main.py orchestrator with GCS Eventarc triggers
- **Frontend** (Next.js): content review dashboard, analytics, platform previews, auth
- **Supabase Schema**: 12 tables (content*engine*\* prefix) — repositories, commits, recommendations, videos, transcripts, brand_voice, content_drafts, published_content, analytics, settings, ai_usage
- **Git**: 4 commits, pushed to origin

**What stays in automation_consultancy:**

- Brand assets (brand/, ops/packages/, ops/sop/)
- Planning docs (.planning/)
- Website (website/index.html)
- Phase 8 CLI tools (research/tools/repurposing-script, research/tools/video-clipper)
- Content calendar, case studies, giveaways
- The duplicate video-pipeline code in content-engine/ directory of automation_consultancy should be ignored — the canonical version is in ~/content-engine/video-pipeline/

**Implication for planners:** All Phase 10 code changes target ~/content-engine. Brand assets (banned-phrases.json, brand-voice.md) are referenced from automation_consultancy via config but not copied.

---

## Decision 2: Claude API only for content generation

**Choice:** Switch content-engine's content generation from GPT-4o to Claude API. All text generation uses Claude (matches Phase 8 CLI tools and roadmap spec).

**What to reuse from content-engine:**

- Voice learning service (backend/services/voice_learning.py) — pattern extraction logic is model-agnostic. Extract voice patterns, feed them into Claude system prompts instead of GPT-4o prompts.
- Cost tracking utility (backend/utils/cost_tracker.py) — update pricing table to include Claude model costs.
- Content draft storage and approval workflow — schema already supports multi-platform drafts with status tracking.

**What to change:**

- backend/services/content_generator.py: Replace OpenAI client with Anthropic SDK. Update prompts to use anti-slop architecture (voice module + format module + context module + constraint module with banned phrases).
- video-pipeline/services/content_generator.py: Already uses Claude (implemented during Phase 10 planning session). This is the correct implementation to keep.
- config.py: Add ANTHROPIC_API_KEY env var.

**What to keep on GPT-4o (unchanged):**

- backend/services/ai_classifier.py (commit classification) — uses GPT-4o-mini, low cost, works fine.
- backend/services/talking_points.py — can migrate later if needed, not blocking.

---

## Decision 3: Keep Phase 8 CLI tools alongside pipeline

**Choice:** Phase 8 Node.js CLI tools (repurposing-script, video-clipper) serve a different purpose than the Phase 10 Python pipeline. Both stay.

**CLI tools (manual, local):**

- repurposing-script: Quick one-off YouTube transcript → platform drafts. Useful when you want to repurpose a video without going through the full pipeline.
- video-clipper: Quick local clip extraction with ffmpeg-static. Useful for ad hoc clips.

**Python pipeline (automated, Cloud Run):**

- Triggered by GCS upload, runs full 12-step post-production, generates AI content, stores in Supabase, triggers Slack approval.
- This is the production system for ongoing content operations.

**No conflict:** Different use cases, different runtimes, different repos.

---

## Code Context: Existing content-engine Architecture

### Supabase Schema (already deployed)

12 tables with `content_engine_` prefix. Key tables for Phase 10:

- `content_engine_content_drafts`: platform, content_text, metadata (JSONB), status (draft/approved/rejected/published), brand_voice_version
- `content_engine_published_content`: platform, published_url, external_id, publishing_method (api_auto/manual_paste)
- `content_engine_analytics`: platform, metric_type, metric_value, metric_metadata (JSONB), revenue_amount
- `content_engine_brand_voice`: signature_phrases, preferred_terms, avoid_words, tone_characteristics, confidence_score
- `content_engine_ai_usage`: operation_type, model_used, tokens_input, tokens_output, estimated_cost_usd

### Video Pipeline Content Bank

The video-pipeline/main.py already has `_get_or_create_content_bank_row()` that creates/finds rows in a `content_bank` table. This table is NOT in the initial schema migration — it was added during Phase 10 planning. The planner should reconcile this with the existing schema.

### Missing from content-engine (Phase 10 must add)

1. **Slack approval workflow** — no Slack integration exists yet
2. **Platform publishers** for Twitter/X, Instagram, YouTube, Substack, Threads — only WordPress and Email exist
3. **Google Sheets sync** — no bidirectional sync with Supabase
4. **Multi-brand support** — schema has no brand column; video-pipeline hardcodes "sameer_automations"
5. **content_bank table** — referenced by video-pipeline but not in schema migration
6. **n8n orchestration** — no n8n workflows exist yet

### Reusable patterns from content-engine

1. **Service module pattern**: Each service is a single Python file with one main function. Follow this for new publishers.
2. **Cost tracking**: CostTracker wraps every AI call. Extend for Claude.
3. **Content draft approval flow**: Draft → Approved → Published with user_edits tracking for voice learning feedback loop.
4. **RLS policies**: All tables have row-level security. New tables must follow same pattern.

---

## Deferred Ideas

- Consolidating repos into a monorepo — not now, revisit after Phase 10 is working
- Porting CLI tools to Python — keep Node.js CLIs as-is, no migration needed
- LinkedIn publishing — explicitly out of scope per project constraints

---

## Next Steps

`/gsd:research-phase 10` or `/gsd:plan-phase 10` — researcher/planner should read this file first and target ~/content-engine repo for all implementation work.

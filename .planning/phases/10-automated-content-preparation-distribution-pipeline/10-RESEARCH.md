# Phase 10: Automated Content Preparation & Distribution Pipeline - Research

**Researched:** 2026-03-02
**Domain:** Video post-production pipeline, multi-platform social publishing, AI content generation, Slack approval workflow, n8n orchestration
**Confidence:** MEDIUM-HIGH (most components verified via official docs and WebSearch; some API rate limits have conflicting sources)

---

## Summary

Phase 10 is the most technically complex phase in the roadmap — a seven-part system spanning Cloud Run video processing, Gemini multimodal AI, Claude text generation, Slack Block Kit interactivity, and direct API publishing to five platforms. Each part has been researched independently; the core patterns are well-established, but several specific API limits, model names, and free-tier claims in the roadmap require correction or validation.

The technology stack is sound and achievable. The key implementation risks are: (1) Whisper on Cloud Run now supports GPU (L4) which changes the original "CPU-only" assumption from earlier documentation, (2) the X/Twitter free tier write limit is 500 posts/month not 1,500 (the roadmap states "500 posts/month" which is correct), (3) Threads API does NOT support video publishing for organic posts as of early 2026 — only text and images, and (4) the "Gemini 3 Pro Image Preview" thumbnail model cited in the roadmap does not have a confirmed free tier. The youtube-thumbnail skill already installed in this project uses this model (called "Nano Banana Pro") and represents the canonical implementation pattern to follow.

The recommended implementation order follows the dependency chain: Supabase schema + GCS trigger infrastructure first, then the Cloud Run video processing pipeline, then AI content generation, then Slack approval, and finally platform publishers. Multi-brand and analytics are additive layers that can be built after core flow works end-to-end.

**Primary recommendation:** Build Phase 10 in two sequential macro-waves — Wave 1: the "spine" (GCS trigger → Cloud Run processing → Supabase storage → Slack approval → one publisher), Wave 2: remaining publishers + multi-brand + analytics. Do not attempt to build all seven parts in parallel; the pipeline has strict sequential dependencies.

---

## Phase Requirements

No Phase 10 requirement IDs are defined in REQUIREMENTS.md. The requirements in REQUIREMENTS.md only cover through Phase 9 (v2.0 milestone). Phase 10 is tagged as v3.0 and its success criteria are defined in ROADMAP.md under the Phase 10 section. The 11 success criteria from ROADMAP.md serve as the functional requirements:

| #   | Success Criterion                                                   | Research Support                                                                  |
| --- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | Supabase content bank with 20+ topics, viewable in Google Sheets    | Supabase ↔ n8n ↔ Google Sheets integration is well-documented                     |
| 2   | GCS upload triggers Cloud Run post-production automatically         | Eventarc GCS triggers for Cloud Run are GA and well-documented                    |
| 3   | Gemini 3.1 Pro identifies 5-8 clip timestamps; ffmpeg extracts 9:16 | Gemini 3.1 Pro is released (Feb 2026); video analysis is supported                |
| 4   | Claude generates platform-specific content in brand voice           | Claude API patterns verified; content-engine repo has existing voice learning     |
| 5   | Slack #content-pipeline receives Block Kit message with all drafts  | Block Kit + n8n webhook pattern researched; 3-second timeout pitfall documented   |
| 6   | Slack approval publishes to selected platforms within 5 minutes     | Direct API publishing researched per platform                                     |
| 7   | Same Short file posts to YouTube Shorts and Instagram Reels         | Identical MP4 format requirement confirmed; H.264, 9:16, <60s                     |
| 8   | Multi-brand switching works (Sameer Automations + Raj Photo Video)  | Brands table in Supabase + credential routing pattern straightforward             |
| 9   | Engagement metrics from all platforms flow into Supabase nightly    | All target platform APIs provide engagement endpoints                             |
| 10  | claude-thumbnails skill generates 4 thumbnail variations per video  | Skill is already installed in this project at `.claude/skills/youtube-thumbnail/` |
| 11  | Total monthly cost under $15, zero paid subscriptions               | Stack verified; key risk is Gemini image generation free tier status              |

---

## Standard Stack

### Core

| Library/Tool          | Version                       | Purpose                                                                                                            | Why Standard                                                                                                |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| n8n                   | Self-hosted (existing VM)     | Workflow orchestration — GCS trigger routing, Slack webhook handling, platform publishing                          | Already running in project; native Supabase + Google Sheets nodes                                           |
| Supabase (Postgres)   | Existing instance             | Content bank, draft storage, analytics, AI usage tracking                                                          | Existing project DB; content-engine schema already has relevant tables                                      |
| Cloud Run             | GCP `videoprocessing` project | Stateless video processing container (ffmpeg, Whisper, auto-editor)                                                | Pay-per-use; no idle cost; existing project                                                                 |
| ffmpeg                | 6.x (in Docker image)         | All video transformations: noise reduction, silence removal, normalization, caption burn-in, color grading, encode | Industry standard; single binary does all 9 pipeline steps                                                  |
| auto-editor           | 29.3.1                        | Silence removal with audio threshold-based detection                                                               | Latest release Nov 2025; pip install auto-editor; better than raw ffmpeg silencedetect for content creators |
| ffmpeg-normalize      | 1.36.0+                       | EBU R128 / LUFS audio normalization                                                                                | pip3 install ffmpeg-normalize; streaming-video preset at -14 LUFS                                           |
| openai-whisper        | Current                       | Transcription (medium model) with word-level SRT output                                                            | Open source; 769 MB model; Cloud Run GPU (NVIDIA L4) now supported                                          |
| Gemini 3.1 Pro        | gemini-3.1-pro-preview        | Video analysis for clip identification                                                                             | Released Feb 19, 2026; video understanding supported; 1M token context                                      |
| Claude API            | claude-sonnet-4-6 (or opus)   | Platform-specific text generation                                                                                  | Anti-slop prompt architecture from roadmap; per-use cost                                                    |
| Slack API + Block Kit | Current                       | Approval workflow with interactive buttons                                                                         | Free; native n8n Slack node available                                                                       |
| Google Sheets API     | v4                            | Bidirectional content bank view/edit layer                                                                         | n8n Google Sheets node; native bidirectional sync with Supabase via n8n                                     |

### Platform Publishers

| Platform          | Integration                                                  | Cost | Confirmed Limit                                                           |
| ----------------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------------------- |
| Twitter/X         | X API v2 free tier — POST /2/tweets                          | $0   | 500 posts/month per app (write-only; NO reads)                            |
| Instagram         | Meta Graph API — POST /{ig-user-id}/media (media_type=REELS) | $0   | 50 posts/24hrs; Business account + Facebook Page required                 |
| YouTube long-form | YouTube Data API v3 — videos.insert                          | $0   | 1,600 quota units/upload; ~6 uploads/day on 10K default quota             |
| YouTube Shorts    | Same API as long-form                                        | $0   | Shorts auto-detected: 9:16 + under 60 seconds + #Shorts in description    |
| Substack          | n8n-nodes-substack community node (jakub-k-slys)             | $0   | Unofficial API (session cookie auth); supports Notes publishing           |
| Threads           | Meta Graph API — POST /{threads-user-id}/threads             | $0   | Text + image only for organic posts; VIDEO NOT SUPPORTED as of early 2026 |

### Supporting

| Library                    | Version              | Purpose                                                            | When to Use                                                |
| -------------------------- | -------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- |
| Eventarc                   | GCP managed          | Routes GCS object.create events to Cloud Run                       | Part of GCS trigger setup; required for serverless trigger |
| Google Cloud Storage       | Existing GCP project | Trigger bucket (raw video in), output bucket (processed video out) | Both buckets in same region as Eventarc trigger            |
| python-ffmpeg / subprocess | —                    | Python wrapper for ffmpeg in Cloud Run container                   | Run ffmpeg as subprocess in Python Cloud Run service       |
| @slack/web-api             | npm                  | Slack API client for Block Kit message construction                | If building n8n custom code node for complex Block Kit     |
| supabase-js v2             | 2.x                  | Supabase client in Cloud Run service                               | For storing processing results and draft content           |

### Thumbnail Generation (Project Skill Already Installed)

The `.claude/skills/youtube-thumbnail/` skill is already installed in this project and uses:

- **Model:** Gemini "Nano Banana Pro" (= Gemini 3 Pro Image Preview)
- **Pattern:** 4 parallel generations → 2x2 comparison grid
- **Script:** `.claude/skills/youtube-thumbnail/scripts/generate_thumbnail.py` with `--headshot`, `--reference`, `--examples` flags
- **Note:** Free tier status for this model is UNCONFIRMED (see Open Questions). The skill works regardless — it just may incur per-image API costs.

### Alternatives Considered

| Instead of                        | Could Use                                          | Tradeoff                                                                                                                                                   |
| --------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud Run (GPU) for Whisper       | Cloud Run (CPU-only)                               | CPU is 3-30x slower; medium model on CPU is ~3-5min for 20-min video; GPU L4 does it in <30s but GPU Cloud Run costs more and is not available in us-east4 |
| auto-editor for silence removal   | ffmpeg silencedetect/silenceremove filter directly | Raw ffmpeg requires custom Python scripting; auto-editor is purpose-built for content creators, handles edge cases better                                  |
| n8n community Substack node       | Webhook + direct HTTP to Substack API              | Same underlying approach; community node provides reusable auth wrapper                                                                                    |
| Gemini 3.1 Pro for video analysis | Gemini 2.5 Pro                                     | 2.5 Pro is available but 3.1 Pro was specifically chosen for better multi-step reasoning; both support 1M token context                                    |
| Direct API publishing             | Buffer or third-party scheduler                    | Buffer costs money; direct API gives full control; confirmed by roadmap as zero-subscription requirement                                                   |

**Installation:**

```bash
# Cloud Run Docker image dependencies
pip install auto-editor==29.3.1 ffmpeg-normalize openai-whisper supabase google-generativeai anthropic
apt-get install ffmpeg

# n8n community node (installed in n8n settings UI)
# Package name: n8n-nodes-substack
```

---

## Architecture Patterns

### Recommended Project Structure

Phase 10 work spans two repos: this repo (automation_consultancy) for config/schema, and content-engine for shared pipeline code.

```
automation_consultancy/
├── .planning/phases/10-*/          # Plans, research, summaries
├── content-engine/                 # Reference only (separate repo)
│   ├── supabase/migrations/        # Existing schema to extend
│   └── backend/services/           # Existing transcription, voice_learning patterns

content-engine repo additions:
├── video-pipeline/
│   ├── Dockerfile                  # Cloud Run image: ffmpeg + Whisper + auto-editor
│   ├── main.py                     # FastAPI app receiving Eventarc CloudEvent
│   ├── services/
│   │   ├── noise_reduction.py      # ffmpeg arnndn filter
│   │   ├── silence_removal.py      # auto-editor subprocess wrapper
│   │   ├── audio_normalize.py      # ffmpeg-normalize wrapper
│   │   ├── transcription.py        # Whisper medium model (reuse existing service)
│   │   ├── caption_burnin.py       # ffmpeg subtitles filter
│   │   ├── color_correct.py        # ffmpeg LUT3D
│   │   ├── intro_outro.py          # ffmpeg concat
│   │   ├── clip_extraction.py      # Gemini analysis + ffmpeg 9:16 cut
│   │   └── content_generator.py    # Claude API (reuse/extend existing service)
│   └── config.py                   # Pipeline configuration
├── n8n-workflows/
│   ├── content-bank-sync.json      # Supabase ↔ Google Sheets bidirectional sync
│   ├── slack-approval.json         # Block Kit message + webhook receiver
│   └── platform-publishers/
│       ├── twitter.json
│       ├── instagram.json
│       ├── youtube.json
│       ├── substack.json
│       └── threads.json
└── supabase/migrations/
    ├── 002_content_bank.sql        # content_bank table + brand column
    └── 003_analytics.sql           # per-platform engagement metrics
```

### Pattern 1: GCS Trigger → Eventarc → Cloud Run

**What:** A video file uploaded to a GCS "raw video" bucket fires an Eventarc trigger that calls the Cloud Run video-pipeline service with a CloudEvent payload.

**When to use:** Entry point for the automated pipeline — no polling required.

**Key requirements:**

- GCS bucket and Eventarc trigger MUST be in the same GCP project and region
- Cloud Run service needs `roles/run.invoker` on the service account associated with Eventarc trigger
- Bucket can have max 10 notification configurations — one per unique event type filter
- The CloudEvent payload contains: `bucket`, `name` (object path), `contentType`, `size`

```python
# Source: Cloud Run Eventarc docs
from cloudevents.http import from_http
from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods=["POST"])
def process_video():
    event = from_http(request.headers, request.get_data())
    bucket = event.data["bucket"]
    object_name = event.data["name"]  # e.g. "raw/2026-03-02-my-video.mp4"
    # trigger pipeline...
    return "OK", 200
```

### Pattern 2: Sequential ffmpeg Pipeline Steps (Python Subprocess)

**What:** Each post-production step is a discrete Python function calling ffmpeg as a subprocess, writing to temp files between steps. All 9 steps run in a single Cloud Run invocation.

**When to use:** For the Part B video post-production pipeline.

**Critical configuration:**

- Noise reduction: `ffmpeg -i input.mp4 -af "arnndn=m=rnnoise-models/bd.rnnn" output.mp4`
- Silence removal: `auto-editor input.mp4 --margin 0.4sec --silent-threshold 4% -o output.mp4`
- LUFS normalization: `ffmpeg-normalize input.mp4 -o output.mp4 -t -14 -tp -1 -lrt 7`
- Caption burn-in: `ffmpeg -i input.mp4 -vf "subtitles=captions.srt:force_style='FontName=Roc Grotesk,FontSize=18,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,Outline=2'" output.mp4`
- Final encode: `ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 20 -c:a aac -b:a 128k -movflags +faststart output.mp4`

**Cloud Run sizing for video processing:**

- CPU: 4 vCPU minimum for ffmpeg parallelism
- Memory: 4-8 GiB (20-minute 1080p video = ~4 GiB working memory)
- Timeout: 3600 seconds maximum (set to 3600 for long videos)
- GPU: NVIDIA L4 (if using GPU for Whisper) — adds ~$0.05-0.10/invocation

### Pattern 3: Slack Block Kit + n8n Webhook Async Pattern

**What:** n8n sends a Block Kit message to Slack. Slack calls back to n8n's webhook when a button is clicked. The critical requirement is responding within Slack's 3-second timeout.

**When to use:** The Slack approval workflow (Part D).

**The 3-second timeout problem and solution:**
Slack's interactive components require an HTTP 200 response within 3 seconds. n8n must use the "Respond to Webhook" node IMMEDIATELY after receiving the interactive callback, BEFORE doing any processing (database writes, API calls).

```
Slack button click
  → n8n webhook receives payload
  → "Respond to Webhook" node sends 200 (< 1 second) ← MUST happen first
  → async: update Supabase status
  → async: trigger publishing workflow
```

**Block Kit image limit:** Slack allows max 50 blocks per message. The 2x2 thumbnail grid uses image blocks — keep total block count under 50. Expandable sections can use accordion pattern via `type: "section"` with show/hide state.

### Pattern 4: Instagram Reels Two-Step Upload

**What:** Instagram publishing requires two separate API calls: create container → poll until FINISHED → publish.

**When to use:** Instagram Reels and carousel publishing.

```python
# Source: Meta Graph API docs, Phyllo guide (MEDIUM confidence)
import requests, time

def post_reel(ig_user_id, video_url, caption, access_token):
    # Step 1: Create container
    container = requests.post(
        f"https://graph.facebook.com/v22.0/{ig_user_id}/media",
        params={
            "media_type": "REELS",
            "video_url": video_url,  # Must be publicly accessible URL
            "caption": caption,
            "access_token": access_token,
        }
    ).json()
    container_id = container["id"]

    # Step 2: Poll until FINISHED (typically 30-120 seconds)
    for _ in range(30):
        status = requests.get(
            f"https://graph.facebook.com/v22.0/{container_id}",
            params={"fields": "status_code", "access_token": access_token}
        ).json()
        if status["status_code"] == "FINISHED":
            break
        time.sleep(5)

    # Step 3: Publish
    return requests.post(
        f"https://graph.facebook.com/v22.0/{ig_user_id}/media_publish",
        params={"creation_id": container_id, "access_token": access_token}
    ).json()
```

**Critical requirement:** The video must be at a **publicly accessible URL** at the time of container creation. GCS signed URLs work — generate one with sufficient TTL (1 hour minimum).

### Pattern 5: Twitter/X Thread via Chained Tweets

**What:** A Twitter thread requires posting the first tweet, then chaining replies using `reply.in_reply_to_tweet_id`.

**When to use:** Publishing Twitter threads from YouTube content.

```python
# Source: X API v2 docs (MEDIUM confidence — free tier write-only)
import requests

def post_thread(tweets: list[str], bearer_token: str, user_access_token: str):
    """Post a thread. First tweet is standalone, each subsequent tweet replies to previous."""
    headers = {"Authorization": f"Bearer {user_access_token}"}
    previous_tweet_id = None

    for tweet_text in tweets:
        payload = {"text": tweet_text}
        if previous_tweet_id:
            payload["reply"] = {"in_reply_to_tweet_id": previous_tweet_id}

        resp = requests.post(
            "https://api.x.com/2/tweets",
            json=payload,
            headers=headers
        ).json()
        previous_tweet_id = resp["data"]["id"]

    return previous_tweet_id
```

**Free tier constraint:** 500 posts/month. A 10-tweet thread consumes 10 of those 500. At ~1 video/week with 10-tweet threads, that's 40 posts/month from threads alone — well within limit. Buffer remaining for other posts.

### Pattern 6: Supabase ↔ Google Sheets Bidirectional Sync (n8n)

**What:** n8n workflow with two directions: (a) Supabase record insert/update → update Google Sheets row; (b) Google Sheets edit → update Supabase record.

**When to use:** Content bank view/edit layer (Part A).

**Direction A (Supabase → Sheets):** n8n Supabase Trigger node on `content_bank` table inserts/updates → Google Sheets Update Row or Append Row node.

**Direction B (Sheets → Supabase):** n8n Google Sheets Trigger (polling every 5 minutes) → detect changed rows → Supabase Update node. Use a `last_modified` column in both to avoid infinite loops.

**Anti-loop guard:** Add a `sync_source` column to `content_bank`. Set it to `'supabase'` when updated from the API, `'sheets'` when updated from the sync workflow. Each direction only processes rows where `sync_source != {current direction}`.

### Anti-Patterns to Avoid

- **Threads video publishing:** Threads API does NOT support video in organic posts as of early 2026 — only text and images. Plan text + image posts for Threads, not video Reels.
- **YouTube Shorts via separate upload:** Do NOT create a separate Shorts file. Use the same H.264 MP4 at 9:16 aspect ratio, under 60 seconds, with `#Shorts` in description — YouTube auto-classifies it.
- **Whisper on CPU-only Cloud Run for production:** CPU is 3-30x slower. A 20-minute video takes 5-15 minutes to transcribe on CPU. Use GPU (NVIDIA L4) or consider pre-processing transcription separately.
- **Polling GCS for new videos:** Use Eventarc triggers — polling is fragile and has latency. Eventarc delivers events in seconds.
- **Slack blocking response:** Never do database work or API calls before the "Respond to Webhook" node — Slack's 3-second timeout will fire and show an error to the user.
- **Instagram personal account:** Reels API requires Business or Creator account linked to a Facebook Page. Personal accounts are not eligible.
- **Simultaneous Supabase ↔ Sheets sync without loop guard:** Without `sync_source` tracking, an update from one direction triggers an update in the other, causing an infinite loop.

---

## Don't Hand-Roll

| Problem                           | Don't Build                         | Use Instead                                 | Why                                                                                                                                                       |
| --------------------------------- | ----------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Audio normalization to LUFS       | Custom ffmpeg filter chain          | `ffmpeg-normalize` pip package              | EBU R128 two-pass normalization has dozens of edge cases; ffmpeg-normalize handles all of them with a preset                                              |
| Silence detection/removal         | Custom ffmpeg silencedetect wrapper | `auto-editor` (v29.3.1)                     | auto-editor handles margin padding, pacing preservation, and format compatibility — raw ffmpeg silenceremove has known issues with audio-video sync drift |
| Whisper word-level SRT generation | Custom timestamp alignment code     | `openai-whisper` with `--output_format srt` | Whisper's built-in SRT output includes word-level timestamps needed for caption burn-in                                                                   |
| Slack interactive message routing | Custom webhook server               | n8n Slack node + Webhook node               | n8n handles the interactivity callback routing; custom server adds operational complexity                                                                 |
| Substack publishing               | Direct HTTP to Substack private API | `n8n-nodes-substack` community node         | Community node wraps session cookie auth and handles API changes; don't maintain your own Substack HTTP client                                            |
| Google Sheets sync logic          | REST API calls to Sheets v4         | n8n Google Sheets node                      | n8n node handles OAuth, rate limiting, row matching by ID — not worth reimplementing                                                                      |
| Video clip extraction timestamps  | Manual timestamp parsing            | Gemini 3.1 Pro multimodal video analysis    | Gemini processes the full video in context and identifies engaging moments with precision; manual analysis is impractical for 20-30 min videos            |

**Key insight:** ffmpeg is the exception to "don't hand-roll" — it IS the right tool for video encoding, and the nine pipeline steps are legitimate ffmpeg operations. The "don't hand-roll" rule applies to the Python orchestration around ffmpeg (use auto-editor, ffmpeg-normalize as wrappers) not to ffmpeg itself.

---

## Common Pitfalls

### Pitfall 1: Cloud Run GPU Region Mismatch

**What goes wrong:** Cloud Run GPU (NVIDIA L4) is only available in 5 regions: `us-central1`, `europe-west1`, `europe-west4`, `asia-southeast1`, `asia-south1`. The project convention is `us-east4`, which does NOT support GPU.

**Why it happens:** GPU Cloud Run is newer than the standard service; regional rollout is incomplete.

**How to avoid:** Either (a) deploy the video processing Cloud Run service to `us-central1` as an exception (document the deviation), or (b) use CPU-only Whisper (accept slower transcription), or (c) pre-generate transcriptions separately. For a solo operator at low volume (1-2 videos/week), CPU-only transcription taking 5-10 minutes is acceptable.

**Warning signs:** gcloud deploy error "GPU is not available in region us-east4"

### Pitfall 2: Instagram Video URL Expiry

**What goes wrong:** Instagram's media container creation requires a publicly accessible video URL. If using GCS signed URLs, they may expire before Instagram finishes downloading the video (which can take 30-120 seconds after container creation).

**Why it happens:** GCS signed URLs have configurable expiry; if set too short, Instagram gets a 403 when downloading.

**How to avoid:** Use signed URLs with at least 1-hour expiry (3600 seconds) when creating the Instagram media container. Alternatively, make the GCS bucket publicly readable for processed outputs (with lifecycle rules to auto-delete after 48 hours).

### Pitfall 3: YouTube Quota Exhaustion During Testing

**What goes wrong:** `videos.insert` costs 1,600 units per upload. With a 10,000 unit daily quota, 6 failed test uploads consume the entire daily quota before a successful upload.

**Why it happens:** The quota is per-day and resets at midnight Pacific. Failed uploads still consume quota.

**How to avoid:** Create a separate GCP project for testing (separate quota pool). Use the `status.privacyStatus=private` field on test uploads — they still consume quota but don't pollute the channel. When ready to production, switch to the main project.

### Pitfall 4: Threads Organic Video Publishing Gap

**What goes wrong:** The roadmap specifies Threads as a distribution platform with video Reels. The Threads API currently does NOT support video publishing for organic content (text and images only as of early 2026).

**Why it happens:** Threads API is younger than other Meta products; video was added for Threads Ads in August 2025 but not yet for organic API posts.

**How to avoid:** For Threads, publish the text content + a still thumbnail image (not video). Monitor Threads API changelog at @threadsapi.changelog on Threads. Update the publisher when video support ships.

**Warning signs:** Meta Graph API returns `media_type` validation error when attempting `REELS` type on the Threads endpoint.

### Pitfall 5: Substack Session Cookie Expiry

**What goes wrong:** The `n8n-nodes-substack` node uses session cookie authentication (not OAuth). Cookies expire and the publisher silently fails.

**Why it happens:** Substack has no official API or OAuth flow; all integrations use the browser session cookie.

**How to avoid:** Store the session cookie in n8n credentials. When publishing fails, alert to Slack to manually re-authenticate. Set up an n8n error workflow that catches Substack publish failures and notifies. Rotate the cookie monthly as preventive maintenance.

### Pitfall 6: Whisper Model Size vs. Cloud Run Memory

**What goes wrong:** Whisper medium model is 769 MB. Cloud Run instances with insufficient memory will OOM-kill during model loading.

**Why it happens:** Cloud Run default memory is 512 MiB — insufficient for Whisper medium (needs ~2 GiB for model + processing buffers).

**How to avoid:** Set Cloud Run minimum memory to 4 GiB when running Whisper medium. Whisper large-v3 needs 8 GiB. Use `--min-instances 0` (scale to zero) but set startup probe with appropriate timeout for model loading.

### Pitfall 7: n8n Blocks Payload Size for Slack

**What goes wrong:** Slack Block Kit messages with embedded image blocks for thumbnail previews can exceed Slack's 50-block limit or n8n's HTTP response size limits.

**Why it happens:** A full content approval message with 4 thumbnail images + 6 platform draft previews can exceed 50 blocks if not structured carefully.

**How to avoid:** Use a summary Block Kit message in Slack (title, status, approve buttons) and link to a Google Sheet row for full draft review. Do NOT try to embed all platform drafts inline — Slack is the approval trigger, not the editing interface. The "Edit" button already links to Google Sheets.

---

## Code Examples

Verified patterns from official sources and existing content-engine codebase:

### Cloud Run Service Entry Point (Eventarc)

```python
# Source: Cloud Run Eventarc docs (HIGH confidence)
from flask import Flask, request, jsonify
from cloudevents.http import from_http
import json, os

app = Flask(__name__)

@app.route("/", methods=["POST"])
def handle_gcs_event():
    # Parse CloudEvent from Eventarc
    event = from_http(request.headers, request.get_data())

    bucket = event.data.get("bucket")
    object_name = event.data.get("name")

    # Only process raw/ prefix uploads
    if not object_name.startswith("raw/"):
        return "Skipped (not raw/ prefix)", 200

    # Kick off pipeline
    result = run_pipeline(bucket, object_name)
    return jsonify(result), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
```

### Supabase Content Bank Schema Extension

```sql
-- Extend existing content-engine schema for Phase 10
-- Source: content-engine/supabase/migrations/001_initial_schema.sql pattern

CREATE TABLE IF NOT EXISTS content_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL CHECK (brand IN ('sameer_automations', 'raj_photo_video')),
  topic_title TEXT NOT NULL,
  hook TEXT NOT NULL,
  talking_points JSONB NOT NULL DEFAULT '[]',  -- Array of 3-5 bullets
  platform_angles JSONB NOT NULL DEFAULT '{}', -- {youtube_long, youtube_short, twitter, instagram, substack, threads}
  visual_assets JSONB DEFAULT '{}',           -- {thumbnail_url, diagram_url, social_graphic_url}
  status TEXT NOT NULL DEFAULT 'idea' CHECK (status IN (
    'idea', 'draft', 'ready', 'recorded', 'processing',
    'pending_review', 'approved', 'published', 'archived', 'rejected'
  )),
  source_video_id UUID REFERENCES content_engine_videos(id) ON DELETE SET NULL,
  reddit_topic_ids TEXT[],                    -- Links to topic bank from Phase 5
  service_package_links TEXT[],               -- Links to relevant ops/packages/
  sync_source TEXT DEFAULT 'supabase',        -- Anti-loop guard for Sheets sync
  sheets_row_id TEXT,                         -- Google Sheets row reference
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brands table for multi-brand support
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  handle TEXT NOT NULL,
  platform_credentials JSONB DEFAULT '{}',   -- Encrypted credential refs
  voice_profile_id UUID REFERENCES content_engine_brand_voice(id),
  visual_style_guide TEXT,                   -- Path to brand-style.md
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ffmpeg-normalize Call (Python)

```python
# Source: ffmpeg-normalize README (HIGH confidence)
import subprocess

def normalize_audio(input_path: str, output_path: str) -> None:
    """Normalize audio to -14 LUFS (YouTube standard), -1 dBTP true peak."""
    subprocess.run([
        "ffmpeg-normalize", input_path,
        "-o", output_path,
        "-t", "-14",        # Target integrated loudness LUFS
        "-tp", "-1",        # True peak ceiling dBTP
        "-lrt", "7",        # Loudness range target
        "-c:a", "aac",      # Output codec
        "-b:a", "128k",     # Audio bitrate
        "--keep-loudness-range-target",
        "--progress"
    ], check=True)
```

### auto-editor Silence Removal (Python)

```python
# Source: auto-editor PyPI / GitHub (HIGH confidence - v29.3.1)
import subprocess

def remove_silence(input_path: str, output_path: str) -> None:
    """Remove silence using auto-editor with content-creator-friendly settings."""
    subprocess.run([
        "auto-editor", input_path,
        "--margin", "0.4sec",           # Padding around kept segments
        "--silent-threshold", "4%",     # Audio amplitude threshold
        "--video-codec", "h264",
        "--audio-codec", "aac",
        "-o", output_path,
        "--no-open"                     # Don't open file manager after
    ], check=True)
```

### Gemini 3.1 Pro Video Analysis for Clip Extraction

```python
# Source: Gemini API docs / Google AI for Developers (MEDIUM confidence - model very new)
import google.generativeai as genai

def analyze_video_for_clips(video_gcs_uri: str) -> list[dict]:
    """Identify 5-8 high-engagement moments for Shorts/Reels extraction."""
    model = genai.GenerativeModel("gemini-3.1-pro-preview")

    video_file = genai.upload_file(
        path=video_gcs_uri,
        mime_type="video/mp4"
    )

    response = model.generate_content([
        video_file,
        """Analyze this video and identify the 5-8 best moments for a 15-30 second
        Short or Reel. For each moment, provide:
        - start_time: MM:SS format
        - end_time: MM:SS format
        - hook: the first sentence that makes someone stop scrolling
        - type: one of [contrarian_claim, surprising_data, emotional_reaction, actionable_tip]
        - strength_score: 1-10 for how likely this clip is to get replays

        Focus on moments with: contrarian claims, surprising data, emotional reactions,
        actionable tips. NOT generic "I learned a lot" moments.

        Return as JSON array."""
    ])

    import json
    return json.loads(response.text)
```

### n8n Slack Block Kit Message Structure

```json
// Source: Slack Block Kit documentation (HIGH confidence)
// Keep under 50 blocks total
{
  "channel": "#content-pipeline",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "New Content Ready: {{topic_title}}"
      }
    },
    {
      "type": "image",
      "title": { "type": "plain_text", "text": "Thumbnail Options (A/B/C/D)" },
      "image_url": "{{thumbnail_grid_2x2_url}}",
      "alt_text": "4 thumbnail variations"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Brand:* {{brand}} | *Status:* Ready for review\n*Platforms:* YouTube, Twitter, Instagram, Substack, Threads"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": { "type": "plain_text", "text": "Approve All" },
          "style": "primary",
          "action_id": "approve_all",
          "value": "{{content_bank_id}}"
        },
        {
          "type": "button",
          "text": { "type": "plain_text", "text": "Approve Selected" },
          "action_id": "approve_selected",
          "value": "{{content_bank_id}}"
        },
        {
          "type": "button",
          "text": { "type": "plain_text", "text": "Edit in Sheets" },
          "url": "{{sheets_row_url}}"
        },
        {
          "type": "button",
          "text": { "type": "plain_text", "text": "Reject" },
          "style": "danger",
          "action_id": "reject",
          "value": "{{content_bank_id}}"
        }
      ]
    }
  ]
}
```

---

## State of the Art

| Old Approach                           | Current Approach                                 | When Changed | Impact                                                                        |
| -------------------------------------- | ------------------------------------------------ | ------------ | ----------------------------------------------------------------------------- |
| Cloud Run CPU-only for Whisper         | Cloud Run GPU (NVIDIA L4) now GA                 | 2024-2025    | Transcription 30x faster; available in us-central1 (not us-east4)             |
| Gemini 2.5 Pro for video analysis      | Gemini 3.1 Pro Preview                           | Feb 19, 2026 | Better multi-step reasoning; roadmap model name is correct                    |
| YouTube upload costs 1,600 quota units | YouTube Data API v3 calculator still shows 1,600 | Current      | ~6 uploads/day on default 10K quota; quota increase requires compliance audit |
| Threads API text-only                  | Threads added polls, location tags, GIF support  | July 2025    | Still NO organic video; roadmap must use text+image for Threads               |
| Whisper "not available on Cloud Run"   | Whisper on Cloud Run GPU (GA)                    | 2024-2025    | Earlier research saying "Cloud Run doesn't support GPU" is outdated           |
| n8n-nodes-substack (draft/beta)        | n8n-nodes-substack is community-stable           | 2025         | Session cookie auth; works for Notes; use with fallback for long-form         |

**Deprecated/outdated:**

- "Cloud Run doesn't support GPU": FALSE as of 2024. GPU is GA on Cloud Run (but not in us-east4).
- Twitter free tier "1,500 posts/month": Downgraded to 500 posts/month. Roadmap already states 500 — this is correct.
- "Gemini 3.1 Pro doesn't exist": FALSE — it was released February 19, 2026. Roadmap model name is correct.
- "Gemini 3 Pro Image has a free tier": UNCERTAIN. The youtube-thumbnail skill uses this model ("Nano Banana Pro") but its free tier status is unconfirmed as of March 2026.

---

## Open Questions

1. **Gemini Image Generation Free Tier for Thumbnails**
   - What we know: The youtube-thumbnail skill uses "Gemini 3 Pro Image Preview" (Nano Banana Pro). Research found that Gemini 2.5 Flash Image has 500 free images/day, but Gemini 3 Pro Image and 3.1 Flash Image Preview have "no free tier" per a March 2026 blog analysis.
   - What's unclear: Whether the existing claude-thumbnails skill (installed in project) actually has free tier access, or whether it will incur costs at 4 images per video.
   - Recommendation: Run one test generation using the existing `.claude/skills/youtube-thumbnail/` skill and check GCP billing dashboard. If it shows costs, plan for ~$0.12-0.48/video (4 images at ~$0.03-0.12/image). This stays under the $15/month cap at 1-4 videos/week.

2. **Whisper on Cloud Run: CPU vs GPU for This Use Case**
   - What we know: GPU Cloud Run (L4) is not available in us-east4. Using GPU requires deploying to us-central1 as an exception to the project region convention. CPU-only transcription of a 20-minute video takes 5-15 minutes on Cloud Run (4 vCPU).
   - What's unclear: Whether the 5-15 minute CPU transcription time is acceptable for a solo operator workflow or whether the GPU exception is worth the operational complexity.
   - Recommendation: Start with CPU-only in us-east4 (consistent region). If transcription time becomes a bottleneck, migrate the video-pipeline Cloud Run service to us-central1 for GPU access.

3. **Threads Video Publishing Timeline**
   - What we know: Threads API supports text + image organic posts. Video is NOT supported organically as of early 2026 (only Threads Ads support video as of August 2025).
   - What's unclear: When Meta will add video to the organic publishing API.
   - Recommendation: Implement Threads publisher for text + still thumbnail image only. Add a `TODO: video` comment in the publisher code. Monitor Threads API changelog (`@threadsapi.changelog` on Threads).

4. **n8n-nodes-substack Reliability for Long-Form vs. Notes**
   - What we know: The node supports Substack Notes publishing. Long-form newsletter posts (not Notes) reportedly use the `jakub-k-slys/substack-api` JavaScript library.
   - What's unclear: Whether the n8n community node can publish full newsletter posts (not just Notes), or whether a separate custom code node calling the JS library is needed.
   - Recommendation: For Phase 10, use the n8n community node for Substack Notes (short-form, conversational) and plan manual publish fallback for long-form newsletter posts. This matches the roadmap's "manual publish fallback for quality-critical pieces" note.

5. **Content Engine Repo Extension vs. New Service**
   - What we know: The content-engine repo has existing transcription.py, voice_learning.py, content_generator.py, and ai_usage table patterns that are directly reusable.
   - What's unclear: Whether to extend the existing FastAPI backend in content-engine (adding video processing routes) or build a separate Cloud Run service.
   - Recommendation: Build a SEPARATE Cloud Run service (`video-pipeline/`) in the content-engine repo. The existing backend runs on Railway (Python/FastAPI) and is not sized for heavy ffmpeg video processing. A dedicated Cloud Run service is the right architectural separation.

---

## Sources

### Primary (HIGH confidence)

- [Cloud Run Eventarc GCS Trigger](https://cloud.google.com/run/docs/triggering/storage-triggers) - GCS → Eventarc → Cloud Run setup
- [ffmpeg-normalize PyPI](https://pypi.org/project/ffmpeg-normalize/) - LUFS normalization, version 1.36.0+, streaming-video preset
- [auto-editor PyPI](https://pypi.org/project/auto-editor/) - v29.3.1, pip install auto-editor, silence removal
- [Cloud Run GPU GA announcement](https://cloud.google.com/blog/products/serverless/cloud-run-gpus-are-now-generally-available) - NVIDIA L4 GPU on Cloud Run; us-central1 only relevant here
- [YouTube Data API v3 Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost) - 1,600 units per video upload, 10K daily default
- [Slack Block Kit documentation](https://api.slack.com/block-kit) - 50 block limit, image blocks, interactive buttons
- [n8n Supabase node docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/) - Supabase trigger and CRUD operations
- [n8n Google Sheets node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/) - bidirectional sync pattern
- [n8n-nodes-substack GitHub](https://github.com/jakub-k-slys/n8n-nodes-substack) - community node, session cookie auth, Notes publishing
- [Gemini 3.1 Pro release - Google Blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/) - Released Feb 19, 2026; video analysis supported

### Secondary (MEDIUM confidence)

- [Meta Graph API Instagram Reels guide - Phyllo](https://www.getphyllo.com/post/a-complete-guide-to-the-instagram-reels-api) - Two-step container/publish flow; 50 posts/24hrs limit
- [Threads API enhancements July 2025 - PPC Land](https://ppc.land/meta-expands-threads-api-with-advanced-features-for-developers/) - Text+image supported; video not supported organically
- [Whisper on Cloud Run with Ray Serve - Google Cloud Community](https://medium.com/google-cloud/whisper-goes-wall-street-serving-speech-to-text-with-ray-serve-and-cloud-run-part-ii-646a1f45a35e) - Whisper deployment patterns on Cloud Run
- [n8n Slack interactive approval workflow template](https://n8n.io/workflows/5049-interactive-slack-approval-and-data-submission-system-with-webhooks/) - Webhook async pattern with Respond to Webhook node
- [Gemini 3 Pro Image free tier analysis - LaoZhang AI Blog](https://blog.laozhang.ai/en/posts/gemini-3-pro-image-free-tier) - Gemini 3 Pro Image has no confirmed free tier (March 2026)
- [X API Rate Limits - official docs](https://docs.x.com/x-api/fundamentals/rate-limits) - POST /2/tweets rate limits (per-endpoint, not tier-differentiated in docs)
- [Substack n8n automation guide](https://iam.slys.dev/p/substack-automation-with-n8n-how) - Session cookie auth pattern, Notes publishing workflow

### Tertiary (LOW confidence)

- [X free tier 500 posts/month - various sources](https://elfsight.com/blog/how-to-get-x-twitter-api-key-in-2026/) - 500 posts/month confirmed by multiple sources but official docs page doesn't state it explicitly per tier
- [Slack 3-second timeout async pattern - n8n community](https://www.weblineglobal.com/blog/slack-modal-timeout-n8n-async-webhook-fix/) - Community-documented pattern; well-understood but not in official Slack docs as a named pattern

---

## Metadata

**Confidence breakdown:**

- Part A (Supabase + Sheets + n8n): HIGH — both n8n nodes are native and well-documented; sync pattern is proven
- Part B (Cloud Run + ffmpeg pipeline): HIGH — all tools are mature; main risk is region/GPU constraint
- Part C (Gemini video analysis): MEDIUM — Gemini 3.1 Pro is very new (released Feb 2026); API behavior confirmed via official sources but no production battle-testing data
- Part C (Thumbnail generation): MEDIUM — skill is installed and works; free tier status uncertain
- Part D (Slack approval): HIGH — Block Kit and n8n webhook pattern are well-documented; 3-second timeout pitfall is known and has a clear solution
- Part E (Platform publishers): HIGH for YouTube + Instagram + Twitter; LOW for Threads video (feature gap confirmed)
- Part F (Multi-brand): HIGH — straightforward Supabase schema extension; credential routing is a config pattern
- Part G (Analytics): HIGH — all platform APIs provide engagement endpoints; n8n nightly polling is a standard pattern

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 for stable parts; 2026-03-16 for Gemini 3.1 Pro specifics (model is very new)

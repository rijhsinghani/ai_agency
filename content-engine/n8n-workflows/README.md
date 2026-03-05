# Phase 10 n8n Workflows

Complete set of n8n workflows for the automated content preparation and distribution pipeline.

## Workflow Inventory

| File                                 | Description                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content-bank-sync.json`             | Bidirectional sync between Supabase content_bank table and Google Sheets (Direction A: Supabase → Sheets on INSERT/UPDATE; Direction B: Sheets → Supabase when sync_source='sheets')             |
| `slack-approval.json`                | Human-in-the-loop Slack approval gate — presents AI-generated post drafts to founder for approve/reject before publishing                                                                        |
| `platform-publishers/youtube.json`   | Publishes approved content to YouTube via YouTube Data API v3 (upload video, set title/description/tags)                                                                                         |
| `platform-publishers/twitter.json`   | Publishes approved content to Twitter/X via POST /2/tweets (free tier — write only)                                                                                                              |
| `platform-publishers/instagram.json` | Publishes approved content to Instagram via Meta Graph API (Reels and image posts)                                                                                                               |
| `platform-publishers/substack.json`  | Publishes approved content to Substack Notes via Substack API                                                                                                                                    |
| `platform-publishers/threads.json`   | Publishes approved content to Threads via Meta Threads API                                                                                                                                       |
| `analytics-nightly.json`             | Nightly cron at 2:00 AM — collects engagement metrics from all platform APIs, upserts into platform_analytics Supabase table, updates Google Sheets Analytics tab, checks monthly AI cost budget |

---

## Activation Order

Workflows must be activated in this order:

1. **`content-bank-sync.json`** — Must be first. Establishes the Supabase ↔ Sheets sync. All subsequent workflows depend on content_bank having data.

2. **`slack-approval.json`** — Activate before any publishers. This workflow is the gate; without it, no content reaches publishing.

3. **`platform-publishers/youtube.json`** — Activate when YouTube channel + OAuth credentials are ready.

4. **`platform-publishers/twitter.json`** — Activate when Twitter app credentials are configured.

5. **`platform-publishers/instagram.json`** — Activate when Instagram Business account + Meta App credentials are ready.

6. **`platform-publishers/threads.json`** — Activate after Instagram is working (shares Meta credentials).

7. **`platform-publishers/substack.json`** — Activate when Substack API credentials are configured.

8. **`analytics-nightly.json`** — Activate LAST, only after first content has been published across platforms. Requires `003_analytics.sql` migration to be applied in Supabase.

---

## Credential Checklist

All credential names are exact — n8n matches by name string.

| Credential Name              | Type                 | Used By                                                                       |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| `Supabase Content Engine`    | Supabase API         | All workflows                                                                 |
| `Google Sheets Content Bank` | Google Sheets OAuth2 | content-bank-sync, analytics-nightly                                          |
| `Slack Content Pipeline`     | Slack API            | slack-approval, analytics-nightly                                             |
| `YouTube Data API`           | YouTube OAuth2       | platform-publishers/youtube, analytics-nightly                                |
| `Twitter API v2`             | Twitter OAuth2       | platform-publishers/twitter                                                   |
| `Meta Graph API`             | HTTP (manual token)  | platform-publishers/instagram, platform-publishers/threads, analytics-nightly |
| `Substack API`               | HTTP (API key)       | platform-publishers/substack                                                  |

### Setting Up Meta Graph API Credential

Meta uses a long-lived page access token (valid 60 days), not standard OAuth2 flow in n8n.

1. Create a Meta App at developers.facebook.com
2. Add Instagram Basic Display and Threads API products
3. Generate a long-lived user access token
4. In n8n: create an HTTP Header Auth credential named `Meta Graph API`
   - Header Name: `Authorization`
   - Header Value: `Bearer YOUR_LONG_LIVED_TOKEN`
5. Rotate every 55 days (set a calendar reminder)

---

## Monthly Cost Estimate

At 2 videos/week cadence (~8 videos/month):

| Component                     | Cost              | Notes                                                                         |
| ----------------------------- | ----------------- | ----------------------------------------------------------------------------- |
| Cloud Run compute             | ~$0.40-0.80/month | ~$0.05-0.10/video × 8 videos                                                  |
| Claude API                    | ~$2-5/month       | content generation + brand voice enforcement                                  |
| Gemini Pro (video analysis)   | ~$0               | Free tier covers ~8 videos/month at current usage                             |
| Gemini (thumbnail generation) | ~$0.48/video TBD  | ~$0.12-0.48 per image × 4 thumbnails — validate against actual Gemini pricing |
| Twitter API (write only)      | $0                | Free tier for POST /2/tweets                                                  |
| Instagram Graph API           | $0                | Free                                                                          |
| YouTube Data API              | $0                | Free quota: 10,000 units/day                                                  |
| Threads API                   | $0                | Free                                                                          |
| Substack API                  | $0                | Free                                                                          |
| n8n (self-hosted VM)          | $0                | Already running for other workflows                                           |
| Supabase                      | $0                | Free tier (500MB DB, sufficient for this pipeline)                            |
| Google Sheets                 | $0                | Free                                                                          |
| **TOTAL (8 videos/month)**    | **~$5-12/month**  | Under $15 target                                                              |

The `monthly_cost_summary` Supabase view tracks actual spend. `analytics-nightly.json` sends a Slack alert to `#content-pipeline` if monthly AI spend exceeds $15.

---

## Known Limitations

### Twitter/X Analytics (Read Access Not Free)

Twitter/X free API tier does **not** include read access for tweet engagement metrics. `POST /2/tweets` works for publishing, but `GET` endpoints for views, likes, and impressions require the **Basic tier ($100/month)**. This contradicts the zero-subscriptions constraint.

**Current workaround:** Placeholder rows are logged in `platform_analytics` with `raw_response = {"error": "free_tier_no_read_access"}`. Review engagement manually at [analytics.twitter.com](https://analytics.twitter.com).

**Upgrade path:** When monthly revenue from the automation consulting business justifies it, upgrade to Basic tier and activate the Twitter analytics branch in `analytics-nightly.json`.

### Threads Video Not Supported

The Threads API only supports text posts and single images. Video content on Threads must be posted manually via the Threads mobile app or web UI. The `platform-publishers/threads.json` workflow handles text + image posts only.

### Substack Notes — No Analytics API

Substack has no public API for Note engagement metrics (views, likes, restacks). Notes are excluded from nightly analytics collection. Review manually at your Substack dashboard.

### Cloud Run GPU Not in us-east4

Whisper transcription runs on CPU in the `us-east4` Cloud Run service (GPU not available in this region). Transcription of a 20-minute video takes 5-15 minutes. This is acceptable for the current volume (1-2 videos/week). If volume increases significantly, consider `us-central1` (has GPU) or offloading transcription to a dedicated service.

### Intro/Outro and Background Music Are Pass-Throughs

The video pipeline includes `intro_outro` and `color_correct` stages that are currently no-ops (files pass through unchanged via `shutil.copy`). Brand intro video, outro video, and background music assets have not yet been created. The pipeline runs end-to-end without them. Create and drop into the expected paths when ready:

- `assets/intro.mp4` — Brand intro (5-10 seconds)
- `assets/outro.mp4` — Brand outro with CTA (15 seconds)
- `assets/background-music.mp3` — Royalty-free background track for B-roll sections

### Meta Long-Lived Token Rotation

Instagram and Threads use a Meta long-lived access token (60-day validity). Set a calendar reminder to rotate every 55 days. Token rotation does not require code changes — update the `Meta Graph API` n8n credential value only.

---
phase: 10-automated-content-preparation-distribution-pipeline
plan: 05
subsystem: api
tags: [n8n, youtube, twitter, platform-publisher, content-bank, oauth, supabase]

# Dependency graph
requires:
  - phase: 10-04
    provides: Slack approval workflow that sets content_bank.status=approved, triggering these publishers
  - phase: 10-01
    provides: content_bank schema with platform_angles JSONB (youtube_long, youtube_short, twitter arrays) and visual_assets (processed_video, clips)

provides:
  - n8n workflow: youtube-publisher (long-form + Shorts upload on content_bank status=approved)
  - n8n workflow: twitter-publisher (Twitter/X thread posting with in_reply_to_tweet_id chaining)

affects:
  - 10-06 (instagram-publisher — same approved trigger pattern)
  - 10-07 (analytics feedback loop — reads twitter_thread_url from visual_assets)

# Tech tracking
tech-stack:
  added:
    - YouTube Data API v3 (videos.insert, resumable upload, 1,600 units/upload)
    - Twitter API v2 (POST /2/tweets, OAuth 1.0a, in_reply_to_tweet_id thread chaining)
    - Google OAuth2 (YouTube upload scope: youtube.googleapis.com/auth/youtube.upload)
  patterns:
    - status=approved trigger gate (not pending_review) — prevents accidental early publishing
    - privacyStatus=private on upload — founder reviews before making public
    - in_reply_to_tweet_id chaining — proper Twitter thread structure
    - Quota cost logging on every YouTube upload execution
    - Credential placeholder pattern: YOUTUBE_OAUTH_CRED_ID_PLACEHOLDER, TWITTER_OAUTH_CRED_ID_PLACEHOLDER

key-files:
  created:
    - content-engine/n8n-workflows/platform-publishers/youtube.json
    - content-engine/n8n-workflows/platform-publishers/twitter.json
  modified: []

key-decisions:
  - "YouTube uploads both long-form and Shorts as privacyStatus=private — founder reviews in YouTube Studio before publishing"
  - "Shorts use same videos.insert endpoint as long-form — YouTube auto-classifies based on 9:16 ratio + under 60s + #Shorts in description"
  - "Twitter thread chains all replies to first tweet (flat structure) — simpler than tracking previous-tweet-id through loop iterations"
  - "1-second delay between tweets — Free tier rate limit protection without Twitter's explicit per-request limit"
  - "Quota logging: ~1,600 units per upload, ~3,200 per full run (long-form + Short), safe daily runs: 3"

patterns-established:
  - "status=approved filter as first gate: both publisher workflows check status=approved (not pending_review) to prevent early publishing"
  - "privacyStatus=private: all AI-generated content uploads as private for human review before public release"
  - "Rate limit logging: every execution logs usage against monthly/daily caps for operator awareness"
  - "Credential placeholder naming: {PLATFORM}_OAUTH_CRED_ID_PLACEHOLDER for easy find/replace on import"

requirements-completed: [SC-6, SC-7]

# Metrics
duration: 3min
completed: 2026-03-05
---

# Phase 10 Plan 05: YouTube + Twitter/X Publisher Workflows Summary

**YouTube (long-form + Shorts) and Twitter/X thread publisher n8n workflows that trigger on content_bank status=approved, upload via YouTube Data API v3 and Twitter API v2, and write results back to Supabase**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-05T01:17:47Z
- **Completed:** 2026-03-05T01:20:47Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- YouTube publisher workflow with 11 nodes: Supabase trigger → approved filter → has-video filter → metadata prep → GCS URL → YouTube resumable upload → Supabase store → has-clips filter → select best clip → Shorts upload → Supabase store
- Twitter/X publisher workflow with 12 nodes: Supabase trigger → approved filter → has-twitter filter → tweet validation (280-char truncation) → first tweet → store tweet ID → has-remaining filter → SplitInBatches loop → 1-second delay → reply tweet → Supabase store thread URL
- Both workflows set active=false with full setup guides in the notes field (GCP OAuth setup, Twitter developer app, credential naming, quota/rate limits)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build YouTube publisher n8n workflow (long-form + Shorts)** - `71babcb` (feat)
2. **Task 2: Build Twitter/X thread publisher n8n workflow** - `1cdb920` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `content-engine/n8n-workflows/platform-publishers/youtube.json` - n8n workflow: YouTube long-form + Shorts upload on approved status, quota-aware, uploads private for review
- `content-engine/n8n-workflows/platform-publishers/twitter.json` - n8n workflow: Twitter/X thread posting with in_reply_to_tweet_id chaining, 500/month rate limit logged

## Decisions Made

- YouTube uploads as private: AI-generated drafts need human review before public release; founder publishes manually in YouTube Studio
- Shorts use same videos.insert endpoint: YouTube auto-classifies based on 9:16 ratio + under 60s duration + #Shorts in description — no separate Shorts API needed
- Twitter thread flat structure: all replies chain to first tweet rather than tracking previous-tweet-id per loop iteration; simpler and avoids state tracking complexity in n8n
- 1-second delay between tweets: Twitter Free tier doesn't publish explicit per-request burst limits; 1s delay provides safety margin against HTTP 429

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

**External services require manual configuration before activating workflows:**

**YouTube (youtube.json):**

1. GCP Console → APIs & Services → Enable YouTube Data API v3
2. GCP Console → Credentials → Create OAuth2 Client ID (Web application)
3. Add n8n OAuth callback URL to Authorized redirect URIs
4. n8n Credentials → New → Google OAuth2 API → scope: youtube.googleapis.com/auth/youtube.upload
5. Name credential exactly: "YouTube Content Publisher"

**Twitter (twitter.json):**

1. developer.twitter.com → Projects & Apps → Add App → Free tier
2. App settings → User authentication → App permissions → Read and write
3. Keys and Tokens → Generate Access Token and Secret
4. n8n Credentials → New → Twitter OAuth1 API
5. Name credential exactly: "Twitter Content Publisher"

**Supabase (both workflows):**

- Credential already configured from 10-04 (slack-approval): "Supabase Content Engine"

## Next Phase Readiness

- YouTube and Twitter publishers are ready to activate once credentials are configured
- Both workflows trigger independently on content_bank status=approved
- Phase 10-06 (Instagram Reels publisher) should follow the same approved-trigger pattern established here

---

_Phase: 10-automated-content-preparation-distribution-pipeline_
_Completed: 2026-03-05_

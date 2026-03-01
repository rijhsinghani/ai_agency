# Phase 5: Market Research + Pain Point Discovery - Research

**Researched:** 2026-03-01
**Domain:** Reddit API data collection, NLP clustering, YouTube competitor analysis, Python CLI tooling
**Confidence:** MEDIUM — Core Reddit API mechanics verified via official docs and community sources; YouTube Data API verified via Google official docs; approval process changes flagged as HIGH RISK requiring early validation

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Reddit Research Scope:**

- Scrape three categories of subreddits: trade-focused (r/HVAC, r/plumbing, r/electricians, r/RealEstate, r/smallbusiness, r/entrepreneur), broader service businesses (r/lawncare, r/AutoDetailing, r/HomeImprovement, r/photography, r/personaltraining), and SaaS complaint subs (r/SaaS, r/nocode, r/zapier)
- Search terms seeded from existing ops/packages (missed-call-text-back, lead-follow-up, appointment-reminders, quote-follow-up, review-reputation, custom-build-intake) AND pain-point language patterns ("manually doing", "wasting time on", "wish there was a way to", "anyone automate", "tried X but")
- 12-month time range to capture seasonal patterns (tax season, holiday rush, etc.)
- Use Reddit's official API (free script app, 100 requests/min) — not scraping
- Build as reusable CLI script, not one-time analysis
- Include comment threads, not just top-level posts — real pain surfaces in replies
- Filter for posts with 5+ upvotes to focus on validated problems

**Topic Ranking Criteria:**

- Rank by frequency of pain point across subreddits, filtered to custom-automation-only topics
- A topic qualifies as "custom automation" when: posts mention trying off-the-shelf tools and hitting limits ("tried Zapier but...") OR the workflow involves 3+ systems, conditional logic, or industry-specific rules
- Final list: 10-15 ranked topics
- Each topic includes 2-3 actual Reddit quotes as evidence — usable directly in video scripts and content
- Each topic entry includes: pain point title, frequency score, evidence quotes, mapping to existing packages (if any), and a content angle suggestion
- Flag topics that map to existing ops/packages as "ready to sell" vs topics needing new service development

**Competitor Audit Method:**

- Audit YouTube only — richest automation content with visible engagement data. Twitter skipped (limited free access, surface-level content)
- Cover three competitor types: direct small biz automation agencies, automation educators/influencers, and no-code/low-code builders
- 5-8 competitors total — mix of direct and educators
- Output includes both gap analysis (what's NOT covered) and engagement data (what performs)
- Categorize competitor content by topic (lead gen, scheduling, invoicing, etc.) to spot saturated vs underserved topics
- Note production quality levels for benchmarking
- Flag competitors targeting the same industries (HVAC, plumbing, photo/video)

**Output Format and Deliverables:**

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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                                                                                     | Research Support                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| RSCH-01 | Reddit API and social listening research identifies real small business pain points that require custom automation solutions (not off-the-shelf software)       | PRAW 7.8.1 via official API, multi-subreddit search with pain-point query patterns, comment thread access                                |
| RSCH-02 | Research output produces a ranked list of 10-15 content topics grounded in actual business owner complaints, with proof each problem requires custom automation | Keyword frequency scoring, off-the-shelf-tool failure filtering (Zapier/HubSpot complaints), JSON → Markdown rendering pipeline          |
| RSCH-03 | Competitor content audit identifies what automation consultants are posting, what's getting engagement, and where gaps exist for buyer-focused content          | YouTube Data API v3 channels.list + videos.list for structured data; manual channel discovery + YouTube Studio for engagement benchmarks |

</phase_requirements>

---

## Summary

This phase produces two distinct research artifacts: a ranked topic bank (10-15 automation pain points grounded in real Reddit evidence) and a YouTube competitor audit (5-8 channels, engagement gaps, content strategy signals). Both are produced by reusable CLI scripts that can be re-run as the project grows.

The primary technical challenge is Reddit API access: Reddit has significantly tightened its developer program as of late 2024. Creating a new script app via `reddit.com/prefs/apps` now requires manual approval from Reddit's team, which can take days to weeks. This is the critical path blocker for RSCH-01 — the approval request must be submitted before any coding starts. The tool itself uses Python + PRAW (v7.8.1), the stable, officially supported approach. Node.js wrappers (snoowrap) are abandoned (last updated ~5 years ago) and should not be used despite the project's existing Commander.js preference; PRAW is unambiguously the right tool here.

The YouTube competitor audit does not share this bottleneck — YouTube Data API v3 uses a simple API key with 10,000 units/day free quota and no approval wait. The audit script uses `googleapis` npm package (aligns with existing Node.js preference in project) or the official Google Python client. Given that the project has zero existing tooling in either language, Python is recommended for the Reddit scraper (PRAW is the only maintained library) and Python or Node.js for the YouTube audit (either works). Using Python for both keeps the environment consistent.

**Primary recommendation:** Submit Reddit API approval request immediately (Day 1), then build the YouTube competitor audit script first (no wait time) while awaiting Reddit API credentials.

---

## Standard Stack

### Core

| Library                  | Version | Purpose                                  | Why Standard                                                                             |
| ------------------------ | ------- | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| praw                     | 7.8.1   | Reddit API wrapper for Python            | Official, maintained, handles rate limiting automatically, only viable maintained option |
| python-dotenv            | 1.0.x   | Load `.env` credentials into environment | Standard 12-factor pattern; keeps API keys out of code                                   |
| google-api-python-client | 2.x     | YouTube Data API v3 official client      | Official Google library; well-documented; handles quota errors                           |

### Supporting

| Library             | Version | Purpose                              | When to Use                                                                 |
| ------------------- | ------- | ------------------------------------ | --------------------------------------------------------------------------- |
| argparse            | stdlib  | CLI argument parsing                 | Built into Python — no dependency; handles subcommands, help text, defaults |
| json                | stdlib  | Raw data serialization               | Output format for data/ directory                                           |
| collections.Counter | stdlib  | Frequency counting for topic ranking | Counting pain-point keyword hits across posts                               |

### Alternatives Considered

| Instead of               | Could Use                                | Tradeoff                                                                                                      |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| praw (Python)            | snoowrap (Node.js)                       | snoowrap last published ~5 years ago; effectively abandoned; PRAW is the only maintained Reddit library       |
| praw (Python)            | Direct HTTP requests to oauth.reddit.com | More control but rebuilds what PRAW provides (rate limiting, pagination, token refresh); not worth the effort |
| argparse (stdlib)        | click or typer                           | click/typer are better for complex CLIs; for 2 scripts with simple flags, argparse stdlib avoids dependencies |
| google-api-python-client | Direct YouTube API HTTP calls            | Official client handles retries, quota tracking, auth; no reason to hand-roll                                 |
| google-api-python-client | @googleapis/youtube (npm)                | Either works; Python keeps tooling environment consistent with reddit-scraper                                 |

**Installation:**

```bash
# Create virtual environment (recommended)
python3 -m venv research/.venv
source research/.venv/bin/activate

# Install dependencies
pip install praw python-dotenv google-api-python-client

# Freeze for reproducibility
pip freeze > research/requirements.txt
```

---

## Architecture Patterns

### Recommended Project Structure

```
research/
├── scripts/
│   ├── reddit-scraper.py      # RSCH-01, RSCH-02: pain point discovery
│   └── competitor-audit.py   # RSCH-03: YouTube competitor analysis
├── data/                     # gitignored — raw JSON dumps
│   ├── reddit-raw.json       # all fetched posts + comments
│   └── youtube-raw.json      # channel + video metadata
├── output/                   # committed — human-readable results
│   ├── topic-bank.md         # ranked 10-15 topics (RSCH-02)
│   └── competitor-audit.md   # gap analysis + engagement data (RSCH-03)
├── .env                      # gitignored — API credentials
├── .env.example              # committed — credential template
├── requirements.txt          # committed — pinned dependencies
└── README.md                 # setup + re-run instructions
```

### Pattern 1: PRAW Script App Authentication

**What:** Read-only Reddit access using a "script" type OAuth app — no user login flow required, just client credentials.

**When to use:** Accessing public subreddit data without acting as a user (no posting, no voting).

**Example:**

```python
# Source: https://praw.readthedocs.io/en/stable/
import praw
from dotenv import load_dotenv
import os

load_dotenv()  # reads .env file

reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent="automation-research-tool/1.0 by u/YOUR_USERNAME",
)

# PRAW auto-handles rate limits — no sleep() calls needed
```

### Pattern 2: Multi-Subreddit Search with Pain-Point Queries

**What:** Search across multiple subreddits using pain-point language patterns, collect posts with 5+ upvotes, fetch top comments.

**When to use:** RSCH-01 — building the raw evidence base.

**Critical limitation:** Reddit's API returns at most 1,000 posts per listing call. For a 12-month window with `time_filter='year'`, this is the practical ceiling. Workaround: use multiple targeted queries per subreddit (one per pain-point search term) rather than one broad query to maximize coverage.

**Example:**

```python
# Source: https://praw.readthedocs.io/en/stable/code_overview/models/subreddit.html
SUBREDDITS = [
    "smallbusiness", "entrepreneur", "HVAC", "plumbing", "electricians",
    "RealEstate", "lawncare", "AutoDetailing", "HomeImprovement",
    "photography", "personaltraining", "SaaS", "nocode", "zapier"
]

SEARCH_TERMS = [
    "manually doing",
    "wasting time on",
    "wish there was a way to",
    "anyone automate",
    "tried zapier but",
    "tried hubspot but",
    "missed call",
    "lead follow up",
    "appointment reminder",
    "quote follow up",
    "review request",
    "intake form",
]

def scrape_subreddit(reddit, subreddit_name, query, min_upvotes=5):
    results = []
    sub = reddit.subreddit(subreddit_name)
    for submission in sub.search(query, sort="top", time_filter="year", limit=100):
        if submission.score < min_upvotes:
            continue
        # Fetch top 5 comments
        submission.comments.replace_more(limit=0)
        top_comments = [
            {"body": c.body, "score": c.score}
            for c in submission.comments[:5]
        ]
        results.append({
            "title": submission.title,
            "selftext": submission.selftext,
            "score": submission.score,
            "url": submission.url,
            "created_utc": submission.created_utc,
            "subreddit": subreddit_name,
            "query": query,
            "top_comments": top_comments,
        })
    return results
```

### Pattern 3: Topic Frequency Scoring

**What:** Count how many unique posts mention each pain-point theme across subreddits, weighted by upvotes.

**When to use:** RSCH-02 — ranking 10-15 topics.

**Example:**

```python
from collections import Counter

def score_topics(all_posts):
    """
    Simple keyword frequency score.
    Weighted: post_score * 1 + num_comments * 0.5
    Filter to custom-automation-only: must mention off-the-shelf tool failure
    OR multi-system complexity.
    """
    OFF_SHELF_SIGNALS = ["tried zapier", "tried hubspot", "tried monday", "tried make.com",
                          "zapier doesn't", "too expensive for", "hitting limits"]
    CUSTOM_SIGNALS = ["3 different systems", "doesn't integrate", "api", "webhook",
                      "industry-specific", "conditional", "if-then"]

    topics = Counter()
    evidence = {}

    for post in all_posts:
        text = (post["title"] + " " + post["selftext"]).lower()
        # Only count if it signals custom automation need
        is_custom = any(s in text for s in OFF_SHELF_SIGNALS + CUSTOM_SIGNALS)
        if not is_custom:
            continue
        for term in SEARCH_TERMS:
            if term.lower() in text:
                weight = post["score"] + (post.get("num_comments", 0) * 0.5)
                topics[term] += weight
                if term not in evidence:
                    evidence[term] = []
                if len(evidence[term]) < 3:
                    evidence[term].append(post["title"])

    return topics.most_common(15), evidence
```

### Pattern 4: YouTube Competitor Data Collection

**What:** Use YouTube Data API v3 to enumerate competitor channel videos and engagement data. API key authentication only (no OAuth needed for public data).

**When to use:** RSCH-03 — competitor audit.

**Quota math:** With 10,000 units/day free: `search.list` costs 100 units/call, `videos.list` costs 1 unit/call. Plan for 8 competitors × 1 channel search (100 units each) = 800 units to find channels. Then `channels.list` for each (1 unit each) = 8 units. Then `search.list` per channel for videos (100 units each) = 800 units. Total: ~1,700 units for a full audit of 8 competitors — well within the free 10,000 daily limit.

**Example:**

```python
# Source: https://developers.google.com/youtube/v3/quickstart/nodejs
# (Python equivalent using google-api-python-client)
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os

load_dotenv()
youtube = build("youtube", "v3", developerKey=os.getenv("YOUTUBE_API_KEY"))

def get_channel_videos(channel_id, max_results=50):
    """Fetch recent videos from a competitor channel."""
    response = youtube.search().list(
        part="snippet",
        channelId=channel_id,
        maxResults=max_results,
        order="viewCount",  # highest-performing first
        type="video"
    ).execute()

    videos = []
    for item in response.get("items", []):
        video_id = item["id"]["videoId"]
        # Get detailed stats
        stats = youtube.videos().list(
            part="statistics,snippet",
            id=video_id
        ).execute()
        if stats["items"]:
            s = stats["items"][0]
            videos.append({
                "title": s["snippet"]["title"],
                "published_at": s["snippet"]["publishedAt"],
                "view_count": int(s["statistics"].get("viewCount", 0)),
                "like_count": int(s["statistics"].get("likeCount", 0)),
                "comment_count": int(s["statistics"].get("commentCount", 0)),
                "video_url": f"https://youtube.com/watch?v={video_id}",
            })
    return videos
```

### Pattern 5: Markdown Report Generation

**What:** Transform JSON data into human-readable `topic-bank.md` and `competitor-audit.md`.

**When to use:** Final step of each script — producing the committed output files.

**Example:**

```python
def write_topic_bank(ranked_topics, evidence, package_mapping, output_path):
    lines = ["# Topic Bank: Automation Pain Points\n"]
    lines.append("*Generated by research/scripts/reddit-scraper.py*\n\n")
    lines.append("| Rank | Topic | Frequency Score | Package Match | Status |\n")
    lines.append("|------|-------|-----------------|---------------|--------|\n")

    for rank, (topic, score) in enumerate(ranked_topics, 1):
        pkg = package_mapping.get(topic, "—")
        status = "Ready to sell" if pkg != "—" else "New development needed"
        lines.append(f"| {rank} | {topic} | {score:.0f} | {pkg} | {status} |\n")

    lines.append("\n## Evidence Quotes\n")
    for topic, quotes in evidence.items():
        lines.append(f"\n### {topic}\n")
        for q in quotes:
            lines.append(f'> "{q}"\n')

    with open(output_path, "w") as f:
        f.writelines(lines)
```

### Anti-Patterns to Avoid

- **One-time notebook approach:** Do NOT use a Jupyter notebook or one-shot script with hardcoded values. Build the CLI so it can be re-run with different search terms or subreddits as the project grows.
- **Fetching all comments (replace_more):** Calling `submission.comments.replace_more(limit=None)` fetches ALL comment chains with extra API calls. Use `replace_more(limit=0)` to skip "load more" expansion — the top 5 visible comments are sufficient for evidence quotes.
- **Sleep-based rate limiting:** PRAW handles rate limiting internally. Do NOT add manual `time.sleep()` calls — they make the script slower without providing additional safety.
- **Storing API credentials in the script:** Keep all credentials in `.env`. Include `.env` in `.gitignore` from Day 1.
- **Blocking on approval:** Do not wait for Reddit API approval before starting work. Build the YouTube competitor audit tool first (no approval needed), and scaffold the Reddit tool against Reddit's sandbox/test subreddits while waiting.
- **Single broad query per subreddit:** Reddit caps at 1,000 results per listing. Run one search per pain-point term to maximize coverage across the 12-month window.

---

## Don't Hand-Roll

| Problem                    | Don't Build                        | Use Instead                | Why                                                                             |
| -------------------------- | ---------------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| Reddit OAuth token refresh | Custom token management            | PRAW                       | PRAW auto-refreshes tokens; rolling it means handling 401s, expiry, retry logic |
| Rate limit backoff         | Custom sleep/retry logic           | PRAW                       | PRAW's built-in rate limiter queues requests; you just call the API             |
| Reddit pagination          | Manual `after` parameter loops     | PRAW ListingGenerator      | PRAW's generator handles cursor-based pagination transparently                  |
| YouTube API HTTP requests  | Raw `requests` calls               | `google-api-python-client` | Official client handles API key injection, quota tracking, retries              |
| `.env` file parsing        | `os.environ.get()` fallback chains | `python-dotenv`            | Handles multi-line values, type coercion edge cases, file-not-found gracefully  |

**Key insight:** Both the Reddit and YouTube APIs have well-maintained official or de-facto-standard Python clients. Any custom HTTP plumbing is just reimplementing what these libraries already provide — with all the edge cases you'd miss the first time.

---

## Common Pitfalls

### Pitfall 1: Reddit API Approval Delay (CRITICAL PATH)

**What goes wrong:** The developer registers at `reddit.com/prefs/apps`, creates a "script" app, and expects immediate API access — only to find their client_id/secret doesn't work because approval is now required.

**Why it happens:** As of late 2024, Reddit removed self-service API access. New apps require manual approval. The old documentation and many tutorials don't reflect this change.

**How to avoid:** Submit the API access request (via `reddit.com/prefs/apps` or Reddit's developer program page) on Day 1 of this phase. While waiting for approval:

1. Build the YouTube competitor audit script (no approval needed)
2. Scaffold the Reddit scraper logic against `reddit.com/r/test.json` (public read-only JSON endpoint doesn't require OAuth for basic testing)
3. Write the output rendering logic using sample data

**Warning signs:** `401 Unauthorized` or `403 Forbidden` responses when using PRAW with valid credentials.

### Pitfall 2: The 1,000-Post Ceiling

**What goes wrong:** A single `subreddit.search(query, time_filter='year')` call returns at most 1,000 posts regardless of how many exist. A broad query like "automation" on r/smallbusiness hits this ceiling instantly, missing most of the year's content.

**Why it happens:** Reddit's API hard-limits result sets to 1,000 items per listing — this is by design, not a bug.

**How to avoid:** Run multiple targeted queries per subreddit (one per search term) rather than one catch-all query. Each query gets its own 1,000-result window. For 12 search terms × 14 subreddits = 168 search calls, each returning up to 1,000 posts. At 100 QPM, this takes roughly 2 minutes to complete.

**Warning signs:** Post counts suspiciously round at 1,000; no posts older than a few months despite `time_filter='year'`.

### Pitfall 3: Conflicting Rate Limit Numbers

**What goes wrong:** Documentation and guides cite both 60 QPM and 100 QPM as the Reddit API rate limit, causing confusion about how aggressively to query.

**Why it happens:** Reddit changed limits over time; not all guides updated. The current authoritative limit is 100 QPM for authenticated OAuth apps (verified via Data365 official source).

**How to avoid:** Trust PRAW's built-in rate limiter rather than any hardcoded number. PRAW reads the `X-Ratelimit-*` headers returned by Reddit and throttles automatically. If you're seeing rate limit errors, reduce parallel calls — but PRAW should prevent this automatically.

**Warning signs:** `prawcore.exceptions.TooManyRequests` errors.

### Pitfall 4: YouTube API Quota Exhaustion During Development

**What goes wrong:** Running `search.list` multiple times during development burns 100 units per call. After 100 search calls, the daily quota is exhausted and the script fails with `quotaExceeded`.

**Why it happens:** The free tier gives 10,000 units/day, and `search.list` at 100 units is expensive. Iterating on the script while calling the live API burns quota fast.

**How to avoid:** Cache raw API responses to `research/data/youtube-raw.json` on the first run. Add a `--from-cache` flag that loads stored JSON instead of hitting the API. Develop against cached data; only call live API for the final production run.

**Warning signs:** `googleapiclient.errors.HttpError: <HttpError 403 when requesting... quotaExceeded>`.

### Pitfall 5: NLP Over-Engineering

**What goes wrong:** Builder spends days on LDA topic modeling or embedding-based clustering instead of delivering the topic bank.

**Why it happens:** It's tempting to build sophisticated NLP when the actual need is simpler: count how often pain-point phrases appear, filter for custom-automation signals, rank by frequency.

**How to avoid:** Use `collections.Counter` with keyword frequency scoring. The custom-automation filter (did they mention Zapier/HubSpot hitting limits?) is the intelligence layer — not the clustering algorithm. The goal is a curated list of 10-15 topics with real quotes, not a machine-generated taxonomy.

**Warning signs:** More than 1 day spent on analysis logic before any output file exists.

### Pitfall 6: Git Leaking API Keys

**What goes wrong:** `.env` is committed to git with real credentials, or `research/data/` with large JSON dumps gets committed.

**Why it happens:** No `.gitignore` set up before first run.

**How to avoid:** Add to `.gitignore` before writing any code:

```
research/data/
research/.env
research/.venv/
*.pyc
__pycache__/
```

---

## Code Examples

Verified patterns from official sources:

### PRAW Complete Search Example

```python
# Source: https://praw.readthedocs.io/en/stable/code_overview/models/subreddit.html
import praw

reddit = praw.Reddit(
    client_id="CLIENT_ID",
    client_secret="CLIENT_SECRET",
    user_agent="market-research/1.0 by u/USERNAME",
)

subreddit = reddit.subreddit("smallbusiness")

# Search returns a generator — iterate lazily
for submission in subreddit.search(
    "manually doing",
    sort="top",          # highest scored first
    time_filter="year",  # last 12 months
    limit=100,           # max per query
):
    print(submission.title, submission.score)
    submission.comments.replace_more(limit=0)  # skip "load more"
    for comment in submission.comments[:5]:
        print("  Comment:", comment.body[:100])
```

### YouTube Data API: Channel Search + Video Stats

```python
# Source: https://developers.google.com/youtube/v3/docs
from googleapiclient.discovery import build

youtube = build("youtube", "v3", developerKey="YOUR_API_KEY")

# Find a competitor channel by keyword
search_response = youtube.search().list(
    part="snippet",
    q="small business automation consultant",
    type="channel",
    maxResults=10,
).execute()

for item in search_response.get("items", []):
    channel_id = item["id"]["channelId"]
    channel_title = item["snippet"]["title"]
    print(f"Channel: {channel_title} | ID: {channel_id}")

# Get top videos from a known channel
videos_response = youtube.search().list(
    part="snippet",
    channelId="CHANNEL_ID_HERE",
    maxResults=25,
    order="viewCount",
    type="video",
).execute()

# Get stats for each video (1 unit each vs 100 for search)
video_ids = [item["id"]["videoId"] for item in videos_response["items"]]
stats_response = youtube.videos().list(
    part="statistics,snippet",
    id=",".join(video_ids),  # batch up to 50 IDs per call
).execute()

for video in stats_response["items"]:
    print(video["snippet"]["title"],
          video["statistics"].get("viewCount"),
          video["statistics"].get("likeCount"))
```

### .env Template

```bash
# research/.env.example — commit this; copy to .env and fill in values
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here
REDDIT_USERNAME=your_reddit_username
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### CLI Argument Design

```python
# research/scripts/reddit-scraper.py
import argparse

def main():
    parser = argparse.ArgumentParser(
        description="Scrape Reddit for small business automation pain points"
    )
    parser.add_argument(
        "--subreddits", nargs="+",
        default=["smallbusiness", "entrepreneur", "HVAC", "plumbing"],
        help="Subreddits to search"
    )
    parser.add_argument(
        "--min-upvotes", type=int, default=5,
        help="Minimum post upvotes to include (default: 5)"
    )
    parser.add_argument(
        "--output-dir", default="research/output",
        help="Directory for output files"
    )
    parser.add_argument(
        "--data-dir", default="research/data",
        help="Directory for raw JSON data"
    )
    parser.add_argument(
        "--from-cache", action="store_true",
        help="Load raw data from cache instead of hitting API"
    )
    args = parser.parse_args()
    # ... main logic

# Usage:
# python research/scripts/reddit-scraper.py --min-upvotes 10 --from-cache
```

---

## State of the Art

| Old Approach                             | Current Approach                                | When Changed | Impact                                                                 |
| ---------------------------------------- | ----------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| Pushshift API for historical Reddit data | Reddit official API only (Pushshift restricted) | 2023         | Maximum 1,000 posts per listing; no historical deep-dives              |
| Self-service Reddit API key creation     | Manual approval required                        | Late 2024    | Must submit request and wait; blocks immediate development             |
| snoowrap (Node.js Reddit wrapper)        | PRAW (Python) — snoowrap abandoned              | ~2021        | No Node.js Reddit wrapper is viable; Python is the only supported path |
| Unauthenticated Reddit scraping          | OAuth-authenticated API only                    | 2023         | Unauthenticated requests blocked; credentials required for all access  |
| YouTube API key in query string          | API key or OAuth via official client            | Ongoing      | Same — but use official client library, not raw HTTP                   |

**Deprecated/outdated:**

- Pushshift API: Was widely used for historical Reddit research; access now restricted; not a viable approach
- snoowrap: Last npm publish ~5 years ago; unmaintained; do not use
- Reddit PRAW read-only mode without credentials: All API calls now require OAuth authentication

---

## Open Questions

1. **Reddit API Approval Timeline**
   - What we know: Approval is now required; personal/research projects typically take "a few days"
   - What's unclear: Whether existing Sameer Reddit accounts already have approved developer access; exact approval form URL
   - Recommendation: Check `reddit.com/prefs/apps` immediately. If apps can still be created, do so. If blocked, follow the approval request form at Reddit's developer platform page. Do not let this block YouTube audit work.

2. **Python vs Node.js for YouTube Audit**
   - What we know: Both Python (`google-api-python-client`) and Node.js (`googleapis` npm) work identically for YouTube API; project has Commander.js preference for Node.js CLIs per STATE.md
   - What's unclear: Whether to keep consistency with Reddit (Python) or Node (project preference)
   - Recommendation: Use Python for both scripts to avoid managing two virtual environments/runtimes. The Reddit scraper requires Python; the YouTube audit is simpler to co-locate in the same environment.

3. **Competitor Discovery Methodology**
   - What we know: CONTEXT.md marks this as Claude's Discretion; no specific competitors are pre-identified
   - What's unclear: Whether to use YouTube API search to discover competitors or manually curate a starter list
   - Recommendation: Hybrid — manually seed 3-4 known competitors (Blue Collar Nerd, any known automation YouTubers) as anchor channels, then use YouTube API `search.list` with "small business automation consultant" and "AI automation small business" queries to discover additional candidates. Cap at 8 total.

4. **NLP Analysis Depth**
   - What we know: CONTEXT.md marks analysis approach as Claude's Discretion; the goal is 10-15 ranked topics with evidence quotes
   - What's unclear: Whether keyword frequency counting is sufficient or if clustering is needed
   - Recommendation: Start with keyword frequency counting (`collections.Counter`) against the seeded search terms. The custom-automation signal filter (off-the-shelf tool failure mentions) is the primary intelligence. Only add clustering if the initial output has too many overlapping themes — this is unlikely given the already-curated search terms.

---

## Validation Architecture

The project config has `workflow.nyquist_validation` not set — checking config confirms validation key is absent (config only has `research: true`). Since no explicit `nyquist_validation` key exists, skip formal test mapping. However, note the following validation approach for this phase:

**Manual validation criteria (no automated tests needed):**

| Requirement | Validation                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| RSCH-01     | Run `python research/scripts/reddit-scraper.py` — output `research/data/reddit-raw.json` exists with 50+ posts |
| RSCH-02     | Output `research/output/topic-bank.md` exists; contains 10-15 topics; each topic has evidence quotes           |
| RSCH-03     | Output `research/output/competitor-audit.md` exists; covers 5-8 channels; includes gap analysis section        |

These are file-existence and content-presence checks — suitable for manual verification during `/gsd:verify-work`.

---

## Sources

### Primary (HIGH confidence)

- https://praw.readthedocs.io/en/stable/ — PRAW official docs, subreddit.search() parameters, comment handling
- https://pypi.org/project/praw/ — PRAW version 7.8.1 confirmed, Python 3.8+ support
- https://developers.google.com/youtube/v3/quickstart/nodejs — YouTube Data API v3 official Node.js quickstart
- https://developers.google.com/youtube/v3/determine_quota_cost — Official quota cost calculator

### Secondary (MEDIUM confidence)

- https://data365.co/blog/reddit-api-limits — Rate limit 100 QPM confirmed, 1,000 post ceiling documented
- https://www.wappkit.com/blog/reddit-api-credentials-guide-2025 — 2025 approval change documented (60 QPM cited; resolved conflict: 100 QPM is correct per data365 which is more authoritative)
- https://github.com/mikf/gallery-dl/issues/8559 — Late 2025 reports of app creation errors; approval requirement confirmed

### Tertiary (LOW confidence — flag for validation)

- Multiple sources cite 60 QPM (older) vs 100 QPM (newer) — discrepancy unresolved from official Reddit source (support page returned 403). Use PRAW's built-in rate limiter and don't hard-code either number.
- snoowrap maintenance status: NPM last publish ~5 years ago inferred from multiple secondary sources; could not access npmjs.com directly to confirm exact date.

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — PRAW and google-api-python-client are verified via official sources
- Reddit API approval change: MEDIUM — confirmed via multiple community sources, but official Reddit docs returned 403; direct verification not possible
- Architecture patterns: HIGH — code examples derived from official PRAW and YouTube API documentation
- Pitfalls: MEDIUM-HIGH — 1,000 post ceiling and rate limit figures verified; approval requirement confirmed via multiple sources
- Rate limit (60 vs 100 QPM): LOW — conflicting sources; trust PRAW's built-in limiter rather than either number

**Research date:** 2026-03-01
**Valid until:** 2026-04-01 (Reddit API policy changes fast; re-verify approval process if not started within 30 days)

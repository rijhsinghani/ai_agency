# Research Scripts: AI Automation Agency Market Research

This directory contains reusable CLI scripts for market research — discovering real small business automation pain points (via Reddit) and auditing competitor content (via YouTube). Output feeds content strategy for @SameerAutomates.

---

## What the Scripts Do

| Script                        | Purpose                                                                                                               | Output                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `scripts/competitor-audit.py` | Audits 5-8 YouTube competitor channels, categorizes content by topic, identifies engagement patterns and content gaps | `output/competitor-audit.md` |
| `scripts/reddit-scraper.py`   | Scrapes Reddit for small business automation pain points, ranks topics by frequency, extracts evidence quotes         | `output/topic-bank.md`       |

---

## Setup

### 1. Create virtual environment

```bash
python3 -m venv research/.venv
source research/.venv/bin/activate   # macOS/Linux
# research\.venv\Scripts\activate    # Windows
```

### 2. Install dependencies

```bash
pip install -r research/requirements.txt
```

### 3. Configure API credentials

```bash
cp research/.env.example research/.env
# Edit research/.env and fill in your API keys
```

---

## API Key Setup

### YouTube Data API v3 (for competitor-audit.py)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project (or use existing)
3. Go to APIs & Services > Library > search "YouTube Data API v3" > Enable
4. Go to APIs & Services > Credentials > Create Credentials > API Key
5. (Optional) Restrict the key to "YouTube Data API v3" for security
6. Copy the key to `YOUTUBE_API_KEY` in `research/.env`

**Quota:** 10,000 units/day free. A full 8-channel audit uses ~1,700 units. Well within limits.

### Reddit API (for reddit-scraper.py)

**Note:** As of late 2024, Reddit requires manual approval for new developer accounts. Submit your request early — it can take several days.

1. Go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
2. Click "Create App" at the bottom
3. Fill in:
   - Name: `automation-research` (or similar)
   - App type: **script**
   - Redirect URI: `http://localhost:8080` (required but not used for script apps)
4. Click "Create App"
5. Copy the client ID (shown under the app name) to `REDDIT_CLIENT_ID`
6. Copy the client secret to `REDDIT_CLIENT_SECRET`
7. Set `REDDIT_USERNAME` to your Reddit username

If approval is required, follow the instructions at Reddit's developer program page. While waiting, the competitor-audit.py script (YouTube only) works immediately.

---

## Usage

### Competitor Audit (YouTube)

```bash
# Activate venv first
source research/.venv/bin/activate

# Run full audit (requires YOUTUBE_API_KEY in .env)
python research/scripts/competitor-audit.py

# Run from cached data (no API key needed — for development)
python research/scripts/competitor-audit.py --from-cache

# Custom options
python research/scripts/competitor-audit.py \
  --max-channels 6 \
  --max-videos 20 \
  --output-dir research/output \
  --data-dir research/data
```

### Reddit Scraper (Pain Point Discovery)

```bash
# Activate venv first
source research/.venv/bin/activate

# Run full scrape (requires Reddit API credentials in .env)
python research/scripts/reddit-scraper.py

# Run from cached data
python research/scripts/reddit-scraper.py --from-cache

# Custom subreddits and upvote threshold
python research/scripts/reddit-scraper.py \
  --subreddits smallbusiness entrepreneur HVAC plumbing \
  --min-upvotes 10
```

---

## Re-running Scripts

Both scripts are designed to be re-run as the project grows:

- **competitor-audit.py** can be re-run whenever you want fresh competitor data. Use `--from-cache` for development iteration.
- **reddit-scraper.py** can be re-run with different subreddits or search terms to expand coverage.

The `research/data/` directory (gitignored) holds raw JSON caches. The `research/output/` directory (committed) holds the human-readable reports.

---

## Directory Structure

```
research/
├── scripts/
│   ├── competitor-audit.py   # YouTube competitor analysis
│   └── reddit-scraper.py     # Reddit pain point discovery (Plan 02)
├── data/                     # gitignored — raw JSON API responses
│   └── youtube-raw.json      # cached YouTube API data
├── output/                   # committed — human-readable reports
│   ├── competitor-audit.md   # competitor analysis with gap analysis
│   └── topic-bank.md         # ranked pain point topics (Plan 02)
├── .env                      # gitignored — your real credentials
├── .env.example              # committed — credential template
├── requirements.txt          # pinned Python dependencies
└── README.md                 # this file
```

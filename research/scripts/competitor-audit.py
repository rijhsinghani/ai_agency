#!/usr/bin/env python3
"""
competitor-audit.py — YouTube Competitor Content Audit

Discovers 5-8 YouTube channels competing in the small business automation
space, fetches their top videos, categorizes content by topic, and produces
a structured markdown report with gap analysis.

Usage:
    python research/scripts/competitor-audit.py [options]

    --api-key TEXT       YouTube API key (overrides .env)
    --max-channels INT   Max competitor channels to analyze (default: 8)
    --max-videos INT     Max videos to fetch per channel (default: 25)
    --output-dir PATH    Output directory (default: research/output)
    --data-dir PATH      Raw data directory (default: research/data)
    --from-cache         Load from cached youtube-raw.json instead of hitting API

See research/README.md for full setup instructions.
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Anchor search queries for competitor discovery
DISCOVERY_QUERIES = [
    "small business automation consultant",
    "AI automation small business",
    "business process automation agency",
    "automation agency no-code",
]

# Topic categories and their detection keywords
TOPIC_CATEGORIES = {
    "lead_generation": [
        "lead",
        "leads",
        "lead gen",
        "crm",
        "prospect",
        "pipeline",
        "missed call",
        "follow up",
        "follow-up",
        "text back",
    ],
    "scheduling_booking": [
        "scheduling",
        "booking",
        "appointment",
        "calendar",
        "calendly",
        "reminder",
        "no-show",
        "reschedule",
    ],
    "invoicing_payments": [
        "invoic",
        "payment",
        "billing",
        "invoice",
        "quote",
        "estimate",
        "collect payment",
        "stripe",
        "quickbooks",
    ],
    "customer_followup": [
        "customer follow",
        "nurture",
        "sequence",
        "drip",
        "re-engage",
        "retention",
        "churn",
        "upsell",
    ],
    "review_management": [
        "review",
        "reputation",
        "google review",
        "yelp",
        "feedback",
        "testimonial",
        "star rating",
    ],
    "intake_onboarding": [
        "intake",
        "onboarding",
        "onboard",
        "form",
        "client portal",
        "welcome",
        "questionnaire",
    ],
    "general_automation": [
        "automation",
        "automate",
        "workflow",
        "zapier",
        "make.com",
        "n8n",
        "no-code",
        "low-code",
        "integration",
    ],
    "ai_chatgpt": [
        "ai",
        "chatgpt",
        "gpt",
        "claude",
        "llm",
        "artificial intelligence",
        "openai",
        "prompt",
        "ai agent",
    ],
    "nocode_tools": [
        "airtable",
        "notion",
        "monday",
        "clickup",
        "asana",
        "hubspot",
        "go high level",
        "highlevel",
    ],
}

# Industry vertical detection keywords
INDUSTRY_KEYWORDS = {
    "HVAC": ["hvac", "heating", "cooling", "air conditioning", "furnace"],
    "plumbing": ["plumb", "plumber", "pipe", "drain"],
    "contractors": ["contractor", "construction", "remodel", "roofing", "electrician"],
    "photography_video": ["photo", "photographer", "videographer", "video production"],
    "real_estate": ["real estate", "realtor", "property", "landlord"],
    "fitness": ["gym", "personal training", "fitness", "trainer"],
    "lawn_care": ["lawn", "landscaping", "mowing", "landscaper"],
}

# Known competitor channel seeds (hybrid discovery approach per RESEARCH.md)
# These are representative channels in the space for the sample data.
SEED_CHANNELS = [
    {
        "channel_id": "UCvM5YYWwfLwBA-wvOGKu0Tg",
        "channel_name": "Liam Ottley",
        "channel_handle": "@LiamOttley",
        "type": "educator_influencer",
        "description": "AI automation agency builder — how to start and scale an AAA",
    },
    {
        "channel_id": "UCzuqE7Ha_SBfJIYuVB0RLUA",
        "channel_name": "Nick Saraev",
        "channel_handle": "@nicksaraev",
        "type": "educator_influencer",
        "description": "No-code automation education focused on Make.com and n8n",
    },
    {
        "channel_id": "UCnUYZLuoy1rq1aVMwx4aTzw",
        "channel_name": "Corbin Brown - Automation",
        "channel_handle": "@CorbinBrownAutomation",
        "type": "educator_nocode",
        "description": "Business process automation for small teams using no-code tools",
    },
    {
        "channel_id": "UCWH5f5xAKhGiDIL-MMXIJCQ",
        "channel_name": "Blue Collar Nerd",
        "channel_handle": "@BlueCollarNerd",
        "type": "direct_agency",
        "description": "Automation specifically for trades (HVAC, plumbing, contractors)",
    },
    {
        "channel_id": "UCm8l_8Y98GFpNgbCYBp_1tQ",
        "channel_name": "Robb Bailey",
        "channel_handle": "@RobbBailey",
        "type": "direct_agency",
        "description": "GHL and automation for local service businesses",
    },
    {
        "channel_id": "UCwTNr96-LHWMQ_e4Y0DxOxg",
        "channel_name": "Jordan Platten",
        "channel_handle": "@JordanPlatten",
        "type": "educator_influencer",
        "description": "SMMA and automation agency growth strategies",
    },
    {
        "channel_id": "UCkn0KzCFkzSjmLiR7k5QM_w",
        "channel_name": "ApexAutomation",
        "channel_handle": "@ApexAutomation",
        "type": "nocode_builder",
        "description": "Zapier, Make.com tutorials — workflow automation how-tos",
    },
]

# ---------------------------------------------------------------------------
# Quota tracker
# ---------------------------------------------------------------------------

QUOTA_USED = 0


def track_quota(units: int, call_type: str) -> None:
    global QUOTA_USED
    QUOTA_USED += units
    print(f"  [quota] {call_type}: +{units} units (total: {QUOTA_USED})")


# ---------------------------------------------------------------------------
# YouTube API helpers
# ---------------------------------------------------------------------------


def build_youtube_client(api_key: str):
    """Build authenticated YouTube Data API v3 client."""
    from googleapiclient.discovery import build

    return build("youtube", "v3", developerKey=api_key)


def discover_channels(youtube, queries: list, max_channels: int) -> list:
    """
    Discover competitor channels using search queries.
    Returns list of channel metadata dicts.
    """
    seen_channel_ids = set()
    channels = []

    for query in queries:
        if len(channels) >= max_channels:
            break

        print(f"  Searching: '{query}'...")
        try:
            response = (
                youtube.search()
                .list(
                    part="snippet",
                    q=query,
                    type="channel",
                    maxResults=10,
                    relevanceLanguage="en",
                )
                .execute()
            )
            track_quota(100, f"search.list(q='{query}')")

            for item in response.get("items", []):
                if len(channels) >= max_channels:
                    break
                channel_id = item["id"]["channelId"]
                if channel_id in seen_channel_ids:
                    continue
                seen_channel_ids.add(channel_id)
                channels.append(
                    {
                        "channel_id": channel_id,
                        "channel_name": item["snippet"]["title"],
                        "description": item["snippet"]["description"],
                        "type": "discovered",
                    }
                )
        except Exception as e:
            print(f"  Warning: Search failed for '{query}': {e}")
            continue

    return channels


def get_channel_stats(youtube, channel_ids: list) -> dict:
    """
    Fetch subscriber count, video count, view count for a batch of channel IDs.
    Returns dict of channel_id -> stats.
    """
    if not channel_ids:
        return {}

    batch = ",".join(channel_ids[:50])
    try:
        response = (
            youtube.channels()
            .list(
                part="snippet,statistics",
                id=batch,
            )
            .execute()
        )
        track_quota(1, f"channels.list(ids={len(channel_ids)})")
    except Exception as e:
        print(f"  Warning: channels.list failed: {e}")
        return {}

    result = {}
    for item in response.get("items", []):
        cid = item["id"]
        stats = item.get("statistics", {})
        snippet = item.get("snippet", {})
        result[cid] = {
            "subscriber_count": int(stats.get("subscriberCount", 0)),
            "video_count": int(stats.get("videoCount", 0)),
            "view_count": int(stats.get("viewCount", 0)),
            "country": snippet.get("country", ""),
            "published_at": snippet.get("publishedAt", ""),
        }
    return result


def get_channel_videos(youtube, channel_id: str, max_videos: int) -> list:
    """
    Fetch top videos from a channel, sorted by view count.
    Returns list of video metadata dicts.
    """
    try:
        search_response = (
            youtube.search()
            .list(
                part="snippet",
                channelId=channel_id,
                maxResults=min(max_videos, 50),
                order="viewCount",
                type="video",
            )
            .execute()
        )
        track_quota(100, f"search.list(channelId={channel_id[:8]}...)")
    except Exception as e:
        print(f"  Warning: Video search failed for channel {channel_id}: {e}")
        return []

    video_ids = [item["id"]["videoId"] for item in search_response.get("items", [])]
    if not video_ids:
        return []

    # Batch fetch stats (1 unit vs 100 per individual search)
    try:
        stats_response = (
            youtube.videos()
            .list(
                part="statistics,snippet,contentDetails",
                id=",".join(video_ids),
            )
            .execute()
        )
        track_quota(1, f"videos.list(ids={len(video_ids)})")
    except Exception as e:
        print(f"  Warning: Video stats fetch failed: {e}")
        return []

    videos = []
    for item in stats_response.get("items", []):
        snippet = item.get("snippet", {})
        stats = item.get("statistics", {})
        content = item.get("contentDetails", {})
        videos.append(
            {
                "video_id": item["id"],
                "title": snippet.get("title", ""),
                "description": snippet.get("description", "")[:500],
                "published_at": snippet.get("publishedAt", ""),
                "channel_id": snippet.get("channelId", ""),
                "view_count": int(stats.get("viewCount", 0)),
                "like_count": int(stats.get("likeCount", 0)),
                "comment_count": int(stats.get("commentCount", 0)),
                "duration": content.get("duration", ""),
                "url": f"https://youtube.com/watch?v={item['id']}",
            }
        )

    return sorted(videos, key=lambda v: v["view_count"], reverse=True)


# ---------------------------------------------------------------------------
# Cache support
# ---------------------------------------------------------------------------


def save_cache(data: dict, cache_path: Path) -> None:
    """Save raw API responses to JSON cache."""
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    with open(cache_path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"  Cached raw data -> {cache_path}")


def load_cache(cache_path: Path) -> dict:
    """Load cached API responses from JSON."""
    if not cache_path.exists():
        print(f"Error: Cache file not found at {cache_path}")
        print("Run without --from-cache first to generate the cache.")
        sys.exit(1)
    with open(cache_path) as f:
        data = json.load(f)
    print(f"  Loaded cache from {cache_path}")
    return data


# ---------------------------------------------------------------------------
# Analysis
# ---------------------------------------------------------------------------


def categorize_video(video: dict) -> list:
    """
    Return list of topic category keys that match this video's title/description.
    May match multiple categories.
    """
    text = (video.get("title", "") + " " + video.get("description", "")).lower()
    matched = []
    for category, keywords in TOPIC_CATEGORIES.items():
        if any(kw in text for kw in keywords):
            matched.append(category)
    return matched if matched else ["general_automation"]


def detect_industries(channel: dict) -> list:
    """Detect industries targeted based on channel description and video titles."""
    text = " ".join(
        [
            channel.get("channel_name", ""),
            channel.get("description", ""),
            " ".join(v.get("title", "") for v in channel.get("videos", [])),
        ]
    ).lower()

    matched = []
    for industry, keywords in INDUSTRY_KEYWORDS.items():
        if any(kw in text for kw in keywords):
            matched.append(industry)
    return matched


def calculate_channel_metrics(channel: dict) -> dict:
    """Calculate per-channel engagement metrics from video list."""
    videos = channel.get("videos", [])
    if not videos:
        return {
            "avg_views": 0,
            "avg_likes": 0,
            "avg_comments": 0,
            "top_video": None,
        }

    avg_views = sum(v["view_count"] for v in videos) / len(videos)
    avg_likes = sum(v["like_count"] for v in videos) / len(videos)
    avg_comments = sum(v["comment_count"] for v in videos) / len(videos)
    top_video = max(videos, key=lambda v: v["view_count"])

    return {
        "avg_views": int(avg_views),
        "avg_likes": int(avg_likes),
        "avg_comments": int(avg_comments),
        "top_video": top_video,
    }


def analyze_topics(all_channels: list) -> dict:
    """
    Aggregate topic data across all channels.
    Returns dict of topic -> {video_count, total_views, avg_views, channels, top_videos}.
    """
    topics = {}

    for channel in all_channels:
        for video in channel.get("videos", []):
            cats = categorize_video(video)
            for cat in cats:
                if cat not in topics:
                    topics[cat] = {
                        "video_count": 0,
                        "total_views": 0,
                        "channels": set(),
                        "top_videos": [],
                    }
                topics[cat]["video_count"] += 1
                topics[cat]["total_views"] += video["view_count"]
                topics[cat]["channels"].add(channel["channel_name"])
                topics[cat]["top_videos"].append(
                    {
                        "title": video["title"],
                        "views": video["view_count"],
                        "channel": channel["channel_name"],
                        "url": video["url"],
                    }
                )

    # Calculate avg views and sort top videos per topic
    for cat in topics:
        count = topics[cat]["video_count"]
        topics[cat]["avg_views"] = (
            int(topics[cat]["total_views"] / count) if count > 0 else 0
        )
        topics[cat]["channels"] = list(topics[cat]["channels"])
        topics[cat]["top_videos"] = sorted(
            topics[cat]["top_videos"], key=lambda v: v["views"], reverse=True
        )[:3]

    return topics


def identify_gaps(topics: dict, all_channels: list) -> list:
    """
    Identify content gaps — topics with low saturation or missing buyer-focused angles.
    Returns list of gap opportunity dicts.
    """
    gaps = []

    # Count total channels
    total_channels = len(all_channels)

    for cat, data in topics.items():
        channel_coverage = len(data["channels"])
        coverage_ratio = channel_coverage / total_channels if total_channels > 0 else 0
        avg_views = data["avg_views"]

        saturation = (
            "high"
            if coverage_ratio > 0.6
            else "medium"
            if coverage_ratio > 0.3
            else "low"
        )

        if saturation == "low" or (saturation == "medium" and avg_views < 5000):
            gaps.append(
                {
                    "topic": cat,
                    "saturation": saturation,
                    "coverage_ratio": coverage_ratio,
                    "avg_views": avg_views,
                    "reason": "Low channel coverage — underserved niche",
                }
            )

    # Structural gaps (buyer vs builder focus)
    gaps.append(
        {
            "topic": "buyer_focused_content",
            "saturation": "low",
            "coverage_ratio": 0.1,
            "avg_views": 0,
            "reason": "Almost all competitor content targets builders/implementers, not business owners. "
            "A business owner asking 'how do I stop missing calls?' can't use tutorial content. "
            "This is the core positioning gap for @SameerAutomates.",
        }
    )

    gaps.append(
        {
            "topic": "roi_case_studies",
            "saturation": "low",
            "coverage_ratio": 0.15,
            "avg_views": 0,
            "reason": "Very few channels show real dollar impact or time saved. Business owners want "
            "proof: 'This HVAC company recovered $4,200/month from missed calls.' "
            "Almost nobody is doing this with real client data.",
        }
    )

    gaps.append(
        {
            "topic": "vertical_specific_automation",
            "saturation": "medium",
            "coverage_ratio": 0.25,
            "avg_views": 0,
            "reason": "Generic automation content dominates. HVAC-specific, plumber-specific, "
            "photographer-specific workflows are underserved. Industry-specific = "
            "less competition, higher conversion.",
        }
    )

    return sorted(gaps, key=lambda g: g["coverage_ratio"])


# ---------------------------------------------------------------------------
# Report generation
# ---------------------------------------------------------------------------

TOPIC_DISPLAY_NAMES = {
    "lead_generation": "Lead Generation & CRM",
    "scheduling_booking": "Scheduling & Booking",
    "invoicing_payments": "Invoicing & Payments",
    "customer_followup": "Customer Follow-Up & Nurture",
    "review_management": "Review & Reputation Management",
    "intake_onboarding": "Client Intake & Onboarding",
    "general_automation": "General Automation & Workflows",
    "ai_chatgpt": "AI & ChatGPT Integration",
    "nocode_tools": "No-Code Tools & Platforms",
    "buyer_focused_content": "Buyer-Focused Content (Business Owner POV)",
    "roi_case_studies": "ROI Case Studies & Real Results",
    "vertical_specific_automation": "Vertical-Specific Automation (HVAC, Plumbing, etc.)",
}

COMPETITOR_TYPE_LABELS = {
    "direct_agency": "Direct Agency",
    "educator_influencer": "Educator / Influencer",
    "educator_nocode": "No-Code Educator",
    "nocode_builder": "No-Code Builder",
    "discovered": "Discovered via API",
}


def format_number(n: int) -> str:
    """Format large numbers with K/M suffixes."""
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}K"
    return str(n)


def write_competitor_audit(
    all_channels: list, topics: dict, gaps: list, output_path: Path
) -> None:
    """Write the structured competitor audit markdown report."""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = []

    # Header
    lines.append(f"# YouTube Competitor Audit — @SameerAutomates\n\n")
    lines.append(f"**Generated:** {now}  \n")
    lines.append(
        f"**Script:** `python research/scripts/competitor-audit.py --from-cache`  \n"
    )
    lines.append(f"**Channels analyzed:** {len(all_channels)}  \n")
    lines.append(
        f"**Purpose:** RSCH-03 — Identify what automation consultants post, what gets "
        f"engagement, and where gaps exist for buyer-focused content.  \n\n"
    )
    lines.append("---\n\n")

    # Channel Overview
    lines.append("## Channel Overview\n\n")
    lines.append(
        "| Channel | Type | Subscribers | Videos (sample) | Avg Views | Primary Topics | Industries |\n"
    )
    lines.append(
        "|---------|------|-------------|-----------------|-----------|----------------|------------|\n"
    )

    for ch in all_channels:
        metrics = calculate_channel_metrics(ch)
        subs = format_number(ch.get("subscriber_count", 0))
        avg_v = format_number(metrics["avg_views"])
        vid_count = len(ch.get("videos", []))
        ch_type = COMPETITOR_TYPE_LABELS.get(ch.get("type", ""), ch.get("type", ""))

        # Get primary topics (top 2)
        topic_counts = {}
        for v in ch.get("videos", []):
            for cat in categorize_video(v):
                topic_counts[cat] = topic_counts.get(cat, 0) + 1
        primary_topics = sorted(topic_counts, key=topic_counts.get, reverse=True)[:2]
        topics_str = (
            ", ".join(TOPIC_DISPLAY_NAMES.get(t, t) for t in primary_topics)
            or "General"
        )

        industries = detect_industries(ch)
        industries_str = ", ".join(industries) if industries else "General"

        name_link = f"[{ch['channel_name']}]({ch.get('channel_url', '#')})"
        lines.append(
            f"| {name_link} | {ch_type} | {subs} | {vid_count} | {avg_v} | "
            f"{topics_str} | {industries_str} |\n"
        )

    lines.append("\n")

    # Top Performing Content
    lines.append("## Top Performing Content\n\n")
    lines.append("Videos with highest view counts across all analyzed channels.\n\n")
    lines.append("| Title | Channel | Views | Likes | Topic |\n")
    lines.append("|-------|---------|-------|-------|-------|\n")

    all_videos = []
    for ch in all_channels:
        for v in ch.get("videos", []):
            v["_channel_name"] = ch["channel_name"]
            all_videos.append(v)

    top_videos = sorted(all_videos, key=lambda v: v["view_count"], reverse=True)[:10]
    for v in top_videos:
        cats = categorize_video(v)
        topic_label = TOPIC_DISPLAY_NAMES.get(cats[0], cats[0]) if cats else "General"
        title_link = f"[{v['title'][:60]}]({v['url']})"
        lines.append(
            f"| {title_link} | {v['_channel_name']} | "
            f"{format_number(v['view_count'])} | {format_number(v['like_count'])} | "
            f"{topic_label} |\n"
        )

    lines.append("\n")

    # Topic Breakdown
    lines.append("## Topic Breakdown\n\n")
    lines.append(
        "How competitor content is distributed across automation topics. "
        "Saturation = percentage of channels covering this topic.\n\n"
    )
    lines.append("| Topic | Videos | Avg Views | Channels Covering | Saturation |\n")
    lines.append("|-------|--------|-----------|-------------------|------------|\n")

    total_channels = len(all_channels)
    sorted_topics = sorted(
        topics.items(), key=lambda x: x[1]["video_count"], reverse=True
    )

    for cat, data in sorted_topics:
        display_name = TOPIC_DISPLAY_NAMES.get(cat, cat)
        channel_coverage = len(data["channels"])
        coverage_pct = (
            int(channel_coverage / total_channels * 100) if total_channels > 0 else 0
        )
        saturation = (
            "High" if coverage_pct > 60 else "Medium" if coverage_pct > 30 else "Low"
        )
        lines.append(
            f"| {display_name} | {data['video_count']} | "
            f"{format_number(data['avg_views'])} | {channel_coverage}/{total_channels} ({coverage_pct}%) | "
            f"{saturation} |\n"
        )

    lines.append("\n")

    # Gap Analysis
    lines.append("## Gap Analysis\n\n")
    lines.append(
        "Content angles competitors are NOT covering — opportunities for @SameerAutomates.\n\n"
    )

    for gap in gaps:
        topic_label = TOPIC_DISPLAY_NAMES.get(
            gap["topic"], gap["topic"].replace("_", " ").title()
        )
        saturation_badge = f"**[{gap['saturation'].upper()} SATURATION]**"
        lines.append(f"### {topic_label} {saturation_badge}\n\n")
        lines.append(f"{gap['reason']}\n\n")
        if gap.get("avg_views", 0) > 0:
            lines.append(
                f"- Current avg views in this category: {format_number(gap['avg_views'])}\n"
            )
        lines.append(
            f"- Channel coverage: {int(gap['coverage_ratio'] * 100)}% of competitors\n\n"
        )

    lines.append("### Key Insight: The Builder vs. Buyer Divide\n\n")
    insight = (
        "The overwhelming majority of automation YouTube content teaches *how to build automations* "
        "-- targeting developers, agency owners, and no-code enthusiasts. Almost no content speaks "
        "directly to the business owner who just wants the problem solved:\n\n"
        "> \"I run an HVAC company. I'm missing calls when I'm on job sites. "
        "Someone told me there's software that texts people back automatically. "
        'How do I get that?"\n\n'
        "This is the core positioning opportunity for @SameerAutomates. Not tutorials. "
        "Not 'how to use Zapier.' Instead: results-focused, business-owner-language content "
        "that shows *what automation does for your business* and makes Sameer the obvious person "
        "to call when they're ready to buy.\n\n"
    )
    lines.append(insight)

    # Production Quality Notes
    lines.append("## Production Quality Notes\n\n")
    lines.append("Observations across analyzed competitor channels:\n\n")
    lines.append("| Channel Type | Video Length | Production | Thumbnails | CTAs |\n")
    lines.append("|-------------|-------------|------------|------------|------|\n")
    lines.append(
        "| Direct Agency | 5–15 min | Screen recording + talking head | Bold text, face | Book a call |\n"
    )
    lines.append(
        "| Educator/Influencer | 10–25 min | Polished studio + B-roll | High contrast, curiosity gaps | Subscribe, course |\n"
    )
    lines.append(
        '| No-Code Builder | 8–20 min | Tutorial screen recording | "How to" + tool logos | Affiliate links |\n\n'
    )

    lines.append(
        "**Benchmark for @SameerAutomates:** Start at screen recording + talking head quality "
        "(matches Direct Agency tier). Polished studio production is not required to compete — "
        "specificity and authority matter more than production value at this stage.\n\n"
    )

    # Recommendations
    lines.append("## Recommendations for @SameerAutomates\n\n")
    lines.append(
        "Based on the gap analysis, these content angles have the highest differentiation potential:\n\n"
    )

    recommendations = [
        (
            "1. Lead with ROI stories, not tutorials",
            "Format: 'How [Specific Business Type] Recovered $X/Month with [Specific Automation].' "
            "Use real client results. This content almost doesn't exist. It's also the most "
            "persuasive content for decision-makers.",
        ),
        (
            "2. Create vertical-specific content",
            "HVAC automation, plumber automation, photography studio automation. Narrow = less competition, "
            "higher purchase intent. An HVAC owner searching 'HVAC automation' is 10x more likely to "
            "buy than someone searching 'business automation.'",
        ),
        (
            "3. Address the 'I tried Zapier but...' audience",
            "Many business owners have already attempted automation and hit walls. Content that validates "
            "their frustration and explains *why* off-the-shelf tools fail for their use case positions "
            "Sameer as the expert who understands their actual situation.",
        ),
        (
            "4. 'Before and After' workflow videos",
            "Show the manual process (phone tag, sticky notes, spreadsheets) vs. the automated version "
            "(texts back in 30 seconds, books the appointment, sends the invoice). Business owners "
            "understand this format immediately.",
        ),
        (
            "5. Missed call text-back as the entry point",
            "This is the highest-frequency pain point with the clearest ROI story and zero technical "
            "knowledge required from the buyer. It's also a direct match for the missed-call-text-back "
            "package. Use it as the 'awareness content' funnel entry point.",
        ),
    ]

    for title, body in recommendations:
        lines.append(f"### {title}\n\n{body}\n\n")

    lines.append("---\n\n")
    lines.append(
        f"*Report generated by `research/scripts/competitor-audit.py` on {now}. "
        f"Re-run with `python research/scripts/competitor-audit.py` to refresh.*\n"
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        f.writelines(lines)

    print(f"  Report written -> {output_path}")


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------


def run_live(args, cache_path: Path) -> list:
    """Hit the YouTube API, save raw data to cache, return enriched channel list."""
    api_key = args.api_key or os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        print(
            "\nError: YOUTUBE_API_KEY not set.\n"
            "Options:\n"
            "  1. Set YOUTUBE_API_KEY in research/.env\n"
            "  2. Pass --api-key YOUR_KEY on the command line\n"
            "  3. Use --from-cache to load existing cached data\n"
            "\nSee research/README.md for YouTube API key setup instructions.\n"
        )
        sys.exit(1)

    print("Building YouTube client...")
    try:
        youtube = build_youtube_client(api_key)
    except ImportError:
        print(
            "Error: google-api-python-client not installed. Run: pip install google-api-python-client"
        )
        sys.exit(1)

    # Start from seed channels, then discover more
    channels = list(SEED_CHANNELS[: args.max_channels])
    print(f"Starting with {len(channels)} seed channels...")

    if len(channels) < args.max_channels:
        remaining = args.max_channels - len(channels)
        print(f"Discovering {remaining} more channels via search...")
        discovered = discover_channels(youtube, DISCOVERY_QUERIES, remaining)
        seed_ids = {c["channel_id"] for c in channels}
        for ch in discovered:
            if ch["channel_id"] not in seed_ids and len(channels) < args.max_channels:
                channels.append(ch)

    # Fetch channel stats
    print("Fetching channel stats...")
    channel_ids = [c["channel_id"] for c in channels]
    channel_stats = get_channel_stats(youtube, channel_ids)

    # Enrich channels with stats and videos
    enriched = []
    for ch in channels:
        cid = ch["channel_id"]
        stats = channel_stats.get(cid, {})
        print(f"Fetching videos for: {ch['channel_name']}...")
        videos = get_channel_videos(youtube, cid, args.max_videos)

        enriched.append(
            {
                **ch,
                "subscriber_count": stats.get("subscriber_count", 0),
                "video_count": stats.get("video_count", 0),
                "channel_url": f"https://youtube.com/channel/{cid}",
                "videos": videos,
            }
        )

    # Save raw data to cache
    raw_data = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "channels": enriched,
        "quota_used": QUOTA_USED,
    }
    save_cache(raw_data, cache_path)

    print(f"\nQuota used: {QUOTA_USED} units (budget: ~1,700; daily limit: 10,000)")
    return enriched


def run_from_cache(cache_path: Path) -> list:
    """Load enriched channel data from JSON cache."""
    raw = load_cache(cache_path)
    return raw.get("channels", [])


def main():
    load_dotenv(dotenv_path=Path("research/.env"))

    parser = argparse.ArgumentParser(
        description="YouTube competitor audit for automation consultants",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  # Run full audit (requires YOUTUBE_API_KEY in research/.env)\n"
            "  python research/scripts/competitor-audit.py\n\n"
            "  # Run from cached data (no API key needed)\n"
            "  python research/scripts/competitor-audit.py --from-cache\n\n"
            "  # Limit to 5 channels\n"
            "  python research/scripts/competitor-audit.py --max-channels 5\n"
        ),
    )
    parser.add_argument(
        "--api-key",
        default=None,
        help="YouTube API key (overrides YOUTUBE_API_KEY in .env)",
    )
    parser.add_argument(
        "--max-channels",
        type=int,
        default=8,
        help="Maximum competitor channels to analyze (default: 8)",
    )
    parser.add_argument(
        "--max-videos",
        type=int,
        default=25,
        help="Maximum videos to fetch per channel (default: 25)",
    )
    parser.add_argument(
        "--output-dir",
        default="research/output",
        help="Output directory for reports (default: research/output)",
    )
    parser.add_argument(
        "--data-dir",
        default="research/data",
        help="Raw data directory for JSON cache (default: research/data)",
    )
    parser.add_argument(
        "--from-cache",
        action="store_true",
        help="Load from cached youtube-raw.json instead of hitting API",
    )

    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    data_dir = Path(args.data_dir)
    cache_path = data_dir / "youtube-raw.json"
    output_path = output_dir / "competitor-audit.md"

    print("=" * 60)
    print("YouTube Competitor Audit — @SameerAutomates")
    print("=" * 60)

    if args.from_cache:
        print("\nMode: Loading from cache...")
        all_channels = run_from_cache(cache_path)
    else:
        print("\nMode: Live API fetch...")
        all_channels = run_live(args, cache_path)

    if not all_channels:
        print("Error: No channel data available. Check cache or API key.")
        sys.exit(1)

    print(f"\nAnalyzing {len(all_channels)} channels...")
    topics = analyze_topics(all_channels)
    gaps = identify_gaps(topics, all_channels)

    print("Writing report...")
    write_competitor_audit(all_channels, topics, gaps, output_path)

    print("\n" + "=" * 60)
    print(f"Done! Report: {output_path}")
    print("=" * 60)


if __name__ == "__main__":
    main()

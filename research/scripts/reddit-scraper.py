#!/usr/bin/env python3
"""
Reddit Pain Point Scraper for Small Business Automation Research

Scrapes 14 subreddits using 12 targeted pain-point search queries to identify
automation opportunities requiring custom solutions (not off-the-shelf tools).

Usage:
    python research/scripts/reddit-scraper.py [options]
    python research/scripts/reddit-scraper.py --from-cache
    python research/scripts/reddit-scraper.py --scrape-only
    python research/scripts/reddit-scraper.py --analyze-only
"""

import argparse
import json
import os
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    print("ERROR: python-dotenv not installed. Run: pip install python-dotenv")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Configuration: subreddits and search terms (locked per CONTEXT.md)
# ---------------------------------------------------------------------------

SUBREDDITS = [
    # Trade-focused
    "HVAC",
    "plumbing",
    "electricians",
    "RealEstate",
    "smallbusiness",
    "entrepreneur",
    # Broader service
    "lawncare",
    "AutoDetailing",
    "HomeImprovement",
    "photography",
    "personaltraining",
    # SaaS complaint
    "SaaS",
    "nocode",
    "zapier",
]

SEARCH_TERMS = [
    # From ops/packages
    "missed call",
    "lead follow up",
    "appointment reminder",
    "quote follow up",
    "review request",
    "intake form",
    # Pain-point patterns
    "manually doing",
    "wasting time on",
    "wish there was a way to",
    "anyone automate",
    "tried zapier but",
    "tried hubspot but",
]

# ---------------------------------------------------------------------------
# Custom automation filters (Stage 2)
# ---------------------------------------------------------------------------

OFF_SHELF_SIGNALS = [
    "tried zapier",
    "tried hubspot",
    "tried monday",
    "tried make.com",
    "zapier doesn't",
    "zapier cant",
    "zapier can't",
    "too expensive for",
    "hitting limits",
    "doesn't do what i need",
    "outgrew",
    "outgrew zapier",
    "outgrew hubspot",
    "too complicated",
    "no integration",
    "doesn't integrate",
    "can't integrate",
    "hubspot doesn't",
    "salesforce doesn't",
    "servicetitan doesn't",
]

CUSTOM_SIGNALS = [
    "3 different systems",
    "three different systems",
    "multiple systems",
    "doesn't integrate",
    "api",
    "webhook",
    "industry-specific",
    "conditional",
    "if-then",
    "custom workflow",
    "no off-the-shelf",
    "doesn't talk to",
    "manual data entry",
    "copy paste",
    "copy and paste",
    "two systems",
    "several tools",
]

# ---------------------------------------------------------------------------
# Package mapping (for "ready to sell" flagging)
# ---------------------------------------------------------------------------

PACKAGE_MAPPING = {
    "missed call": "missed-call-text-back",
    "lead follow up": "lead-follow-up",
    "appointment reminder": "appointment-reminders",
    "quote follow up": "quote-follow-up",
    "review request": "review-reputation",
    "intake form": "custom-build-intake",
}

PACKAGE_DESCRIPTIONS = {
    "missed-call-text-back": "Missed Call Text-Back ($1,500 build / $200/mo)",
    "lead-follow-up": "Lead Follow-Up Automation ($2,500 build / $350/mo)",
    "appointment-reminders": "Appointment Reminder Sequence ($1,500 build / $200/mo)",
    "quote-follow-up": "Lead Nurture & Quote Follow-Up ($2,000 build / $300/mo)",
    "review-reputation": "Review & Reputation Automation ($1,500 build / $200/mo)",
    "custom-build-intake": "Custom Build — Discovery Call Intake ($2,500–$5,000 build)",
}

HUMAN_READABLE_TOPICS = {
    "missed call": "Missed Calls Losing Customers to Competitors",
    "lead follow up": "Leads Going Cold from Slow Response Times",
    "appointment reminder": "No-Shows and Last-Minute Cancellations",
    "quote follow up": "Quotes Sent With No Follow-Up or Close",
    "review request": "Google Review Gap Vs Competitors",
    "intake form": "Manual Client Intake and Onboarding Friction",
    "manually doing": "Repetitive Manual Tasks Consuming Owner Time",
    "wasting time on": "Administrative Time Drain on Revenue Activities",
    "wish there was a way to": "Workflow Gaps With No Off-the-Shelf Solution",
    "anyone automate": "Business Owners Actively Seeking Automation Help",
    "tried zapier but": "Zapier Limitations Forcing Custom Solutions",
    "tried hubspot but": "HubSpot Complexity Overkill for Small Trades",
}

CONTENT_ANGLES = {
    "missed call": "How a missed call text-back made one HVAC tech $4,200 last month without picking up the phone",
    "lead follow up": "The 5-minute rule that separates $1M trade businesses from $300K ones (it's not what you think)",
    "appointment reminder": "This simple automation cut a cleaning company's no-shows from 15% to 3% — here's exactly how",
    "quote follow up": "Why 70% of your sent quotes go cold (and the 3-touch sequence that recovers them)",
    "review request": "From 31 reviews to 147 in 90 days: the automated follow-up that did it",
    "intake form": "Stop losing an hour a day to client paperwork — here's the intake automation every service business needs",
    "manually doing": "I watched a plumber spend 45 minutes a day on admin work that a $50/mo automation could do in seconds",
    "wasting time on": "The hidden time tax killing small service businesses (and how automation fixes it for under $200/mo)",
    "wish there was a way to": "Business owners are begging for this automation — here's how to build it and sell it",
    "anyone automate": "Reddit's most-asked automation question answered: here's the custom build, step by step",
    "tried zapier but": "When Zapier isn't enough: the custom automation playbook for trade businesses",
    "tried hubspot but": "HubSpot is overkill for contractors — here's what small service businesses actually need",
}


# ---------------------------------------------------------------------------
# Stage 1: Data Collection via PRAW
# ---------------------------------------------------------------------------


def initialize_reddit_client():
    """Initialize PRAW Reddit client from .env credentials."""
    load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

    client_id = os.getenv("REDDIT_CLIENT_ID")
    client_secret = os.getenv("REDDIT_CLIENT_SECRET")
    username = os.getenv("REDDIT_USERNAME", "automation-researcher")

    if not client_id or client_id == "your_client_id_here":
        raise ValueError(
            "REDDIT_CLIENT_ID not set in research/.env\n"
            "Copy research/.env.example to research/.env and fill in your credentials.\n"
            "Use --from-cache to run against sample data without API credentials."
        )
    if not client_secret or client_secret == "your_client_secret_here":
        raise ValueError(
            "REDDIT_CLIENT_SECRET not set in research/.env\n"
            "Copy research/.env.example to research/.env and fill in your credentials.\n"
            "Use --from-cache to run against sample data without API credentials."
        )

    try:
        import praw
    except ImportError:
        print("ERROR: praw not installed. Run: pip install praw")
        sys.exit(1)

    reddit = praw.Reddit(
        client_id=client_id,
        client_secret=client_secret,
        user_agent=f"automation-research-tool/1.0 by u/{username}",
    )
    return reddit


def scrape_subreddit(reddit, subreddit_name, query, min_upvotes=5):
    """
    Search a subreddit with a query, return posts with top 5 comments.
    PRAW handles rate limiting internally — no sleep() calls needed.
    Uses replace_more(limit=0) to skip expensive "load more" expansions.
    """
    results = []
    try:
        sub = reddit.subreddit(subreddit_name)
        for submission in sub.search(
            query,
            sort="top",
            time_filter="year",
            limit=100,
        ):
            if submission.score < min_upvotes:
                continue
            # Fetch top 5 comments — skip "load more" to avoid extra API calls
            submission.comments.replace_more(limit=0)
            top_comments = [
                {"body": c.body, "score": c.score}
                for c in submission.comments.list()[:5]
                if hasattr(c, "body")
            ]
            results.append(
                {
                    "id": submission.id,
                    "title": submission.title,
                    "selftext": submission.selftext[:2000],  # cap at 2000 chars
                    "score": submission.score,
                    "url": submission.url,
                    "permalink": f"https://reddit.com{submission.permalink}",
                    "created_utc": submission.created_utc,
                    "subreddit": subreddit_name,
                    "num_comments": submission.num_comments,
                    "search_query": query,
                    "top_comments": top_comments,
                }
            )
    except Exception as e:
        print(f"  WARNING: Error scraping r/{subreddit_name} with '{query}': {e}")
    return results


def collect_reddit_data(reddit, subreddits, search_terms, min_upvotes, data_dir):
    """
    Stage 1: Collect posts from all subreddits x all search terms.
    Deduplicates by Reddit ID.
    Saves raw data to reddit-raw.json.
    """
    all_posts = {}  # keyed by Reddit post ID for deduplication

    total_queries = len(subreddits) * len(search_terms)
    completed = 0

    for sub in subreddits:
        for term in search_terms:
            completed += 1
            print(
                f"  [{completed}/{total_queries}] r/{sub} — '{term}'",
                end="",
                flush=True,
            )
            posts = scrape_subreddit(reddit, sub, term, min_upvotes)
            new_count = 0
            for post in posts:
                if post["id"] not in all_posts:
                    all_posts[post["id"]] = post
                    new_count += 1
            print(f" → {new_count} new posts ({len(all_posts)} total unique)")

    unique_posts = list(all_posts.values())
    print(
        f"\nCollected {len(unique_posts)} unique posts from {len(subreddits)} subreddits"
    )

    # Save raw data
    os.makedirs(data_dir, exist_ok=True)
    output_path = os.path.join(data_dir, "reddit-raw.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(
            {
                "collected_at": datetime.now(timezone.utc).isoformat(),
                "subreddits": subreddits,
                "search_terms": search_terms,
                "min_upvotes": min_upvotes,
                "total_posts": len(unique_posts),
                "posts": unique_posts,
            },
            f,
            indent=2,
            ensure_ascii=False,
        )
    print(f"Raw data saved to {output_path}")
    return unique_posts


def load_cached_data(data_dir):
    """Load raw Reddit data from cache instead of hitting API."""
    cache_path = os.path.join(data_dir, "reddit-raw.json")
    if not os.path.exists(cache_path):
        print(f"ERROR: Cache file not found at {cache_path}")
        print(
            "Run without --from-cache to collect data first, or ensure sample data exists."
        )
        sys.exit(1)
    with open(cache_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    posts = data.get("posts", [])
    print(f"Loaded {len(posts)} posts from cache ({cache_path})")
    return posts


# ---------------------------------------------------------------------------
# Stage 2: Custom Automation Filtering
# ---------------------------------------------------------------------------


def is_custom_automation_post(post):
    """
    Returns True if post signals that the problem requires custom automation.
    Criteria:
      (a) Mentions trying off-the-shelf tools and hitting limits
      (b) Involves 3+ systems, conditional logic, or industry-specific rules
    """
    text = " ".join(
        [
            post.get("title", ""),
            post.get("selftext", ""),
            " ".join(c.get("body", "") for c in post.get("top_comments", [])),
        ]
    ).lower()

    has_off_shelf = any(signal in text for signal in OFF_SHELF_SIGNALS)
    has_custom = any(signal in text for signal in CUSTOM_SIGNALS)
    return has_off_shelf or has_custom


def filter_custom_automation_posts(posts):
    """Stage 2: Filter posts to those requiring custom automation."""
    filtered = [p for p in posts if is_custom_automation_post(p)]
    print(f"Custom-automation filter: {len(filtered)}/{len(posts)} posts qualify")
    return filtered


# ---------------------------------------------------------------------------
# Stage 3: Topic Scoring and Ranking
# ---------------------------------------------------------------------------


def score_topics(filtered_posts, search_terms):
    """
    Stage 3: Score and rank topics by weighted frequency.
    Scoring: post_score * 1.0 + num_relevant_comments * 0.5
    Tiebreak: subreddit spread (more subreddits = more universal pain point)
    """
    # topic_posts[term] = list of posts that mention this term
    topic_posts = defaultdict(list)
    topic_subs = defaultdict(set)
    topic_scores = Counter()
    topic_evidence = defaultdict(list)

    for post in filtered_posts:
        post_text = " ".join(
            [
                post.get("title", ""),
                post.get("selftext", ""),
            ]
        ).lower()

        for term in search_terms:
            if term.lower() in post_text:
                weight = post.get("score", 1) * 1.0 + post.get("num_comments", 0) * 0.5
                topic_scores[term] += weight
                topic_posts[term].append(post)
                topic_subs[term].add(post.get("subreddit", "unknown"))

                # Collect evidence quotes (up to 3 per topic)
                if len(topic_evidence[term]) < 3:
                    title = post.get("title", "").strip()
                    if title and len(title) > 20:
                        quote_entry = {
                            "text": title,
                            "subreddit": post.get("subreddit", "unknown"),
                            "score": post.get("score", 0),
                            "permalink": post.get("permalink", ""),
                        }
                        # Avoid duplicate quotes
                        existing_texts = [e["text"] for e in topic_evidence[term]]
                        if title not in existing_texts:
                            topic_evidence[term].append(quote_entry)

                # Also check top comments for evidence
                for comment in post.get("top_comments", [])[:2]:
                    body = comment.get("body", "").strip()
                    if (
                        term.lower() in body.lower()
                        and len(body) > 30
                        and len(body) < 300
                    ):
                        if len(topic_evidence[term]) < 3:
                            quote_entry = {
                                "text": body[:250],
                                "subreddit": post.get("subreddit", "unknown"),
                                "score": comment.get("score", 0),
                                "permalink": post.get("permalink", ""),
                                "is_comment": True,
                            }
                            existing_texts = [e["text"] for e in topic_evidence[term]]
                            if body[:250] not in existing_texts:
                                topic_evidence[term].append(quote_entry)

    # Rank: primary by score, tiebreak by subreddit spread
    ranked = sorted(
        topic_scores.keys(),
        key=lambda t: (topic_scores[t], len(topic_subs[t])),
        reverse=True,
    )[:15]

    results = []
    for term in ranked:
        results.append(
            {
                "term": term,
                "human_title": HUMAN_READABLE_TOPICS.get(term, term.title()),
                "weighted_score": round(topic_scores[term], 1),
                "post_count": len(topic_posts[term]),
                "subreddit_spread": len(topic_subs[term]),
                "subreddits": sorted(topic_subs[term]),
                "package": PACKAGE_MAPPING.get(term),
                "package_description": PACKAGE_DESCRIPTIONS.get(
                    PACKAGE_MAPPING.get(term, ""), None
                ),
                "content_angle": CONTENT_ANGLES.get(
                    term, f"How {term} is costing service businesses money"
                ),
                "evidence": topic_evidence[term],
            }
        )

    return results


# ---------------------------------------------------------------------------
# Stage 4: Report Generation — write topic-bank.md
# ---------------------------------------------------------------------------


def write_topic_bank(
    ranked_topics, all_posts, filtered_posts, output_dir, is_preliminary=False
):
    """
    Stage 4: Generate research/output/topic-bank.md from scored topics.
    Follows the report structure defined in CONTEXT.md exactly.
    """
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "topic-bank.md")

    unique_subs = set(p.get("subreddit", "") for p in all_posts)
    now = datetime.now().strftime("%Y-%m-%d")

    lines = []

    # Preliminary warning if using sample data
    if is_preliminary:
        lines.append("> **PRELIMINARY — Generated from sample data.**\n")
        lines.append("> Re-run with live Reddit API credentials for real results.\n")
        lines.append(
            "> Set REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME in `research/.env`\n"
        )
        lines.append("> then run: `python research/scripts/reddit-scraper.py`\n\n")

    lines.append("# Topic Bank: Automation Pain Points\n\n")
    lines.append(f"_Generated by research/scripts/reddit-scraper.py on {now}_\n")
    lines.append(
        f"_Data source: {len(all_posts)} Reddit posts from {len(unique_subs)} subreddits, 12-month window_\n\n"
    )

    # Summary section
    lines.append("## Summary\n\n")
    lines.append(f"- Total posts collected: {len(all_posts)}\n")
    lines.append(f"- Posts matching custom-automation filter: {len(filtered_posts)}\n")
    lines.append(f"- Topics identified: {len(ranked_topics)}\n\n")

    # Ranked summary table
    lines.append("## Ranked Topics\n\n")
    lines.append(
        "| Rank | Pain Point | Score | Posts | Subreddits | Package Match | Status |\n"
    )
    lines.append(
        "| ---- | ---------- | ----- | ----- | ---------- | ------------- | ------ |\n"
    )

    for i, topic in enumerate(ranked_topics, 1):
        pkg = topic.get("package_description") or "New development needed"
        status = "Ready to sell" if topic.get("package") else "New development needed"
        lines.append(
            f"| {i} | {topic['human_title']} | {topic['weighted_score']} | "
            f"{topic['post_count']} | {topic['subreddit_spread']} | "
            f"{pkg} | {status} |\n"
        )

    lines.append("\n")

    # Topic Details
    lines.append("## Topic Details\n\n")

    for i, topic in enumerate(ranked_topics, 1):
        pkg = topic.get("package_description") or "New development needed"
        status = "Ready to sell" if topic.get("package") else "New development needed"

        lines.append(f"### {i}. {topic['human_title']}\n\n")
        lines.append(
            f"**Score:** {topic['weighted_score']} | "
            f"**Posts:** {topic['post_count']} | "
            f"**Subreddit spread:** {topic['subreddit_spread']}\n"
        )
        lines.append(f"**Package:** {pkg}\n")
        lines.append(f"**Status:** {status}\n")
        lines.append(f"**Content angle:** {topic['content_angle']}\n")

        if topic.get("subreddits"):
            sub_list = ", ".join(f"r/{s}" for s in topic["subreddits"][:8])
            lines.append(f"**Subreddits:** {sub_list}\n")

        lines.append("\n**Evidence:**\n\n")

        evidence = topic.get("evidence", [])
        if evidence:
            for quote in evidence:
                sub = quote.get("subreddit", "unknown")
                score = quote.get("score", 0)
                text = quote.get("text", "").replace('"', '\\"')
                is_comment = quote.get("is_comment", False)
                source_type = "comment" if is_comment else "post"
                lines.append(
                    f'> "{text}" — r/{sub}, {score} upvotes ({source_type})\n\n'
                )
        else:
            lines.append(
                "> No direct quotes collected — re-run with live API for real evidence\n\n"
            )

        lines.append("\n")

    # Package Mapping Summary
    lines.append("## Package Mapping Summary\n\n")
    lines.append("| Existing Package | Matched Topics | Market Validation |\n")
    lines.append("| ---------------- | -------------- | ----------------- |\n")

    package_to_topics = defaultdict(list)
    for topic in ranked_topics:
        if topic.get("package"):
            package_to_topics[topic["package"]].append(topic["human_title"])

    all_packages = [
        "missed-call-text-back",
        "lead-follow-up",
        "appointment-reminders",
        "quote-follow-up",
        "review-reputation",
        "custom-build-intake",
    ]
    for pkg in all_packages:
        topics_matched = package_to_topics.get(pkg, [])
        if topics_matched:
            topic_str = "; ".join(topics_matched)
            post_counts = [
                t["post_count"] for t in ranked_topics if t.get("package") == pkg
            ]
            total_posts = sum(post_counts)
            validation = f"{total_posts} posts validate this pain point"
        else:
            topic_str = "No direct match in this dataset"
            validation = "Consider adding to next research run"
        lines.append(f"| {pkg} | {topic_str} | {validation} |\n")

    lines.append("\n")

    # Insights section
    lines.append("## Insights\n\n")

    # Find highest-scoring subreddits
    sub_counts = Counter()
    for post in filtered_posts:
        sub_counts[post.get("subreddit", "unknown")] += 1
    top_subs = sub_counts.most_common(5)

    # Find warmest leads (topics with off-shelf signal)
    ready_to_sell = [t for t in ranked_topics if t.get("package")]
    new_dev = [t for t in ranked_topics if not t.get("package")]

    lines.append(
        f"- **{len(ready_to_sell)} of {len(ranked_topics)} topics** map directly to existing packages — these are ready-to-sell with no new development needed\n"
    )
    lines.append(
        f"- **{len(new_dev)} topics** represent new service development opportunities\n"
    )

    if top_subs:
        top_sub_str = ", ".join(f"r/{s} ({c} posts)" for s, c in top_subs[:3])
        lines.append(f"- **Highest pain point density:** {top_sub_str}\n")

    lines.append(
        "- **Warmest leads** (strongest 'tried X but...' signals): topics ranked 1-3 indicate active tool frustration — prospects are already sold on automation, they just need the right builder\n"
    )
    lines.append(
        "- **Content strategy:** Lead with the ROI-focused angles (specific dollar amounts, time recovered) — this differentiates from builder-tutorial competitors per Phase 5 competitor audit\n"
    )
    lines.append(
        "- **Next step:** Use this topic bank as the input for Phase 7 video ideation — each topic maps to at least one YouTube video concept with a ready-made hook from the evidence quotes\n"
    )

    with open(output_path, "w", encoding="utf-8") as f:
        f.writelines(lines)

    print(f"Topic bank written to {output_path}")
    return output_path


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------


def parse_args():
    parser = argparse.ArgumentParser(
        description="Scrape Reddit for small business automation pain points and produce a ranked topic bank",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Full run (requires Reddit API credentials in research/.env)
  python research/scripts/reddit-scraper.py

  # Development mode: use cached data, skip API calls
  python research/scripts/reddit-scraper.py --from-cache

  # Collect raw data only, skip analysis (useful for incremental runs)
  python research/scripts/reddit-scraper.py --scrape-only

  # Analyze existing cached data, skip API calls
  python research/scripts/reddit-scraper.py --analyze-only

  # Override subreddits and minimum upvotes
  python research/scripts/reddit-scraper.py --subreddits smallbusiness HVAC --min-upvotes 10

Output files:
  research/data/reddit-raw.json    — raw post + comment data (gitignored)
  research/output/topic-bank.md   — ranked pain points with evidence
        """,
    )
    parser.add_argument(
        "--subreddits",
        nargs="+",
        default=SUBREDDITS,
        metavar="SUBREDDIT",
        help="Override default subreddit list (default: 14 curated subreddits)",
    )
    parser.add_argument(
        "--min-upvotes",
        type=int,
        default=5,
        metavar="INT",
        help="Minimum post upvotes to include (default: 5)",
    )
    parser.add_argument(
        "--output-dir",
        default="research/output",
        metavar="PATH",
        help="Output directory for topic-bank.md (default: research/output)",
    )
    parser.add_argument(
        "--data-dir",
        default="research/data",
        metavar="PATH",
        help="Directory for raw JSON data (default: research/data)",
    )
    parser.add_argument(
        "--from-cache",
        action="store_true",
        help="Load raw data from reddit-raw.json instead of hitting the API",
    )
    parser.add_argument(
        "--scrape-only",
        action="store_true",
        help="Collect data but skip analysis (saves reddit-raw.json, no topic-bank.md)",
    )
    parser.add_argument(
        "--analyze-only",
        action="store_true",
        help="Run analysis on existing cached data, skip API calls (alias for --from-cache)",
    )
    return parser.parse_args()


def main():
    args = parse_args()

    # --analyze-only is an alias for --from-cache
    if args.analyze_only:
        args.from_cache = True

    # Resolve paths relative to project root
    # When run from project root: research/data, research/output
    # When run from research/: data, output
    script_dir = Path(__file__).parent
    project_root = script_dir.parent.parent

    def resolve_path(p):
        path = Path(p)
        if path.is_absolute():
            return path
        # Try relative to cwd first, then relative to project root
        cwd_path = Path.cwd() / path
        root_path = project_root / path
        if cwd_path.exists():
            return cwd_path
        return root_path

    data_dir = str(resolve_path(args.data_dir))
    output_dir = str(resolve_path(args.output_dir))

    print("=" * 60)
    print("Reddit Pain Point Scraper — @SameerAutomates Research")
    print("=" * 60)
    print(f"Subreddits: {len(args.subreddits)} | Search terms: {len(SEARCH_TERMS)}")
    print(
        f"Min upvotes: {args.min_upvotes} | Mode: {'from-cache' if args.from_cache else 'live API'}"
    )
    print()

    # ---------------------------------------------------------------------------
    # Stage 1: Data Collection
    # ---------------------------------------------------------------------------
    if args.from_cache:
        print("Stage 1: Loading cached data...")
        all_posts = load_cached_data(data_dir)
        is_preliminary = True
        # Check if this is real data or sample data
        cache_path = os.path.join(data_dir, "reddit-raw.json")
        with open(cache_path) as f:
            cache_meta = json.load(f)
        if cache_meta.get("is_sample_data"):
            print(
                "NOTE: Cache contains sample/mock data — topic-bank.md will be marked PRELIMINARY"
            )
        else:
            is_preliminary = False
            print("Cache contains live Reddit data — generating production topic bank")
    else:
        print("Stage 1: Collecting Reddit data via PRAW...")
        try:
            reddit = initialize_reddit_client()
        except ValueError as e:
            print(f"\nERROR: {e}\n")
            sys.exit(1)

        all_posts = collect_reddit_data(
            reddit,
            args.subreddits,
            SEARCH_TERMS,
            args.min_upvotes,
            data_dir,
        )
        is_preliminary = False

    if args.scrape_only:
        print("\nScrape-only mode: skipping analysis and report generation.")
        print(f"Raw data saved to {data_dir}/reddit-raw.json")
        return

    print()

    # ---------------------------------------------------------------------------
    # Stage 2: Custom Automation Filtering
    # ---------------------------------------------------------------------------
    print("Stage 2: Filtering for custom-automation signals...")
    filtered_posts = filter_custom_automation_posts(all_posts)
    print()

    # ---------------------------------------------------------------------------
    # Stage 3: Topic Scoring and Ranking
    # ---------------------------------------------------------------------------
    print("Stage 3: Scoring and ranking topics...")
    ranked_topics = score_topics(filtered_posts, SEARCH_TERMS)
    if not ranked_topics:
        print(
            "WARNING: No topics scored. This may indicate the custom-automation filter"
        )
        print("is too strict for the current dataset. Try running with more posts or")
        print("adjusting the filter signals.")
        # Fall back: score without custom filter
        print("Falling back to unfiltered scoring...")
        ranked_topics = score_topics(all_posts, SEARCH_TERMS)
        filtered_posts = all_posts

    print(f"Identified {len(ranked_topics)} ranked topics")
    for i, t in enumerate(ranked_topics[:5], 1):
        print(
            f"  {i}. {t['human_title']} (score: {t['weighted_score']}, posts: {t['post_count']})"
        )
    if len(ranked_topics) > 5:
        print(f"  ... and {len(ranked_topics) - 5} more")
    print()

    # ---------------------------------------------------------------------------
    # Stage 4: Report Generation
    # ---------------------------------------------------------------------------
    print("Stage 4: Generating topic-bank.md...")
    output_path = write_topic_bank(
        ranked_topics, all_posts, filtered_posts, output_dir, is_preliminary
    )

    print()
    print("=" * 60)
    print("Done!")
    print(f"  Raw data:   {data_dir}/reddit-raw.json")
    print(f"  Topic bank: {output_path}")
    if is_preliminary:
        print()
        print("NOTE: This topic bank is PRELIMINARY — generated from sample data.")
        print("Re-run without --from-cache after setting real Reddit credentials")
        print("in research/.env to get real market evidence.")
    print("=" * 60)


if __name__ == "__main__":
    main()

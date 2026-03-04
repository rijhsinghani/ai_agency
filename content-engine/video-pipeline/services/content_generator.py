import os
import json
import logging

import anthropic
from supabase import create_client

from config import SUPABASE_URL, SUPABASE_SERVICE_KEY

logger = logging.getLogger(__name__)

SLOP_BANLIST = [
    "in today's fast-paced world",
    "game-changer",
    "game changer",
    "seamlessly integrates",
    "seamlessly integrated",
    "let's dive in",
    "let me dive in",
    "groundbreaking",
    "leverage",
    "leveraging",
    "robust",
    "cutting-edge",
    "cutting edge",
    "synergy",
    "scalable solution",
    "holistic approach",
    "paradigm shift",
    "unlock",
    "revolutionize",
]

CONTENT_GENERATION_PROMPT = """You are writing social media content for Sameer Rijhsinghani, an AI automation consultant who helps small business owners recover lost revenue and time through custom automations.

BRAND VOICE:
- Direct, no-nonsense. Speaks like a trusted advisor, not a marketer
- Uses real numbers from the story (never generic claims)
- Buyer-focused: outcomes for the business owner, not technical details
- Short sentences. Active voice. Contractions are fine
- No emojis, no hashtags in body copy
- CTA is always: "Book a free 15-min discovery call" with link https://calendar.app.google/psycao3CrXjGnmk48

BANNED PHRASES (never use these):
{slop_list}

VIDEO CONTEXT:
Topic: {topic_title}
Hook: {hook}
Transcript excerpt (first 2000 chars): {transcript_excerpt}

Generate content for all 6 platforms. Return ONLY valid JSON with these exact keys:

{{
  "youtube_title": "Under 60 chars. Specific outcome or contrarian claim. No generic AI hype.",
  "youtube_description": "First line = hook (same as video hook). Then 3-5 bullet points covering what viewers learn. End with booking CTA. Include 'Book a free 15-min discovery call: https://calendar.app.google/psycao3CrXjGnmk48'. Under 500 chars for above-the-fold.",
  "youtube_short_description": "One sentence hook for Shorts. Under 100 chars. Add #Shorts at end.",
  "twitter_thread": ["Tweet 1: hook/claim (under 280 chars)", "Tweet 2: context (under 280 chars)", "Tweet 3: the surprising detail (under 280 chars)", "Tweet 4: actionable takeaway (under 280 chars)", "Tweet 5: CTA with booking link (under 280 chars)"],
  "instagram_caption": "First line = hook (stops the scroll). Then 3-5 lines covering the story. End with CTA. No hashtags. Under 200 chars above the fold.",
  "substack_intro": "Opening paragraph for a Substack deep-dive article. 2-3 sentences. Sets up the problem and stakes. Conversational tone.",
  "threads_post": "Single standalone post for Threads. Conversational, like something you'd tell a friend. Specific and concrete. Under 300 chars."
}}

Use ONLY real facts from the transcript. Do not invent statistics or outcomes not mentioned in the video."""


def generate_platform_content(
    transcript: str,
    topic_title: str,
    hook: str,
    brand: str = "sameer_automations",
) -> dict:
    """Generate platform-specific content drafts using Claude with anti-slop architecture.

    Returns dict with keys: youtube_title, youtube_description, youtube_short_description,
    twitter_thread (list), instagram_caption, substack_intro, threads_post
    """
    if not transcript or not transcript.strip():
        raise ValueError("Transcript is required for content generation")

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY environment variable is required")

    # Format the slop banlist for the prompt
    slop_formatted = "\n".join(f"- {phrase}" for phrase in SLOP_BANLIST)

    # Use first 2000 chars of transcript for context (avoid token bloat)
    transcript_excerpt = transcript[:2000]

    prompt = CONTENT_GENERATION_PROMPT.format(
        slop_list=slop_formatted,
        topic_title=topic_title,
        hook=hook,
        transcript_excerpt=transcript_excerpt,
    )

    client = anthropic.Anthropic(api_key=api_key)
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )

    raw_text = response.content[0].text.strip()
    # Strip markdown code fences if present
    if raw_text.startswith("```"):
        raw_text = raw_text.split("\n", 1)[1]
        raw_text = raw_text.rsplit("```", 1)[0].strip()

    content = json.loads(raw_text)

    # Validate no slop phrases made it through
    _check_for_slop(content)

    # Validate youtube_title length
    if len(content.get("youtube_title", "")) > 60:
        logger.warning(
            f"YouTube title exceeds 60 chars: {len(content['youtube_title'])} — truncating"
        )
        content["youtube_title"] = content["youtube_title"][:57] + "..."

    logger.info(f"Generated content for topic: {topic_title}")
    return content


def _check_for_slop(content: dict) -> None:
    """Warn (but don't fail) if slop phrases appear in generated content."""
    all_text = json.dumps(content).lower()
    found = [phrase for phrase in SLOP_BANLIST if phrase.lower() in all_text]
    if found:
        logger.warning(f"Slop phrases detected in generated content: {found}")
        # Don't raise — log for review. Human reviews before publishing.


def store_drafts_in_supabase(
    content_bank_id: str,
    content: dict,
    clip_paths: list[str],
    clip_metadata: list[dict],
) -> None:
    """Store generated content drafts in content_bank and update status to pending_review."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        logger.warning("Supabase credentials not configured — skipping draft storage")
        return

    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    update_data = {
        "platform_angles": {
            "youtube_long": {
                "title": content.get("youtube_title"),
                "description": content.get("youtube_description"),
            },
            "youtube_short": content.get("youtube_short_description"),
            "twitter": content.get("twitter_thread"),
            "instagram": content.get("instagram_caption"),
            "substack": content.get("substack_intro"),
            "threads": content.get("threads_post"),
        },
        "visual_assets": {
            "clips": [
                {
                    "path": path,
                    "hook": meta.get("hook"),
                    "type": meta.get("type"),
                    "strength_score": meta.get("strength_score"),
                }
                for path, meta in zip(clip_paths, clip_metadata)
            ]
        },
        "status": "pending_review",
        "sync_source": "supabase",
    }

    supabase.table("content_bank").update(update_data).eq(
        "id", content_bank_id
    ).execute()
    logger.info(
        f"Updated content_bank row {content_bank_id} with drafts (status=pending_review)"
    )

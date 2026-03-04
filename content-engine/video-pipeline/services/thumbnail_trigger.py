import os
import json
import logging
from datetime import datetime

from google.cloud import storage

logger = logging.getLogger(__name__)


def trigger_thumbnail_generation(
    video_title: str,
    processed_video_gcs_uri: str,
    brand: str,
    content_bank_id: str,
    output_bucket: str = None,
) -> str:
    """Write a thumbnail generation trigger JSON to GCS.

    The claude-thumbnails skill monitors the thumbnails-pending/ prefix
    and processes these trigger files when run manually.

    Returns the GCS URI of the trigger file.
    """
    output_bucket = output_bucket or os.environ.get(
        "GCS_OUTPUT_BUCKET", "video-pipeline-output"
    )

    trigger_data = {
        "video_title": video_title,
        "video_gcs_uri": processed_video_gcs_uri,
        "brand": brand,
        "content_bank_id": content_bank_id,
        "created_at": datetime.utcnow().isoformat(),
        "status": "pending",
        "skill": "youtube-thumbnail",
        "instructions": (
            "Generate 4 thumbnail variations using .claude/skills/youtube-thumbnail/SKILL.md. "
            "Store outputs in content_bank.visual_assets.thumbnails."
        ),
    }

    gcs = storage.Client()
    timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    trigger_name = f"thumbnails-pending/{timestamp}-{content_bank_id[:8]}.json"

    bucket = gcs.bucket(output_bucket)
    blob = bucket.blob(trigger_name)
    blob.upload_from_string(
        json.dumps(trigger_data, indent=2),
        content_type="application/json",
    )

    trigger_uri = f"gs://{output_bucket}/{trigger_name}"
    logger.info(f"Thumbnail generation trigger written to {trigger_uri}")
    return trigger_uri

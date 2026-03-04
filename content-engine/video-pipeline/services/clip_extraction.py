import os
import json
import subprocess
import logging

import google.generativeai as genai

logger = logging.getLogger(__name__)

CLIP_ANALYSIS_PROMPT = """Analyze this video and identify the 5-8 best moments for a 15-30 second Short or Reel.

For each moment, provide:
- start_time: MM:SS format
- end_time: MM:SS format
- hook: the first sentence that makes someone stop scrolling (plain language, no jargon)
- type: one of [contrarian_claim, surprising_data, emotional_reaction, actionable_tip]
- strength_score: 1-10 for how likely this clip is to get replays

Focus ONLY on moments with:
- A contrarian or counterintuitive claim
- A specific number, data point, or dollar figure
- A visible emotional reaction (surprise, frustration, excitement)
- A single actionable tip a viewer can use immediately

Do NOT select generic "let me explain this concept" moments. Every clip must have a strong hook in the first 2 seconds.

Return ONLY a valid JSON array. No markdown, no explanation, just the JSON.

Example format:
[
  {
    "start_time": "03:45",
    "end_time": "04:12",
    "hook": "This one setting recovers 40% of missed calls automatically",
    "type": "actionable_tip",
    "strength_score": 9
  }
]"""


def analyze_video_for_clips(video_gcs_uri: str) -> list[dict]:
    """Use Gemini 3.1 Pro to identify 5-8 high-engagement moments in a video.

    Args:
        video_gcs_uri: GCS URI like gs://bucket/path/video.mp4

    Returns:
        List of clip dicts with start_time, end_time, hook, type, strength_score
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is required")

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-3.1-pro-preview")

    logger.info(f"Uploading video to Gemini API: {video_gcs_uri}")
    video_file = genai.upload_file(path=video_gcs_uri, mime_type="video/mp4")

    logger.info("Analyzing video with Gemini 3.1 Pro for clip moments...")
    response = model.generate_content(
        [video_file, CLIP_ANALYSIS_PROMPT],
        generation_config=genai.types.GenerationConfig(
            temperature=0.3,  # Lower temp for more consistent JSON output
        ),
    )

    # Parse JSON response
    raw_text = response.text.strip()
    # Strip markdown code fences if Gemini adds them
    if raw_text.startswith("```"):
        raw_text = raw_text.split("\n", 1)[1]
        raw_text = raw_text.rsplit("```", 1)[0].strip()

    clips = json.loads(raw_text)

    # Validate structure
    required_keys = {"start_time", "end_time", "hook", "type", "strength_score"}
    valid_types = {
        "contrarian_claim",
        "surprising_data",
        "emotional_reaction",
        "actionable_tip",
    }

    for clip in clips:
        missing = required_keys - set(clip.keys())
        if missing:
            raise ValueError(f"Clip missing required fields: {missing}")
        if clip["type"] not in valid_types:
            logger.warning(f"Unknown clip type '{clip['type']}' — keeping but noting")

    logger.info(f"Gemini identified {len(clips)} clip moments")
    return clips


def extract_clips(video_path: str, clips: list[dict], output_dir: str) -> list[str]:
    """Extract clip segments from video at 9:16 with burned-in captions.

    Args:
        video_path: Local path to the processed (captioned) video
        clips: List of clip dicts from analyze_video_for_clips
        output_dir: Directory to write extracted clips

    Returns:
        List of output MP4 file paths
    """
    os.makedirs(output_dir, exist_ok=True)
    srt_path = video_path.replace(".mp4", ".srt")
    output_paths = []

    for i, clip in enumerate(clips):
        start_sec = _parse_mm_ss(clip["start_time"])
        end_sec = _parse_mm_ss(clip["end_time"])
        duration = end_sec - start_sec

        if duration > 60:
            logger.warning(
                f"Clip {i} duration {duration:.1f}s exceeds 60s Shorts limit — truncating to 58s"
            )
            end_sec = start_sec + 58
            duration = 58

        output_path = os.path.join(output_dir, f"clip_{i + 1:02d}_{clip['type']}.mp4")

        # ffmpeg: extract clip at 9:16, crop to vertical, burn captions if available
        vf_filter = "crop=ih*9/16:ih,scale=1080:1920"
        if os.path.exists(srt_path):
            # Offset SRT timestamps to match clip start time
            vf_filter += (
                f",subtitles={srt_path}:force_style="
                "'FontName=Roc Grotesk,FontSize=20,PrimaryColour=&HFFFFFF,"
                "OutlineColour=&H000000,Outline=2,Alignment=2'"
            )

        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-ss",
                str(start_sec),
                "-i",
                video_path,
                "-t",
                str(duration),
                "-vf",
                vf_filter,
                "-c:v",
                "libx264",
                "-preset",
                "fast",
                "-crf",
                "22",
                "-c:a",
                "aac",
                "-b:a",
                "128k",
                "-r",
                "30",  # 30fps for Shorts
                output_path,
            ],
            check=True,
            capture_output=True,
        )

        output_paths.append(output_path)
        logger.info(f"Extracted clip {i + 1}: {clip['hook'][:50]}... -> {output_path}")

    return output_paths


def _parse_mm_ss(timestamp: str) -> float:
    """Parse MM:SS timestamp string to seconds."""
    parts = timestamp.strip().split(":")
    if len(parts) != 2:
        raise ValueError(f"Invalid timestamp format '{timestamp}' — expected MM:SS")
    try:
        minutes, seconds = int(parts[0]), int(parts[1])
    except ValueError:
        raise ValueError(
            f"Invalid timestamp values in '{timestamp}' — expected integers"
        )
    return float(minutes * 60 + seconds)

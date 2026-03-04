import subprocess
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import (
    CAPTION_FONT,
    CAPTION_FONT_SIZE,
    CAPTION_PRIMARY_COLOR,
    CAPTION_OUTLINE_COLOR,
    CAPTION_OUTLINE_WIDTH,
)


def burn_captions(input_path: str, srt_path: str, output_path: str) -> str:
    """Step 6: Burn SRT captions into video with brand-consistent styling."""
    force_style = (
        f"FontName={CAPTION_FONT},"
        f"FontSize={CAPTION_FONT_SIZE},"
        f"PrimaryColour={CAPTION_PRIMARY_COLOR},"
        f"OutlineColour={CAPTION_OUTLINE_COLOR},"
        f"Outline={CAPTION_OUTLINE_WIDTH},"
        f"Alignment=2"  # Bottom center
    )
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            input_path,
            "-vf",
            f"subtitles={srt_path}:force_style='{force_style}'",
            "-c:a",
            "copy",
            output_path,
        ],
        check=True,
        capture_output=True,
    )
    return output_path

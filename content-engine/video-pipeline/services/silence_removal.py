import subprocess

import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import SILENCE_THRESHOLD, SILENCE_MARGIN


def remove_silence(input_path: str, output_path: str) -> str:
    """Step 2: Remove silence using auto-editor (content-creator-friendly settings)."""
    subprocess.run(
        [
            "auto-editor",
            input_path,
            "--margin",
            SILENCE_MARGIN,
            "--silent-threshold",
            SILENCE_THRESHOLD,
            "--video-codec",
            "h264",
            "--audio-codec",
            "aac",
            "-o",
            output_path,
            "--no-open",
        ],
        check=True,
        capture_output=True,
    )
    return output_path

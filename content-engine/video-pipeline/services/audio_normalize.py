import subprocess
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import LUFS_TARGET, TRUE_PEAK_CEILING, LOUDNESS_RANGE_TARGET


def normalize_audio(input_path: str, output_path: str) -> str:
    """Step 3: Normalize audio to -14 LUFS (YouTube standard) with -1 dBTP true peak."""
    subprocess.run(
        [
            "ffmpeg-normalize",
            input_path,
            "-o",
            output_path,
            "-t",
            str(LUFS_TARGET),
            "-tp",
            str(TRUE_PEAK_CEILING),
            "-lrt",
            str(LOUDNESS_RANGE_TARGET),
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "--keep-loudness-range-target",
            "--progress",
        ],
        check=True,
    )
    return output_path

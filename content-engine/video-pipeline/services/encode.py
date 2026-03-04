import subprocess
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import OUTPUT_RESOLUTION, OUTPUT_CRC, OUTPUT_AUDIO_BITRATE


def final_encode(input_path: str, output_path: str) -> str:
    """Step 9: Final H.264 encode at 1080p with web-optimized settings."""
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            input_path,
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            str(OUTPUT_CRC),
            "-vf",
            f"scale={OUTPUT_RESOLUTION}",
            "-c:a",
            "aac",
            "-b:a",
            OUTPUT_AUDIO_BITRATE,
            "-movflags",
            "+faststart",
            "-pix_fmt",
            "yuv420p",  # BT.709 compatible
            "-color_primaries",
            "bt709",
            "-color_trc",
            "bt709",
            "-colorspace",
            "bt709",
            output_path,
        ],
        check=True,
        capture_output=True,
    )
    return output_path

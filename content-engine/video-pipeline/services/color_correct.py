import subprocess
import os
import shutil


def apply_color_correction(input_path: str, output_path: str) -> str:
    """Step 7: Apply brand LUT for consistent color grading across all videos."""
    lut_path = os.path.join(os.path.dirname(__file__), "..", "assets", "brand.cube")

    if not os.path.exists(lut_path):
        # No brand LUT available yet — pass through without color correction
        shutil.copy(input_path, output_path)
        return output_path

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            input_path,
            "-vf",
            f"lut3d={lut_path}",
            "-c:a",
            "copy",
            output_path,
        ],
        check=True,
        capture_output=True,
    )
    return output_path

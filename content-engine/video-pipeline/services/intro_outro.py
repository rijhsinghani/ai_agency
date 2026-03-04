import subprocess
import os
import shutil
import tempfile


def splice_intro_outro(input_path: str, output_path: str) -> str:
    """Step 8: Prepend 5-second branded intro and append outro via ffmpeg concat."""
    intro_path = os.path.join(os.path.dirname(__file__), "..", "assets", "intro.mp4")
    outro_path = os.path.join(os.path.dirname(__file__), "..", "assets", "outro.mp4")

    if not os.path.exists(intro_path) or not os.path.exists(outro_path):
        # No intro/outro assets yet — pass through
        shutil.copy(input_path, output_path)
        return output_path

    # Create concat file list
    with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:
        f.write(f"file '{intro_path}'\n")
        f.write(f"file '{input_path}'\n")
        f.write(f"file '{outro_path}'\n")
        concat_list = f.name

    try:
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                concat_list,
                "-c",
                "copy",
                output_path,
            ],
            check=True,
            capture_output=True,
        )
    finally:
        os.unlink(concat_list)

    return output_path

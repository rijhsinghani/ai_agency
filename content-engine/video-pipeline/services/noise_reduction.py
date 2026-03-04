import subprocess
import os


def apply_noise_reduction(input_path: str, output_path: str) -> str:
    """Step 1: Remove background hum and room noise using RNNoise (arnndn filter)."""
    # RNNoise model path — in container it lives at /app/rnnoise-models/bd.rnnn
    model_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "rnnoise-models",
        "bd.rnnn",
    )
    # Use model if available; fall back to arnndn without explicit model path
    if os.path.exists(model_path):
        af_filter = f"arnndn=m={model_path}"
    else:
        af_filter = "arnndn"

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            input_path,
            "-af",
            af_filter,
            output_path,
        ],
        check=True,
        capture_output=True,
    )
    return output_path

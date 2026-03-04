import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import WHISPER_MODEL


def transcribe_video(input_path: str, output_dir: str) -> str:
    """Step 5: Generate SRT transcript using Whisper medium model."""
    import whisper  # Lazy import — not available in dev; installed in container

    os.makedirs(output_dir, exist_ok=True)
    model = whisper.load_model(WHISPER_MODEL)
    result = model.transcribe(input_path, word_timestamps=True)

    # Write SRT file
    srt_path = os.path.join(output_dir, "captions.srt")
    _write_srt(result["segments"], srt_path)
    return srt_path


def _write_srt(segments: list, output_path: str) -> None:
    """Write Whisper segments to SRT format."""
    with open(output_path, "w", encoding="utf-8") as f:
        for i, segment in enumerate(segments, 1):
            start = _format_timestamp(segment["start"])
            end = _format_timestamp(segment["end"])
            text = segment["text"].strip()
            f.write(f"{i}\n{start} --> {end}\n{text}\n\n")


def _format_timestamp(seconds: float) -> str:
    """Convert seconds to SRT timestamp format (HH:MM:SS,mmm)."""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

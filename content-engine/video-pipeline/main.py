import os
import logging
import tempfile
from pathlib import Path

from flask import Flask, request, jsonify
from cloudevents.http import from_http
from google.cloud import storage

from config import (
    GCS_RAW_PREFIX,
    GCS_OUTPUT_PREFIX,
    GCS_TRIGGER_BUCKET,
    GCS_OUTPUT_BUCKET,
)
from services.noise_reduction import apply_noise_reduction
from services.silence_removal import remove_silence
from services.audio_normalize import normalize_audio
from services.transcription import transcribe_video
from services.caption_burnin import burn_captions
from services.color_correct import apply_color_correction
from services.intro_outro import splice_intro_outro
from services.encode import final_encode

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

app = Flask(__name__)


@app.route("/", methods=["POST"])
def handle_gcs_event():
    """Receive Eventarc CloudEvent for GCS object.create and run pipeline."""
    try:
        event = from_http(request.headers, request.get_data())
    except Exception as e:
        logger.error(f"Failed to parse CloudEvent: {e}")
        return jsonify({"error": "Invalid CloudEvent"}), 400

    bucket_name = event.data.get("bucket")
    object_name = event.data.get("name")

    logger.info(f"Received GCS event: gs://{bucket_name}/{object_name}")

    # Only process raw/ prefix uploads
    if not object_name.startswith(GCS_RAW_PREFIX):
        logger.info(f"Skipped: object {object_name} is not in raw/ prefix")
        return jsonify({"status": "skipped", "reason": "not raw/ prefix"}), 200

    # Run pipeline
    try:
        result = run_pipeline(bucket_name, object_name)
        return jsonify({"status": "success", "result": result}), 200
    except Exception as e:
        logger.error(f"Pipeline failed for {object_name}: {e}", exc_info=True)
        return jsonify({"status": "error", "error": str(e)}), 500


def run_pipeline(bucket_name: str, object_name: str) -> dict:
    """Download raw video, run all 9 processing steps, upload result to output bucket."""
    gcs = storage.Client()
    video_stem = Path(object_name).stem  # e.g. "2026-03-10-my-video"

    with tempfile.TemporaryDirectory() as tmpdir:
        # Download raw video
        raw_path = os.path.join(tmpdir, "00_raw.mp4")
        logger.info(f"Step 0: Downloading gs://{bucket_name}/{object_name}")
        gcs.bucket(bucket_name).blob(object_name).download_to_filename(raw_path)

        # Pipeline steps — each step reads from previous output, writes to new temp file
        def step_path(n: int, name: str) -> str:
            return os.path.join(tmpdir, f"{n:02d}_{name}.mp4")

        logger.info("Step 1: Noise reduction")
        s1 = apply_noise_reduction(raw_path, step_path(1, "noise_reduced"))

        logger.info("Step 2: Silence removal")
        s2 = remove_silence(s1, step_path(2, "silence_removed"))

        logger.info("Step 3: Audio normalization")
        s3 = normalize_audio(s2, step_path(3, "normalized"))

        # Step 4: Background music — skipped until music library is added
        # TODO: add background_music service when royalty-free music assets are available
        s4 = s3
        logger.info("Step 4: Background music (skipped — no music library yet)")

        logger.info("Step 5: Transcription (Whisper medium)")
        srt_dir = os.path.join(tmpdir, "srt")
        srt_path = transcribe_video(s4, srt_dir)

        logger.info("Step 6: Caption burn-in")
        s6 = burn_captions(s4, srt_path, step_path(6, "captioned"))

        logger.info("Step 7: Color correction")
        s7 = apply_color_correction(s6, step_path(7, "color_corrected"))

        logger.info("Step 8: Intro/outro splice")
        s8 = splice_intro_outro(s7, step_path(8, "spliced"))

        logger.info("Step 9: Final encode")
        final_path = step_path(9, "final")
        final_encode(s8, final_path)

        # Upload processed video and SRT to output bucket
        output_video_name = f"{GCS_OUTPUT_PREFIX}{video_stem}_processed.mp4"
        output_srt_name = f"{GCS_OUTPUT_PREFIX}{video_stem}_captions.srt"

        logger.info(
            f"Uploading processed video to gs://{GCS_OUTPUT_BUCKET}/{output_video_name}"
        )
        gcs.bucket(GCS_OUTPUT_BUCKET).blob(output_video_name).upload_from_filename(
            final_path
        )

        logger.info(f"Uploading SRT to gs://{GCS_OUTPUT_BUCKET}/{output_srt_name}")
        gcs.bucket(GCS_OUTPUT_BUCKET).blob(output_srt_name).upload_from_filename(
            srt_path
        )

        logger.info("Pipeline complete")
        return {
            "input": f"gs://{bucket_name}/{object_name}",
            "output_video": f"gs://{GCS_OUTPUT_BUCKET}/{output_video_name}",
            "output_srt": f"gs://{GCS_OUTPUT_BUCKET}/{output_srt_name}",
        }


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)

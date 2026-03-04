import os

# Audio processing
LUFS_TARGET = -14
TRUE_PEAK_CEILING = -1
LOUDNESS_RANGE_TARGET = 7
SILENCE_THRESHOLD = "4%"
SILENCE_MARGIN = "0.4sec"
BACKGROUND_MUSIC_LEVEL = "-26dB"  # -24dB to -28dB range; -26dB is center

# Video encoding
OUTPUT_RESOLUTION = "1920x1080"
OUTPUT_CRC = 20  # H.264 quality (18-28 range; lower = better quality)
OUTPUT_AUDIO_BITRATE = "128k"

# Whisper
WHISPER_MODEL = "medium"

# Caption styling
CAPTION_FONT = "Roc Grotesk"
CAPTION_FONT_SIZE = 18
CAPTION_PRIMARY_COLOR = "&HFFFFFF"  # White
CAPTION_OUTLINE_COLOR = "&H000000"  # Black
CAPTION_OUTLINE_WIDTH = 2

# Noise reduction model path (relative to /app in container)
NOISE_REDUCTION_MODEL = "rnnoise-models/bd.rnnn"

# GCS
GCS_RAW_PREFIX = "raw/"
GCS_OUTPUT_PREFIX = "output/"
GCS_TRIGGER_BUCKET = os.environ.get("GCS_TRIGGER_BUCKET", "video-pipeline-raw")
GCS_OUTPUT_BUCKET = os.environ.get("GCS_OUTPUT_BUCKET", "video-pipeline-output")

# Supabase
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")

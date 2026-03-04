"""
Tests for video pipeline service modules.
RED phase: these tests define expected behavior before implementation.
"""

import pytest
import subprocess
import os
import sys
from unittest.mock import patch, MagicMock, call

# Add parent directory to path so we can import modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestConfig:
    """Test config.py constants."""

    def test_lufs_target_is_minus_14(self):
        from config import LUFS_TARGET

        assert LUFS_TARGET == -14

    def test_silence_threshold_is_4_percent(self):
        from config import SILENCE_THRESHOLD

        assert SILENCE_THRESHOLD == "4%"

    def test_silence_margin(self):
        from config import SILENCE_MARGIN

        assert SILENCE_MARGIN == "0.4sec"

    def test_whisper_model(self):
        from config import WHISPER_MODEL

        assert WHISPER_MODEL == "medium"

    def test_output_resolution(self):
        from config import OUTPUT_RESOLUTION

        assert OUTPUT_RESOLUTION == "1920x1080"

    def test_caption_font(self):
        from config import CAPTION_FONT

        assert CAPTION_FONT == "Roc Grotesk"


class TestNoiseReduction:
    """Test services/noise_reduction.py."""

    def test_returns_output_path_on_success(self, tmp_path):
        input_file = tmp_path / "input.mp4"
        input_file.touch()
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.noise_reduction import apply_noise_reduction

            result = apply_noise_reduction(str(input_file), output_file)
            assert result == output_file

    def test_calls_ffmpeg_with_arnndn_filter(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.noise_reduction import apply_noise_reduction

            apply_noise_reduction(input_file, output_file)

            called_args = mock_run.call_args[0][0]
            assert "ffmpeg" in called_args
            assert "-af" in called_args
            # Check arnndn filter is used
            af_value = called_args[called_args.index("-af") + 1]
            assert "arnndn" in af_value

    def test_raises_on_ffmpeg_failure(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.side_effect = subprocess.CalledProcessError(1, "ffmpeg")
            from services.noise_reduction import apply_noise_reduction

            with pytest.raises(subprocess.CalledProcessError):
                apply_noise_reduction(input_file, output_file)


class TestSilenceRemoval:
    """Test services/silence_removal.py."""

    def test_returns_output_path_on_success(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.silence_removal import remove_silence

            result = remove_silence(input_file, output_file)
            assert result == output_file

    def test_calls_auto_editor_with_correct_args(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.silence_removal import remove_silence

            remove_silence(input_file, output_file)

            called_args = mock_run.call_args[0][0]
            assert "auto-editor" in called_args
            assert "--margin" in called_args
            assert "0.4sec" in called_args
            assert "--silent-threshold" in called_args
            assert "4%" in called_args


class TestAudioNormalize:
    """Test services/audio_normalize.py."""

    def test_returns_output_path_on_success(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.audio_normalize import normalize_audio

            result = normalize_audio(input_file, output_file)
            assert result == output_file

    def test_calls_ffmpeg_normalize_with_lufs_target(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.audio_normalize import normalize_audio

            normalize_audio(input_file, output_file)

            called_args = mock_run.call_args[0][0]
            assert "ffmpeg-normalize" in called_args
            assert "-t" in called_args
            assert "-14" in called_args  # LUFS_TARGET
            assert "-tp" in called_args
            assert "-1" in called_args  # TRUE_PEAK_CEILING


class TestTranscription:
    """Test services/transcription.py."""

    def test_returns_srt_path(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_dir = str(tmp_path / "srt")

        mock_model = MagicMock()
        mock_model.transcribe.return_value = {
            "segments": [
                {"start": 0.0, "end": 2.5, "text": "Hello world"},
                {"start": 2.5, "end": 5.0, "text": "This is a test"},
            ]
        }

        with patch("whisper.load_model", return_value=mock_model):
            from services.transcription import transcribe_video

            result = transcribe_video(input_file, output_dir)
            assert result.endswith(".srt")
            assert os.path.exists(result)

    def test_loads_medium_model(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_dir = str(tmp_path / "srt")

        mock_model = MagicMock()
        mock_model.transcribe.return_value = {"segments": []}

        with patch("whisper.load_model", return_value=mock_model) as mock_load:
            from services.transcription import transcribe_video

            transcribe_video(input_file, output_dir)
            mock_load.assert_called_once_with("medium")

    def test_srt_format_timestamp(self):
        from services.transcription import _format_timestamp

        assert _format_timestamp(0.0) == "00:00:00,000"
        assert _format_timestamp(3661.5) == "01:01:01,500"
        assert _format_timestamp(90.123) == "00:01:30,123"


class TestCaptionBurnin:
    """Test services/caption_burnin.py."""

    def test_returns_output_path_on_success(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        srt_file = str(tmp_path / "captions.srt")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.caption_burnin import burn_captions

            result = burn_captions(input_file, srt_file, output_file)
            assert result == output_file

    def test_calls_ffmpeg_with_subtitles_filter(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        srt_file = str(tmp_path / "captions.srt")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.caption_burnin import burn_captions

            burn_captions(input_file, srt_file, output_file)

            called_args = mock_run.call_args[0][0]
            assert "ffmpeg" in called_args
            assert "-vf" in called_args
            vf_value = called_args[called_args.index("-vf") + 1]
            assert "subtitles" in vf_value
            assert "Roc Grotesk" in vf_value


class TestEncode:
    """Test services/encode.py."""

    def test_returns_output_path_on_success(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.encode import final_encode

            result = final_encode(input_file, output_file)
            assert result == output_file

    def test_calls_ffmpeg_with_h264_settings(self, tmp_path):
        input_file = str(tmp_path / "input.mp4")
        output_file = str(tmp_path / "output.mp4")

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            from services.encode import final_encode

            final_encode(input_file, output_file)

            called_args = mock_run.call_args[0][0]
            assert "ffmpeg" in called_args
            assert "libx264" in called_args
            assert "-crf" in called_args
            assert "+faststart" in called_args or "faststart" in " ".join(called_args)
            # Check 1080p scale
            assert "1920x1080" in " ".join(called_args)

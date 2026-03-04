"""
Tests for services/clip_extraction.py
RED phase: these tests define expected behavior before implementation.
"""

import pytest
import json
import os
import sys
from unittest.mock import patch, MagicMock

# Add parent directory to path so we can import modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestParseMmSs:
    """Test the _parse_mm_ss helper."""

    def test_parse_standard_timestamp(self):
        from services.clip_extraction import _parse_mm_ss

        assert _parse_mm_ss("02:34") == 154.0

    def test_parse_zero_minutes(self):
        from services.clip_extraction import _parse_mm_ss

        assert _parse_mm_ss("00:30") == 30.0

    def test_parse_zero_timestamp(self):
        from services.clip_extraction import _parse_mm_ss

        assert _parse_mm_ss("00:00") == 0.0

    def test_parse_double_digit_minutes(self):
        from services.clip_extraction import _parse_mm_ss

        assert _parse_mm_ss("10:00") == 600.0

    def test_parse_invalid_format_raises_value_error(self):
        from services.clip_extraction import _parse_mm_ss

        with pytest.raises(ValueError, match=".*MM:SS.*"):
            _parse_mm_ss("invalid")

    def test_parse_missing_colon_raises_value_error(self):
        from services.clip_extraction import _parse_mm_ss

        with pytest.raises(ValueError):
            _parse_mm_ss("0234")

    def test_parse_non_numeric_raises_value_error(self):
        from services.clip_extraction import _parse_mm_ss

        with pytest.raises(ValueError):
            _parse_mm_ss("ab:cd")


class TestAnalyzeVideoForClips:
    """Test analyze_video_for_clips using mocked Gemini API."""

    def _make_mock_genai(self, clips: list):
        """Build a mock google.generativeai module returning given clips."""
        mock_response = MagicMock()
        mock_response.text = json.dumps(clips)

        mock_model = MagicMock()
        mock_model.generate_content.return_value = mock_response

        mock_genai = MagicMock()
        mock_genai.GenerativeModel.return_value = mock_model
        mock_genai.types.GenerationConfig = MagicMock

        return mock_genai

    def test_returns_list_of_clip_dicts(self):
        clips = [
            {
                "start_time": "01:00",
                "end_time": "01:30",
                "hook": "This one trick saves 40% on missed calls",
                "type": "actionable_tip",
                "strength_score": 9,
            }
        ]
        mock_genai = self._make_mock_genai(clips)

        with patch.dict("sys.modules", {"google.generativeai": mock_genai}):
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            with patch.dict(os.environ, {"GEMINI_API_KEY": "test-key"}):
                result = ce.analyze_video_for_clips("gs://bucket/video.mp4")

        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0]["start_time"] == "01:00"
        assert result[0]["hook"] == "This one trick saves 40% on missed calls"

    def test_required_fields_present(self):
        clips = [
            {
                "start_time": "03:45",
                "end_time": "04:12",
                "hook": "Specific hook text",
                "type": "contrarian_claim",
                "strength_score": 8,
            }
        ]
        mock_genai = self._make_mock_genai(clips)

        with patch.dict("sys.modules", {"google.generativeai": mock_genai}):
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            with patch.dict(os.environ, {"GEMINI_API_KEY": "test-key"}):
                result = ce.analyze_video_for_clips("gs://bucket/video.mp4")

        clip = result[0]
        assert "start_time" in clip
        assert "end_time" in clip
        assert "hook" in clip
        assert "type" in clip
        assert "strength_score" in clip

    def test_strips_markdown_fences_from_response(self):
        clips = [
            {
                "start_time": "00:10",
                "end_time": "00:40",
                "hook": "Hook",
                "type": "surprising_data",
                "strength_score": 7,
            }
        ]
        mock_response = MagicMock()
        mock_response.text = "```json\n" + json.dumps(clips) + "\n```"

        mock_model = MagicMock()
        mock_model.generate_content.return_value = mock_response
        mock_genai = MagicMock()
        mock_genai.GenerativeModel.return_value = mock_model
        mock_genai.types.GenerationConfig = MagicMock

        with patch.dict("sys.modules", {"google.generativeai": mock_genai}):
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            with patch.dict(os.environ, {"GEMINI_API_KEY": "test-key"}):
                result = ce.analyze_video_for_clips("gs://bucket/video.mp4")

        assert len(result) == 1
        assert result[0]["hook"] == "Hook"

    def test_raises_when_gemini_api_key_missing(self):
        import importlib
        import services.clip_extraction as ce

        importlib.reload(ce)

        env_without_key = {k: v for k, v in os.environ.items() if k != "GEMINI_API_KEY"}
        with patch.dict(os.environ, env_without_key, clear=True):
            with pytest.raises(ValueError, match="GEMINI_API_KEY"):
                ce.analyze_video_for_clips("gs://bucket/video.mp4")

    def test_uses_gemini_31_pro_preview_model(self):
        clips = [
            {
                "start_time": "00:05",
                "end_time": "00:35",
                "hook": "Hook",
                "type": "actionable_tip",
                "strength_score": 6,
            }
        ]
        mock_genai = self._make_mock_genai(clips)

        with patch.dict("sys.modules", {"google.generativeai": mock_genai}):
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            with patch.dict(os.environ, {"GEMINI_API_KEY": "test-key"}):
                ce.analyze_video_for_clips("gs://bucket/video.mp4")

        mock_genai.GenerativeModel.assert_called_once_with("gemini-3.1-pro-preview")


class TestExtractClips:
    """Test extract_clips ffmpeg behavior."""

    def test_returns_list_of_output_paths(self, tmp_path):
        video_path = str(tmp_path / "video.mp4")
        open(video_path, "w").close()
        clips_dir = str(tmp_path / "clips")
        clips = [
            {
                "start_time": "01:00",
                "end_time": "01:30",
                "hook": "Short hook",
                "type": "actionable_tip",
                "strength_score": 8,
            }
        ]

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            result = ce.extract_clips(video_path, clips, clips_dir)

        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0].endswith(".mp4")

    def test_clip_over_60s_is_truncated(self, tmp_path):
        video_path = str(tmp_path / "video.mp4")
        open(video_path, "w").close()
        clips_dir = str(tmp_path / "clips")
        clips = [
            {
                "start_time": "00:00",
                "end_time": "02:00",  # 120 seconds — exceeds Shorts limit
                "hook": "Long clip hook",
                "type": "contrarian_claim",
                "strength_score": 5,
            }
        ]

        captured_args = []

        def capture_run(args, **kwargs):
            captured_args.append(args)
            return MagicMock(returncode=0)

        with patch("subprocess.run", side_effect=capture_run):
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            ce.extract_clips(video_path, clips, clips_dir)

        # Verify ffmpeg was called with -t <=58
        ffmpeg_args = captured_args[0]
        t_index = ffmpeg_args.index("-t")
        duration = float(ffmpeg_args[t_index + 1])
        assert duration <= 58

    def test_output_filename_includes_clip_type(self, tmp_path):
        video_path = str(tmp_path / "video.mp4")
        open(video_path, "w").close()
        clips_dir = str(tmp_path / "clips")
        clips = [
            {
                "start_time": "02:00",
                "end_time": "02:25",
                "hook": "Hook",
                "type": "emotional_reaction",
                "strength_score": 7,
            }
        ]

        with patch("subprocess.run") as mock_run:
            mock_run.return_value = MagicMock(returncode=0)
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            result = ce.extract_clips(video_path, clips, clips_dir)

        assert "emotional_reaction" in result[0]

    def test_ffmpeg_uses_9_16_crop_filter(self, tmp_path):
        video_path = str(tmp_path / "video.mp4")
        open(video_path, "w").close()
        clips_dir = str(tmp_path / "clips")
        clips = [
            {
                "start_time": "00:30",
                "end_time": "01:00",
                "hook": "Hook",
                "type": "surprising_data",
                "strength_score": 6,
            }
        ]

        captured_args = []

        def capture_run(args, **kwargs):
            captured_args.append(args)
            return MagicMock(returncode=0)

        with patch("subprocess.run", side_effect=capture_run):
            import importlib
            import services.clip_extraction as ce

            importlib.reload(ce)

            ce.extract_clips(video_path, clips, clips_dir)

        ffmpeg_args = captured_args[0]
        vf_index = ffmpeg_args.index("-vf")
        vf_value = ffmpeg_args[vf_index + 1]
        assert "1080" in vf_value
        assert "1920" in vf_value

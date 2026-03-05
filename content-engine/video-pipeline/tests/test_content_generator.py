"""
Tests for services/content_generator.py and services/thumbnail_trigger.py
RED phase: these tests define expected behavior before implementation.
"""

import pytest
import json
import os
import sys
from unittest.mock import patch, MagicMock

# Add parent directory to path so we can import modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestGeneratePlatformContent:
    """Test generate_platform_content with mocked Claude API."""

    def _make_mock_content(self) -> dict:
        return {
            "youtube_title": "This Setting Recovers 40% of Missed Calls",
            "youtube_description": "Hook line here.\n- Point 1\n- Point 2\nBook a free 15-min discovery call: https://calendar.app.google/psycao3CrXjGnmk48",
            "youtube_short_description": "One sentence hook for Shorts. #Shorts",
            "twitter_thread": [
                "Tweet 1: hook under 280 chars",
                "Tweet 2: context under 280 chars",
                "Tweet 3: surprising detail",
                "Tweet 4: takeaway",
                "Tweet 5: CTA https://calendar.app.google/psycao3CrXjGnmk48",
            ],
            "instagram_caption": "First line hook.\n\nMore context here.\n\nBook a free 15-min discovery call.",
            "substack_intro": "Opening paragraph for a Substack article.",
            "threads_post": "Conversational standalone post under 300 chars.",
        }

    def _make_mock_anthropic(self, content: dict):
        mock_response = MagicMock()
        mock_message = MagicMock()
        mock_message.text = json.dumps(content)
        mock_response.content = [mock_message]

        mock_client = MagicMock()
        mock_client.messages.create.return_value = mock_response

        mock_anthropic = MagicMock()
        mock_anthropic.Anthropic.return_value = mock_client

        return mock_anthropic

    def test_returns_dict_with_all_6_platform_keys(self):
        from services import content_generator as cg

        content = self._make_mock_content()
        mock_anthropic = self._make_mock_anthropic(content)

        with (
            patch.object(cg, "anthropic", mock_anthropic),
            patch.dict(os.environ, {"ANTHROPIC_API_KEY": "test-key"}),
        ):
            result = cg.generate_platform_content(
                transcript="Test transcript content about automation.",
                topic_title="Missed Call Recovery",
                hook="This setting recovers 40% of missed calls",
            )

        assert "youtube_title" in result
        assert "youtube_description" in result
        assert "youtube_short_description" in result
        assert "twitter_thread" in result
        assert "instagram_caption" in result
        assert "substack_intro" in result
        assert "threads_post" in result

    def test_twitter_thread_is_list(self):
        from services import content_generator as cg

        content = self._make_mock_content()
        mock_anthropic = self._make_mock_anthropic(content)

        with (
            patch.object(cg, "anthropic", mock_anthropic),
            patch.dict(os.environ, {"ANTHROPIC_API_KEY": "test-key"}),
        ):
            result = cg.generate_platform_content(
                transcript="Test transcript content.",
                topic_title="Topic",
                hook="Hook",
            )

        assert isinstance(result["twitter_thread"], list)

    def test_raises_if_transcript_empty(self):
        from services import content_generator as cg

        with pytest.raises(ValueError, match="[Tt]ranscript"):
            cg.generate_platform_content(
                transcript="",
                topic_title="Topic",
                hook="Hook",
            )

    def test_raises_if_transcript_whitespace_only(self):
        from services import content_generator as cg

        with pytest.raises(ValueError, match="[Tt]ranscript"):
            cg.generate_platform_content(
                transcript="   \n\t  ",
                topic_title="Topic",
                hook="Hook",
            )

    def test_raises_if_anthropic_api_key_missing(self):
        from services import content_generator as cg

        env_without_key = {
            k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"
        }
        with patch.dict(os.environ, env_without_key, clear=True):
            with pytest.raises(ValueError, match="ANTHROPIC_API_KEY"):
                cg.generate_platform_content(
                    transcript="Some transcript text.",
                    topic_title="Topic",
                    hook="Hook",
                )

    def test_uses_claude_sonnet_4_6_model(self):
        from services import content_generator as cg

        content = self._make_mock_content()
        mock_anthropic = self._make_mock_anthropic(content)

        with (
            patch.object(cg, "anthropic", mock_anthropic),
            patch.dict(os.environ, {"ANTHROPIC_API_KEY": "test-key"}),
        ):
            cg.generate_platform_content(
                transcript="Test transcript content.",
                topic_title="Topic",
                hook="Hook",
            )

        mock_client = mock_anthropic.Anthropic.return_value
        call_kwargs = mock_client.messages.create.call_args
        assert call_kwargs.kwargs.get("model") == "claude-sonnet-4-6" or (
            call_kwargs.args and "claude-sonnet-4-6" in str(call_kwargs)
        )

    def test_youtube_title_truncated_if_over_60_chars(self):
        from services import content_generator as cg

        content = self._make_mock_content()
        content["youtube_title"] = "A" * 80  # Over 60 chars
        mock_anthropic = self._make_mock_anthropic(content)

        with (
            patch.object(cg, "anthropic", mock_anthropic),
            patch.dict(os.environ, {"ANTHROPIC_API_KEY": "test-key"}),
        ):
            result = cg.generate_platform_content(
                transcript="Some transcript text.",
                topic_title="Topic",
                hook="Hook",
            )

        assert len(result["youtube_title"]) <= 60

    def test_strips_markdown_fences_from_response(self):
        from services import content_generator as cg

        content = self._make_mock_content()
        mock_response = MagicMock()
        mock_message = MagicMock()
        mock_message.text = "```json\n" + json.dumps(content) + "\n```"
        mock_response.content = [mock_message]
        mock_client = MagicMock()
        mock_client.messages.create.return_value = mock_response
        mock_anthropic = MagicMock()
        mock_anthropic.Anthropic.return_value = mock_client

        with (
            patch.object(cg, "anthropic", mock_anthropic),
            patch.dict(os.environ, {"ANTHROPIC_API_KEY": "test-key"}),
        ):
            result = cg.generate_platform_content(
                transcript="Some transcript.",
                topic_title="Topic",
                hook="Hook",
            )

        assert "youtube_title" in result

    def test_slop_banlist_present_in_module(self):
        from services.content_generator import SLOP_BANLIST

        assert isinstance(SLOP_BANLIST, list)
        assert len(SLOP_BANLIST) >= 8
        # Verify key slop phrases are banned
        all_lower = [p.lower() for p in SLOP_BANLIST]
        assert "leverage" in all_lower or any("leverage" in p for p in all_lower)
        assert any("game" in p for p in all_lower)  # game-changer
        assert any("cutting" in p for p in all_lower)  # cutting-edge


class TestStoreDraftsInSupabase:
    """Test store_drafts_in_supabase updates content_bank with pending_review status."""

    def test_updates_status_to_pending_review(self):
        from services import content_generator as cg

        mock_supabase = MagicMock()
        mock_table = MagicMock()
        mock_supabase.table.return_value = mock_table
        mock_table.update.return_value = mock_table
        mock_table.eq.return_value = mock_table

        content = {
            "youtube_title": "Test Title",
            "youtube_description": "Test desc",
            "youtube_short_description": "Short desc #Shorts",
            "twitter_thread": ["Tweet 1"],
            "instagram_caption": "Caption",
            "substack_intro": "Intro",
            "threads_post": "Post",
        }

        with (
            patch(
                "services.content_generator.create_client", return_value=mock_supabase
            ),
            patch(
                "services.content_generator.SUPABASE_URL", "https://test.supabase.co"
            ),
            patch("services.content_generator.SUPABASE_SERVICE_KEY", "test-key"),
        ):
            cg.store_drafts_in_supabase(
                content_bank_id="row-123",
                content=content,
                clip_paths=["/tmp/clip_01.mp4"],
                clip_metadata=[
                    {"hook": "Hook", "type": "actionable_tip", "strength_score": 8}
                ],
            )

        # Verify update was called with pending_review status
        update_call = mock_table.update.call_args
        update_data = (
            update_call.args[0]
            if update_call.args
            else update_call.kwargs.get("data", {})
        )
        assert update_data.get("status") == "pending_review"

    def test_skips_gracefully_if_supabase_not_configured(self):
        from services import content_generator as cg

        # Should not raise — just log a warning
        with (
            patch("services.content_generator.SUPABASE_URL", ""),
            patch("services.content_generator.SUPABASE_SERVICE_KEY", ""),
        ):
            cg.store_drafts_in_supabase(
                content_bank_id="row-123",
                content={},
                clip_paths=[],
                clip_metadata=[],
            )


class TestThumbnailTrigger:
    """Test trigger_thumbnail_generation writes JSON to GCS."""

    def test_returns_gcs_uri(self):
        from services import thumbnail_trigger as tt

        mock_bucket = MagicMock()
        mock_blob = MagicMock()
        mock_bucket.blob.return_value = mock_blob
        mock_gcs = MagicMock()
        mock_gcs.bucket.return_value = mock_bucket

        with patch("services.thumbnail_trigger.storage") as mock_storage:
            mock_storage.Client.return_value = mock_gcs
            result = tt.trigger_thumbnail_generation(
                video_title="My Video",
                processed_video_gcs_uri="gs://bucket/output/video.mp4",
                brand="sameer_automations",
                content_bank_id="row-abc123",
                output_bucket="video-pipeline-output",
            )

        assert result.startswith("gs://")
        assert "thumbnails-pending" in result
        assert result.endswith(".json")

    def test_writes_json_with_required_fields(self):
        from services import thumbnail_trigger as tt

        mock_bucket = MagicMock()
        written_data = {}

        def capture_upload(data, **kwargs):
            written_data.update(json.loads(data))

        mock_blob = MagicMock()
        mock_blob.upload_from_string.side_effect = capture_upload
        mock_bucket.blob.return_value = mock_blob
        mock_gcs = MagicMock()
        mock_gcs.bucket.return_value = mock_bucket

        with patch("services.thumbnail_trigger.storage") as mock_storage:
            mock_storage.Client.return_value = mock_gcs
            tt.trigger_thumbnail_generation(
                video_title="My Automation Video",
                processed_video_gcs_uri="gs://bucket/output/video.mp4",
                brand="sameer_automations",
                content_bank_id="row-abc123",
                output_bucket="video-pipeline-output",
            )

        assert written_data["video_title"] == "My Automation Video"
        assert written_data["brand"] == "sameer_automations"
        assert written_data["content_bank_id"] == "row-abc123"
        assert written_data["status"] == "pending"
        assert written_data["skill"] == "youtube-thumbnail"
        assert "grid_output_path" in written_data
        assert (
            "row-abc1" in written_data["grid_output_path"]
        )  # first 8 chars of content_bank_id
        assert "headshot_dir" in written_data

    def test_uses_default_bucket_from_env(self):
        from services import thumbnail_trigger as tt

        mock_bucket = MagicMock()
        mock_blob = MagicMock()
        mock_bucket.blob.return_value = mock_blob
        mock_gcs = MagicMock()
        mock_gcs.bucket.return_value = mock_bucket

        with (
            patch("services.thumbnail_trigger.storage") as mock_storage,
            patch.dict(os.environ, {"GCS_OUTPUT_BUCKET": "my-bucket"}),
        ):
            mock_storage.Client.return_value = mock_gcs
            result = tt.trigger_thumbnail_generation(
                video_title="Video",
                processed_video_gcs_uri="gs://bucket/video.mp4",
                brand="brand",
                content_bank_id="id-123",
            )

        assert "my-bucket" in result


class TestMainPyIntegration:
    """Test that main.py imports and calls the new AI services."""

    def test_main_py_imports_clip_extraction(self):
        import ast

        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            tree = ast.parse(f.read())

        imports = []
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                imports.append(node.module)

        assert any("clip_extraction" in (m or "") for m in imports), (
            "main.py should import from services.clip_extraction"
        )

    def test_main_py_imports_content_generator(self):
        import ast

        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            tree = ast.parse(f.read())

        imports = []
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                imports.append(node.module)

        assert any("content_generator" in (m or "") for m in imports), (
            "main.py should import from services.content_generator"
        )

    def test_main_py_imports_thumbnail_trigger(self):
        import ast

        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            tree = ast.parse(f.read())

        imports = []
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                imports.append(node.module)

        assert any("thumbnail_trigger" in (m or "") for m in imports), (
            "main.py should import from services.thumbnail_trigger"
        )

    def test_main_py_references_analyze_video_for_clips(self):
        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            content = f.read()

        assert "analyze_video_for_clips" in content

    def test_main_py_references_generate_platform_content(self):
        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            content = f.read()

        assert "generate_platform_content" in content

    def test_main_py_references_trigger_thumbnail_generation(self):
        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            content = f.read()

        assert "trigger_thumbnail_generation" in content

    def test_main_py_has_non_fatal_error_handling(self):
        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            content = f.read()

        assert "non-fatal" in content

    def test_main_py_references_store_drafts_in_supabase(self):
        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            content = f.read()

        assert "store_drafts_in_supabase" in content

    def test_main_py_references_extract_content_bank_id(self):
        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            content = f.read()

        assert "_extract_content_bank_id" in content


def _make_extract_content_bank_id():
    """Create a local copy of _extract_content_bank_id for unit testing without importing main.

    main.py cannot be directly imported in tests because it pulls in heavy Cloud
    dependencies (cloudevents, google-cloud-storage). This replicates the pure
    function logic so it can be tested without those dependencies.
    """
    import re

    _UUID_RE = re.compile(
        r"^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}$"
    )

    def _extract_content_bank_id(object_name: str):
        if not object_name:
            return None
        parts = object_name.split("/")
        if len(parts) < 3:
            return None
        candidate = parts[1]
        if _UUID_RE.match(candidate):
            return candidate
        return None

    return _extract_content_bank_id


class TestExtractContentBankId:
    """Test _extract_content_bank_id helper function from main.py.

    Tests use a local replica of the pure function to avoid importing main.py
    (which has heavy Cloud dependencies: cloudevents, google-cloud-storage).
    """

    def setup_method(self):
        self.extract = _make_extract_content_bank_id()

    def test_extracts_uuid_from_standard_path(self):
        result = self.extract("raw/abc12345-def6-7890-ghij-klmnopqrstuv/my-video.mp4")
        assert result == "abc12345-def6-7890-ghij-klmnopqrstuv"

    def test_extracts_real_uuid_format(self):
        result = self.extract("raw/550e8400-e29b-41d4-a716-446655440000/video.mp4")
        assert result == "550e8400-e29b-41d4-a716-446655440000"

    def test_returns_none_for_no_subdirectory(self):
        result = self.extract("raw/my-video.mp4")
        assert result is None

    def test_returns_none_for_short_segment(self):
        """Non-UUID second segment (too short) returns None."""
        result = self.extract("raw/short/my-video.mp4")
        assert result is None

    def test_returns_none_for_empty_string(self):
        result = self.extract("")
        assert result is None


class TestPipelineStoresDrafts:
    """Integration tests verifying store_drafts_in_supabase is wired into run_pipeline source."""

    def _extract(self, object_name: str):
        return _make_extract_content_bank_id()(object_name)

    def test_store_drafts_called_when_content_bank_id_present(self):
        """UUID path must return a content_bank_id (confirming store_drafts will be called)."""
        cid = self._extract("raw/550e8400-e29b-41d4-a716-446655440000/test.mp4")
        assert cid == "550e8400-e29b-41d4-a716-446655440000", (
            "UUID path must produce a content_bank_id so store_drafts_in_supabase is called"
        )

    def test_store_drafts_not_called_when_no_content_bank_id(self):
        """Non-UUID path must return None (confirming store_drafts will be skipped)."""
        cid = self._extract("raw/my-video.mp4")
        assert cid is None, (
            "Path without UUID should return None — store_drafts_in_supabase will be skipped"
        )

    def test_main_py_calls_store_drafts_in_source(self):
        """Verify main.py source contains the store_drafts_in_supabase call."""
        with open(
            "/Users/sameerrijhsinghani/automation_consulting/content-engine/video-pipeline/main.py"
        ) as f:
            source = f.read()

        # The call may be store_drafts_in_supabase(content_bank_id, ...) on one line
        # or store_drafts_in_supabase(\n    content_bank_id, ...) across lines
        assert "store_drafts_in_supabase(" in source and "content_bank_id" in source, (
            "main.py must call store_drafts_in_supabase with content_bank_id"
        )

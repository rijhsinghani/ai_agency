"use strict";

const os = require("os");
const fs = require("fs");
const path = require("path");
const {
  writeToReviewQueue,
  cacheTranscript,
  loadCachedTranscript,
} = require("../lib/queue");

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "queue-test-"));
}

describe("writeToReviewQueue", () => {
  it("creates a file at review/[slug]-[platform].md", () => {
    const tmpDir = makeTempDir();
    const filepath = writeToReviewQueue(
      "How I Automated My Business",
      "twitter",
      "Draft content here.",
      tmpDir,
    );
    expect(fs.existsSync(filepath)).toBe(true);
    expect(filepath).toMatch(/how-i-automated-my-business-twitter\.md$/);
  });

  it("file content includes 'DRAFT — not posted' header", () => {
    const tmpDir = makeTempDir();
    const filepath = writeToReviewQueue(
      "Test Video Title",
      "instagram",
      "Instagram caption draft.",
      tmpDir,
    );
    const content = fs.readFileSync(filepath, "utf-8");
    expect(content).toContain("DRAFT — not posted");
  });

  it("file content includes CTA booking URL", () => {
    const tmpDir = makeTempDir();
    const filepath = writeToReviewQueue(
      "My Automation Video",
      "twitter",
      "Twitter thread draft.",
      tmpDir,
    );
    const content = fs.readFileSync(filepath, "utf-8");
    expect(content).toContain("https://calendar.app.google/psycao3CrXjGnmk48");
  });

  it("file content includes the draft text", () => {
    const tmpDir = makeTempDir();
    const draftText = "This is my unique draft content for testing.";
    const filepath = writeToReviewQueue(
      "Video Title",
      "clip_script",
      draftText,
      tmpDir,
    );
    const content = fs.readFileSync(filepath, "utf-8");
    expect(content).toContain(draftText);
  });
});

describe("cacheTranscript", () => {
  it("writes transcript to review/[slug]-transcript.txt", () => {
    const tmpDir = makeTempDir();
    cacheTranscript("My Automation Video", "The full transcript text.", tmpDir);
    const expectedPath = path.join(
      tmpDir,
      "my-automation-video-transcript.txt",
    );
    expect(fs.existsSync(expectedPath)).toBe(true);
    const content = fs.readFileSync(expectedPath, "utf-8");
    expect(content).toBe("The full transcript text.");
  });
});

describe("loadCachedTranscript", () => {
  it("reads the cached transcript file", () => {
    const tmpDir = makeTempDir();
    cacheTranscript("Cache Test Video", "Cached content here.", tmpDir);
    const result = loadCachedTranscript("Cache Test Video", tmpDir);
    expect(result).toBe("Cached content here.");
  });

  it("returns null if no cached file exists", () => {
    const tmpDir = makeTempDir();
    const result = loadCachedTranscript("Nonexistent Video", tmpDir);
    expect(result).toBeNull();
  });
});

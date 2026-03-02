"use strict";

const { buildVideoFilter, buildAudioArgs } = require("../lib/formatter");

describe("buildVideoFilter", () => {
  test("returns crop+scale only when srtPath is null", () => {
    const result = buildVideoFilter(null);
    expect(result).toBe("crop=ih*9/16:ih,scale=1080:1920");
  });

  test("returns crop+scale only when srtPath is undefined", () => {
    const result = buildVideoFilter(undefined);
    expect(result).toBe("crop=ih*9/16:ih,scale=1080:1920");
  });

  test("includes subtitles= when srtPath is provided", () => {
    const result = buildVideoFilter("/tmp/captions.srt");
    expect(result).toContain("subtitles=");
  });

  test("includes force_style= when srtPath is provided", () => {
    const result = buildVideoFilter("/tmp/captions.srt");
    expect(result).toContain("force_style=");
  });

  test("filter starts with crop=ih*9/16 even with srtPath", () => {
    const result = buildVideoFilter("/tmp/captions.srt");
    expect(result).toMatch(/^crop=ih\*9\/16:ih/);
  });

  test("filter includes the srt path in subtitles filter", () => {
    const result = buildVideoFilter("/tmp/captions.srt");
    expect(result).toContain("/tmp/captions.srt");
  });
});

describe("buildAudioArgs", () => {
  test("returns array containing -c:a", () => {
    const result = buildAudioArgs();
    expect(result).toContain("-c:a");
  });

  test("returns array containing aac", () => {
    const result = buildAudioArgs();
    expect(result).toContain("aac");
  });

  test("returns array containing -b:a", () => {
    const result = buildAudioArgs();
    expect(result).toContain("-b:a");
  });

  test("returns array containing 128k", () => {
    const result = buildAudioArgs();
    expect(result).toContain("128k");
  });

  test("returns an Array", () => {
    const result = buildAudioArgs();
    expect(Array.isArray(result)).toBe(true);
  });
});

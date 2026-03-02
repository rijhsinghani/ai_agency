"use strict";

const {
  msToSrtTime,
  chunksToSrt,
  writeSrtToTemp,
} = require("../lib/captioner");
const fs = require("fs");
const path = require("path");

describe("msToSrtTime", () => {
  test("converts 0ms to 00:00:00,000", () => {
    expect(msToSrtTime(0)).toBe("00:00:00,000");
  });

  test("converts 3400ms to 00:00:03,400", () => {
    expect(msToSrtTime(3400)).toBe("00:00:03,400");
  });

  test("converts 61000ms to 00:01:01,000", () => {
    expect(msToSrtTime(61000)).toBe("00:01:01,000");
  });

  test("converts 3661500ms (1h 1m 1.5s) correctly", () => {
    expect(msToSrtTime(3661500)).toBe("01:01:01,500");
  });
});

describe("chunksToSrt", () => {
  test("produces valid SRT string with sequence numbers", () => {
    const chunks = [
      { text: "I used to lose jobs", offset: 0, duration: 3400 },
      { text: "before I fixed this", offset: 3400, duration: 3800 },
    ];
    const result = chunksToSrt(chunks);

    expect(result).toContain("1\n");
    expect(result).toContain("2\n");
    expect(result).toContain("I used to lose jobs");
    expect(result).toContain("before I fixed this");
    expect(result).toContain("00:00:00,000 --> 00:00:03,400");
    expect(result).toContain("00:00:03,400 --> 00:00:07,200");
  });

  test("handles single chunk", () => {
    const chunks = [{ text: "Hello world", offset: 1000, duration: 2000 }];
    const result = chunksToSrt(chunks);

    expect(result).toContain("1\n");
    expect(result).toContain("Hello world");
    expect(result).toContain("00:00:01,000 --> 00:00:03,000");
  });
});

describe("writeSrtToTemp", () => {
  test("writes to a /tmp path and returns the path string", () => {
    const srtContent = "1\n00:00:00,000 --> 00:00:03,000\nTest caption\n";
    const resultPath = writeSrtToTemp(srtContent);

    expect(typeof resultPath).toBe("string");
    expect(resultPath.startsWith("/tmp/")).toBe(true);
    expect(resultPath).toContain("clip_captions");

    // Verify the file was actually written
    expect(fs.existsSync(resultPath)).toBe(true);
    const written = fs.readFileSync(resultPath, "utf-8");
    expect(written).toBe(srtContent);

    // Cleanup
    fs.unlinkSync(resultPath);
  });
});

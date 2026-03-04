"use strict";

const { BANNED_PHRASES, buildPrompt } = require("../lib/formatter");

const SAMPLE_TRANSCRIPT =
  "This is a test transcript about automation saving small business owners time.";

describe("BANNED_PHRASES", () => {
  it("is exported as an array", () => {
    expect(Array.isArray(BANNED_PHRASES)).toBe(true);
  });

  it("has at least 10 entries", () => {
    expect(BANNED_PHRASES.length).toBeGreaterThanOrEqual(10);
  });

  it("includes known banned phrases from brand-voice.md", () => {
    expect(BANNED_PHRASES).toContain("game-changer");
    expect(BANNED_PHRASES).toContain("seamless");
    expect(BANNED_PHRASES).toContain("leverage");
    expect(BANNED_PHRASES).toContain("revolutionary");
  });
});

describe("buildPrompt", () => {
  it("returns a string for platform 'twitter'", () => {
    const result = buildPrompt("twitter", SAMPLE_TRANSCRIPT);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("twitter prompt contains 'Twitter thread'", () => {
    const result = buildPrompt("twitter", SAMPLE_TRANSCRIPT);
    expect(result).toMatch(/Twitter thread/i);
  });

  it("returns a string for platform 'instagram'", () => {
    const result = buildPrompt("instagram", SAMPLE_TRANSCRIPT);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("instagram prompt contains 'Instagram caption'", () => {
    const result = buildPrompt("instagram", SAMPLE_TRANSCRIPT);
    expect(result).toMatch(/Instagram caption/i);
  });

  it("returns a string for platform 'clip_script'", () => {
    const result = buildPrompt("clip_script", SAMPLE_TRANSCRIPT);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("clip_script prompt contains '30-60 second'", () => {
    const result = buildPrompt("clip_script", SAMPLE_TRANSCRIPT);
    expect(result).toMatch(/30-60 second/i);
  });

  it("prompt contains the transcript text", () => {
    const result = buildPrompt("twitter", SAMPLE_TRANSCRIPT);
    expect(result).toContain(SAMPLE_TRANSCRIPT);
  });
});

describe("buildPrompt CTA modes", () => {
  // value mode tests
  it("twitter value mode contains no booking URL", () => {
    const result = buildPrompt("twitter", SAMPLE_TRANSCRIPT, "value");
    expect(result).not.toContain("calendar.app.google");
    expect(result).toMatch(/no CTA/i);
  });

  it("instagram value mode contains no booking URL", () => {
    const result = buildPrompt("instagram", SAMPLE_TRANSCRIPT, "value");
    expect(result).not.toContain("calendar.app.google");
    expect(result).toMatch(/no CTA/i);
  });

  // soft mode tests
  it("twitter soft mode contains engagement prompt, not booking URL", () => {
    const result = buildPrompt("twitter", SAMPLE_TRANSCRIPT, "soft");
    expect(result).not.toContain("calendar.app.google");
    expect(result).toMatch(/DM me|reply/i);
  });

  it("instagram soft mode contains engagement prompt, not booking URL", () => {
    const result = buildPrompt("instagram", SAMPLE_TRANSCRIPT, "soft");
    expect(result).not.toContain("calendar.app.google");
    expect(result).toMatch(/DM me|I'm Sameer/i);
  });

  // booking mode tests
  it("twitter booking mode contains the booking URL", () => {
    const result = buildPrompt("twitter", SAMPLE_TRANSCRIPT, "booking");
    expect(result).toContain("calendar.app.google/psycao3CrXjGnmk48");
  });

  it("instagram booking mode contains the booking URL", () => {
    const result = buildPrompt("instagram", SAMPLE_TRANSCRIPT, "booking");
    expect(result).toContain("calendar.app.google/psycao3CrXjGnmk48");
  });

  // default behavior test
  it("defaults to value mode when ctaMode is omitted", () => {
    const withDefault = buildPrompt("twitter", SAMPLE_TRANSCRIPT);
    const withExplicit = buildPrompt("twitter", SAMPLE_TRANSCRIPT, "value");
    expect(withDefault).toEqual(withExplicit);
  });

  // clip_script is identical across modes
  it("clip_script prompt is identical regardless of CTA mode", () => {
    const value = buildPrompt("clip_script", SAMPLE_TRANSCRIPT, "value");
    const soft = buildPrompt("clip_script", SAMPLE_TRANSCRIPT, "soft");
    const booking = buildPrompt("clip_script", SAMPLE_TRANSCRIPT, "booking");
    expect(value).toEqual(soft);
    expect(soft).toEqual(booking);
  });
});

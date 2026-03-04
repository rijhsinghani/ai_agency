"use strict";

jest.mock("@anthropic-ai/sdk", () => {
  const mockCreate = jest.fn();
  const MockAnthropic = jest.fn().mockImplementation(() => ({
    messages: { create: mockCreate },
  }));
  MockAnthropic._mockCreate = mockCreate;
  return MockAnthropic;
});

const Anthropic = require("@anthropic-ai/sdk");
const { generateDraft } = require("../lib/generator");

const SAMPLE_TRANSCRIPT =
  "This is a sample transcript about automation for small businesses.";

describe("generateDraft", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockInstance = new Anthropic();
    mockInstance.messages.create.mockResolvedValue({
      content: [{ text: "Generated draft content." }],
    });
    Anthropic.mockImplementation(() => mockInstance);
  });

  it("returns a string when called with platform 'twitter'", async () => {
    const result = await generateDraft(SAMPLE_TRANSCRIPT, "twitter");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns a string when called with platform 'instagram'", async () => {
    const result = await generateDraft(SAMPLE_TRANSCRIPT, "instagram");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns a string when called with platform 'clip_script'", async () => {
    const result = await generateDraft(SAMPLE_TRANSCRIPT, "clip_script");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("system prompt contains BANNED_PHRASES list", async () => {
    const mockInstance = new Anthropic();
    mockInstance.messages.create.mockImplementation(async (params) => {
      expect(params.system).toBeDefined();
      expect(params.system).toMatch(/game-changer|seamless|leverage/);
      return { content: [{ text: "Draft with banned phrases check." }] };
    });
    Anthropic.mockImplementation(() => mockInstance);

    await generateDraft(SAMPLE_TRANSCRIPT, "twitter");
  });

  it("user message contains transcript text", async () => {
    const mockInstance = new Anthropic();
    mockInstance.messages.create.mockImplementation(async (params) => {
      const userContent = params.messages[0].content;
      expect(userContent).toContain(SAMPLE_TRANSCRIPT);
      return { content: [{ text: "Draft with transcript check." }] };
    });
    Anthropic.mockImplementation(() => mockInstance);

    await generateDraft(SAMPLE_TRANSCRIPT, "instagram");
  });
});

describe("generateDraft CTA mode passthrough", () => {
  it("passes ctaMode to buildPrompt via user message content", async () => {
    const mockInstance = new Anthropic();
    let capturedContent;
    mockInstance.messages.create.mockImplementation(async (params) => {
      capturedContent = params.messages[0].content;
      return { content: [{ text: "Draft." }] };
    });
    Anthropic.mockImplementation(() => mockInstance);

    // Call with booking mode — prompt should contain the booking URL
    await generateDraft(SAMPLE_TRANSCRIPT, "twitter", "booking");
    expect(capturedContent).toContain("calendar.app.google/psycao3CrXjGnmk48");
  });

  it("value mode prompt does not contain booking URL", async () => {
    const mockInstance = new Anthropic();
    let capturedContent;
    mockInstance.messages.create.mockImplementation(async (params) => {
      capturedContent = params.messages[0].content;
      return { content: [{ text: "Draft." }] };
    });
    Anthropic.mockImplementation(() => mockInstance);

    await generateDraft(SAMPLE_TRANSCRIPT, "twitter", "value");
    expect(capturedContent).not.toContain("calendar.app.google");
  });

  it("defaults to value mode when ctaMode is not provided", async () => {
    const mockInstance = new Anthropic();
    let capturedContent;
    mockInstance.messages.create.mockImplementation(async (params) => {
      capturedContent = params.messages[0].content;
      return { content: [{ text: "Draft." }] };
    });
    Anthropic.mockImplementation(() => mockInstance);

    await generateDraft(SAMPLE_TRANSCRIPT, "twitter");
    expect(capturedContent).not.toContain("calendar.app.google");
  });
});

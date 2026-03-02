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

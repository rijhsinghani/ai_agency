"use strict";

jest.mock("@supadata/js", () => {
  const mockGetJobStatus = jest.fn();
  const mockTranscript = jest.fn();
  const MockSupadata = jest.fn().mockImplementation(() => ({
    transcript: mockTranscript,
    getJobStatus: mockGetJobStatus,
  }));
  MockSupadata._mockTranscript = mockTranscript;
  MockSupadata._mockGetJobStatus = mockGetJobStatus;
  return { Supadata: MockSupadata };
});

const { Supadata } = require("@supadata/js");
const {
  getTranscript,
  getTimestampedTranscript,
} = require("../lib/transcript");

describe("getTranscript", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns string content when SDK responds synchronously with content", async () => {
    const mockInstance = new Supadata();
    mockInstance.transcript.mockResolvedValue({
      content: "This is the video transcript text.",
    });
    Supadata.mockImplementation(() => mockInstance);

    const result = await getTranscript("https://youtube.com/watch?v=test123");
    expect(typeof result).toBe("string");
    expect(result).toBe("This is the video transcript text.");
  });

  it("polls for job completion when SDK returns jobId (async/202 response)", async () => {
    const mockInstance = new Supadata();
    mockInstance.transcript.mockResolvedValue({ jobId: "job-abc-123" });
    mockInstance.getJobStatus.mockResolvedValue({
      status: "completed",
      content: "Polled transcript content.",
    });
    Supadata.mockImplementation(() => mockInstance);

    const promise = getTranscript("https://youtube.com/watch?v=longvideo");
    await jest.runAllTimersAsync();
    const result = await promise;

    expect(mockInstance.getJobStatus).toHaveBeenCalledWith("job-abc-123");
    expect(result).toBe("Polled transcript content.");
  });

  it("throws error if polling job fails", async () => {
    const mockInstance = new Supadata();
    mockInstance.transcript.mockResolvedValue({ jobId: "job-fail-123" });
    mockInstance.getJobStatus.mockResolvedValue({
      status: "failed",
      error: "Transcript unavailable",
    });
    Supadata.mockImplementation(() => mockInstance);

    const promise = getTranscript("https://youtube.com/watch?v=fail");
    await jest.runAllTimersAsync();
    await expect(promise).rejects.toThrow("Transcript job failed");
  });
});

describe("getTimestampedTranscript", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns array of objects with text, offset, duration", async () => {
    const chunks = [
      { text: "Hello world", offset: 0, duration: 3400 },
      { text: "This is automation", offset: 3400, duration: 2800 },
    ];
    const mockInstance = new Supadata();
    mockInstance.transcript.mockResolvedValue({ content: chunks });
    Supadata.mockImplementation(() => mockInstance);

    const result = await getTimestampedTranscript(
      "https://youtube.com/watch?v=test123",
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("text");
    expect(result[0]).toHaveProperty("offset");
    expect(result[0]).toHaveProperty("duration");
  });
});

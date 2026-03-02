"use strict";

const { EventEmitter } = require("events");

// Mock child_process before requiring extractor
jest.mock("child_process");

const childProcess = require("child_process");
const { extractClip } = require("../lib/extractor");

function makeSpawnMock(exitCode) {
  const proc = new EventEmitter();
  proc.stderr = new EventEmitter();
  // Emit stderr data and then close
  setImmediate(() => {
    proc.stderr.emit("data", Buffer.from("ffmpeg output"));
    proc.emit("close", exitCode);
  });
  return proc;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("extractClip", () => {
  test("spawns a process when called with valid args", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 10,
      durationSec: 30,
      srtPath: null,
    });

    expect(childProcess.spawn).toHaveBeenCalledTimes(1);
  });

  test("rejects when ffmpeg exits non-zero", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(1));

    await expect(
      extractClip({
        inputPath: "/tmp/input.mp4",
        outputPath: "/tmp/output.mp4",
        startSec: 10,
        durationSec: 30,
        srtPath: null,
      }),
    ).rejects.toThrow(/ffmpeg exited 1/);
  });

  test("args include -ss flag", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 120,
      durationSec: 45,
      srtPath: null,
    });

    const args = childProcess.spawn.mock.calls[0][1];
    expect(args).toContain("-ss");
    expect(args).toContain("120");
  });

  test("args include -t flag", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 120,
      durationSec: 45,
      srtPath: null,
    });

    const args = childProcess.spawn.mock.calls[0][1];
    expect(args).toContain("-t");
    expect(args).toContain("45");
  });

  test("args include -vf flag", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 0,
      durationSec: 30,
      srtPath: null,
    });

    const args = childProcess.spawn.mock.calls[0][1];
    expect(args).toContain("-vf");
  });

  test("args include -c:v libx264", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 0,
      durationSec: 30,
      srtPath: null,
    });

    const args = childProcess.spawn.mock.calls[0][1];
    expect(args).toContain("-c:v");
    expect(args).toContain("libx264");
  });

  test("args include -c:a aac", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 0,
      durationSec: 30,
      srtPath: null,
    });

    const args = childProcess.spawn.mock.calls[0][1];
    expect(args).toContain("-c:a");
    expect(args).toContain("aac");
  });

  test("args include -movflags +faststart", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 0,
      durationSec: 30,
      srtPath: null,
    });

    const args = childProcess.spawn.mock.calls[0][1];
    expect(args).toContain("-movflags");
    expect(args).toContain("+faststart");
  });

  test("returns output path on success", async () => {
    childProcess.spawn.mockReturnValue(makeSpawnMock(0));

    const result = await extractClip({
      inputPath: "/tmp/input.mp4",
      outputPath: "/tmp/output.mp4",
      startSec: 0,
      durationSec: 30,
      srtPath: null,
    });

    expect(result).toBe("/tmp/output.mp4");
  });
});

import * as os from "os";
import * as path from "path";
import { describe, it, expect } from "vitest";
import { isCodingAgent, formatTimestamp, resolveLogPath } from "./main";

describe("isCodingAgent", () => {
  it("returns true for supported agents", () => {
    expect(isCodingAgent("claude")).toBe(true);
    expect(isCodingAgent("codex")).toBe(true);
    expect(isCodingAgent("gemini")).toBe(true);
  });

  it("returns false for unknown values", () => {
    expect(isCodingAgent("gpt")).toBe(false);
    expect(isCodingAgent("")).toBe(false);
    expect(isCodingAgent("Claude")).toBe(false);
  });
});

describe("formatTimestamp", () => {
  it("formats date as 'YYYY-MM-DD HH:MM:SS' with zero padding", () => {
    const date = new Date(2026, 0, 2, 3, 4, 5);
    expect(formatTimestamp(date)).toBe("2026-01-02 03:04:05");
  });

  it("preserves two-digit components", () => {
    const date = new Date(2026, 11, 31, 23, 59, 59);
    expect(formatTimestamp(date)).toBe("2026-12-31 23:59:59");
  });
});

describe("resolveLogPath", () => {
  it("joins home directory with vibe-coding-memo, project name, and file name", () => {
    expect(resolveLogPath("my-proj", "history.md")).toBe(
      path.join(os.homedir(), "vibe-coding-memo", "my-proj", "history.md"),
    );
  });
});

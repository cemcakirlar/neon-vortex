import { describe, expect, it } from "vitest";
import { FrameProfiler } from "./perf";

describe("FrameProfiler", () => {
  it("returns default stats when no samples are present", () => {
    const profiler = new FrameProfiler();
    expect(profiler.getStats()).toEqual({ p50: 0, p95: 0, samples: 0 });
  });

  it("calculates p50 and p95 with bounded samples", () => {
    const profiler = new FrameProfiler(5);
    [16, 20, 18, 24, 30, 10].forEach((sample) => profiler.addSample(sample));
    const stats = profiler.getStats();
    expect(stats.samples).toBe(5);
    expect(stats.p50).toBeGreaterThan(0);
    expect(stats.p95).toBeGreaterThanOrEqual(stats.p50);
  });
});

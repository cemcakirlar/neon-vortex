export interface FrameStats {
  p50: number;
  p95: number;
  samples: number;
}

const quantile = (sorted: number[], percentile: number) => {
  const index = Math.min(sorted.length - 1, Math.max(0, Math.floor(percentile * sorted.length)));
  return sorted[index];
};

export class FrameProfiler {
  private samples: number[] = [];
  private maxSamples: number;

  constructor(maxSamples = 240) {
    this.maxSamples = maxSamples;
  }

  addSample(frameMs: number) {
    this.samples.push(frameMs);
    if (this.samples.length > this.maxSamples) this.samples.shift();
  }

  getStats(): FrameStats {
    if (this.samples.length === 0) return { p50: 0, p95: 0, samples: 0 };
    const sorted = [...this.samples].sort((a, b) => a - b);
    return {
      p50: Number(quantile(sorted, 0.5).toFixed(2)),
      p95: Number(quantile(sorted, 0.95).toFixed(2)),
      samples: this.samples.length,
    };
  }
}

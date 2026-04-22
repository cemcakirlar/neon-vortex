import type { CheatConfig, GameOptions } from "./types";

export const getSpawnRate = (baseSpawnRate: number, level: number): number => Math.max(10, baseSpawnRate - level * 2);

export const getSurvivalGraceEnemies = (threshold: number): number => Math.ceil(120 / Math.max(1, threshold));

export const shouldTriggerSurvivalGameOver = (
  options: GameOptions,
  cheats: CheatConfig,
  deathsPerMinute: number,
  totalEnemiesSpawned: number,
): boolean => {
  if (options.gameMode !== "SURVIVAL") return false;
  const threshold = cheats.survivalThresholdOverride ?? options.survivalThreshold;
  if (totalEnemiesSpawned < getSurvivalGraceEnemies(threshold)) return false;
  return deathsPerMinute > threshold;
};

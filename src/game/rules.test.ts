import { describe, expect, it } from "vitest";
import { getSpawnRate, getSurvivalGraceEnemies, shouldTriggerSurvivalGameOver } from "./rules";
import type { CheatConfig, GameOptions } from "./types";

const baseOptions: GameOptions = {
  wallMode: "BOUNCE",
  gameMode: "SURVIVAL",
  enemySpeed: "NORMAL",
  movementMode: "WASD",
  soundEnabled: true,
  autoFire: false,
  difficulty: "NORMAL",
  survivalThreshold: 30,
};

const baseCheats: CheatConfig = {
  enemySpawnRate: 60,
  powerUpChance: 0.3,
  enemySpeedMultiplier: 1,
  godMode: false,
  survivalThresholdOverride: null,
};

describe("rules", () => {
  it("clamps spawn rate with level scaling", () => {
    expect(getSpawnRate(60, 0)).toBe(60);
    expect(getSpawnRate(60, 15)).toBe(30);
    expect(getSpawnRate(60, 40)).toBe(10);
  });

  it("calculates survival grace enemies", () => {
    expect(getSurvivalGraceEnemies(30)).toBe(4);
    expect(getSurvivalGraceEnemies(10)).toBe(12);
  });

  it("triggers survival game over after grace and threshold breach", () => {
    expect(shouldTriggerSurvivalGameOver(baseOptions, baseCheats, 31, 4)).toBe(true);
    expect(shouldTriggerSurvivalGameOver(baseOptions, baseCheats, 20, 4)).toBe(false);
    expect(shouldTriggerSurvivalGameOver(baseOptions, baseCheats, 40, 1)).toBe(false);
  });
});

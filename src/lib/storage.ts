import type { CheatConfig, GameOptions } from "../game/types";

type StorageKey = "neon-vortex-highscore" | "neon-vortex-options" | "neon-vortex-cheats";

const hasValue = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;
const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export const DEFAULT_OPTIONS: GameOptions = {
  wallMode: "BOUNCE",
  gameMode: "INFINITE",
  enemySpeed: "SLOW",
  movementMode: "WASD",
  soundEnabled: true,
  autoFire: false,
  difficulty: "NORMAL",
  survivalThreshold: 30,
};

export const DEFAULT_CHEATS: CheatConfig = {
  enemySpawnRate: 60,
  powerUpChance: 0.3,
  enemySpeedMultiplier: 1.0,
  godMode: false,
  survivalThresholdOverride: null,
};

export const loadNumber = (key: StorageKey, fallback: number): number => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const saveNumber = (key: StorageKey, value: number) => {
  localStorage.setItem(key, value.toString());
};

const safeParse = (raw: string): unknown => {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
};

export const loadOptions = (): GameOptions => {
  const raw = localStorage.getItem("neon-vortex-options");
  if (!raw) return DEFAULT_OPTIONS;
  const parsed = safeParse(raw);
  if (!hasValue(parsed)) return DEFAULT_OPTIONS;

  return {
    wallMode: parsed.wallMode === "DIE" ? "DIE" : "BOUNCE",
    gameMode: parsed.gameMode === "NORMAL" || parsed.gameMode === "SURVIVAL" ? parsed.gameMode : "INFINITE",
    enemySpeed: parsed.enemySpeed === "NORMAL" || parsed.enemySpeed === "FAST" ? parsed.enemySpeed : "SLOW",
    movementMode: parsed.movementMode === "RECOIL" ? "RECOIL" : "WASD",
    soundEnabled: isBoolean(parsed.soundEnabled) ? parsed.soundEnabled : true,
    autoFire: isBoolean(parsed.autoFire) ? parsed.autoFire : false,
    difficulty: parsed.difficulty === "EASY" || parsed.difficulty === "HARD" ? parsed.difficulty : "NORMAL",
    survivalThreshold: isNumber(parsed.survivalThreshold) ? Math.max(1, Math.min(100, parsed.survivalThreshold)) : 30,
  };
};

export const saveOptions = (options: GameOptions) => {
  localStorage.setItem("neon-vortex-options", JSON.stringify(options));
};

export const loadCheats = (): CheatConfig => {
  const raw = localStorage.getItem("neon-vortex-cheats");
  if (!raw) return DEFAULT_CHEATS;
  const parsed = safeParse(raw);
  if (!hasValue(parsed)) return DEFAULT_CHEATS;

  return {
    enemySpawnRate: isNumber(parsed.enemySpawnRate)
      ? Math.max(10, Math.min(120, parsed.enemySpawnRate))
      : DEFAULT_CHEATS.enemySpawnRate,
    powerUpChance: isNumber(parsed.powerUpChance)
      ? Math.max(0, Math.min(1, parsed.powerUpChance))
      : DEFAULT_CHEATS.powerUpChance,
    enemySpeedMultiplier: isNumber(parsed.enemySpeedMultiplier)
      ? Math.max(0.1, Math.min(3, parsed.enemySpeedMultiplier))
      : DEFAULT_CHEATS.enemySpeedMultiplier,
    godMode: isBoolean(parsed.godMode) ? parsed.godMode : DEFAULT_CHEATS.godMode,
    survivalThresholdOverride:
      parsed.survivalThresholdOverride === null
        ? null
        : isNumber(parsed.survivalThresholdOverride)
          ? Math.max(1, Math.min(100, parsed.survivalThresholdOverride))
          : null,
  };
};

export const saveCheats = (cheats: CheatConfig) => {
  localStorage.setItem("neon-vortex-cheats", JSON.stringify(cheats));
};

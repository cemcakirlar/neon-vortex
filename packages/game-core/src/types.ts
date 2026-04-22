export type WallMode = "DIE" | "BOUNCE";
export type GameMode = "NORMAL" | "INFINITE" | "SURVIVAL";
export type EnemySpeed = "SLOW" | "NORMAL" | "FAST";
export type MovementMode = "RECOIL" | "WASD";
export type Difficulty = "EASY" | "NORMAL" | "HARD";

export interface GameOptions {
  wallMode: WallMode;
  gameMode: GameMode;
  enemySpeed: EnemySpeed;
  movementMode: MovementMode;
  soundEnabled: boolean;
  autoFire: boolean;
  difficulty: Difficulty;
  survivalThreshold: number;
}

export interface CheatConfig {
  enemySpawnRate: number;
  powerUpChance: number;
  enemySpeedMultiplier: number;
  godMode: boolean;
  survivalThresholdOverride: number | null;
}

export interface PerfStats {
  p50: number;
  p95: number;
  samples: number;
}

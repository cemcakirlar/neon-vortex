import { Bullet, Enemy, Particle, Player, PowerUp } from "./Entities";

export interface RuntimeState {
  score: number;
  level: number;
  deathCount: number;
  deathsPerMinute: number;
  totalEnemiesSpawned: number;
  startTime: number;
  bullets: Bullet[];
  enemyBullets: Bullet[];
  enemies: Enemy[];
  particles: Particle[];
  powerups: PowerUp[];
  player: Player;
}

export const createFreshRuntimeState = (width: number, height: number): RuntimeState => ({
  score: 0,
  level: 1,
  deathCount: 0,
  deathsPerMinute: 0,
  totalEnemiesSpawned: 0,
  startTime: Date.now(),
  bullets: [],
  enemyBullets: [],
  enemies: [],
  particles: [],
  powerups: [],
  player: new Player(width / 2, height / 2),
});

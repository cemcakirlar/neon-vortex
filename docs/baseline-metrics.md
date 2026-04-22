# Neon Vortex Baseline Metrics

This file locks baseline behavior before and during refactor work.

## Critical Flows

- Start game from main menu.
- Survive in `NORMAL` and observe game over transition.
- Survive in `INFINITE` and verify respawn + DPM update.
- Survive in `SURVIVAL` and verify threshold-based game over.
- Enable options and confirm runtime update in live engine.
- Enable cheats (dev / flag only), save and reload values.

## Runtime Baseline

- Browser target: latest Chromium-based browser.
- Arena renders at full viewport.
- Frame metrics are visible in HUD (`p50`, `p95`).
- Expected baseline on laptop-grade hardware: `p95 <= 30ms` during early waves.

## Regression Guardrails

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

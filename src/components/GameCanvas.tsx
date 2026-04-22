import { useEffect, useRef, useState } from "react";
import { GameEngine } from "../game/Engine";
import { GameState, GameOptions, CheatConfig, PerfStats } from "../game/types";
import { PowerUpType } from "../game/Entities";
import { HUD } from "./HUD";
import { MainMenu, PauseMenu, GameOverMenu, GuideOverlay, OptionsOverlay, CheatOverlay } from "./Menus";
import { trackPageView } from "../lib/telemetry";
import {
  DEFAULT_CHEATS,
  DEFAULT_OPTIONS,
  loadCheats,
  loadNumber,
  loadOptions,
  saveCheats as saveCheatsStorage,
  saveNumber,
  saveOptions,
} from "../lib/storage";
import { runtimeConfig } from "../config/runtime";
import { Toast } from "./Toast";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [dpm, setDpm] = useState(0);
  const [activePowerUps, setActivePowerUps] = useState<PowerUpType[]>([]);
  const [totalEnemiesSpawned, setTotalEnemiesSpawned] = useState(0);
  const [perfStats, setPerfStats] = useState<PerfStats>({ p50: 0, p95: 0, samples: 0 });
  const [toastMessage, setToastMessage] = useState("");
  const [highScore, setHighScore] = useState(() => loadNumber("neon-vortex-highscore", 0));

  const [options, setOptions] = useState<GameOptions>(() => loadOptions());
  const [showOptions, setShowOptions] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showCheats, setShowCheats] = useState(false); // UI hidden in prod by config, state retained for dev builds.
  const initialOptionsRef = useRef(options);

  // Track screen views for overlays
  useEffect(() => {
    if (showOptions) {
      trackPageView("/options", "Options");
    }
  }, [showOptions]);

  useEffect(() => {
    if (showGuide) {
      trackPageView("/guide", "Guide");
    }
  }, [showGuide]);

  useEffect(() => {
    if (showCheats) {
      trackPageView("/cheats", "Cheats");
    }
  }, [showCheats]);

  const [cheats, setCheats] = useState<CheatConfig>(() => loadCheats());
  const initialCheatsRef = useRef(cheats);

  const saveCheats = () => {
    saveCheatsToStorage(cheats);
    setToastMessage("Cheats saved.");
    window.setTimeout(() => setToastMessage(""), 1500);
  };

  const resetCheats = () => {
    setCheats(DEFAULT_CHEATS);
    localStorage.removeItem("neon-vortex-cheats");
  };

  useEffect(() => {
    saveOptions(options);
  }, [options]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new GameEngine(canvasRef.current, (state, score, level, dpm, powerups, enemiesSpawned, perf) => {
      setGameState(state);
      setScore(score);
      setHighScore((previous) => {
        if (score <= previous) return previous;
        saveNumber("neon-vortex-highscore", score);
        return score;
      });
      setLevel(level);
      setDpm(dpm);
      setActivePowerUps(powerups);
      setTotalEnemiesSpawned(enemiesSpawned);
      setPerfStats(perf);
    });
    engineRef.current = engine;
    engine.setOptions(initialOptionsRef.current);
    engine.setCheats(initialCheatsRef.current);

    return () => {
      engine.destroy();
    };
  }, []);

  // Update engine when options change
  useEffect(() => {
    engineRef.current?.setOptions(options);
  }, [options]);

  // Update engine when cheats change
  useEffect(() => {
    engineRef.current?.setCheats(cheats);
  }, [cheats]);

  const startGame = () => engineRef.current?.startGame();
  const resumeGame = () => engineRef.current?.resume();
  const restartGame = () => engineRef.current?.restart();
  const exitToMenu = () => engineRef.current?.exitToMenu();

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

      <HUD
        score={score}
        highScore={highScore}
        dpm={dpm}
        level={level}
        options={options}
        cheats={cheats}
        activePowerUps={activePowerUps}
        totalEnemiesSpawned={totalEnemiesSpawned}
        perfStats={perfStats}
      />

      {/* Overlays */}
      {gameState === GameState.MENU && !showOptions && !showGuide && !showCheats && (
        <MainMenu
          startGame={startGame}
          setShowGuide={setShowGuide}
          setShowOptions={setShowOptions}
          setShowCheats={setShowCheats}
          options={options}
          canShowCheats={runtimeConfig.enableCheatsInProduction || import.meta.env.DEV}
        />
      )}

      {showGuide && <GuideOverlay setShowGuide={setShowGuide} />}

      {showOptions && (
        <OptionsOverlay
          options={options}
          setOptions={setOptions}
          setShowOptions={setShowOptions}
          DEFAULT_OPTIONS={DEFAULT_OPTIONS}
        />
      )}

      {showCheats && (
        <CheatOverlay
          cheats={cheats}
          setCheats={setCheats}
          setShowCheats={setShowCheats}
          saveCheats={saveCheats}
          resetCheats={resetCheats}
        />
      )}

      {gameState === GameState.PAUSED && <PauseMenu resumeGame={resumeGame} exitToMenu={exitToMenu} />}

      {gameState === GameState.GAMEOVER && (
        <GameOverMenu score={score} highScore={highScore} restartGame={restartGame} exitToMenu={exitToMenu} />
      )}
      <Toast message={toastMessage} />
    </div>
  );
}

const saveCheatsToStorage = (cheats: CheatConfig) => saveCheatsStorage(cheats);

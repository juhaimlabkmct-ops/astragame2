"use client";

import { useState, useEffect } from "react";
import StartScreen from "@/components/StartScreen";
import GameLoop from "@/components/GameLoop";
import GameOverScreen from "@/components/GameOverScreen";
import { audioManager } from "@/utils/audioManager";

type GameState = "START" | "PLAYING" | "GAMEOVER";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("START");
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    // Play BGM on mount (will actally likely block until user interaction, so we try)
    // Audio context requires user gesture. We'll play on "Start" button click.
  }, []);

  const handleStart = () => {
    try {
      audioManager.play("bgm");
    } catch (e) {
      console.error("Audio init failed", e);
    }
    setGameState("PLAYING");
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameState("GAMEOVER");
  };

  const handleRestart = () => {
    setGameState("PLAYING");
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[var(--c-bg-dark)] text-white font-rajdhani">
      {gameState === "START" && (
        <StartScreen onStart={handleStart} />
      )}

      {gameState === "PLAYING" && (
        <GameLoop onGameOver={handleGameOver} />
      )}

      {gameState === "GAMEOVER" && (
        <GameOverScreen score={finalScore} onRestart={handleRestart} />
      )}

      {/* Footer attribution or version */}
      <div className="fixed bottom-1 left-2 text-[10px] text-white/10 pointer-events-none z-0">
        ASTRA ONE WRONG CLICK v1.0
      </div>
    </main>
  );
}

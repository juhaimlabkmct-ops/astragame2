'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import LinkItem from "./LinkItem";
import { generateLink, getDifficulty, LinkData, calculateComboBonus } from "@/utils/gameLogic";
import { audioManager } from "@/utils/audioManager";
import AstraLogo from "./ui/AstraLogo";

interface GameLoopProps {
    onGameOver: (score: number) => void;
}

export default function GameLoop({ onGameOver }: GameLoopProps) {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [startTime] = useState<number>(() => Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    // Game loop ticker
    useEffect(() => {
        const loopInterval = setInterval(() => {
            const now = Date.now();
            const currentElapsed = now - startTime;
            setElapsedTime(currentElapsed);
        }, 100);

        return () => clearInterval(loopInterval);
    }, [startTime]);

    // Separate spawner effect with dynamic difficulty
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const spawnLoop = () => {
            try {
                const currentElapsed = Date.now() - startTime;
                const difficulty = getDifficulty(currentElapsed);

                setLinks(prev => {
                    // Dynamic max links based on difficulty
                    if (prev.length >= difficulty.maxLinks) return prev;
                    const newLink = generateLink(currentElapsed);
                    return [...prev, newLink];
                });

                timeoutId = setTimeout(spawnLoop, difficulty.spawnInterval);
            } catch (e) {
                console.error("Spawn loop error:", e);
            }
        };

        spawnLoop();
        return () => clearTimeout(timeoutId);
    }, [startTime]);

    // Track score animation
    const [scoreBump, setScoreBump] = useState(false);
    const [comboDisplay, setComboDisplay] = useState(false);

    const handleTap = useCallback((id: string, isSafe: boolean) => {
        const link = links.find(l => l.id === id);
        if (!link) return;

        if (isSafe) {
            // Calculate score with combo bonus
            const comboBonus = calculateComboBonus(streak + 1);
            const totalPoints = link.points + comboBonus;

            setScore(s => s + totalPoints);
            setStreak(s => s + 1);
            setScoreBump(true);

            // Show combo notification
            if (streak + 1 >= 3) {
                setComboDisplay(true);
                setTimeout(() => setComboDisplay(false), 1000);
            }

            setTimeout(() => setScoreBump(false), 300);

            try { audioManager.play('success'); } catch (e) { console.error(e); }
            setLinks(prev => prev.filter(l => l.id !== id));
        } else {
            // Reset streak on wrong click
            setStreak(0);
            try { audioManager.play('failure'); } catch (e) { console.error(e); }
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 500]);
            }
            onGameOver(score);
        }
    }, [score, streak, links, onGameOver]);

    const toggleSound = () => {
        try {
            const muted = audioManager.toggleMute();
            setIsMuted(muted);
        } catch (e) {
            console.error("Audio toggle failed", e);
        }
    };

    // Derived difficulty for visuals
    const currentSpeedLevel = Math.floor(elapsedTime / 8000);
    const isHighPressure = currentSpeedLevel >= 5; // Start panic mode after 40s
    const difficulty = getDifficulty(elapsedTime);

    return (
        <div className={`relative w-full h-screen overflow-hidden flex flex-col bg-gray-900/50 transition-colors duration-1000 ${isHighPressure ? 'shadow-[inset_0_0_100px_rgba(255,0,0,0.2)]' : ''}`}>
            {/* Panic Overlay */}
            {isHighPressure && <div className="absolute inset-0 pointer-events-none z-0 animate-panic"></div>}

            {/* UI Overlay */}
            <div className="flex justify-between items-center p-4 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
                <AstraLogo size="small" />
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <div className={`text-2xl font-bold font-mono text-[var(--c-neon-cyan)] transition-transform ${scoreBump ? 'animate-scale-pulse' : ''}`}>
                            SCORE: {score.toString().padStart(3, '0')}
                        </div>
                        {streak >= 3 && (
                            <div className="text-xs text-yellow-400 font-mono animate-pulse">
                                🔥 STREAK: {streak}x
                            </div>
                        )}
                    </div>
                    <button onClick={toggleSound} className="p-2 border border-white/20 rounded-full text-white/50 hover:text-white pointer-events-auto">
                        {isMuted ? "🔇" : "🔊"}
                    </button>
                </div>
            </div>

            {/* Combo Notification */}
            {comboDisplay && (
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 animate-scale-pulse">
                    <div className="bg-yellow-500/20 border-2 border-yellow-400 px-6 py-3 rounded-lg">
                        <div className="text-yellow-400 font-bold text-xl">
                            COMBO x{streak}! +{calculateComboBonus(streak)}
                        </div>
                    </div>
                </div>
            )}

            {/* Game Area */}
            <div className="flex-1 relative flex flex-col items-center justify-start pt-10 px-4 space-y-4 overflow-hidden z-10">

                {/* Status Bar */}
                <div className="w-full max-w-md mb-4 p-3 bg-black/40 rounded-lg border border-cyan-500/30">
                    <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-cyan-400">{difficulty.description}</span>
                        <span className="text-white/60">LVL {difficulty.level}</span>
                    </div>
                    <div className="mt-2 h-1 bg-black/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-red-500 transition-all duration-300"
                            style={{ width: `${Math.min(100, (difficulty.level / 12) * 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Links container */}
                <div className="w-full max-w-md space-y-4 relative z-20">
                    {links.map(link => (
                        <LinkItem key={link.id} data={link} onTap={handleTap} />
                    ))}
                    {links.length === 0 && (
                        <div className="text-white/20 animate-pulse text-center mt-10">Scanning network...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

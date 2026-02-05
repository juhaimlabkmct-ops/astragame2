
import { useState, useEffect, useRef, useCallback } from "react";
import LinkItem from "./LinkItem";
import { generateLink, getDifficulty, LinkData } from "@/utils/gameLogic";
import { audioManager } from "@/utils/audioManager";
import AstraLogo from "./ui/AstraLogo";

interface GameLoopProps {
    onGameOver: (score: number) => void;
}

export default function GameLoop({ onGameOver }: GameLoopProps) {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [score, setScore] = useState(0);
    const [startTime] = useState<number>(() => Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    // Game loop ticker
    useEffect(() => {
        const loopInterval = setInterval(() => {
            const now = Date.now();
            const currentElapsed = now - startTime;
            setElapsedTime(currentElapsed);

            // const { level, spawnInterval } = getDifficulty(currentElapsed);

            // Spawn logic: check if it's time to spawn a new link
            // For MVP simplicity: we just maintain a queue. 
            // If queue is empty or last spawn was > interval ago.
            // We actually need a ref to track last spawn time to avoid re-renders triggering spawns
        }, 100); // 10fps update for stats is enough

        return () => clearInterval(loopInterval);
    }, [startTime]);

    // Separate spawner effect
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const spawnLoop = () => {
            try {
                const { spawnInterval } = getDifficulty(Date.now() - startTime);
                // console.log("Spawning link...", spawnInterval); 

                setLinks(prev => {
                    // Limit max links on screen to avoid chaos
                    if (prev.length >= 4) return prev;
                    const newLink = generateLink();
                    // console.log("New Link:", newLink);
                    return [...prev, newLink];
                });

                timeoutId = setTimeout(spawnLoop, spawnInterval);
            } catch (e) {
                console.error("Spawn loop error:", e);
            }
        };

        spawnLoop();
        return () => clearTimeout(timeoutId);
    }, []);

    const handleTap = useCallback((id: string, isSafe: boolean) => {
        // console.log("Tapped:", id, isSafe);
        if (isSafe) {
            setScore(s => s + 1);
            try { audioManager.play('success'); } catch (e) { console.error(e); }
            setLinks(prev => prev.filter(l => l.id !== id));
        } else {
            try { audioManager.play('failure'); } catch (e) { console.error(e); }
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 500]);
            }
            onGameOver(score);
        }
    }, [score, onGameOver]);

    const toggleSound = () => {
        try {
            const muted = audioManager.toggleMute();
            setIsMuted(muted);
        } catch (e) {
            console.error("Audio toggle failed", e);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col bg-gray-900/50">
            {/* UI Overlay */}
            <div className="flex justify-between items-center p-4 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
                <AstraLogo size="small" />
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold font-mono text-[var(--c-neon-cyan)]">
                        SCORE: {score.toString().padStart(3, '0')}
                    </div>
                    <button onClick={toggleSound} className="p-2 border border-white/20 rounded-full text-white/50 hover:text-white pointer-events-auto">
                        {isMuted ? "🔇" : "🔊"}
                    </button>
                </div>
            </div>

            {/* Game Area */}
            <div className="flex-1 relative flex flex-col items-center justify-start pt-10 px-4 space-y-4 overflow-hidden z-10">

                {/* Links container */}
                <div className="w-full max-w-md space-y-4 relative z-20">
                    {links.map(link => (
                        <LinkItem key={link.id} data={link} onTap={handleTap} />
                    ))}
                    {links.length === 0 && (
                        <div className="text-white/20 animate-pulse text-center mt-10">Searching for network traffic...</div>
                    )}
                </div>

                {/* Difficulty Indicator */}
                <div className="absolute bottom-4 right-4 text-xs text-white/20 font-mono">
                    SPEED: {Math.floor(elapsedTime / 10000)}x
                </div>
            </div>
        </div>
    );
}

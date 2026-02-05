import { checkRank } from "@/utils/gameLogic";
import AstraLogo from "./ui/AstraLogo";

interface GameOverScreenProps {
    score: number;
    onRestart: () => void;
}

export default function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
    const { rank, emoji } = checkRank(score);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-6 text-center animate-shake space-y-8 bg-red-900/10">

            {/* GLITCH OVERLAY */}
            <div className="fixed inset-0 pointer-events-none bg-red-500/10 mix-blend-overlay z-0 animate-pulse-glow"></div>

            <div className="relative z-10 space-y-6">
                <h1 className="text-6xl font-black text-[var(--c-alert-red)] tracking-tighter glitch-wrapper element-3d"
                    style={{ textShadow: "0 0 10px red, 2px 2px 0px #500000" }}>
                    SYSTEM BREACHED
                </h1>

                <div className="text-2xl text-red-300 font-mono">
                    One Wrong Click. Game Over.
                </div>

                <div className="py-8 space-y-2">
                    <div className="text-sm text-gray-400 uppercase tracking-widest">Final Score</div>
                    <div className="text-7xl font-bold text-white">{score}</div>
                </div>

                <div className="p-4 border border-[var(--c-neon-cyan)] bg-black/50 backdrop-blur-md rounded-xl">
                    <div className="text-xs text-[var(--c-neon-cyan)] uppercase mb-2">Cyber Rank Detected</div>
                    <div className="text-3xl font-bold text-white">
                        {rank} <span className="text-4xl">{emoji}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 w-full max-w-sm relative z-10">
                <button
                    onClick={onRestart}
                    className="w-full py-4 bg-[var(--c-neon-cyan)] text-black font-bold text-xl uppercase rounded hover:bg-white transition-colors shadow-[0_0_20px_var(--c-neon-cyan)]"
                >
                    ↻ Play Again
                </button>

                <a
                    href="https://www.instagram.com/astra.ietm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 border border-white/20 text-white hover:bg-white/10 rounded flex items-center justify-center gap-2 element-3d"
                >
                    <span>📸</span> Follow ASTRA
                </a>

                <a
                    href="https://www.astraietm.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 border border-white/20 text-white hover:bg-white/10 rounded flex items-center justify-center gap-2 element-3d"
                >
                    <span>🌐</span> Visit Website
                </a>
            </div>

            <div className="fixed bottom-4 opacity-50 scale-75">
                <AstraLogo size="small" />
            </div>
        </div>
    );
}

import { LinkData } from "@/utils/gameLogic";

interface LinkItemProps {
    data: LinkData;
    onTap: (id: string, isSafe: boolean) => void;
}

export default function LinkItem({ data, onTap }: LinkItemProps) {

    // We can add random spawn positions or just vertical list for simpler MVP first.
    // Requirement: "Links appear one by one. Speed increases."
    // Design: Floating bubble or cyber-panel.

    // const isSuspiciousStyle = false; 

    return (
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent background clicks
                // Vibrate
                if (navigator.vibrate) navigator.vibrate(20);
                onTap(data.id, data.isSafe);
            }}
            className="animate-slide-up mx-auto w-full max-w-sm mb-4 block relative z-30 pointer-events-auto"
        >
            <div className={`
        relative overflow-hidden p-4 rounded-lg border 
        bg-black/90 backdrop-blur-md
        border-[var(--c-neon-cyan)] shadow-[0_0_10px_var(--c-neon-cyan)]
        transform transition-all duration-100 active:scale-95
        group
      `}>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--c-neon-cyan)] opacity-50"></div>

                <span className="text-xl md:text-2xl font-mono text-white tracking-wide group-hover:text-[var(--c-neon-cyan)]">
                    {data.url}
                </span>

                {/* Hover/Active Glitch - subtle hint or just feel */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
        </button>
    );
}

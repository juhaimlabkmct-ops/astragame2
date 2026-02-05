import { LinkData } from "@/utils/gameLogic";

interface LinkItemProps {
    data: LinkData;
    onTap: (id: string, isSafe: boolean) => void;
}

export default function LinkItem({ data, onTap }: LinkItemProps) {

    return (
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent background clicks
                if (navigator.vibrate) navigator.vibrate(20);
                onTap(data.id, data.isSafe);
            }}
            className="animate-slide-up mx-auto w-full max-w-sm mb-4 block relative z-30 pointer-events-auto"
        >
            <div className={`
                relative overflow-hidden p-4 rounded-lg border 
                bg-black/90 backdrop-blur-md
                border-[var(--c-neon-cyan)] shadow-[0_0_10px_var(--c-neon-cyan)]
                active:scale-95 transition-transform
                group element-3d perspective-container
            `}>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--c-neon-cyan)] opacity-50"></div>

                <span className="text-xl md:text-2xl font-mono text-white tracking-wide group-hover:text-[var(--c-neon-cyan)] hover-glitch transition-colors">
                    {data.url}
                </span>

                {/* Hover/Active Glitch - subtle hint or just feel */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                {/* Scanline overlay for card */}
                <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            </div>
        </button>
    );
}

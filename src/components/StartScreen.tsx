import AstraLogo from './ui/AstraLogo';

interface StartScreenProps {
    onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-screen text-center p-6 space-y-12 animate-fade-in">
            <div className="relative z-10 space-y-4">
                <AstraLogo size="large" className="mb-8" />

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter neon-text glitch-wrapper">
                    ONE WRONG CLICK
                </h1>

                <p className="text-lg md:text-xl text-gray-400 tracking-widest uppercase">
                    You are online. The internet is watching.
                </p>
            </div>

            <button
                onClick={onStart}
                className="relative group px-12 py-4 bg-transparent border-2 border-[var(--c-neon-cyan)] text-[var(--c-neon-cyan)] font-bold text-xl uppercase tracking-widest overflow-hidden transition-all hover:bg-[var(--c-neon-cyan)] hover:text-black hover:shadow-[0_0_20px_var(--c-neon-cyan)] active:scale-95"
            >
                <span className="relative z-10">Start Browsing</span>
                <div className="absolute inset-0 bg-[var(--c-neon-cyan)]/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            <div className="absolute bottom-8 text-xs text-gray-600 font-mono">
                ASTRA SECURE SYSTEM v2.0
            </div>
        </div>
    );
}
